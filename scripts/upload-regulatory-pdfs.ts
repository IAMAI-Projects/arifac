import { readFile, stat } from 'fs/promises'
import path from 'path'
import { getPayload } from 'payload'
import configPromise from '../src/payload.config'

/**
 * Uploads the 26 regulatory-update PDFs extracted from the client zip into the
 * CMS. Mapping keyed by `referenceNumber` (unique, stable across dev/prod).
 *
 * Usage:
 *   PDF_DIR=/Users/vk/tmp-pdfs pnpm tsx --env-file=.env scripts/upload-regulatory-pdfs.ts
 *
 * To target prod:
 *   DATABASE_URI="postgresql://...arifac-cms-prod..." AWS_REGION=ap-south-1 S3_BUCKET=arifac-cms-media \
 *   PDF_DIR=/Users/vk/tmp-pdfs pnpm tsx scripts/upload-regulatory-pdfs.ts
 */

const PDF_DIR = process.env.PDF_DIR || '/Users/vk/tmp-pdfs'

const mappings: { ref: string; file: string }[] = [
  // RBI KYC (10)
  { ref: 'DOR.AML.REC.No.88/14.01.002/2025-26', file: 'Reserve Bank of India (Commercial Banks – Know Your Customer) Directions.pdf' },
  { ref: 'DOR.AML.REC.No.119/14.01.007/2025-26', file: 'Reserve Bank of India (Small Finance Banks – Know Your Customer).pdf' },
  { ref: 'DOR.AML.REC.No.137/14.01.009/2025-26', file: 'Reserve Bank of India (Payments Banks – Know Your Customer).pdf' },
  { ref: 'DOR.AML.REC.No.162/14.01.008/2025-26', file: 'Reserve Bank of India (Local Area Banks – Know Your Customer) Directions.pdf' },
  { ref: 'DOR.AML.REC.No.210/14.01.006/2025-26', file: 'Reserve Bank of India (Urban Co-operative Banks – Know Your Customer).pdf' },
  { ref: 'DOR.AML.REC.No.235/14.01.005/2025-26', file: 'Reserve Bank of India (Rural Co-operative Banks – Know Your Customer).pdf' },
  { ref: 'DOR.AML.REC.No.254/14.01.011/2025-26', file: 'Reserve Bank of India (All India Financial Institutions – Know Your Customer).pdf' },
  { ref: 'DOR.AML.REC.No.280/14.01.003/2025-26', file: 'Reserve Bank of India (Non-Banking Financial Companies – Know Your.pdf' },
  { ref: 'DOR.AML.REC.No.296/14.01.010/2025-26', file: 'Reserve Bank of India (Asset Reconstruction Companies – Know Your.pdf' },
  { ref: 'DOR.AML.REC.No.185/14.01.004/2025-26', file: 'Reserve Bank of India (Regional Rural Banks – Know Your Customer).pdf' },
  // RBI Fraud / Cyber (6)
  { ref: 'DOS.CO.FMG.SEC.No.5/23.04.001/2024-25', file: 'Master Directions on Fraud Risk Management in Commercial Banks (including.pdf' },
  { ref: 'DOS.CO.FMG.SEC.No.6/23.04.001/2024-25', file: 'Master Directions on Fraud Risk Management in Urban Cooperative Banks.pdf' },
  { ref: 'DOS.CO.FMG.SEC.No.7/23.04.001/2024-25', file: 'Master Directions on Fraud Risk Management in Non-Banking Financial.pdf' },
  { ref: 'DBS.CO.CFMC.BC.No.1/23.04.001/2016-17', file: 'Master Directions on Frauds – Classification and Reporting by commercial.pdf' },
  { ref: 'DoS.CO.CSITEG/SEC.7/31.01.015/2023-24', file: 'Master Direction on Information Technology Governance, Risk, Controls and.pdf' },
  { ref: 'DBS.CO/CSITE/BC.11/33.01.001/2015-16', file: 'Cyber Security Framework in Banks.pdf' },
  // FIU-IND (2)
  { ref: 'F.No.9-8/2023/COMPL/FIUIND', file: 'AML & CFT Guidelines for Reporting Entities Providing Services Related to Virtual Digital Assets (VDAs).pdf' },
  { ref: 'FIUIND/DNFBP/2023', file: 'AML & CFT Guidelines for Reporting Entities – Designated Non-Financial Businesses and Professions (DNFBP).pdf' },
  // SEBI (6)
  { ref: 'SEBI/HO/MLSD/SEC5/P/CIR/2024/083', file: 'Guidelines on Anti-Money Laundering (AML) Standards and Combating the Financing of Terrorism (CFT) Obligations of Securities Market Intermediaries under the Prevention of Money Laundering Act, 2002 and Rules framed t.pdf' },
  { ref: 'SEBI/HO/MIRSD/SECFATF/P/CIR/2023/169', file: 'Master Circular on Know Your Client (KYC) norms for the securities market.pdf' },
  { ref: 'SEBI/HO/MIRSD/SEC-3/P/CIR/2024/088', file: 'Uploading of KYC information by KYC Registration Agencies (KRAs) to Central KYC Records Registry (CKYCRR).pdf' },
  { ref: 'NSE Circular ISC66053', file: 'Guidelines in pursuance of amendment to SEBI KYC (Know Your Client) Registration.pdf' },
  { ref: 'SEBI/HO/MIRSD/PODFATF/P/CIR/2025/62', file: 'Publishing Investor Charter for KYC (Know Your Client) Registration Agencies (KRAs) on their Websites..pdf' },
  { ref: 'SEBI/HO/ITD-1/ITD_CSC_EXT/P/CIR/2025/119', file: 'Technical Clarifications to Cybersecurity and Cyber Resilience Framework (CSCRF) for SEBI Regulated Entities (REs).pdf' },
  // IRDAI (2)
  { ref: 'IRDAI/SDD/GDL/AML/062/01/2022', file: 'एएमएल_सीएफटी संबंधी मास्टर दिशानिर्देश 2022 - कार्यान्वयन के लिए समय का विस्तार _ Master Guidelines on AML_CFT 2022 – extension of time for  Implementation.pdf' },
  { ref: 'IRDAI/IID/CIR/MISC/177/10/2023', file: 'धन-शोधन निवारण _ आतंकवाद के वित्तपोषण का मुकाबला करने संबंधी मास्टर दिशानिर्देशों का संशोधन _ Amendment to Master Guidelines on Anti-Money Laundering _ Counter Financing of Terrorism (AML_CFT) 2022.pdf' },
]

const slugify = (s: string) =>
  s
    .normalize('NFKD')
    .replace(/[^\x00-\x7F]/g, '')
    .replace(/\.pdf$/i, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()
    .slice(0, 80) + '.pdf'

async function main() {
  const payload = await getPayload({ config: configPromise })
  const resetMode = process.env.RESET === 'true'

  if (resetMode) {
    console.log('RESET=true: clearing pdf from all regulatory-updates and deleting all media')
    const all = await payload.find({ collection: 'regulatory-updates', limit: 1000, draft: true })
    for (const doc of all.docs) {
      if (doc.pdf) {
        await payload.update({ collection: 'regulatory-updates', id: doc.id, data: { pdf: null } as never })
      }
    }
    const media = await payload.find({ collection: 'media', limit: 1000 })
    for (const m of media.docs) {
      await payload.delete({ collection: 'media', id: m.id })
    }
    console.log(`Reset: cleared ${all.docs.length} update records, deleted ${media.docs.length} media`)
    process.exit(0)
  }

  for (const { ref, file } of mappings) {
    const absPath = path.join(PDF_DIR, file)
    let size = 0
    try {
      size = (await stat(absPath)).size
    } catch {
      console.error(`[skip] ref="${ref}" file missing: ${file}`)
      continue
    }
    const buffer = await readFile(absPath)

    const found = await payload.find({
      collection: 'regulatory-updates',
      where: { referenceNumber: { equals: ref } },
      limit: 10,
      draft: true,
    })
    if (found.docs.length === 0) {
      console.error(`[skip] ref="${ref}" no matching record`)
      continue
    }

    const cleanName = slugify(file)
    const media = await payload.create({
      collection: 'media',
      data: { alt: found.docs[0].title },
      file: { data: buffer, mimetype: 'application/pdf', name: cleanName, size },
    })

    for (const doc of found.docs) {
      if (doc.pdf && typeof doc.pdf === 'object' && doc.pdf.id === media.id) continue
      await payload.update({ collection: 'regulatory-updates', id: doc.id, data: { pdf: media.id } })
    }

    console.log(`[ok]   ref="${ref}" -> media=${media.id} applied to ${found.docs.length} record(s)`)
  }

  console.log('Done.')
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
