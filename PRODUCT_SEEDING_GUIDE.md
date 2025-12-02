# Product Seeding Guide

## Overview
This guide helps you extract product data from the PDF and seed it into the database.

## Step 1: Extract Data from PDF

The PDF "Altair medical system Pendant. pdf.pdf" contains product information. You need to extract:

1. **Product Name/Title**
2. **Product Description**
3. **Technical Specifications** (specs with label and value)
4. **Key Features**
5. **Category** (should be one of: `surgical-pendant`, `modular-operation-theatre`, `bed-head-unit`, `medical-gas-manifold`, `medical-gas-pipeline`, `accessories`)

## Step 2: Update products.json

Edit `altair/src/endpoints/seed/products.json` and add all products from the PDF.

### JSON Structure

```json
{
  "title": "Product Name",
  "slug": "product-name-slug",
  "category": "surgical-pendant",
  "description": {
    "root": {
      "children": [
        {
          "children": [
            {
              "detail": 0,
              "format": 0,
              "mode": "normal",
              "style": "",
              "text": "Product description text here...",
              "type": "text",
              "version": 1
            }
          ],
          "direction": "ltr",
          "format": "",
          "indent": 0,
          "type": "paragraph",
          "version": 1
        }
      ],
      "direction": "ltr",
      "format": "",
      "indent": 0,
      "type": "root",
      "version": 1
    }
  },
  "specs": [
    {
      "label": "Specification Label",
      "value": "Specification Value"
    }
  ],
  "keyFeatures": [
    {
      "feature": "Feature description"
    }
  ],
  "featured": false,
  "meta": {
    "title": "Product Name | Altair Medical System",
    "description": "SEO description for search engines"
  }
}
```

### Required Fields

- ✅ `title` - Product name
- ✅ `slug` - URL-friendly version (lowercase, hyphens)
- ✅ `category` - Must match one of the category values
- ✅ `description` - RichText format (use the template above)
- ✅ `specs` - Array of {label, value} objects
- ✅ `keyFeatures` - Array of {feature} objects
- ✅ `featured` - Boolean (true/false)
- ✅ `meta.title` - SEO title
- ✅ `meta.description` - SEO description

### Optional Fields (can be added later in admin)

- `image` - Will be added via admin panel
- `images` - Gallery images (added via admin panel)
- `datasheet` - PDF file (uploaded via admin panel)

## Step 3: Upload Product Images

Before seeding, upload product images to the Media collection:

1. Go to Admin Panel → Media
2. Upload product images
3. Note the image IDs (or use placeholder for now)

## Step 4: Run Seed Script

```bash
cd altair
pnpm seed-products
```

The script will:
- Read products from `src/endpoints/seed/products.json`
- Create products in the database
- Skip products that already exist (by slug)
- Set all products to "published" status

## Step 5: Complete Product Setup in Admin Panel

After seeding, go to Admin Panel → Products and:

1. **Add Product Images:**
   - Click on each product
   - Upload main product image
   - Add gallery images if available

2. **Upload Datasheet:**
   - Upload the PDF datasheet to Media collection first
   - Then link it to the product

3. **Review and Edit:**
   - Verify all fields are correct
   - Update descriptions if needed
   - Add any missing specifications
   - Adjust featured status

## Category Values

Use these exact values for `category`:

- `modular-operation-theatre`
- `surgical-pendant`
- `bed-head-unit`
- `medical-gas-manifold`
- `medical-gas-pipeline`
- `accessories`

## Example: Extracting from PDF

If the PDF contains:

```
SURGICAL PENDANT - SINGLE ARM

Description:
Advanced surgical pendant designed for operation theatres...

Specifications:
- Arm Type: Single Arm
- Gas Outlets: Oxygen, Nitrous Oxide, Medical Air, Vacuum
- Load Capacity: 50 kg
- Standards: HTM-02-01, ASTM, CE Certified

Features:
- Touchless sensor operation
- Seamless panel construction
- Premium LED lighting
```

Convert to JSON:

```json
{
  "title": "Surgical Pendant - Single Arm",
  "slug": "surgical-pendant-single-arm",
  "category": "surgical-pendant",
  "description": {
    "root": {
      "children": [
        {
          "children": [
            {
              "detail": 0,
              "format": 0,
              "mode": "normal",
              "style": "",
              "text": "Advanced surgical pendant designed for operation theatres...",
              "type": "text",
              "version": 1
            }
          ],
          "direction": "ltr",
          "format": "",
          "indent": 0,
          "type": "paragraph",
          "version": 1
        }
      ],
      "direction": "ltr",
      "format": "",
      "indent": 0,
      "type": "root",
      "version": 1
    }
  },
  "specs": [
    {"label": "Arm Type", "value": "Single Arm"},
    {"label": "Gas Outlets", "value": "Oxygen, Nitrous Oxide, Medical Air, Vacuum"},
    {"label": "Load Capacity", "value": "50 kg"},
    {"label": "Standards", "value": "HTM-02-01, ASTM, CE Certified"}
  ],
  "keyFeatures": [
    {"feature": "Touchless sensor operation"},
    {"feature": "Seamless panel construction"},
    {"feature": "Premium LED lighting"}
  ],
  "featured": true,
  "meta": {
    "title": "Surgical Pendant - Single Arm | Altair Medical System",
    "description": "Advanced surgical pendant designed for operation theatres. HTM-02-01 compliant."
  }
}
```

## Troubleshooting

### Error: "Product with slug already exists"
- The product is already in the database
- Edit it directly in the admin panel instead

### Error: "Category not found"
- Check that category value matches exactly one of the allowed values
- Use lowercase with hyphens

### Missing Images
- Products will be created without images
- Add images later via admin panel
- Or upload a placeholder image first to Media collection

## Next Steps

After seeding:
1. ✅ All products are in the database
2. ✅ All required fields are filled
3. ⏳ Add images via admin panel
4. ⏳ Upload datasheets via admin panel
5. ⏳ Review and finalize content

