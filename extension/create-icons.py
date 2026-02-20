#!/usr/bin/env python3
"""
Simple icon generator using PIL/Pillow
Install: pip install Pillow
Run: python3 create-icons.py
"""

try:
    from PIL import Image, ImageDraw, ImageFont
    import os
except ImportError:
    print("Pillow is required. Install it with: pip install Pillow")
    exit(1)

def create_icon(size):
    """Create an icon with gradient background and 'AI' text"""
    # Create image with gradient background
    img = Image.new('RGB', (size, size), color='#667eea')
    draw = ImageDraw.Draw(img)
    
    # Draw gradient effect (simplified - solid color with rounded corners)
    # For a true gradient, we'd need more complex code, but this works well
    corner_radius = int(size * 0.15)
    
    # Draw rounded rectangle
    draw.rounded_rectangle(
        [(0, 0), (size, size)],
        radius=corner_radius,
        fill='#667eea'
    )
    
    # Add a darker shade for gradient effect
    draw.ellipse(
        [0, 0, size, size],
        fill='#764ba2',
        outline=None
    )
    
    # Draw rounded rectangle again to create gradient-like effect
    draw.rounded_rectangle(
        [(0, 0), (size, size)],
        radius=corner_radius,
        fill=None,
        outline='#667eea',
        width=1
    )
    
    # Try to use a font, fallback to default if not available
    try:
        font_size = int(size * 0.4)
        # Try to use a system font
        try:
            font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", font_size)
        except:
            try:
                font = ImageFont.truetype("arial.ttf", font_size)
            except:
                font = ImageFont.load_default()
    except:
        font = ImageFont.load_default()
    
    # Draw text
    text = "AI" if size >= 48 else "A"
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    position = ((size - text_width) // 2, (size - text_height) // 2 - bbox[1])
    draw.text(position, text, fill='white', font=font)
    
    return img

def main():
    # Create icons directory
    icons_dir = 'icons'
    os.makedirs(icons_dir, exist_ok=True)
    
    # Generate icons
    sizes = [16, 48, 128]
    for size in sizes:
        icon = create_icon(size)
        filename = f'{icons_dir}/icon{size}.png'
        icon.save(filename, 'PNG')
        print(f'✓ Created {filename}')
    
    print('\nAll icons generated successfully!')
    print(f'Icons saved in: {os.path.abspath(icons_dir)}/')

if __name__ == '__main__':
    main()
