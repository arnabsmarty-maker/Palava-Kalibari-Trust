import os
import re

dist_dir = 'dist'
assets_dir = os.path.join(dist_dir, 'assets')

# Find JS and CSS files
js_file = None
css_file = None

for file in os.listdir(assets_dir):
    if file.endswith('.js'):
        js_file = os.path.join(assets_dir, file)
    elif file.endswith('.css'):
        css_file = os.path.join(assets_dir, file)

if not js_file or not css_file:
    print("Error: JS or CSS file not found in dist/assets")
    exit(1)

with open(os.path.join(dist_dir, 'index.html'), 'r') as f:
    html_content = f.read()

with open(js_file, 'r') as f:
    js_content = f.read()

with open(css_file, 'r') as f:
    css_content = f.read()

# Make paths relative to allow opening directly via file:// or relative paths
# Replace absolute image and video paths in the javascript code, e.g. "/pkt-logo" -> "./pkt-logo"
# Match: "/something.extension" or '/something.extension'
pattern = r'([\'"])/([a-zA-Z0-9_\-\/]+\.(jpg|jpeg|png|gif|mp4|webp|svg))([\'"])'
js_content = re.sub(pattern, r'\1.\/\2\4', js_content)

# Replace script tag and stylesheet link using safe string.replace
script_match = re.search(r'<script[^>]*crossorigin[^>]*src="[^"]+"[^>]*></script>', html_content)
if script_match:
    html_content = html_content.replace(script_match.group(0), f'<script type="module">{js_content}</script>')

link_match = re.search(r'<link[^>]*rel="stylesheet"[^>]*href="[^"]+"[^>]*>', html_content)
if link_match:
    html_content = html_content.replace(link_match.group(0), f'<style>{css_content}</style>')

# Also fix base root path references if any in html
html_content = html_content.replace('href="/', 'href="./').replace('src="/', 'src="./')

output_path = 'shareable.html'
with open(output_path, 'w') as f:
    f.write(html_content)

print(f"SUCCESS: Generated single shareable HTML file at '{output_path}'")
