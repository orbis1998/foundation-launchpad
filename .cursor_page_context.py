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

for pg in ["#page-0", "#page-1", "#page-2"]:
    print(f"\n=== occurrences of {pg} ===")
    for m in re.finditer(re.escape(pg), raw):
        ctx = raw[max(0, m.start()-500): m.start()+200]
        # find nearest french text in C.A arrays before anchor
        texts = re.findall(r'"A":\s*\[\s*"((?:\\.|[^"\\])*)"\s*\]', ctx)
        texts2 = re.findall(r'"C":\s*\{\s*"A":\s*\[(.*?)\]', ctx, re.DOTALL)
        fr = re.findall(r'\\u00[0-9a-f]{2}|S\\u2019|[A-Za-zÀ-ÿ]{4,}', ctx)
        print("---")
        print(ctx[-400:])

# Search external URLs
urls = set(re.findall(r'https?://[^"\\\\]+', raw))
print("\nURLs:", urls)

# page-2 / page-3 string refs
for s in ["page-2", "page-3", "inscri", "form"]:
    print(s, raw.lower().count(s.lower()))
