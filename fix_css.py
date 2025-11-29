
import os

style_path = r'd:\MY CODES\gadget-2\gadget360\style.css'
anim_path = r'd:\MY CODES\gadget-2\gadget360\src\animations_clean.css'

with open(style_path, 'rb') as f:
    content = f.read()

# Split lines
lines = content.splitlines(keepends=True)

# Keep lines up to 1833 (inclusive, which is the closing brace of media query)
# Line 1833 in 0-indexed is 1832.
# Let's verify line 1832 is '}'
if b'}' in lines[1832]:
    print("Found closing brace at line 1833")
    valid_lines = lines[:1833]
else:
    print("Warning: Line 1833 does not contain closing brace. Checking surrounding lines.")
    for i in range(1830, 1835):
        print(f"{i+1}: {lines[i]}")
    valid_lines = lines[:1833] # Default fallback

with open(anim_path, 'rb') as f:
    new_css = f.read()

with open(style_path, 'wb') as f:
    f.writelines(valid_lines)
    f.write(b'\n') # Ensure newline
    f.write(new_css)

print("Fixed style.css")
