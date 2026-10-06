import { ReplitConnectors } from "@replit/connectors-sdk";
import { SendContactMessageBody, SendContactMessageResponse } from "@workspace/api-zod";
import type { ApiError } from "@workspace/api-zod";
import { Router, type IRouter } from "express";

const router: IRouter = Router();
const attemptsByIp = new Map<string, { startedAt: number; count: number }>();
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT = 5;
const DESTINATION_EMAIL = "chandrupushya@gmail.com";
const errorResponse = (error: string): ApiError => ({ error });

function allowAttempt(ip: string, now: number): boolean {
  for (const [address, attempt] of attemptsByIp) {
    if (now - attempt.startedAt >= RATE_WINDOW_MS) attemptsByIp.delete(address);
  }

  const attempt = attemptsByIp.get(ip);
  if (!attempt || now - attempt.startedAt >= RATE_WINDOW_MS) {
    attemptsByIp.set(ip, { startedAt: now, count: 1 });
    return true;
  }

  if (attempt.count >= RATE_LIMIT) return false;
  attempt.count += 1;
  return true;
}

function trimField(body: Record<string, unknown>, field: string): unknown {
  const value = body[field];
  return typeof value === "string" ? value.trim() : value;
}

router.post("/contact", async (req, res): Promise<void> => {
  const input =
    req.body && typeof req.body === "object" && !Array.isArray(req.body)
      ? (req.body as Record<string, unknown>)
      : {};
  const parsed = SendContactMessageBody.safeParse({
    ...input,
    name: trimField(input, "name"),
    email: trimField(input, "email"),
    message: trimField(input, "message"),
    website: trimField(input, "website"),
  });

  if (!parsed.success) {
    res
      .status(400)
      .json(errorResponse("Please enter your name, a valid email, and a message."));
    return;
  }

  if (!parsed.data.name || !parsed.data.email || !parsed.data.message) {
    res
      .status(400)
      .json(errorResponse("Please enter your name, a valid email, and a message."));
    return;
  }

  // Quietly accept bot-trap submissions without sending them.
  if (parsed.data.website) {
    res.json(SendContactMessageResponse.parse({ status: "sent" }));
    return;
  }

  const now = Date.now();
  if (!allowAttempt(req.ip || "unknown", now)) {
    res
      .status(429)
      .json(errorResponse("Too many notes were sent. Please try again later."));
    return;
  }

  const safeName = parsed.data.name.replace(/[\r\n\t]+/g, " ").trim();
  const safeEmail = parsed.data.email.replace(/[\r\n\t]+/g, " ").trim();

  try {
    const connectors = new ReplitConnectors();
    const delivery = await connectors.proxy("resend", "/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "Pushya's Portfolio <onboarding@resend.dev>",
        to: [DESTINATION_EMAIL],
        reply_to: safeEmail,
        subject: `Portfolio message from ${safeName}`,
        text: `Name: ${safeName}\nEmail: ${safeEmail}\n\n${parsed.data.message}`,
      }),
    });

    if (!delivery.ok) {
      req.log.error({ status: delivery.status }, "Resend rejected a portfolio message");
      res
        .status(502)
        .json(errorResponse("Email delivery is temporarily unavailable. Please try again later."));
      return;
    }
  } catch (err) {
    req.log.error({ err }, "Unable to send portfolio message through Resend");
    res
      .status(502)
      .json(errorResponse("Email delivery is temporarily unavailable. Please try again later."));
    return;
  }

  res.json(SendContactMessageResponse.parse({ status: "sent" }));
});

export default router;
