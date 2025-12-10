/**
 * Performance Audit Script
 * 
 * Runs Lighthouse audits on key pages and generates a performance report.
 * 
 * Usage:
 * pnpm performance-audit
 * 
 * Requirements:
 * - Lighthouse CLI: npm install -g lighthouse
 * - Or use: npx lighthouse
 */

import { exec } from 'child_process'
import { promisify } from 'util'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const execAsync = promisify(exec)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

const pagesToAudit = [
  { name: 'Homepage', path: '/' },
  { name: 'Products Listing', path: '/products' },
  { name: 'Projects Listing', path: '/projects' },
  { name: 'Events Listing', path: '/events' },
  { name: 'Blog Listing', path: '/blog' },
  { name: 'Contact', path: '/contact' },
  { name: 'About', path: '/about' },
]

interface AuditResult {
  page: string
  url: string
  performance: number
  accessibility: number
  bestPractices: number
  seo: number
  fcp?: number
  lcp?: number
  tti?: number
  cls?: number
  errors?: string[]
}

async function runLighthouseAudit(url: string, name: string): Promise<AuditResult> {
  try {
    console.log(`\n🔍 Auditing: ${name} (${url})`)
    
    // Check if lighthouse is available
    try {
      await execAsync('lighthouse --version')
    } catch {
      // Try with npx
      try {
        await execAsync('npx lighthouse --version')
      } catch {
        throw new Error('Lighthouse not found. Install with: npm install -g lighthouse')
      }
    }

    const outputPath = path.join(__dirname, '../../.lighthouse-audit.json')
    const lighthouseCmd = `lighthouse "${BASE_URL}${url}" --output=json --output-path="${outputPath}" --chrome-flags="--headless --no-sandbox" --quiet`
    
    await execAsync(lighthouseCmd, { maxBuffer: 10 * 1024 * 1024 })
    
    // Read results
    const results = JSON.parse(fs.readFileSync(outputPath, 'utf-8'))
    
    const scores = results.categories
    const metrics = results.audits
    
    const result: AuditResult = {
      page: name,
      url: url,
      performance: Math.round(scores.performance?.score * 100 || 0),
      accessibility: Math.round(scores.accessibility?.score * 100 || 0),
      bestPractices: Math.round(scores['best-practices']?.score * 100 || 0),
      seo: Math.round(scores.seo?.score * 100 || 0),
      fcp: metrics['first-contentful-paint']?.numericValue,
      lcp: metrics['largest-contentful-paint']?.numericValue,
      tti: metrics['interactive']?.numericValue,
      cls: metrics['cumulative-layout-shift']?.numericValue,
    }
    
    // Clean up
    if (fs.existsSync(outputPath)) {
      fs.unlinkSync(outputPath)
    }
    
    return result
  } catch (error: any) {
    console.error(`   ❌ Error auditing ${name}: ${error.message}`)
    return {
      page: name,
      url: url,
      performance: 0,
      accessibility: 0,
      bestPractices: 0,
      seo: 0,
      errors: [error.message],
    }
  }
}

async function generateReport(results: AuditResult[]) {
  const reportPath = path.join(__dirname, '../../PERFORMANCE_AUDIT_REPORT.md')
  
  let report = '# Performance Audit Report\n\n'
  report += `**Generated:** ${new Date().toISOString()}\n`
  report += `**Base URL:** ${BASE_URL}\n\n`
  report += '---\n\n'
  
  // Summary
  report += '## Summary\n\n'
  const avgPerformance = results.reduce((sum, r) => sum + r.performance, 0) / results.length
  const avgAccessibility = results.reduce((sum, r) => sum + r.accessibility, 0) / results.length
  const avgBestPractices = results.reduce((sum, r) => sum + r.bestPractices, 0) / results.length
  const avgSEO = results.reduce((sum, r) => sum + r.seo, 0) / results.length
  
  report += `| Metric | Average Score |\n`
  report += `|--------|---------------|\n`
  report += `| Performance | ${Math.round(avgPerformance)}/100 |\n`
  report += `| Accessibility | ${Math.round(avgAccessibility)}/100 |\n`
  report += `| Best Practices | ${Math.round(avgBestPractices)}/100 |\n`
  report += `| SEO | ${Math.round(avgSEO)}/100 |\n\n`
  
  // Detailed Results
  report += '## Detailed Results\n\n'
  report += '| Page | Performance | Accessibility | Best Practices | SEO | FCP | LCP | TTI | CLS |\n'
  report += '|------|-------------|--------------|----------------|-----|-----|-----|-----|-----|\n'
  
  for (const result of results) {
    const fcp = result.fcp ? `${(result.fcp / 1000).toFixed(2)}s` : 'N/A'
    const lcp = result.lcp ? `${(result.lcp / 1000).toFixed(2)}s` : 'N/A'
    const tti = result.tti ? `${(result.tti / 1000).toFixed(2)}s` : 'N/A'
    const cls = result.cls ? result.cls.toFixed(3) : 'N/A'
    
    report += `| ${result.page} | ${result.performance} | ${result.accessibility} | ${result.bestPractices} | ${result.seo} | ${fcp} | ${lcp} | ${tti} | ${cls} |\n`
  }
  
  // Recommendations
  report += '\n## Recommendations\n\n'
  
  const lowPerformance = results.filter(r => r.performance < 90)
  if (lowPerformance.length > 0) {
    report += '### Performance Issues\n'
    report += `- ${lowPerformance.length} page(s) have performance scores below 90:\n`
    lowPerformance.forEach(r => {
      report += `  - ${r.page}: ${r.performance}/100\n`
    })
    report += '\n'
  }
  
  const lowAccessibility = results.filter(r => r.accessibility < 90)
  if (lowAccessibility.length > 0) {
    report += '### Accessibility Issues\n'
    report += `- ${lowAccessibility.length} page(s) have accessibility scores below 90:\n`
    lowAccessibility.forEach(r => {
      report += `  - ${r.page}: ${r.accessibility}/100\n`
    })
    report += '\n'
  }
  
  // Write report
  fs.writeFileSync(reportPath, report)
  console.log(`\n✅ Performance report saved to: ${reportPath}`)
}

async function performanceAudit() {
  try {
    console.log('🚀 Starting Performance Audit...')
    console.log(`📍 Base URL: ${BASE_URL}`)
    console.log(`📄 Pages to audit: ${pagesToAudit.length}`)
    
    // Check if server is running
    try {
      const response = await fetch(`${BASE_URL}`)
      if (!response.ok) {
        throw new Error(`Server not responding: ${response.status}`)
      }
    } catch (error: any) {
      console.error(`\n❌ Cannot connect to ${BASE_URL}`)
      console.error('   Please make sure the dev server is running: pnpm dev')
      process.exit(1)
    }
    
    const results: AuditResult[] = []
    
    for (const page of pagesToAudit) {
      const result = await runLighthouseAudit(page.path, page.name)
      results.push(result)
      
      // Display quick summary
      console.log(`   ✅ Performance: ${result.performance}/100`)
      console.log(`   ✅ Accessibility: ${result.accessibility}/100`)
      console.log(`   ✅ Best Practices: ${result.bestPractices}/100`)
      console.log(`   ✅ SEO: ${result.seo}/100`)
    }
    
    // Generate report
    await generateReport(results)
    
    // Summary
    console.log('\n📊 Audit Summary:')
    const avgPerf = results.reduce((sum, r) => sum + r.performance, 0) / results.length
    const avgA11y = results.reduce((sum, r) => sum + r.accessibility, 0) / results.length
    console.log(`   Average Performance: ${Math.round(avgPerf)}/100`)
    console.log(`   Average Accessibility: ${Math.round(avgA11y)}/100`)
    console.log('\n✅ Performance audit completed!')
    console.log('   See PERFORMANCE_AUDIT_REPORT.md for detailed results.')
    
    process.exit(0)
  } catch (error: any) {
    console.error('\n❌ Error running performance audit:')
    console.error(error.message)
    process.exit(1)
  }
}

performanceAudit()




