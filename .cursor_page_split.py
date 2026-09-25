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

# Walk pages in bootstrap - look for page list
def find_pages(obj, depth=0):
    if isinstance(obj, dict):
        if "page" in str(obj.get("A", "")).lower():
            pass
        for k, v in obj.items():
            if k == "A" and isinstance(v, str) and v.startswith("#page-"):
                yield v
            yield from find_pages(v, depth + 1)
    elif isinstance(obj, list):
        for v in obj:
            yield from find_pages(v, depth)

# Split raw json by page id occurrences and extract text arrays between them
raw = json.dumps(data, ensure_ascii=False)
chunks = re.split(r'(#page-\d+)', raw)
current = "root"
page_texts = {p: [] for p in ["#page-0", "#page-1", "#page-2"]}
for part in chunks:
    if part in page_texts:
        current = part
    else:
        for m in re.finditer(r'"A":\s*\[\s*"((?:[^"\\]|\\.)*)"\s*\]', part):
            # wrong - need C.A arrays
            pass
        for m in re.finditer(r'"C":\s*\{\s*"A":\s*\[(.*?)\]\s*,\s*"B"', part, re.DOTALL):
            arr = m.group(1)
            for sm in re.finditer(r'"((?:[^"\\]|\\.)*)"', arr):
                t = json.loads('"' + sm.group(1) + '"')
                if t.strip() and t not in ("\\n", "\n") and re.search(r"[A-Za-zÀ-ÿ]", t):
                    if not t.startswith("_assets"):
                        page_texts.setdefault(current, [])
                        if t not in page_texts[current]:
                            page_texts[current].append(t)

out = Path(r"C:\Users\Aroman EMESTHU\foundation-launchpad\.cursor_canva_per_page.txt")
lines = []
for pg in ["#page-0", "#page-1", "#page-2"]:
    lines.append(f"===== {pg} =====\n")
    for t in page_texts.get(pg, []):
        lines.append(t.replace("\\n", "\n") + "\n")
    lines.append("\n")
out.write_text("".join(lines), encoding="utf-8")
print("written", out)
for pg, ts in page_texts.items():
    print(pg, len(ts))
