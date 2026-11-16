# FireLens / Ready-to-paste submission fields

Prepared, not submitted. Review all fields against the live NASA form. AI connection and registered roster remain pending.

## Project name
FireLens: The Research Gallery

## Challenge
Flame in Freefall: SI-Powered Fire Safety Insights from Microgravity Combustion Data

## Team
2M2A

## High-level project summary
FireLens turns NASA microgravity combustion research into an interactive pixel-art gallery and research dashboard. Visitors collect source-linked evidence, then explore 646 test records from seven NASA PSI investigations. The dashboard compares experimental conditions, ranks relevant findings, and exposes original CSV cells and limitations. Its cited-AI workflow is implemented; the current public version uses curated evidence mode while the model connection awaits activation.

## Final project URL
https://firelens-2m2a.harmoniousfeast4.chatgpt.site/

## Project demonstration URL
https://firelens-2m2a.harmoniousfeast4.chatgpt.site/FireLens-2M2A-Demo.pdf

## Editable demonstration
https://firelens-2m2a.harmoniousfeast4.chatgpt.site/FireLens-2M2A-Demo.pptx

## Detailed project description
NASA combustion investigations span different fuels, oxygen concentrations, pressures, airflow conditions, and experimental scales. FireLens helps students and aerospace researchers find relevant evidence while keeping those differences visible.

The fictional research gallery introduces three questions about flame appearance, cabin signals, and changes in atmosphere. Visitors inspect exhibits, collect NASA source cards, and review interpretations with explicit unknowns. SPARK provides guidance, and a local journal saves the research trail.

The research desk contains 646 retained test rows from seven public NASA Physical Sciences Informatics investigations: BASS, BASS-II, FLEX, Saffire-I, Saffire-II, Saffire-III, and SAME-R. Eleven curated records provide research context. Users can filter tests, plot recorded measurements, inspect original CSV cells, compare source summaries, and download evidence.

BM25 text retrieval ranks source summaries by relevance. Numeric condition matching ranks tests using documented scales and excludes rows missing a selected field. Neither score measures fire risk. We preserve missing, qualitative, and ambiguous cells, flag source discrepancies, and compare original CSV hashes.

A server-side cited-AI explanation workflow is implemented but not yet connected to a model account. The deployed application explicitly uses evidence mode. Source-ID and numeric-token validation do not establish factual entailment. Live-model evaluation and expert scientific review remain future work.

The gallery is a creative entrance to the dashboard. It does not simulate fire, certify material safety, or provide operational procedures. The scope is combustion research relevant to habitable crew environments, rather than rockets or propellants.

## NASA data use
The official challenge Resources list supplied by the participant explicitly names PSI Data Repository: Combustion Science. FireLens downloads public PSI investigation metadata and experimental CSV tables directly. It retains 646 test records and excludes nine non-test rows with documented reasons. Exact original cells, DOI citations, source versions, original CSV files, and SHA-256 hashes are available. A fresh comparison confirmed all seven saved CSVs match NASA's downloaded bytes. No restricted files, agreements, raw detector telemetry, or combustion videos were ingested.

## AI and tool disclosure
ChatGPT assisted source research, software development, normalization, original pixel artwork and typefaces, tests, and drafting. The runtime assistant currently uses deterministic retrieval and curated summaries. VT ARC Chat Completions and OpenAI Responses API integrations are implemented but unconfigured. No active SI, trained predictive fire model, or autonomous safety decision is claimed. Node.js, Python, fontTools, and Sites supported development. Artifact Tool and ReportLab prepared the seven-slide demo. Original code and pixel assets use Apache 2.0. NASA PSI data retains CC0-1.0.

## Source code and licenses
https://firelens-2m2a.harmoniousfeast4.chatgpt.site/FireLens-source.zip
https://firelens-2m2a.harmoniousfeast4.chatgpt.site/LICENSE.txt
https://firelens-2m2a.harmoniousfeast4.chatgpt.site/NOTICE.txt
https://firelens-2m2a.harmoniousfeast4.chatgpt.site/credits.md

## Project originality and development
Original application code, pixel artwork, and original pixel fonts were created for this project with ChatGPT assistance. The team must personally verify the development window, membership, rights declarations, and final submission terms before submitting.

## Validation and limitations
16 automated tests pass. ARC request formatting and failure handling use simulated responses, with no live ARC model evaluation. Browser checks covered quest progression, source collection, saved notes, filtering, plots, source-row inspection, and pixel interface consistency. Seven live NASA CSV byte comparisons match. The live model is unconfigured and has not been evaluated. No expert scientific review or user study has been conducted.

## References
Saffire-III (PSI-100); DOI 10.60555/040q-4h36; https://psi.nasa.gov/physci/repo/data/investigations/PSI-100
SAME-R (PSI-101); DOI 10.60555/2np7-jv14; https://psi.nasa.gov/physci/repo/data/investigations/PSI-101
BASS-II (PSI-25); DOI 10.60555/4qc4-de67; https://psi.nasa.gov/physci/repo/data/investigations/PSI-25
BASS (PSI-26); DOI 10.60555/58h4-dy80; https://psi.nasa.gov/physci/repo/data/investigations/PSI-26
FLEX (PSI-69); DOI 10.60555/mbq8-0451; https://psi.nasa.gov/physci/repo/data/investigations/PSI-69
Saffire-I (PSI-98); DOI 10.60555/0t15-1z43; https://psi.nasa.gov/physci/repo/data/investigations/PSI-98
Saffire-II (PSI-99); DOI 10.60555/2chp-m469; https://psi.nasa.gov/physci/repo/data/investigations/PSI-99
BASS presentation: https://ntrs.nasa.gov/citations/20140011099
Saffire VI preliminary results: https://ntrs.nasa.gov/citations/20240002981
Saffire IV/V presentation: https://ntrs.nasa.gov/citations/20210017780
Saffire discrepancy comparison: https://ntrs.nasa.gov/citations/20180005168
SoFIE investigation: https://science.nasa.gov/biological-physical/investigations/sofie/
SoFIE-MIST investigation: https://science.nasa.gov/biological-physical/investigations/sofie-mist/
NASA cool-flame explainer: https://science.nasa.gov/biological-physical/resources/explainers-infographics/why-nasa-is-studying-flames-in-space/
Development font tool: https://github.com/fonttools/fonttools
VT ARC API documentation: https://docs.arc.vt.edu/ai/011_llm_api_arc_vt_edu.html
Project source and complete credits: https://firelens-2m2a.harmoniousfeast4.chatgpt.site/credits.md

