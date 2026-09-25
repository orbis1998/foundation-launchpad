import re
import json
from pathlib import Path
from collections import defaultdict

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

# Canva text nodes often: {"A?":"A","A":"LB...","B":[{"A?":"A","A":"text\n"}]}
COPY_RE = re.compile(
    r"(?:\\n|[A-Za-zÀ-ÿ]{3,}|€|\d+\s*(?:FCFA|€|jours?|Jours))"
)
NOISE = re.compile(
    r"^(#?[0-9a-fA-F]{3,8}|\\n|\d+(?:\.\d+)?px|normal|bold|light|italic|center|start|none|uppercase|underline|shadow|lift|on|h1|pretitle|subtitle|title|w:[A-Za-z0-9]+|Y[A-Z]{2}[A-Za-z0-9_,\-]+|PB[A-Za-z0-9]+|LB[A-Za-z0-9]+|MA[A-Za-z0-9_\-]+|MAD[A-Za-z0-9]+|TAG[A-Za-z0-9]+|-?\d+(?:\.\d+)?em)$"
)
SVG_RE = re.compile(r"^M[\d\.]")

def is_copy(s: str) -> bool:
    if not isinstance(s, str) or len(s) < 3:
        return False
    if s.startswith(("http", "wss:", "data:", "/_")):
        return False
    if SVG_RE.match(s.strip()):
        return False
    if NOISE.match(s.strip()):
        return False
    if re.match(r"^[A-Za-z0-9+/=_\-]{25,}$", s):
        return False
    if not COPY_RE.search(s):
        return False
    return True

copy_strings = []

def walk(obj):
    if isinstance(obj, dict):
        for v in obj.values():
            walk(v)
    elif isinstance(obj, list):
        for v in obj:
            walk(v)
    elif isinstance(obj, str) and is_copy(obj):
        copy_strings.append(obj)

walk(data)

# dedupe preserve order
seen = set()
unique_copy = []
for s in copy_strings:
    if s not in seen:
        seen.add(s)
        unique_copy.append(s)

def normalize(s):
    return s.replace("\\n", "\n").strip()

# Page anchors in order of appearance in unique list
pages = [s for s in unique_copy if s.startswith("#page-")]

# Links
links = []
def walk_links(obj):
    if isinstance(obj, dict):
        if obj.get("A?") == "K" or "url" in str(obj).lower():
            for k, v in obj.items():
                if isinstance(v, str) and ("http" in v or v.startswith("#")):
                    links.append(v)
        for v in obj.values():
            walk_links(v)
    elif isinstance(obj, list):
        for v in obj:
            walk_links(v)

walk_links(data)

# Also grep raw file for wa.me, whatsapp, prices outside strict filter
for pat in [r"wa\.me[^\s\\'\"]+", r"WhatsApp[^\u0027\"]{0,80}", r"\\u00e9", r"bootcamp", r"Bootcamp", r"FCFA", r"\d{1,2}\s*octobre"]:
    for m in re.finditer(pat, content, re.I):
        snippet = m.group(0)[:200]
        if snippet not in seen and len(snippet) > 4:
            seen.add(snippet)
            unique_copy.append(f"[raw-snippet] {snippet}")

out_lines = []
out_lines.append("# Canva copy extract\n")
out_lines.append("## Document title (HTML)\n")
if content.startswith("Copy"):
    out_lines.append(content.split("\n")[0].strip() + "\n")

out_lines.append("\n## Page anchors\n")
for p in pages:
    out_lines.append(f"- {p.strip()}\n")

out_lines.append("\n## All copy strings (normalized)\n")
for s in unique_copy:
    if s.startswith("#page-"):
        out_lines.append(f"\n### {s.strip()}\n")
        continue
    if s.startswith("[raw-snippet]"):
        out_lines.append(f"- {s}\n")
        continue
    n = normalize(s)
    if n == "" or n == "\n":
        continue
    out_lines.append(f"{n}\n\n")

out_lines.append("\n## URLs / anchors found in bootstrap\n")
for l in sorted(set(links)):
    out_lines.append(f"- {l}\n")

out_path = Path(r"C:\Users\Aroman EMESTHU\foundation-launchpad\.cursor_canva_copy_report.md")
out_path.write_text("".join(out_lines), encoding="utf-8")
print("Wrote", out_path, "strings:", len(unique_copy))
