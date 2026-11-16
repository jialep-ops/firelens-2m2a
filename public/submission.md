# FireLens: The Research Gallery
Team: 2M2A · Universal Event · NASA Space Apps 2026
Challenge: Flame in Freefall

## High-level project summary
FireLens combines an explorable pixel-art museum quest with a NASA combustion research desk. Users explore three collections in a connected fictional research gallery, collect NASA source cards, and follow questions into 646 real experimental-table test rows from seven NASA PSI investigations. The research desk filters tests, visualizes recorded measurements, ranks tests by explicitly selected conditions, and lets users inspect original cells and DOI references. Eleven curated source records provide research context. A server-side cited-AI explanation workflow is implemented; until its model credentials are configured, the deployed application clearly operates in evidence mode rather than claiming live AI.

## Detailed description
NASA combustion results span fuels, atmospheres, geometries, and experimental scales. FireLens makes the context visible through three fictional gallery mysteries, source records, real test tables, interactive scatter plots, condition matching, and evidence-linked brief exports. SPARK introduces one task at a time. Each wing asks visitors to inspect three exhibits, collect two distinct NASA sources, and review an interpretation and its unknowns before unlocking the next collection. The Flame Gallery, Cabin Observatory, and Atmosphere Garden connect through a glass walkway and central atrium. Click-to-walk paths, a following camera, map, keyboard/touch controls, and an accessible exhibit directory support exploration. A device-local journal saves progress and optional research questions, records inspected test-row IDs, and exports the evidence collected.

Data were downloaded directly from public NASA PSI investigation metadata and experimental CSV tables. The snapshot retains 646 test rows from BASS, BASS-II, FLEX, Saffire-I, Saffire-II, Saffire-III, and SAME-R. Nine non-test rows are excluded with reasons. Original CSVs, raw cells, file hashes, PSI versions, and DOI references are included. Only unambiguous numeric cells are normalized. No missing values are filled in. Approximate values, ranges, ambiguous units, and qualitative outcomes remain visible in their original cells.

Condition matching uses normalized Euclidean distance over user-selected numeric fields, with scales of 5 oxygen percentage points, 200 mmHg, and 2 mm droplet diameter. Rows missing a requested field are excluded. The scales are documented software choices, not validated physical or safety tolerances. Source-summary search uses text relevance. Neither ranking measures fire risk.

The optional AI route retrieves a bounded source pack, requests structured claims with source IDs, validates those IDs, and returns source links and limitations. Model credentials are not yet configured, so live AI generation remains pending. This must be updated only after successful activation and testing. Evidence mode remains functional without the model.

## NASA data and citations
- BASS-II, PSI-25, DOI 10.60555/4qc4-de67: https://psi.nasa.gov/physci/repo/data/investigations/PSI-25
- BASS, PSI-26, DOI 10.60555/58h4-dy80: https://psi.nasa.gov/physci/repo/data/investigations/PSI-26
- FLEX, PSI-69, DOI 10.60555/mbq8-0451: https://psi.nasa.gov/physci/repo/data/investigations/PSI-69
- Saffire-I, PSI-98, DOI 10.60555/0t15-1z43: https://psi.nasa.gov/physci/repo/data/investigations/PSI-98
- Saffire-II, PSI-99, DOI 10.60555/2chp-m469: https://psi.nasa.gov/physci/repo/data/investigations/PSI-99
- Saffire-III, PSI-100, DOI 10.60555/040q-4h36: https://psi.nasa.gov/physci/repo/data/investigations/PSI-100
- SAME-R, PSI-101, DOI 10.60555/2np7-jv14: https://psi.nasa.gov/physci/repo/data/investigations/PSI-101
- BASS report: https://ntrs.nasa.gov/citations/20140011099
- Saffire VI preliminary results: https://ntrs.nasa.gov/citations/20240002981
- Saffire overview and discrepancy cross-check: https://ntrs.nasa.gov/citations/20180005168
- NASA Science SoFIE and SoFIE-MIST investigation pages and the NASA Science cool-flame explainer, linked in the app source register.

## Data-quality example
PSI-99 lists 20 cm/s airflow for sample 2-6, while NTRS 20180005168 Table 1 lists 25 cm/s. FireLens preserves and flags the PSI entry. Blank material cells are not inferred from neighboring rows. SAME-R experimental-table conditions are not presented as detector-response measurements. No fan-display-to-airflow conversion is invented for BASS-II.

## AI and tool disclosure
ChatGPT assisted research, software development, data-pipeline implementation, visual design, tests, and drafting. Pixel graphics and the original pixel typeface are generated programmatically. The live model integration is implemented but unconfigured; existing source summaries and gallery interpretations are curated AI-assisted drafts requiring team review. No autonomous safety decision is made.

## Validation
Automated checks verify retained-row counts, source discrepancies, missing-data handling, FLEX aggregate counts, API input validation, citation-ID validation, and honest unconfigured behavior. Twelve automated tests cover the research pipeline/API and gallery routes, collision boundaries, and wing-gate order. Browser checks cover onboarding, source collection, field-note progression, wing unlocking, saved progress, raw-row inspection, plotting, condition matching, evidence answers, and navigation between the gallery and research desk. No expert scientific review or user study has been conducted. Live-model end-to-end testing remains pending credentials.

## Next steps
Activate and evaluate the cited model; obtain expert review; broaden PSI coverage; incorporate detector telemetry and uncertainty where available. The participant-supplied official Resources list explicitly includes PSI. The project uses seven PSI investigations, satisfying the listed-source match against the supplied brief. Team registration and overall Global Judging eligibility remain unverified.

## Suggested demo narration
“FireLens turns NASA combustion research into an evidence adventure. Explore a pixel-art gallery, follow SPARK’s quest, collect NASA sources, and follow them into real test data. Filter hundreds of NASA tests, inspect recorded measurements, and compare conditions with every source and limitation visible. Our cited-AI workflow is prepared, with its connection status shown honestly. Built by 2M2A, FireLens makes the science behind fire in space easier to investigate.”

## Before submitting
Review sources and AI-assisted summaries, confirm registered team eligibility, verify public access, activate/test AI if claiming it, update the disclosure to match deployment, and submit the final project and demo links through the team Project tab.

## Current requirement review
Read requirements-review.md and credits.md. The Universal Event GO Team requires at least two registered participants for Global Judging; membership has not been verified. The seven PSI source metadata and original CSV bytes are checked in data-audit.json. Live model activation remains incomplete. The participant supplied the official Resources list, confirming that PSI is a listed resource. The seven-panel demo is provided at demo.html; verify the current required demo format in the official submission guide/form. The website has not been submitted through NASA's Project tab.

## Final prepared materials
Copy-ready fields: submit.html and submission-ready.md. A seven-slide PDF and editable PowerPoint are available as FireLens-2M2A-Demo.pdf and FireLens-2M2A-Demo.pptx. Original code and original pixel assets are licensed under Apache 2.0; NASA PSI data retains CC0-1.0. The complete source ZIP includes LICENSE and NOTICE. Direct NASA account access was blocked in this browser session, so roster verification and final form submission require the team owner.
