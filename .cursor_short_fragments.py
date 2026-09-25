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
all_s = []

def w(o):
    if isinstance(o, dict):
        for v in o.values():
            w(v)
    elif isinstance(o, list):
        for v in o:
            w(v)
    elif isinstance(o, str):
        all_s.append(o)

w(data)
for t in sorted(set(all_s)):
    if re.match(r"^[\sA-Za-zÀ-ÿμ]{1,12}$", t) and t.strip():
        print(repr(t))

# link objects with page targets
raw = json.dumps(data)
for m in re.finditer(r'"A\?":"[^"]+"[^}]{0,400}#page-\d+', raw):
    print("LINK SNIP:", m.group(0)[:350])
