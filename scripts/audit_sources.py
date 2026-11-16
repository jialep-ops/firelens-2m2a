"""Recheck public PSI metadata, licenses, and original CSV bytes without sign-in."""
from pathlib import Path
import urllib.request,urllib.parse,json,hashlib,concurrent.futures
ROOT=Path(__file__).resolve().parents[1]
def check(acc):
 old=json.loads((ROOT/'data/raw'/f'{acc}.json').read_text())
 with urllib.request.urlopen(f'https://psi.nasa.gov/geode-py/ws/repo/investigations/{acc}',timeout=30) as r:d=json.load(r)
 out={'id':acc,'public':d.get('public'),'restricted':d.get('restricted'),'doi':d.get('doi'),'version':d.get('version'),'license':d.get('licenseIdentifier'),'metadata_match':all(d.get(k)==old.get(k) for k in ('doi','version','title')),'files':[]}
 if not out['public'] or out['restricted']:return out
 for f in d.get('experimentalTable',[]):
  if f.get('restricted') or not f.get('visible',True):continue
  q=urllib.parse.urlencode({'file':f['file_name'],'version':f['version'],'redirect':'false'})
  with urllib.request.urlopen(f'https://psi.nasa.gov/geode-py/ws/studies/{acc}/download?{q}',timeout=30) as r:address=r.read().decode().strip().strip('"')
  if not address.startswith('https://'):raise ValueError('No public download URL')
  with urllib.request.urlopen(address,timeout=30) as r:content=r.read()
  saved=(ROOT/'public/raw'/f['file_name']).read_bytes();sha=lambda b:hashlib.sha256(b).hexdigest()
  out['files'].append({'file':f['file_name'],'sha256':sha(content),'bytes':len(content),'matches_saved_bytes':sha(content)==sha(saved),'version':f['version']})
 return out
if __name__=='__main__':
 with concurrent.futures.ThreadPoolExecutor(max_workers=3) as p:checks=list(p.map(check,['PSI-25','PSI-26','PSI-69','PSI-98','PSI-99','PSI-100','PSI-101']))
 out={'checked':'2026-11-15','method':'Live public metadata and CSV downloads compared with the deployed snapshot. No restricted files, sign-in, or agreements accessed.','checks':checks}
 (ROOT/'public/data-audit.json').write_text(json.dumps(out,indent=2))
 print(json.dumps({'metadata_matches':sum(x['metadata_match'] for x in checks),'csv_byte_matches':sum(f['matches_saved_bytes'] for x in checks for f in x['files']),'licenses':sorted(set(x['license'] for x in checks))}))
