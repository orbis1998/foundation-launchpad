import re, json
from pathlib import Path
path = Path(r"C:\Users\Aroman EMESTHU\.cursor\projects\c-Users-Aroman-EMESTHU-foundation-launchpad\agent-tools\1773828b-9ada-4b57-a6c4-6cb431afc551.txt")
content = path.read_text(encoding="utf-8")
start_marker = "window['bootstrap'] = JSON.parse('"
start = content.find(start_marker) + len(start_marker)
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

# find page list in structure
raw = json.dumps(data, ensure_ascii=False)
pages_meta = re.findall(r'\{"A\?":"A","K":"[^"]+","L":"(page-\d+)","O":"([^"]*)"', raw)
print("Canva pages:", pages_meta)

# Count G:#page-N as section anchors per canvas page - heuristic: split by page-0,1,2,3 roots
# Walk top document pages
def extract_page_roots(obj):
    if isinstance(obj, dict):
        if obj.get("G", "").startswith("#page-"):
            yield obj.get("G"), obj.get("_")
        for v in obj.values():
            yield from extract_page_roots(v)
    elif isinstance(obj, list):
        for v in obj:
            yield from extract_page_roots(v)

roots = list(extract_page_roots(data))
print("Section roots (#page-N):", sorted(set(roots), key=lambda x: x[0]))

# S'inscrire button link - search wider context
idx = raw.find("S\\u2019inscrire")
print("\nS'inscrire idx", idx)
print(raw[idx:idx+1200])
