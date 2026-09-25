import re
import json
from pathlib import Path

path = Path(r"C:\Users\Aroman EMESTHU\.cursor\projects\c-Users-Aroman-EMESTHU-foundation-launchpad\agent-tools\1773828b-9ada-4b57-a6c4-6cb431afc551.txt")
content = path.read_text(encoding="utf-8", errors="replace")

# Find JSON.parse('...') for bootstrap - greedy until '); at end
start_marker = "window['bootstrap'] = JSON.parse('"
idx = content.find(start_marker)
if idx < 0:
    print("bootstrap not found")
    raise SystemExit(1)
start = idx + len(start_marker)
# Find closing ');  - the JSON string uses \' for quotes inside
i = start
while i < len(content):
    if content[i] == "\\" and i + 1 < len(content):
        i += 2
        continue
    if content[i] == "'":
        # check if followed by );
        rest = content[i + 1 : i + 10]
        if rest.startswith(");"):
            break
    i += 1
json_str = content[start:i]
data = json.loads(json_str)

TEXT_KEYS = {
    "text", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
    "title", "label", "name", "content", "heading", "description", "url", "href",
}

def looks_like_human_text(s: str) -> bool:
    if not isinstance(s, str) or len(s) < 2:
        return False
    if s.startswith("http") and len(s) > 200:
        return False
    if re.match(r"^[A-Za-z0-9+/=_\-]{40,}$", s):
        return False
    if re.match(r"^[A-Za-z0-9_\-]{20,}$", s) and " " not in s:
        return False
    # has letter and (space or accent or punctuation typical of copy)
    if re.search(r"[a-zA-ZÀ-ÿ]", s):
        if len(s) <= 5000 and not s.startswith("data:"):
            if "\\u" in s:
                try:
                    s = s.encode("utf-8").decode("unicode_escape")
                except Exception:
                    pass
            # filter CSS/class names
            if re.match(r"^[x][a-z0-9]+$", s):
                return False
            if s in ("B", "A", "H", "IPHONE", "en", "CLIENT_FULL", "export_website"):
                return False
            return True
    return False

found = []

def walk(obj, path=""):
    if isinstance(obj, dict):
        for k, v in obj.items():
            walk(v, f"{path}.{k}" if path else k)
    elif isinstance(obj, list):
        for j, v in enumerate(obj):
            walk(v, f"{path}[{j}]")
    elif isinstance(obj, str):
        if looks_like_human_text(obj):
            found.append((path, obj))

walk(data)

# Dedupe while preserving order
seen = set()
unique = []
for p, t in found:
    if t not in seen:
        seen.add(t)
        unique.append((p, t))

print("=== UNIQUE TEXT STRINGS (%d) ===" % len(unique))
for p, t in unique:
    t_show = t.replace("\n", "\\n")
    if len(t_show) > 300:
        t_show = t_show[:300] + "..."
    print(f"---\n{t_show}")

# Page structure hints
print("\n=== PAGE / NAV STRUCTURE ===")
if "page" in data:
    print(json.dumps(data["page"], indent=2)[:8000])

# Save full extract for inspection
out = Path(r"C:\Users\Aroman EMESTHU\foundation-launchpad\.cursor_canva_text_extract.json")
out.write_text(json.dumps({"strings": [t for _, t in unique], "with_paths": unique}, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nWrote {out}")
