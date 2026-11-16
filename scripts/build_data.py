"""Normalize public PSI table rows without filling missing cells or rewriting units."""
from pathlib import Path
import csv,json,re,hashlib
ROOT=Path(__file__).resolve().parents[1];raw=ROOT/'data/raw';out=ROOT/'public';out.mkdir(exist_ok=True)
def number(s,unit=''):
 s=str(s or '').strip()
 if unit and s.endswith(unit):s=s[:-len(unit)].strip()
 return float(s) if re.fullmatch(r'-?(?:\d+(?:\.\d*)?|\.\d+)',s) else None
def get(d,*keys):
 for k in keys:
  if k in d:return d[k]
 return ''
records=[];sources=[];excluded=[]
for f in sorted(raw.glob('*.csv')):
 acc=f.name.split('_')[0];meta=json.loads((raw/(acc+'.json')).read_text());b=f.read_bytes()
 try:text=b.decode('utf-8-sig');encoding='utf-8-sig'
 except UnicodeDecodeError:text=b.decode('cp1252');encoding='cp1252'
 reader=csv.DictReader(text.splitlines());count=0
 for line,r in enumerate(reader,2):
  r={str(k).strip():str(v or '').strip() for k,v in r.items() if k is not None};id=get(r,'Test #','As Run Test #','FLEX Test #','Sample Number','SAME Test #')
  if acc=='PSI-99' and not re.fullmatch('2-[1-9]',id):excluded.append({'source':acc,'csvLine':line,'reason':'note or flow-visualization row','raw':r});continue
  if acc=='PSI-98' and id not in ['S1','S2']:excluded.append({'source':acc,'csvLine':line,'reason':'flow-visualization row','raw':r});continue
  if not id:excluded.append({'source':acc,'csvLine':line,'reason':'empty test identifier','raw':r});continue
  family={'PSI-25':'BASS-II','PSI-26':'BASS','PSI-69':'FLEX','PSI-98':'Saffire-I','PSI-99':'Saffire-II','PSI-100':'Saffire-III','PSI-101':'SAME-R'}[acc]
  material=get(r,'Fuel Sample Material','Fuel','Material','Sample Type')
  oxygen=get(r,'Calibrated  initial O2 % by vol','O initial ambient composition; mole fraction','Percent O2 (Note 1)','Percent O2')
  o2=number(oxygen)
  if acc=='PSI-69' and o2 is not None:o2*=100
  flow=number(get(r,'Air Flow (cm/s)','Air Flow','Inlet velocity (cm/s)'),'cm/s')
  pressure=number(get(r,'Ambient pressure; mmHg'))
  burn=number(get(r,'Burn time; s','Burn Time (s)'),'s')
  flags=[]
  if not material:flags.append('Material blank in source; not inferred from neighboring rows.')
  if acc=='PSI-25':flags.append('Fan and air displays are instrument settings, not calibrated airflow speeds.')
  if acc=='PSI-99' and id=='2-6':flags.append('Source discrepancy: PSI CSV lists airflow 20 cm/s; NTRS 20180005168 Table 1 lists 25 cm/s. PSI value preserved.')
  if pressure is not None and pressure<=0:flags.append('Recorded pressure is zero or negative; verify the original source entry before physical interpretation. Value preserved.')
  if acc=='PSI-69':flags.append('Column O initial ambient composition is displayed as oxygen percentage (mole fraction × 100). Other ambiguous gas headers are retained only as recorded.')
  rec={'id':f'{acc}:{id}:L{line}','test':id,'accession':acc,'family':family,'material':material,'o2_pct':o2,'o2_raw':oxygen,'flow_cm_s':flow,'pressure_mmHg':pressure,'burn_s':burn,'droplet_mm':number(get(r,'Droplet initial diameter; mm')),'extinction_mm':number(get(r,'Visible flame extinction diameter; mm')),'termination':get(r,'Test end'),'flow_direction':get(r,'Flow Direction','Direction'),'co_initial_ppm':number(get(r,'Initial CO (ppm)')),'co_final_ppm':number(get(r,'Final CO (ppm)')),'doi':meta['doi'],'source':f'https://psi.nasa.gov/physci/repo/data/investigations/{acc}','file':f.name,'csvLine':line,'raw':r,'flags':flags}
  records.append(rec);count+=1
 sources.append({'accession':acc,'family':family,'title':meta['title'],'doi':meta['doi'],'version':meta['version'],'file':f.name,'rows':count,'encoding':encoding,'sha256':hashlib.sha256(b).hexdigest(),'url':f'https://psi.nasa.gov/physci/repo/data/investigations/{acc}','license':meta.get('licenseIdentifier'),'rawRows':count+sum(x['source']==acc for x in excluded)})
bundle={'retrieved':'2026-11-15','description':'Normalized public NASA PSI experimental tables. Numeric cells require an unambiguous number; approximate values and ranges remain in raw cells. No missing values are imputed. No telemetry or video was analyzed.','sources':sources,'records':records,'excluded':excluded}
(out/'experiments.json').write_text(json.dumps(bundle,separators=(',',':')))
(out/'raw').mkdir(exist_ok=True)
for f in raw.glob('*.csv'):(out/'raw'/f.name).write_bytes(f.read_bytes())
(out/'data-provenance.json').write_text(json.dumps({'sources':sources,'excluded':excluded,'normalization':bundle['description']},indent=2))
print('Retained',len(records),'test records from',len(sources),'investigations; excluded',len(excluded),'non-test rows.')
