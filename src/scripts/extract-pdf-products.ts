/**
 * Extract Products from PDF Script
 * 
 * This script helps extract product information from PDF files.
 * 
 * Note: This is a helper script. You may need to install PDF extraction libraries:
 * npm install pdf-parse
 * 
 * Usage:
 * pnpm extract-pdf-products
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Path to PDF file
const pdfPath = path.join(__dirname, '../../../Altair medical system Pendant. pdf.pdf')

async function extractPDFProducts() {
  try {
    console.log('📄 Extracting products from PDF...')
    console.log('')

    if (!fs.existsSync(pdfPath)) {
      console.error(`❌ PDF file not found at: ${pdfPath}`)
      console.log('   Please ensure the PDF file is in the root directory.')
      process.exit(1)
    }

    console.log('⚠️  Direct PDF extraction not available in this script.')
    console.log('')
    console.log('📝 Manual Extraction Steps:')
    console.log('   1. Open the PDF: "Altair medical system Pendant. pdf.pdf"')
    console.log('   2. For each product, extract:')
    console.log('      - Product Name/Title')
    console.log('      - Description')
    console.log('      - All Specifications (label: value pairs)')
    console.log('      - Key Features')
    console.log('   3. Update: altair/src/endpoints/seed/products.json')
    console.log('   4. Run: pnpm seed-products')
    console.log('')
    console.log('💡 Tip: Use the template in EXTRACT_PDF_PRODUCTS.md')
    console.log('')

    // Try to use pdf-parse if available
    try {
      // Use dynamic import for ESM compatibility
      const pdfParseModule = await import('pdf-parse')
      // pdf-parse exports the function - handle both default and named exports
      const pdfParse = (pdfParseModule as any).default || pdfParseModule
      if (typeof pdfParse !== 'function') {
        throw new Error('pdf-parse is not a function')
      }
      const dataBuffer = fs.readFileSync(pdfPath)
      const data = await pdfParse(dataBuffer)
      
      console.log('✅ PDF text extracted!')
      console.log('')
      console.log(`📊 Total pages: ${data.numpages}`)
      console.log(`📝 Total characters: ${data.text.length}`)
      console.log('')
      
      // Save full text to a file for analysis
      const outputPath = path.join(__dirname, '../endpoints/seed/pdf-extracted-text.txt')
      fs.writeFileSync(outputPath, data.text)
      console.log(`💾 Full text saved to: ${outputPath}`)
      console.log('')
      
      console.log('📋 Extracted Text (first 3000 characters):')
      console.log('─'.repeat(80))
      console.log(data.text.substring(0, 3000))
      console.log('─'.repeat(80))
      console.log('')
      console.log('💡 Use this text to populate products.json')
      console.log('   See EXTRACT_PDF_PRODUCTS.md for JSON structure')
      console.log('')
    } catch (error: any) {
      if (error.code === 'MODULE_NOT_FOUND') {
        console.log('💡 To enable automatic extraction, install pdf-parse:')
        console.log('   pnpm add -D pdf-parse')
        console.log('')
      } else {
        console.error('Error extracting PDF:', error.message)
        console.error(error.stack)
      }
    }

    process.exit(0)
  } catch (error: any) {
    console.error('❌ Error:')
    console.error(error.message)
    process.exit(1)
  }
}

extractPDFProducts()

