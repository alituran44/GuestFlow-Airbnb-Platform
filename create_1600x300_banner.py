import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance

# Canvas Dimensions (Exact 16:3 ratio for Lemon Squeezy Store)
WIDTH = 1600
HEIGHT = 300

# File Paths
brain_dir = r"C:\Users\Hp\.gemini\antigravity\brain\5ac270d6-24d4-4279-9ea5-6fb6577ac917"
banner_bg_path = os.path.join(brain_dir, "hostifyos_logo_banner_1787492102027.jpg")
logo_path = r"c:\Users\Hp\Desktop\Antigravity Proje\Airbnb\brand_logo.jpg"
output_desktop = r"C:\Users\Hp\Desktop\HostifyOS\hostifyos_store_banner_1600x300.jpg"
output_project = r"c:\Users\Hp\Desktop\Antigravity Proje\Airbnb\hostifyos_store_banner_1600x300.jpg"

# 1. Load Background Image & Center-Crop to 1600x300
if os.path.exists(banner_bg_path):
    bg = Image.open(banner_bg_path).convert("RGBA")
    
    # Calculate aspect ratio cropping for 1600:300
    target_ratio = WIDTH / HEIGHT
    orig_w, orig_h = bg.size
    orig_ratio = orig_w / orig_h
    
    if orig_ratio > target_ratio:
        # Image is wider -> crop sides
        new_w = int(orig_h * target_ratio)
        left = (orig_w - new_w) // 2
        bg = bg.crop((left, 0, left + new_w, orig_h))
    else:
        # Image is taller -> crop top/bottom around center
        new_h = int(orig_w / target_ratio)
        top = (orig_h - new_h) // 2
        bg = bg.crop((0, top, orig_w, top + new_h))
        
    canvas = bg.resize((WIDTH, HEIGHT), Image.Resampling.LANCZOS)
else:
    canvas = Image.new("RGBA", (WIDTH, HEIGHT), (9, 13, 20, 255))

# 2. Add Dark Gradient Overlay to guarantee readability & contrast
overlay = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
draw = ImageDraw.Draw(overlay)

# Left dark gradient for logo and text readability
for x in range(WIDTH):
    alpha = int(220 * (1 - (x / WIDTH) ** 0.6))
    if alpha < 40: alpha = 40
    draw.line([(x, 0), (x, HEIGHT)], fill=(9, 13, 20, alpha))

canvas = Image.alpha_composite(canvas, overlay)

# 3. Process & Paste Official Brand Logo (brand_logo.jpg)
if os.path.exists(logo_path):
    logo = Image.open(logo_path).convert("RGBA")
    logo_size = 180
    logo = logo.resize((logo_size, logo_size), Image.Resampling.LANCZOS)
    
    # Rounded mask for logo
    mask = Image.new("L", (logo_size, logo_size), 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.rounded_rectangle((0, 0, logo_size, logo_size), radius=36, fill=255)
    
    # Outer Glow / Border for logo
    border_size = logo_size + 12
    logo_border = Image.new("RGBA", (border_size, border_size), (0, 0, 0, 0))
    b_draw = ImageDraw.Draw(logo_border)
    b_draw.rounded_rectangle((0, 0, border_size, border_size), radius=42, fill=(16, 185, 129, 100), outline=(16, 185, 129, 255), width=3)
    
    logo_x = 80
    logo_y = (HEIGHT - logo_size) // 2
    
    canvas.paste(logo_border, (logo_x - 6, logo_y - 6), logo_border)
    canvas.paste(logo, (logo_x, logo_y), mask)

# 4. Add Professional Typography
draw_final = ImageDraw.Draw(canvas)

# Fonts setup (using default or truetype if available)
try:
    font_title = ImageFont.truetype("arial.ttf", 68)
    font_sub = ImageFont.truetype("arial.ttf", 26)
    font_badge = ImageFont.truetype("arial.ttf", 20)
except:
    font_title = ImageFont.load_default()
    font_sub = ImageFont.load_default()
    font_badge = ImageFont.load_default()

text_x = 300
title_y = 65
sub_y = 148
badge_y = 205

# Draw Title "HostifyOS"
draw_final.text((text_x, title_y), "HostifyOS", font=font_title, fill=(255, 255, 255, 255))

# Draw Subtitle "The Modern Hosting OS for Airbnb & Boutique Hotels"
draw_final.text((text_x, sub_y), "The Modern Hosting OS for Airbnb & Boutique Hotels", font=font_sub, fill=(16, 185, 129, 255))

# Draw Badges Strip
badges_text = "✓ 0% Platform Commission  •  ✓ 1-Tap PWA Access  •  ✓ Instant 14-Day Free Trial"
draw_final.text((text_x, badge_y), badges_text, font=font_badge, fill=(203, 213, 225, 255))

# Right side Official Store Badge
right_text = "OFFICIAL STORE #456562"
draw_final.rectangle([(WIDTH - 320, 30), (WIDTH - 50, 70)], outline=(16, 185, 129, 180), fill=(16, 185, 129, 30), width=2)
draw_final.text((WIDTH - 300, 40), right_text, font=font_badge, fill=(16, 185, 129, 255))

# Convert to RGB and Save
final_img = canvas.convert("RGB")
os.makedirs(os.path.dirname(output_desktop), exist_ok=True)
final_img.save(output_desktop, "JPEG", quality=98)
final_img.save(output_project, "JPEG", quality=98)

print(f"✅ Successfully created EXACT 1600x300 (16:3) Lemon Squeezy Store Banner!")
print(f"Saved to: {output_desktop}")
