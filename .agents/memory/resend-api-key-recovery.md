---
name: Resend API-key recovery
description: Recovery steps when the connected Resend integration rejects its stored API key.
---

A Resend connection can show as added in Replit while the provider returns HTTP 400 with `API key is invalid`. Check the provider response and call `getIntegrationReauthorizationContext` for the exact connection. If it reports `credential: "api_key"`, an OAuth reauthorization proposal cannot fix the problem; have the user update the key in the existing Replit integration, and never request the key in chat.

**Why:** The connection's added status did not prove that Resend accepted its stored key, and the credential classification ruled out OAuth reauthorization.

**How to apply:** Check the provider's error before changing sender/domain configuration. Ask the user to replace the key through Replit's Integrations UI, then retry a single delivery after they confirm it is updated.
