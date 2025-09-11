from PIL import Image, ImageDraw
import math

# Create a 1200x630 image (optimal for Open Graph)
width, height = 1200, 630
img = Image.new('RGB', (width, height), color='#1F2937')
draw = ImageDraw.Draw(img)

# Center point
cx, cy = width // 2, height // 2

# Create the radial line pattern (butterfly/starburst effect)
num_lines = 48
max_length = 250

for i in range(num_lines):
    angle = (i / num_lines) * 2 * math.pi
    
    # Create varying lengths for butterfly wing effect
    # Top half gets longer lines, bottom half gets shorter
    if -math.pi/4 <= angle <= math.pi/4 or 3*math.pi/4 <= angle <= 5*math.pi/4:
        length_factor = 1.0  # Full length for top wings
    elif math.pi/4 <= angle <= 3*math.pi/4 or 5*math.pi/4 <= angle <= 7*math.pi/4:
        length_factor = 0.6  # Shorter for sides
    else:
        length_factor = 0.8  # Medium for diagonals
    
    length = max_length * length_factor
    
    # Calculate end points
    x1 = cx
    y1 = cy
    x2 = cx + length * math.cos(angle)
    y2 = cy + length * math.sin(angle)
    
    # Draw white lines with slight transparency for elegance
    draw.line([(x1, y1), (x2, y2)], fill=(255, 255, 255), width=2)

# Add a bright center point
draw.ellipse([cx-5, cy-5, cx+5, cy+5], fill='white')

# Save the image
img.save('C:/Users/Melwin/websies-website-2/public/og-logo.png', 'PNG')
print("Logo created successfully!")