-- Update circular links on regulatory_updates from old site page source.
-- Matches rows by reference_number. Updates both the main row and the
-- latest-published version row (Payload keeps two tables when drafts are on).
--
-- Usage:
--   psql "$PROD_DATABASE_URI" -f scripts/update-circular-links.sql
--
-- Run the SELECT block first, confirm every (reference_number) has a match,
-- THEN uncomment and run the BEGIN...COMMIT block.

-- ──────────────────────────────────────────────────────────────
-- STEP 1: preview — which prod rows will be updated?
-- ──────────────────────────────────────────────────────────────
WITH incoming(reference_number, link) AS (
  VALUES
    ('DOR.AML.REC.No.88/14.01.002/2025-26',  'https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx'),
    ('DOR.AML.REC.No.119/14.01.007/2025-26', 'https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx'),
    ('DOR.AML.REC.No.137/14.01.009/2025-26', 'https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx'),
    ('DOR.AML.REC.No.162/14.01.008/2025-26', 'https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx'),
    ('DOR.AML.REC.No.210/14.01.006/2025-26', 'https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx'),
    ('DOR.AML.REC.No.235/14.01.005/2025-26', 'https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx'),
    ('DOR.AML.REC.No.254/14.01.011/2025-26', 'https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx'),
    ('DOR.AML.REC.No.280/14.01.003/2025-26', 'https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx'),
    ('DOR.AML.REC.No.296/14.01.010/2025-26', 'https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx'),
    ('DOR.AML.REC.No.185/14.01.004/2025-26', 'https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx'),
    ('DOS.CO.FMG.SEC.No.5/23.04.001/2024-25', 'https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx?id=12726'),
    ('DOS.CO.FMG.SEC.No.6/23.04.001/2024-25', 'https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx?id=12727'),
    ('DOS.CO.FMG.SEC.No.7/23.04.001/2024-25', 'https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx?id=12728'),
    ('DBS.CO.CFMC.BC.No.1/23.04.001/2016-17', 'https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx?id=10022'),
    ('DoS.CO.CSITEG/SEC.7/31.01.015/2023-24', 'https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx?id=12274'),
    ('DBS.CO/CSITE/BC.11/33.01.001/2015-16', 'https://rbidocs.rbi.org.in/rdocs/notification/PDFs/NT53126052016_F.pdf'),
    ('RBI/2023-24/95 | DoS.CO.CSITE.SEC.7/31.01.015/2023-24', 'https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx?id=12280'),
    ('RBI/2023-24/07 | DOR.STR.REC.5/21.04.048/2023-24', 'https://www.rbi.org.in/Scripts/BS_ViewMasCirculardetails.aspx?id=12299'),
    ('DOR.MRG.REC.93/00-00-007/2021-22', 'https://www.rbi.org.in/Scripts/NotificationUser.aspx'),
    ('F.No.9-8/2023/COMPL/FIUIND', 'https://fiuindia.gov.in/files/AMLCFT_Guidelines_for_VDA_SPs.pdf'),
    ('FIUIND/DNFBP/2023', 'https://fiuindia.gov.in/files/AML_CFT_Guidelines_DNFBP.pdf'),
    ('F.No. 9-8/2023/COMPL/FIUIND-Pt-II', 'https://fiuindia.gov.in/files/AMLCFT_Guidelines_for_VDA_SPs_Revised.pdf'),
    ('SEBI/HO/MLSD/SEC5/P/CIR/2024/083', 'https://www.sebi.gov.in/legal/circulars/jun-2024/master-circular-on-guidelines-on-anti-money-laundering-aml-standards-and-counter-financing-of-terrorism-cft-obligations-of-securities-market-intermediaries-under-the-prevention-of-money-laundering-act_83965.html'),
    ('SEBI/HO/MIRSD/SECFATF/P/CIR/2023/169', 'https://www.sebi.gov.in/legal/circulars/oct-2023/master-circular-on-know-your-client-kyc-norms-for-the-securities-market_77920.html'),
    ('SEBI/HO/MIRSD/SEC-3/P/CIR/2024/088', 'https://www.sebi.gov.in/legal/circulars/jun-2024/uploading-of-kyc-information-by-kyc-registration-agencies-kras-to-central-kyc-records-registry-ckycrr_84149.html'),
    ('NSE Circular ISC66053', 'https://nsearchives.nseindia.com/corporate/content/ISC66053_21012025110000.pdf'),
    ('SEBI/HO/MIRSD/PODFATF/P/CIR/2025/62', 'https://www.sebi.gov.in/legal/circulars/may-2025/publishing-investor-charter-for-kyc-registration-agencies-kras_88000.html'),
    ('SEBI/HO/ITD-1/ITD_CSC_EXT/P/CIR/2025/119', 'https://www.sebi.gov.in/legal/circulars/dec-2023/cyber-security-and-cyber-resilience-framework-for-sebi-registered-intermediaries_79246.html'),
    ('IRDAI/SDD/GDL/AML/062/01/2022', 'https://irdai.gov.in/document/37343/0/AML-CFT-Master-Guidelines.pdf'),
    ('IRDAI/IID/CIR/MISC/177/10/2023', 'https://irdai.gov.in/')
)
SELECT
  i.reference_number,
  r.id AS prod_id,
  r.link AS current_link,
  i.link AS new_link,
  CASE WHEN r.id IS NULL THEN 'NO MATCH' ELSE 'OK' END AS status
FROM incoming i
LEFT JOIN regulatory_updates r ON r.reference_number = i.reference_number
ORDER BY status DESC, i.reference_number;

-- ──────────────────────────────────────────────────────────────
-- STEP 2: apply updates (uncomment after verifying STEP 1)
-- ──────────────────────────────────────────────────────────────
-- BEGIN;
--
-- WITH incoming(reference_number, link) AS (
--   VALUES
--     -- (paste the same VALUES list from STEP 1 here)
-- )
-- UPDATE regulatory_updates r
-- SET link = i.link, updated_at = now()
-- FROM incoming i
-- WHERE r.reference_number = i.reference_number
--   AND r.link IS DISTINCT FROM i.link;
--
-- -- Keep the latest published version row in sync so the frontend
-- -- (which reads published versions) reflects the new link.
-- WITH incoming(reference_number, link) AS (
--   VALUES
--     -- (paste the same VALUES list here too)
-- )
-- UPDATE "_regulatory_updates_v" v
-- SET version_link = i.link, version_updated_at = now(), updated_at = now()
-- FROM incoming i, regulatory_updates r
-- WHERE r.reference_number = i.reference_number
--   AND v.parent_id = r.id
--   AND v.latest = true
--   AND v.version__status = 'published';
--
-- -- Sanity check: count rows that would still be out of sync.
-- SELECT count(*) AS rows_out_of_sync
-- FROM regulatory_updates r
-- JOIN "_regulatory_updates_v" v
--   ON v.parent_id = r.id AND v.latest = true AND v.version__status = 'published'
-- WHERE r.link IS DISTINCT FROM v.version_link;
--
-- COMMIT;
