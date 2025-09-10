import re

# Read the file
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract sections using regex
sections = {}
section_pattern = r'(<section id="([^"]+)".*?</section>)'

# Find all sections
matches = list(re.finditer(section_pattern, content, re.DOTALL))

# Store each section with its ID
for match in matches:
    section_html = match.group(1)
    section_id = match.group(2)
    sections[section_id] = section_html

# Get the content before first section and after last section
before_sections = content[:matches[0].start()]
after_sections = content[matches[-1].end():]

# Define the new order
new_order = [
    'hero',          # 1. Hero (stays)
    'benefits',      # 2. Benefits (stays)
    'process',       # 3. Process (moved from 8th)
    'who-its-for',   # 4. Who Its For (stays)
    'testimonials',  # 5. Testimonials (moved from 7th)
    'comparison',    # 6. Comparison (stays)
    'pricing',       # 7. Pricing (stays)
    'faq',           # 8. FAQ (stays)
    'referral',      # 9. Referral (moved from 3rd)
    'contact',       # 10. Contact (new)
    'final-cta'      # 11. Final CTA (stays)
]

# Build the new content
new_content = before_sections

for section_id in new_order:
    if section_id in sections:
        new_content += sections[section_id] + '\n\n'
    else:
        print(f"Warning: Section '{section_id}' not found!")

new_content += after_sections

# Write the reordered content
with open('index_reordered.html', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Sections have been reordered successfully!")
print(f"New file created: index_reordered.html")
print("\nNew section order:")
for i, section_id in enumerate(new_order, 1):
    print(f"{i}. {section_id}")