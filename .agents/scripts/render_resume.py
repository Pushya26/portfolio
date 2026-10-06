from pathlib import Path
import fitz

source = Path("attached_assets/Pushya_BC_2_1791291982172.pdf")
output = Path(".agents/outputs/resume-page-1.png")
output.parent.mkdir(parents=True, exist_ok=True)

document = fitz.open(source)
page = document[0]
page.get_pixmap(matrix=fitz.Matrix(1.5, 1.5), alpha=False).save(output)
print(f"Rendered {document.page_count} page(s) to {output}")
print(f"Embedded images on page 1: {len(page.get_images(full=True))}")
