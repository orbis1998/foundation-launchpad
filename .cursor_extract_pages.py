import re
import json
from pathlib import Path

path = Path(r"C:\Users\Aroman EMESTHU\.cursor\projects\c-Users-Aroman-EMESTHU-foundation-launchpad\agent-tools\1773828b-9ada-4b57-a6c4-6cb431afc551.txt")
content = path.read_text(encoding="utf-8", errors="replace")
start_marker = "window['bootstrap'] = JSON.parse('"
idx = content.find(start_marker)
start = idx + len(start_marker)
i = start
while i < len(content):
    if content[i] == "\\" and i + 1 < len(content):
        i += 2
        continue
    if content[i] == "'":
        if content[i + 1 : i + 3] == ");":
            break
    i += 1
data = json.loads(content[start:i])

# Extract text from nodes that look like rich text: B array with A strings ending in newline often
page_sections = []  # (page_id, texts in order)

current_page = "unknown"

def extract_text_blocks(obj, depth=0):
    global current_page
    if isinstance(obj, dict):
        # link target
        for k, v in obj.items():
            if isinstance(v, str) and v.startswith("#page-"):
                current_page = v.strip()
            if k == "B" and isinstance(v, list):
                for item in v:
                    if isinstance(item, dict) and item.get("A?") == "A":
                        t = item.get("A") or item.get("B")
                        if isinstance(t, str) and len(t) >= 2 and not t.startswith("M140"):
                            if re.search(r"[A-Za-zÀ-ÿ]", t):
                                page_sections.append((current_page, t))
            extract_text_blocks(v, depth + 1)
    elif isinstance(obj, list):
        for v in obj:
            extract_text_blocks(v, depth + 1)

extract_text_blocks(data)

# Group by page
by_page = {}
for pg, t in page_sections:
    by_page.setdefault(pg, [])
    if t not in by_page[pg][-1:] if by_page[pg] else True:
        if t not in by_page[pg]:
            by_page[pg].append(t)

out = Path(r"C:\Users\Aroman EMESTHU\foundation-launchpad\.cursor_canva_by_page.md")
lines = ["# Copy by page (document order)\n\n"]
for pg in sorted(by_page.keys(), key=lambda x: (x != "unknown", x)):
    lines.append(f"## {pg}\n\n")
    for t in by_page[pg]:
        lines.append(t.replace("\\n", "\n") + "\n\n")
out.write_text("".join(lines), encoding="utf-8")
print("pages:", list(by_page.keys()))
print("Wrote", out)

# Search for href-like in entire json dump as string
raw = json.dumps(data)
for term in ["whatsapp", "wa.me", "http", "FCFA", "Bootcamp", "bootcamp", "inscri", "Douala", "Yaound", "Cameroun", " prix", "€"]:
    if term.lower() in raw.lower():
        idxs = [m.start() for m in re.finditer(re.escape(term), raw, re.I)][:5]
        for ix in idxs:
            print(f"--- {term} @ {ix} ---")
            print(raw[max(0, ix - 80) : ix + 120])
