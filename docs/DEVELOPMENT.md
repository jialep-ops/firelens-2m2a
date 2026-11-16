# Develop FireLens outside ChatGPT

FireLens is a standard HTML/CSS/JavaScript project with a small Node server and an optional Cloudflare Worker build. The NASA data, original pixel art and fonts, and source citations are included. No ChatGPT account or package install is needed for local use.

## Open the project on Windows

1. Download `FireLens-source.zip` from the published site and extract it.
2. Install Node.js 22 or newer. Open the extracted `FireLens` folder in VS Code.
3. Choose Terminal > New Terminal and run `npm start`.
4. Open `http://127.0.0.1:5173/`. Stop the server with Ctrl+C.

`npm test` runs the automated checks. `npm run build` creates `dist/server/index.js` for Cloudflare Workers. Python is only needed to regenerate data, fonts, or the source ZIP. Rebuild that download with `python scripts/package_source.py`; it cannot contain a copy of itself.

## Enable VT ARC for your own development

ARC documents its OpenAI-compatible endpoint at `https://llm-api.arc.vt.edu/api/v1/chat/completions`. It is available to VT students, faculty and staff using a personal API key, without a separate ARC account or individual usage charge. Keys are personal and sharing them is prohibited.

1. Sign in at https://llm.arc.vt.edu using your VT account.
2. Open User profile > Settings > Account > API keys and create your own key.
3. In the project terminal, run `Copy-Item .env.example .env` in PowerShell, or `cp .env.example .env` on macOS/Linux.
4. Open `.env` in VS Code. Set `ARC_API_KEY` to your key. Keep `LLM_PROVIDER=vt-arc` and choose an available `ARC_MODEL`; the example uses `gpt-oss-120b`.
5. Restart `npm start` and use Research desk > Ask a research question.

The key stays in the local server and is not returned to the browser. `.env` is excluded from Git and the source archive. Never paste it into source code, a screenshot, an issue, or a chat. ARC's model list can change, and its documentation states that interactions are logged. The implementation uses the documented Chat Completions request format; it does not assume ARC supports the OpenAI Responses API or enforceable structured output. The same citation and numeric-token checks run after either provider responds.

The current published site has no model key. ARC tests use simulated responses and do not establish live availability or scientific accuracy. Start by testing locally. The documentation does not establish authorization to provide anonymous public access through your personal account; confirm that use with ARC before enabling it for public visitors. A server-side key alone is not visitor access control. The evidence gallery remains usable without any key.

Official ARC API documentation, checked November 16, 2026:
https://docs.arc.vt.edu/ai/011_llm_api_arc_vt_edu.html

## Put it in your GitHub account

The source ZIP is ready for a standard GitHub repository. It includes `.gitignore`, `.nvmrc`, the Apache 2.0 license, NASA data notices, and a GitHub Actions check. It excludes private keys, Git history and ChatGPT Site identity.

If GitHub is connected to your coding assistant, it can create the repository and push these files. Otherwise, create an empty repository named `firelens-2m2a` in your GitHub account, without adding a README or license. In the extracted project folder run:

```sh
git init -b main
git add .
git commit -m "Import FireLens research gallery"
```

Copy the two commands from your new GitHub repository's “push an existing repository” instructions to add its exact remote URL and push `main`. Authenticate using GitHub's supported sign-in flow. Then you can edit in VS Code, commit changes and push whenever you want. You can use GitHub Desktop for these Git operations instead.

## Host independently

GitHub stores the source. A server or Worker runs the AI endpoint. GitHub Pages alone is static hosting and does not run `worker/index.js` or the Node server.

- Any Node 22+ server: run `npm start` from this folder, set `HOST=0.0.0.0`, set the host's `PORT`, and configure secrets through its environment settings. Use the hosting provider's HTTPS and visitor access controls.
- Cloudflare Workers: `wrangler.jsonc` provides a standard project configuration. In your own Cloudflare account run `npx wrangler@4 deploy`; its build step calls `npm run build`. The first deployment uses evidence mode unless runtime secrets are configured. Keep keys out of Wrangler's committed configuration. This independent deployment has not been performed.

The current ChatGPT-hosted link remains a separate deployment. Pushing to a new GitHub repository does not update that link automatically. Connect the GitHub repository to your chosen host if you want deployments on push. The original Site's private identity file is not needed to run the export.

## Files to edit

| File | Purpose |
| --- | --- |
| `public/gallery.js`, `public/gallery-world.mjs` | Character, rooms, exploration and quests |
| `public/pixel-ui.css` | Pixel interface styling |
| `public/desk.js`, `public/app.js` | Research desk, source ranking and data views |
| `worker/index.js` | AI providers, source-pack retrieval and validation |
| `public/experiments.json`, `public/raw/` | Normalized NASA records and original CSVs |
| `public/data.js` | Curated source summaries |
| `.env` | Your local model configuration; do not commit |

Scientific limitations and citations remain part of the project when you move it. A working model connection still needs evaluation before claiming that the SI-powered challenge requirement is satisfied.
