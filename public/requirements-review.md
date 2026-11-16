# FireLens: requirement and resource review
Reviewed November 16, 2026 · Team 2M2A · Flame in Freefall · Universal Event

The pixel-gallery update is implemented. This review is not a claim that all challenge requirements or Global Judging eligibility are satisfied.

| Requirement or submission item | Status | Evidence / remaining action |
|---|---|---|
| Interactive web dashboard | Implemented | Gallery, source search, source comparison, condition matching, measured-data plots, original-row inspection, and exports. |
| Summarize, rank, and interpret combustion findings | Implemented at prototype scope | Eleven curated summaries, BM25 relevance ranking, condition-distance ranking, interpretation plus explicit limitations. No ranking measures fire risk. |
| SI/AI-powered capability | Incomplete | VT ARC Chat Completions and OpenAI Responses routes exist and pass simulated-provider checks, but live model credentials are unconfigured. The deployed assistant currently uses deterministic evidence retrieval and curated summaries. It must not be described as active SI or live generative AI. |
| NASA data use | Checked | 646 retained experimental-table rows from seven public NASA PSI investigations. Original CSVs, exact cells, DOIs, versions, hashes, and nine excluded non-test rows are documented. Live audit results: data-audit.json. |
| At least one NASA resource listed for this challenge | Matches the supplied challenge brief | The participant supplied the complete official challenge text and Resources list. It explicitly lists PSI Data Repository: Combustion Science, the source of all seven datasets used here. Direct page retrieval remains unavailable. |
| Cite resources and disclose AI | Prepared; team review required | NASA source register and submission draft include the used datasets, reports, explainers, and ChatGPT assistance. No external artwork or downloaded typeface is used; pixel graphics and both typefaces are original programmatic assets. |
| Data and original-content licenses | Documented | Seven PSI datasets retain CC0-1.0. Original code and pixel assets use Apache 2.0. LICENSE and NOTICE accompany the public source bundle. No API key is included. |
| Team / event eligibility | Requires team check | The NASA GO Team says Universal Event teams need at least two participants for Global Judging. 2M2A's confirmed membership was not inspected. All team members must be properly registered. |
| Public project and separate demo | Available | Public website and a seven-slide English demo, available as PDF and editable PowerPoint, plus demo.html. Final form access remains necessary to confirm submission. |
| Official project submission | Not performed | The team owner must complete the Project tab, review all fields/credits/terms, and submit. Publishing this website does not submit a NASA project. |

## Source checks and corrections
- Rechecked the seven PSI investigations' public/restricted flags, current titles, versions, DOIs, and licenses. The live CSV audit compares downloaded bytes to the saved originals.
- BASS-01: NASA NTRS 20140011099 supports the low-speed flame observations; the cited speeds remain experiment-specific.
- BASSII-02 and SAFFIRE-03: PSI investigation objectives support the design summaries, not universal safety claims.
- SAFFIRE-04: NASA NTRS 20240002981 supports the comparison of combustion gases with spacecraft heating in preliminary Saffire results.
- SAFFIRE-05: corrected the citation title to the actual 2021 Saffire IV/V presentation, linked its NTRS record, and checked its oxygen-shadow statement in the downloaded presentation.
- SOFIE-06 and MIST-07: NASA investigation pages support the described research objectives. Their displayed dates now identify the 2023 page updates rather than implying a result year.
- FLEX-08: the NASA Science explainer supports the distinction between combustion regimes and visible appearance.
- FLEX-09, SAME-10, and SAFFIRE-11: checked against the saved original experimental CSV tables. No detector telemetry, material qualification, or predictive safety model is claimed.
- Removed ambiguous publication-year claims for PSI records. Added missing SAME-R and Experimental table filter options.
- Preserved the PSI-99 test 2-6 discrepancy: 20 cm/s in the PSI CSV versus 25 cm/s in NTRS 20180005168. Blank material cells remain blank.
- Flagged zero/negative recorded pressure for source verification rather than silently correcting it.

## Scientific boundaries
Gallery stories, artwork, and quest scenarios are fictional. The product does not simulate fire, certify material safety, recommend operational settings, or establish transfer to lunar/Martian gravity. Source ID and numeric-token validation do not establish factual entailment. An expert scientific review and live-model evaluation have not been performed.

## Official requirement references
- Challenge statement: https://www.spaceappschallenge.org/2026/challenges/flame-in-freefall/ (full challenge Details and Resources supplied by the participant on November 15; direct retrieval failed)
- NASA GO Team on required resources and citations: https://github.com/nasa/spaceapps/discussions/1827
- NASA GO Team on Universal Event minimum team size: https://github.com/nasa/spaceapps/discussions/1938
- Current event and submission schedule: https://www.spaceappschallenge.org/2026/
- Participant terms and original-content licensing: https://www.spaceappschallenge.org/legal/ (indexed terms accessible; direct retrieval failed)
- Current submission guide: https://www.spaceappschallenge.org/resources/project-submission-guide/ (retrieval failed)

The supplied resource list explicitly names PSI. The organizing team's resource rule requires at least one listed NASA source, not every resource. The current event page gives November 15, 2026 at 11:59 PM local time as the closing time. Confirm the Universal Event deadline in the team owner's local time and the current project form. This review does not change membership or accept submission terms.

## Independent development
The source ZIP now includes local startup, VT ARC configuration, GitHub checks, and independent Cloudflare Worker configuration. It runs and builds without ChatGPT Site metadata. Sixteen automated tests pass; provider tests use simulated responses. No GitHub repository or independent hosting deployment has been created in the user’s accounts. See develop.html and docs/DEVELOPMENT.md.
