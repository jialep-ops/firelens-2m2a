# FireLens: The Research Gallery · 2M2A
An explorable pixel-art museum quest and an auditable NASA combustion research desk.

## Run
Install Node 22 or newer and open the project folder in VS Code. No package installation or ChatGPT account is needed to run the application.
- `npm start` starts the local app at `http://127.0.0.1:5173/`.
- `npm run dev` serves the application locally on port 5173 (or the supplied --port).
- `npm test` checks data integrity, missing values, dataset aggregation, API validation, citation IDs, exhibit routes, collision boundaries, and wing gates.
- `npm run build` creates a Cloudflare-compatible Worker with embedded static assets. It works without ChatGPT hosting metadata.

See [the development guide](docs/DEVELOPMENT.md) for GitHub import, Windows setup, VT ARC configuration, and independent hosting. `.github/workflows/checks.yml` runs tests and builds on pushes and pull requests. This workflow has been prepared locally; a GitHub run has not yet occurred.

## Data
646 retained experimental-table test rows from seven NASA PSI investigations, plus eleven curated source summaries. Original CSVs, per-row original cells, SHA-256 hashes, DOI citations, normalized numeric fields, and documented exclusions are included.
- `scripts/fetch_psi.py` downloads public metadata and experimental tables. It never accesses restricted files or accepts agreements.
- `scripts/build_data.py` normalizes numeric fields without imputation.
- `public/experiments.json` is the checked-in normalized snapshot.
- `public/raw/` contains original CSV bytes.

The UI offers numeric plots, source-row inspection, material filtering, and normalized condition-distance ranking. Distance scales are design choices, not safety limits. BASS-II fan settings are never converted to airflow. PSI-99 sample 2-6 contains a discrepancy with NTRS 20180005168; the original PSI value is preserved and flagged.

## AI explanations
`worker/index.js` supports VT ARC Chat Completions and the optional OpenAI Responses API. Copy `.env.example` to an untracked `.env`, then set `ARC_API_KEY` for your own local use. The supplied defaults select `LLM_PROVIDER=vt-arc` and `ARC_MODEL=gpt-oss-120b`. The Node server loads `.env` automatically. Do not share or commit your key. VT ARC's documentation is linked in the development guide; permission for an anonymous public service is not established by these integration tests.

For OpenAI instead, set `LLM_PROVIDER=openai`, `OPENAI_API_KEY` and `OPENAI_MODEL`. For hosted deployments, set these values through the host's server-side environment settings. ChatGPT Sites uses its supported key-provisioning workflow.

Until configured, `/api/status` reports `ai:false`, and the app explicitly uses curated evidence mode. Status reports configuration, not a successful live-model health check. Both providers retrieve the same bounded NASA source pack. OpenAI requests a structured JSON schema; ARC is prompted to return that schema and the server parses and validates the result. Unknown citation IDs and unsupported numeric tokens fall back to evidence mode. Citation-ID validation does not establish factual entailment. OpenAI uses `store:false`; ARC's documentation states that interactions are logged. In-memory rate limits are per server instance, not a durable global usage limit. ARC requests and failures are tested with simulated responses; no live ARC request has been evaluated.

## Experience
A connected pixel-art museum with a following camera, an atrium rocket collection, glass walkway, and three themed wings: the Flame Gallery, Cabin Observatory, and Atmosphere Garden. SPARK introduces one quest at a time. Inspect three exhibits and collect two NASA source cards in each wing, then review a field note to unlock the next wing. The journal stores progress and optional questions on this device and exports a Markdown research record.

WASD/arrows move; E inspects. Clicking the floor finds a path around exhibits. A guide button and gallery map provide walking routes. Touch controls and an accessible exhibit directory offer alternative controls. Source cards link to NASA evidence; exhibits also open the measured-data desk. Original test rows inspected at the desk are recorded in the journal. Sound is optional and off by default.

## Limitations
No fire dynamics, safety certification, detector-response telemetry, or expert validation is provided. Gallery artwork and quest scenarios are fictional. The supplied NASA challenge Resources list explicitly names PSI. Overall eligibility still depends on team registration and the other submission conditions.

## Pixel UI and audit
The same original pixel text font, brass-edged frames, and illustrated inventory panels style the gallery, exhibits, journal, research desk, source viewer, and demo. Both fonts are generated from original cell patterns. To rebuild the readable lowercase UI font, install fontTools in a development environment and run `python scripts/create_text_font.py`; the built TTF is checked in and no font build is needed for normal use.

`python scripts/audit_sources.py` verifies public PSI metadata and re-downloads the seven original CSVs for a byte comparison. `public/review.html`, `public/requirements-review.md`, and `public/credits.md` document implemented features, source checks, credits/licenses, and incomplete eligibility/AI/submission items.

## Submission package
`public/submit.html` provides fourteen copy-ready fields, complete references, and separate project/demo links. The actual demo has seven slides in PDF and editable PPTX. Original code and pixel assets use Apache 2.0, with NASA PSI data remaining CC0-1.0. The official account form and team roster are not accessible in this session. Active AI still requires the project model connection.
