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

print("inscrire", raw.count("inscrire"))
for m in re.finditer(".{0,80}inscrire.{0,120}", raw):
    print(m.group(0))

print("\npage-0", raw.count("page-0"))
print("page-1", raw.count("page-1"))
print("page-2", raw.count("page-2"))
print("page-3", raw.count("page-3"))

for slug in ["page-0", "page-1", "page-2", "page-3"]:
    ix = raw.find(f'"L":"{slug}"')
    print(f"\n{slug} meta at {ix}")
    if ix >= 0:
        print(raw[ix:ix+250])

# RÉSERVER
for pat in ["SERVER MA PLACE", "R\\u00c9SERVER", "RÉSERVER"]:
    print(pat, raw.find(pat))
