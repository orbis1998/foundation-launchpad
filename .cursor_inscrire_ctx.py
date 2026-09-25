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
idx = raw.find("S\\u2019inscrire")
print(raw[idx-300:idx+1500])

# All Q link targets near CTAs
for cta in ["R\\u00c9SERVER MA PLACE", "Voir le programme", "Enregistrer", "S\\u2019inscrire"]:
    pos = 0
    while True:
        ix = raw.find(cta, pos)
        if ix < 0:
            break
        chunk = raw[ix:ix+2000]
        qs = re.findall(r'"Q":"([^"]*)"', chunk)
        gs = re.findall(r'"G":"(#page-[^"]*)"', chunk)
        print(f"\n{cta} @ {ix} Q={qs[:5]} G={gs[:5]}")
        pos = ix + 1

# page slugs
for m in re.finditer(r'"L":"(page-\d+)"', raw):
    print("slug", m.group(1))
