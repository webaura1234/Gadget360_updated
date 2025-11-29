
import os

style_path = r'd:\MY CODES\gadget-2\gadget360\style.css'
profile_css_path = r'd:\MY CODES\gadget-2\gadget360\profile_styles.css'

with open(style_path, 'ab') as f:
    f.write(b'\n')
    with open(profile_css_path, 'rb') as p:
        f.write(p.read())

print("Appended profile styles to style.css")
