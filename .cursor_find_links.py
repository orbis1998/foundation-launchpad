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

# Find elements with both text and link
results = []

def walk(obj, stack=None):
    stack = stack or []
    if isinstance(obj, dict):
        label = None
        href = None
        if isinstance(obj.get("a"), dict):
            c = obj["a"].get("C", {})
            if isinstance(c, dict) and isinstance(c.get("A"), list):
                parts = [p for p in c["A"] if isinstance(p, str) and p not in ("\\n", "\n")]
                if parts:
                    label = "".join(parts).replace("\\n", " ").strip()
        for k, v in obj.items():
            if isinstance(v, str) and v.startswith("#page-"):
                href = v
            if k in ("A", "B", "C", "D") and isinstance(v, str) and v.startswith("#page-"):
                href = v
        if label and href:
            results.append((label, href))
        for k, v in obj.items():
            walk(v, stack + [k])
    elif isinstance(obj, list):
        for v in obj:
            walk(v, stack)

walk(data)
for label, href in results:
    print(f"{href} <= {label}")

# page metadata in bootstrap
if isinstance(data.get("page"), dict):
    import pprint
    pg = data["page"]
    # shallow keys
    print("PAGE KEYS", pg.keys())
