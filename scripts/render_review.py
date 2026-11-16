from pathlib import Path
from html import escape
import re
root=Path(__file__).resolve().parents[1];md=(root/'public/requirements-review.md').read_text()
def inline(s):
 s=escape(s);return re.sub(r'https://[^ )]+',lambda m:'<a href="'+m[0]+'" target="_blank" rel="noopener">'+m[0]+'</a>',s)
parts=[];lines=md.splitlines();i=0
while i<len(lines):
 line=lines[i]
 if line.startswith('|'):
  rows=[]
  while i<len(lines) and lines[i].startswith('|'):
   c=[x.strip() for x in lines[i].strip('|').split('|')]
   if not all(re.fullmatch(r':?-+:?',v) for v in c):rows.append(c)
   i+=1
  parts.append('<div class="review-table"><table>'+''.join('<tr>'+''.join(('<th>' if n==0 else '<td>')+inline(c)+('</th>' if n==0 else '</td>') for c in r)+'</tr>' for n,r in enumerate(rows))+'</table></div>');continue
 if line.startswith('# '):parts.append('<h1>'+inline(line[2:])+'</h1>')
 elif line.startswith('## '):parts.append('<h2>'+inline(line[3:])+'</h2>')
 elif line.startswith('- '):
  parts.append('<ul>')
  while i<len(lines) and lines[i].startswith('- '):parts.append('<li>'+inline(lines[i][2:])+'</li>');i+=1
  parts.append('</ul>');continue
 elif line:parts.append('<p>'+inline(line)+'</p>')
 i+=1
p=root/'public/review.html';html=p.read_text();a=html.index('<main>')+6;b=html.index('</main>',a);p.write_text(html[:a]+''.join(parts)+html[b:])
