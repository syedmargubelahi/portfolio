# -*- coding: utf-8 -*-
import sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter

portrait, out = sys.argv[1], sys.argv[2]
W, H = 1200, 630
night = (14, 18, 32)
img = Image.new('RGB', (W, H), night)

# Ember glow behind the portrait
glow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
g = ImageDraw.Draw(glow)
g.ellipse((700, -120, 1320, 560), fill=(242, 98, 26, 150))
glow = glow.filter(ImageFilter.GaussianBlur(110))
img.paste(glow, (0, 0), glow)

# Portrait in a rounded frame
p = Image.open(portrait).convert('RGB')
pw, ph = 400, 500
scale = max(pw / p.width, ph / p.height)
p = p.resize((round(p.width * scale), round(p.height * scale)), Image.Resampling.LANCZOS)
left = (p.width - pw) // 2
p = p.crop((left, 0, left + pw, ph))
mask = Image.new('L', (pw, ph), 0)
ImageDraw.Draw(mask).rounded_rectangle((0, 0, pw, ph), radius=36, fill=255)
img.paste(p, (740, 65), mask)

d = ImageDraw.Draw(img)
F = 'C:/Windows/Fonts/'
bold = lambda s: ImageFont.truetype(F + 'segoeuib.ttf', s)
reg = lambda s: ImageFont.truetype(F + 'segoeui.ttf', s)
d.text((70, 110), 'Syed Margub', font=bold(78), fill=(248, 245, 239))
d.text((70, 198), 'Elahi', font=bold(78), fill=(255, 138, 61))
y = 330
for word, rest in [('Editor’s', ' eye.'), ('Economist’s', ' mind.'), ('Builder’s', ' drive.')]:
    d.text((70, y), word, font=bold(38), fill=(255, 138, 61))
    w = d.textlength(word, font=bold(38))
    d.text((70 + w, y), rest, font=bold(38), fill=(248, 245, 239))
    y += 52
d.text((70, 508), 'Portfolio', font=bold(24), fill=(255, 178, 122))
img.save(out, optimize=True)
print('saved', img.size)
