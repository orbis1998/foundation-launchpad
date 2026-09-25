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
data = json.loads(raw)

# all C.A strings including very short
parts = []
for m in re.finditer(r'"C":\{"A":\[(.*?)\],"B":\[(.*?)\]', raw, re.DOTALL):
    arr = m.group(1)
    for sm in re.finditer(r'"((?:\\.|[^"\\])*)"', arr):
        t = json.loads('"' + sm.group(1) + '"')
        parts.append(t)

# between RECEVEZ and INSCRIPTION in order
try:
    i0 = parts.index("RECEVEZ\n")
    i1 = parts.index("AVEC VOTRE INSCRIPTION\n")
    print("Between RECEVEZ and INSCRIPTION:", parts[i0:i1+1])
except ValueError as e:
    print(e)

# date fragments near ctobre
ix = raw.find("ctobre")
print("\nDate context:", raw[ix-150:ix+200])

# any email/phone
for pat in [r'@[a-z]+\.[a-z]+', r'\+?\d{9,}', r'wa\.me', r'whatsapp\.com']:
    ms = re.findall(pat, raw, re.I)
    if ms:
        print(pat, ms[:10])

# form widget labels
for kw in ["email", "Email", "nom", "prénom", "prenom", "téléphone", "telephone", "placeholder"]:
    if kw in raw:
        print("found kw", kw)

# count text on page-3 - split by PBJPhX1KnLz8KLMh (page-3 id from meta)
pid = "PBJPhX1KnLz8KLMh"
ix = raw.find(pid)
print("\npage-3 id context length", len(raw)-ix if ix>=0 else 0)
if ix >= 0:
    chunk = raw[ix:ix+50000]
    texts = re.findall(r'"A":\["([^"]{3,80})"', chunk)
    human = [json.loads('"' + t + '"') for t in texts if re.search(r'[A-Za-zÀ-ÿ]{3}', t)]
    print("page-3 texts sample:", human[:30])
