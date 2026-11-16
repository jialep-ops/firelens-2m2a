"""Fetch only public NASA PSI metadata and experimental CSV tables.
Endpoint structure is derived from the PSI site's own public JavaScript.
No sign-in, agreements, or restricted files are accessed.
"""
from pathlib import Path
import urllib.request,urllib.parse,json,concurrent.futures
BASE='https://psi.nasa.gov'
ROOT=Path(__file__).resolve().parents[1]
RAW=ROOT/'data/raw';RAW.mkdir(parents=True,exist_ok=True)
def fetch(i):
 acc='PSI-'+str(i)
 u=f'{BASE}/geode-py/ws/repo/investigations/{acc}'
 with urllib.request.urlopen(u,timeout=35) as r:d=json.load(r)
 if not d.get('public') or d.get('restricted'):return {'id':acc,'skipped':'not confirmed public'}
 meta={k:d.get(k) for k in ['accession','title','doi','version','objective','approach','description','hypothesis','researchArea','licenseIdentifier','licenseName','experimentalTable']}
 (RAW/f'{acc}.json').write_text(json.dumps(meta,indent=2))
 out=[]
 for f in d.get('experimentalTable',[]):
  if f.get('restricted') or not f.get('visible',True):continue
  q=urllib.parse.urlencode({'file':f['file_name'],'version':f['version'],'redirect':'false'})
  endpoint=f'{BASE}/geode-py/ws/studies/{acc}/download?{q}'
  with urllib.request.urlopen(endpoint,timeout=35) as r:address=r.read().decode().strip().strip('"')
  if not address.startswith('https://'):raise ValueError('No public download URL returned')
  with urllib.request.urlopen(address,timeout=35) as r:content=r.read()
  name=f['file_name'];(RAW/name).write_bytes(content)
  out.append({'file':name,'bytes':len(content),'endpoint':endpoint})
 return {'id':acc,'title':d['title'],'doi':d.get('doi'),'files':out}
if __name__=='__main__':
 with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
  jobs={pool.submit(fetch,i):i for i in [25,26,69,98,99,100,101]}
  result=[]
  for job in concurrent.futures.as_completed(jobs):
   try:r=job.result();result.append(r);print(json.dumps(r),flush=True)
   except Exception as e:print(json.dumps({'id':jobs[job],'error':str(e)}),flush=True)
 (RAW/'provenance.json').write_text(json.dumps({'retrieved':'2026-11-15','investigations':result},indent=2))
