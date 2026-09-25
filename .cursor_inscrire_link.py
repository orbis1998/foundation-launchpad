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
raw = content[start:i]

for label in ["inscrire", "RÉSERVER", "RESERVER", "Enregistrer", "Voir le programme", "Découvrir"]:
    for m in re.finditer(label, raw, re.I):
        ctx = raw[m.start(): m.start()+800]
        q = re.search(r'"Q":"([^"]+)"', ctx)
        print(f"\n{label} -> Q={q.group(1) if q else 'none'}")
        # show text array
        ta = re.search(r'"C":\{"A":\[(.*?)\],"B"', ctx, re.DOTALL)
        if ta:
            print("TEXT:", ta.group(1)[:200])

# page-3 context
ix = raw.find("page-3")
if ix >= 0:
    print("\npage-3 context:", raw[ix-100:ix+200])
