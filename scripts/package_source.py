"""Package redistributable application sources without secrets or build outputs."""
from pathlib import Path
import zipfile

root = Path(__file__).resolve().parents[1]
target = root / 'public/FireLens-source.zip'
files = [root / name for name in ['README.md', 'package.json', '.env.example', '.gitignore', '.nvmrc', 'wrangler.jsonc', 'LICENSE', 'NOTICE']]
for folder in ['public', 'worker', 'scripts', 'data', 'tests', 'docs', '.github']:
    files.extend(p for p in (root / folder).rglob('*') if p.is_file())
with zipfile.ZipFile(target, 'w', zipfile.ZIP_DEFLATED) as bundle:
    for source in sorted(set(files)):
        if source.exists() and source.suffix not in {'.zip', '.pyc'} and '__pycache__' not in source.parts:
            bundle.write(source, 'FireLens/' + str(source.relative_to(root)))
with zipfile.ZipFile(target) as bundle:
    assert bundle.testzip() is None
    assert 'FireLens/LICENSE' in bundle.namelist()
    assert 'FireLens/NOTICE' in bundle.namelist()
print(f'Source bundle: {target.stat().st_size:,} bytes')
