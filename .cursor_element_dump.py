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

for eid in ["LBfQLdhdZT3m6Tpm", "LBSgT1jyP3Dk5Gfn", "LBj7HssFHcgcmDf2", "LB8Yz6jcfTTKkTsl"]:
    ix = raw.find(f'"_":"{eid}"')
    if ix < 0:
        print(eid, "not found")
        continue
    # grab enclosing object roughly
    chunk = raw[max(0, ix-800): ix+2500]
    print(f"\n===== {eid} =====")
    print(chunk)
