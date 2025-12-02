# Extract Products from PDF Guide

## Quick Steps

1. **Open the PDF**: `Altair medical system Pendant. pdf.pdf`
2. **Extract product information** for each product:
   - Product Name/Title
   - Description
   - Specifications (with labels and values)
   - Key Features
3. **Update** `altair/src/endpoints/seed/products.json` with the extracted data
4. **Run** `pnpm seed-products` to seed the database

## JSON Template for Each Product

Copy this template for each product in the PDF:

```json
{
  "title": "Product Name from PDF",
  "slug": "product-name-slug-lowercase-with-hyphens",
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
              "text": "Product description text from PDF...",
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
      "label": "Specification Name",
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

## Category Values

Use exactly one of these:
- `surgical-pendant`
- `modular-operation-theatre`
- `bed-head-unit`
- `medical-gas-manifold`
- `medical-gas-pipeline`
- `accessories`

## Example: Converting PDF Text to JSON

**From PDF:**
```
SURGICAL PENDANT MODEL SP-55200H

Specifications:
- Max Load: 150 kg / 330 lbs
- Dimensions: 235 x 140 x 300 mm
- Weight: 7.4 kg
- Batteries: 2 x 12V, 2.3Ah
- Emergency Lowering: Electronic and mechanical
- Lifting Speed: 1.8 m/min (loaded), 3.0 m/min (unloaded)
- Lifting Height: 2120 mm

Features:
- Touchless operation
- Premium LED lighting
- Medical gas integration
```

**To JSON:**
```json
{
  "title": "Surgical Pendant Model SP-55200H",
  "slug": "surgical-pendant-sp-55200h",
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
              "text": "Advanced surgical pendant model SP-55200H with maximum load capacity of 150 kg. Features electronic and mechanical emergency lowering, premium LED lighting, and comprehensive medical gas integration.",
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
    {"label": "Model", "value": "SP-55200H"},
    {"label": "Max Load", "value": "150 kg / 330 lbs"},
    {"label": "Dimensions", "value": "235 x 140 x 300 mm"},
    {"label": "Weight", "value": "7.4 kg"},
    {"label": "Batteries", "value": "2 x 12V, 2.3Ah"},
    {"label": "Emergency Lowering", "value": "Electronic and mechanical"},
    {"label": "Lifting Speed (Loaded)", "value": "1.8 m/min"},
    {"label": "Lifting Speed (Unloaded)", "value": "3.0 m/min"},
    {"label": "Lifting Height", "value": "2120 mm"}
  ],
  "keyFeatures": [
    {"feature": "Touchless operation"},
    {"feature": "Premium LED lighting"},
    {"feature": "Medical gas integration"},
    {"feature": "Electronic and mechanical emergency lowering"},
    {"feature": "High load capacity (150 kg)"}
  ],
  "featured": true,
  "meta": {
    "title": "Surgical Pendant Model SP-55200H | Altair Medical System",
    "description": "Advanced surgical pendant model SP-55200H with 150 kg load capacity. Features emergency lowering, premium LED lighting, and medical gas integration."
  }
}
```

## After Updating JSON

1. **Save** `products.json`
2. **Run**: `cd altair && pnpm seed-products`
3. **Check Admin Panel** → Products to verify
4. **Add images** via admin panel
5. **Upload datasheet PDFs** via admin panel

