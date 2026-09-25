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

# All Canva rich text arrays: "C":{"A":["text\\n",...]
texts = []
def walk(obj):
    if isinstance(obj, dict):
        c = obj.get("C")
        if isinstance(c, dict) and isinstance(c.get("A"), list):
            for part in c["A"]:
                if isinstance(part, str) and part not in ("\\n", "\n"):
                    if re.search(r"[A-Za-zÀ-ÿ0-9$€]", part):
                        texts.append(part)
        for v in obj.values():
            walk(v)
    elif isinstance(obj, list):
        for v in obj:
            walk(v)

walk(data)

seen = set()
ordered = []
for t in texts:
    if t not in seen:
        seen.add(t)
        ordered.append(t)

# filter fonts/assets
copy = []
for t in ordered:
    if t.startswith("_assets/") or t.endswith(".woff") or t in ("WOFF", "REGULAR", "BOLD", "ITALICS", "SCREEN", "VECTOR", "image/jpeg", "image/png", "image/svg+xml"):
        continue
    if re.match(r"^[A-Z_]+$", t) and len(t) < 15:
        continue
    copy.append(t)

out = Path(r"C:\Users\Aroman EMESTHU\foundation-launchpad\.cursor_canva_all_text_nodes.txt")
out.write_text("\n---\n".join(copy), encoding="utf-8")
print("count", len(copy))

# Find link nodes with page targets
raw = json.dumps(data)
for m in re.finditer(r'"#page-\d+"', raw):
    pass
pages = sorted(set(re.findall(r"#page-\d+", raw)))
print("pages in json:", pages)

# inscription page strings near S'inscrire
for m in re.finditer(r"S\\u2019inscrire", raw):
    print("inscrire context:", raw[m.start()-200:m.start()+400])

# octobre fragments
for frag in ["ctobre", "Oct", "octobre", "2026", "19 - 24", "19 au 24"]:
    print(frag, raw.count(frag))
