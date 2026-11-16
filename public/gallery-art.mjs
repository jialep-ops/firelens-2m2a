import {WORLD,WINGS} from './gallery-world.mjs';
export function pixel(g,x,y,w,h,c){g.fillStyle=c;g.fillRect(Math.round(x),Math.round(y),w,h);}
export function text(g,s,x,y,c='#d6e4d8',size=7,align='center'){g.fillStyle=c;g.font=`${size}px FirePixel,monospace`;g.textAlign=align;g.fillText(s,x,y);}
export function sprite(g,rows,palette,x,y,scale=1){rows.forEach((r,j)=>[...r].forEach((c,i)=>{if(palette[c])pixel(g,x+i*scale,y+j*scale,scale,scale,palette[c]);}));}
export function plant(g,x,y,variant=0){pixel(g,x-7,y+1,19,5,'#1a343d55');pixel(g,x-5,y-6,13,12,'#b97c5c');pixel(g,x-6,y-7,15,3,'#e1b489');pixel(g,x-2,y-5,3,8,'#d39b73');pixel(g,x,y-24,2,18,'#386e5e');sprite(g,['....A....','..AAAAA..','.AAABAAA.','AAAABAAAA','.AABBAAA.','..ABBBA..','...ABA...','....B....'],{A:variant?'#88b5a0':'#6eab89',B:'#407d65'},x-7,y-30,2);}
function shadow(g,x,y,w,h){pixel(g,x+3,y+4,w,h,'#142b3c38');}
function frame(g,x,y,w,h,accent,kind){shadow(g,x,y,w,h);pixel(g,x,y,w,h,'#5d4d47');pixel(g,x+2,y+2,w-4,h-4,'#d4b382');pixel(g,x+4,y+4,w-8,h-8,'#f4e8cf');pixel(g,x+8,y+8,w-16,h-16,'#153345');if(kind==='rocket'){for(let i=0;i<8;i++)pixel(g,x+12+(i*13)%(w-24),y+12+(i*7)%(h-24),1,1,'#d5ddc0');rocket(g,x+w/2,y+h/2-13,.55);}else if(kind==='earth'){pixel(g,x+14,y+11,w-28,h-22,'#357593');pixel(g,x+19,y+15,8,11,'#91b59a');pixel(g,x+30,y+23,9,8,'#78a48c');pixel(g,x+21,y+33,9,3,'#b9d7cd');}else{for(let i=0;i<5;i++){pixel(g,x+12+i*5,y+12+(i%2)*6,3,h-26-(i%3)*4,accent);}pixel(g,x+12,y+h-13,w-24,1,'#99bdbe');}}
function rocket(g,x,y,scale=1){g.save();g.translate(Math.round(x),Math.round(y));g.scale(scale,scale);const p=(x,y,w,h,c)=>pixel(g,x,y,w,h,c);p(-14,47,31,7,'#213a4c44');p(-9,-22,18,64,'#ced6cc');p(-7,-26,14,65,'#f1eee0');p(-5,-32,10,8,'#f2f0df');p(-3,-37,6,8,'#f4f2e1');p(-1,-40,2,5,'#f4f2e1');p(-7,-5,14,5,'#be6c58');p(-3,7,6,5,'#37667f');p(-2,8,4,2,'#7eb0bd');p(-11,23,4,18,'#a4b8b7');p(7,23,4,18,'#88a3a6');p(-17,32,6,12,'#c46f56');p(11,32,6,12,'#c46f56');p(-8,40,16,5,'#526c79');p(-11,46,22,4,'#a4b8b5');g.restore();}
function room(g,r,index){const left=r.x,top=r.y;shadow(g,left,top,r.w,r.h);pixel(g,left,top,r.w,r.h,'#28434c');pixel(g,left+5,top+5,r.w-10,r.h-10,'#98aaa1');pixel(g,left+10,top+10,r.w-20,r.h-20,'#c5d1be');
const floor=index===0?['#bd956d','#c49c75']:index===1?['#a8bcc2','#aec2c7']:['#a9b9a3','#b1c2ab'];
for(let x=left+16;x<left+r.w-16;x+=16)for(let y=top+48;y<top+r.h-16;y+=16){pixel(g,x,y,16,16,floor[((x+y)/16)%2?0:1]);pixel(g,x,y,16,1,index===0?'#a17d5e':'#8fa69f');pixel(g,x,y,1,16,index===0?'#d0ae87':'#c0d0c2');}
pixel(g,left+11,top+10,r.w-22,37,index===0?'#3e5860':index===1?'#38536b':'#405e5e');pixel(g,left+13,top+44,r.w-26,5,index===0?'#ddb985':index===1?'#8bb5c8':'#afc39d');
text(g,r.name.toUpperCase(),left+r.w/2,top+30,'#ece9ce',8);text(g,'0'+(index+1)+' / '+r.title.toUpperCase(),left+r.w/2,top+40,'#b1c6bd',4);
for(let lx=left+48;lx<left+r.w-32;lx+=112){pixel(g,lx,top+6,54,4,'#d7d9bc');pixel(g,lx+3,top+9,48,2,'#f2eccc');pixel(g,lx+9,top+13,36,1,'#cad7bf44');}
// Display rail and patterned carpet; the walking floor stays unobstructed.
pixel(g,left+35,top+118,r.w-70,39,index===0?'#9b7762':index===1?'#83a2ad':'#8aa58e');pixel(g,left+38,top+121,r.w-76,33,index===0?'#aa876a':index===1?'#91b1ba':'#9bb49b');for(let xx=left+46;xx<left+r.w-44;xx+=12)pixel(g,xx,top+123,4,2,r.color);
// Small archival photographs and labels along the rear wall.
frame(g,left+29,top+60,37,43,r.color,index===0?'rocket':index===1?'earth':'abstract');frame(g,left+r.w-66,top+60,37,43,r.color,index===2?'earth':'abstract');
plant(g,left+30,top+r.h-34,index%2);plant(g,left+r.w-36,top+r.h-34,(index+1)%2);
// The framed opening and numbered threshold.
pixel(g,r.door.x-30,top+r.h-9,60,14,'#364f57');pixel(g,r.door.x-22,top+r.h-13,44,20,'#c1b18b');pixel(g,r.door.x-18,top+r.h-11,36,15,'#d1c6a3');for(let k=-16;k<=12;k+=8)pixel(g,r.door.x+k,top+r.h-8,4,9,'#e2d6b9');
text(g,'RESEARCH COLLECTION',left+r.w/2,top+r.h-23,index===0?'#795c49':'#587c7d',4);
}
export function buildWorld(){const c=document.createElement('canvas');c.width=WORLD.width;c.height=WORLD.height;const g=c.getContext('2d');g.imageSmoothingEnabled=false;pixel(g,0,0,c.width,c.height,'#132e38');
// Quiet outdoor courtyards surround the research galleries.
for(let x=0;x<WORLD.width;x+=16)for(let y=0;y<WORLD.height;y+=16){const k=(x*7+y*13)%29;pixel(g,x,y,16,16,k<8?'#23423d':'#203d3b');if(k<4)pixel(g,x+5,y+8,2,2,'#42614c');}
for(let i=0;i<33;i++){let x=(i*137+23)%WORLD.width,y=(i*83+19)%WORLD.height;pixel(g,x,y,1,1,'#69866e');}
// The glass-roofed connector between three exhibition wings and the atrium.
shadow(g,168,344,816,74);pixel(g,168,344,816,74,'#3a575a');pixel(g,176,352,800,58,'#aebfac');for(let x=184;x<976;x+=16){pixel(g,x,360,16,40,(x/16)%2?'#b9cbb6':'#bfd1bc');pixel(g,x,360,1,40,'#9eB6a6');pixel(g,x,379,16,2,'#d7debe');}for(let x=184;x<976;x+=80){pixel(g,x,344,55,6,'#6b999a');pixel(g,x+3,345,49,2,'#aad1c2');}
WINGS.forEach((r,i)=>room(g,r,i));
// Main entrance atrium: pale stone, walnut desk, glass walls, and a rocket centerpiece.
const x=384,y=416;shadow(g,x,y,384,288);pixel(g,x,y,384,288,'#304b53');pixel(g,x+5,y+5,374,278,'#9baca6');pixel(g,x+11,y+11,362,266,'#dce2cc');for(let xx=400;xx<=736;xx+=16)for(let yy=440;yy<688;yy+=16){pixel(g,xx,yy,16,16,((xx+yy)/16)%2?'#d7dcc7':'#cbd4c1');pixel(g,xx,yy,16,1,'#b8c4b4');pixel(g,xx,yy,1,16,'#e2e4cc');}
pixel(g,548,416,56,28,'#c8d6bd');pixel(g,552,414,48,30,'#d8e0c7');pixel(g,409,431,124,6,'#537678');pixel(g,619,431,124,6,'#537678');for(let wx=416;wx<742;wx+=30){if(wx>530&&wx<615)continue;pixel(g,wx,420,24,12,'#568c9c');pixel(g,wx+2,422,20,3,'#91bec1');pixel(g,wx+5,428,15,3,'#a2bd91');}
// Art-deco rug and brass border below the rocket.
pixel(g,516,462,120,129,'#557a7b');pixel(g,520,466,112,121,'#d4ba83');pixel(g,523,469,106,115,'#567b79');for(let xx=528;xx<628;xx+=12){pixel(g,xx,475,4,3,'#9db5a0');pixel(g,xx,577,4,3,'#9db5a0');}
pixel(g,548,483,56,80,'#567378');pixel(g,551,480,50,79,'#a4b8ad');pixel(g,555,477,42,78,'#e6e3c9');pixel(g,560,482,32,69,'#51768a');pixel(g,562,483,1,67,'#a9d3cd');pixel(g,589,483,1,67,'#8fb8bc');rocket(g,576,513,.8);text(g,'THE NEXT FRONTIER',576,570,'#d6d8b5',5);
// The two desks are portals to the scientific tools.
for(const [dx,tag] of [[404,'ARCHIVE'],[676,'DATA DESK']]){shadow(g,dx,466,72,54);pixel(g,dx,468,72,50,'#785f52');pixel(g,dx+3,466,66,43,'#c79f78');pixel(g,dx+5,468,62,5,'#e0bc91');pixel(g,dx+8,476,30,23,'#334e61');pixel(g,dx+10,478,26,17,'#5b8e9e');pixel(g,dx+14,481,18,2,'#b2d9cb');pixel(g,dx+14,486,10,2,'#d8d9b1');pixel(g,dx+12,500,27,4,'#e0d3b3');for(let k=0;k<4;k++)pixel(g,dx+45+k*4,477,3,22,['#d9ba7d','#9ab4a3','#bd8c78','#789aa1'][k]);text(g,tag,dx+36,530,'#5f7b78',5);}
// Rear bookshelves, visitor benches, and plants.
for(let bx of [410,676]){pixel(g,bx,575,65,13,'#876f5d');pixel(g,bx+3,577,59,3,'#c4a17a');pixel(g,bx+5,588,4,8,'#6f7060');pixel(g,bx+56,588,4,8,'#6f7060');}
for(let py of [461,652]){plant(g,410,py);plant(g,742,py,1);}frame(g,414,611,27,32,'#d2a57c','earth');frame(g,713,611,27,32,'#98b7a0','rocket');
pixel(g,520,681,112,14,'#658384');pixel(g,524,680,104,11,'#b4c6b3');for(let xx=528;xx<624;xx+=16)pixel(g,xx,683,8,4,'#dbe1c8');
text(g,'FIRELENS',576,616,'#527a7a',17);text(g,'FLIGHT RESEARCH GALLERY',576,632,'#78988d',5);text(g,'2M2A / NASA SPACE APPS 2026',576,670,'#5e7d78',5);
// Numbered wayfinding along the corridor.
WINGS.forEach((w,i)=>{text(g,'0'+(i+1),w.door.x,386,'#597d7d',6);});
return c;}
export function drawExplorer(g,p,time){const x=Math.round(p.x)-12,y=Math.round(p.y)-28,b=p.moving?Math.floor(time/110)%2:0;pixel(g,x-1,p.y-2,18,4,'#263c4d44');const front=['....AAAA....','...ABBBBA...','..ABCCCCBA..','..ABCDDCBA..','..ABCCCCBA..','...ABBBBA...','...AEEEEA...','..AAEFFFAA..','.AAAEFFFAAA.','.A.AEFFFA.A.','...AGGGGA...','...AG..GA...','...AA..AA...'];sprite(g,front,{A:'#2b495b',B:'#eee5ce',C:'#5c9aab',D:'#a3d3d4',E:'#d28b64',F:'#f4e8cf',G:'#a5b8b7'},x,y,2);pixel(g,x+6,y+24,5,4+b,'#e6dbc2');pixel(g,x+14,y+24,5,5-b,'#e6dbc2');pixel(g,x+6,y+28+b,5,2,'#456b7c');pixel(g,x+14,y+29-b,5,2,'#456b7c');}
export function drawSpark(g,x,y,time){const bob=Math.sin(time/420)>0?1:0;pixel(g,x-8,y+4,18,3,'#1b344133');sprite(g,['....AAAA....','..AABBBBAA..','.ABBCCCCBBA.','ABBCCDDCCBBA','ABCCDCCDCCBA','ABCCCCCCCCBA','.ABBCCCCBBA.','..AAAAAAAA..','....AAAA....','...ABBBBA...','....A..A....'],{A:'#376674',B:'#8bbab0',C:'#1e4258',D:'#f0d89e'},x-12,y-20+bob,2);}
export function drawArtifact(g,e,time,accent){const x=e.x,y=e.y;pixel(g,x-24,y+22,52,8,'#20364533');pixel(g,x-24,y-24,48,51,'#55717b');pixel(g,x-21,y-27,42,51,'#d2d0b5');pixel(g,x-17,y-24,34,42,'#30536a');pixel(g,x-15,y-23,1,39,'#93c5c1');pixel(g,x+14,y-23,1,39,'#84aeb4');pixel(g,x-20,y+19,40,8,'#aa987a');text(g,e.name.toUpperCase().slice(0,22),x,y+38,'#496c70',4);
const f=Math.floor(time/220)%3;
if(e.kind==='flame'){sprite(g,['....A....','...ABA...','..ABBBA..','.ABCDCBA.','ABCDDDCBA','ABCDDDCBA','.ABCCCBA.','..ABBBA..','...AAA...'],{A:'#3882a0',B:'#69b8bf',C:'#aad9cf',D:'#efe8b7'},x-9,y-17+f%2,2);}
else if(e.kind==='wind'){for(let k=0;k<3;k++){const yy=y-14+k*9;pixel(g,x-12,yy,24,2,'#557f96');const xx=x-13+((time/60+k*5)%22);pixel(g,xx,yy,5,2,'#9bd2cb');pixel(g,xx+3,yy-2,2,6,'#9bd2cb');}}
else if(e.kind==='fuel'){pixel(g,x-11,y-14,8,25,'#e2b77f');pixel(g,x+4,y-9,9,20,'#a6d4c0');pixel(g,x+6,y-18,5,8,'#cfddbb');pixel(g,x-13,y+12,27,2,'#71939d');}
else if(e.kind==='thermal'){pixel(g,x-3,y-17,6,22,'#b5d0c5');pixel(g,x-6,y+2,12,10,'#c98b75');pixel(g,x-1,y-10,2,16,'#c98b75');for(let n=0;n<4;n++)pixel(g,x+5,y-15+n*5,3,1,'#b4d3ce');}
else if(e.kind==='gas'){for(let k=0;k<4;k++){const xx=x-12+k*7;pixel(g,xx,y+7-((k+f)%3)*6,4,((k+f)%3)*6+4,['#80bda8','#a9d2b7','#e7bd83','#b09dc7'][k]);}pixel(g,x-14,y+13,29,1,'#8baab5');}
else if(e.kind==='scale'){rocket(g,x,y-5,.35);pixel(g,x-14,y+12,27,2,'#97b8c0');}
else if(e.kind==='planet'){pixel(g,x-10,y-15,20,22,'#7fa5ac');pixel(g,x-13,y-11,26,14,'#7fa5ac');pixel(g,x-6,y-10,9,10,'#b9c4a0');pixel(g,x+3,y-1,6,5,'#a6c39b');pixel(g,x-15,y+11,31,2,'#c5b686');}
else if(e.kind==='geometry'){pixel(g,x-12,y-12,10,22,'#a7c4b3');pixel(g,x+4,y-17,9,27,'#cbb9d6');pixel(g,x-14,y+11,29,3,'#688c9e');}
else{pixel(g,x-12,y-17,24,28,'#657f9a');pixel(g,x-9,y-14,18,22,'#c6d6ba');pixel(g,x-1,y-11,2,10,'#518c92');pixel(g,x-1,y-1,9,2,'#518c92');pixel(g,x-5,y+4,10,2,'#7e9b9b');}}
