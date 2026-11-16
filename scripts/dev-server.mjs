import http from 'node:http';
import {readFileSync,existsSync,statSync} from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {createApp} from '../worker/index.js';

// Node 22+ loads local, untracked secrets without an extra dependency.
if(existsSync('.env'))process.loadEnvFile('.env');
const ctx={};
vm.createContext(ctx);
vm.runInContext(readFileSync('public/data.js','utf8')+';globalThis.records=RECORDS',ctx);
const experiments=JSON.parse(readFileSync('public/experiments.json','utf8'));
const app=createApp({},ctx.records,experiments);
const types={'.pdf':'application/pdf','.pptx':'application/vnd.openxmlformats-officedocument.presentationml.presentation','.txt':'text/plain; charset=utf-8','.html':'text/html','.mjs':'text/javascript','.js':'text/javascript','.css':'text/css','.json':'application/json','.ttf':'font/ttf','.csv':'text/csv','.zip':'application/zip','.md':'text/markdown','.jpg':'image/jpeg'};
const env=Object.fromEntries(['LLM_PROVIDER','ARC_API_KEY','ARC_MODEL','OPENAI_API_KEY','OPENAI_MODEL'].map(k=>[k,process.env[k]]));
const cli=name=>{const i=process.argv.indexOf(name);return i>=0?process.argv[i+1]:undefined;};
const port=Number(cli('--port')||process.env.PORT||5173);
const host=cli('--host')||process.env.HOST||'127.0.0.1';

http.createServer(async(req,res)=>{
 try{
  const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  if(pathname.startsWith('/api/')){
   let body='';
   for await(const chunk of req){body+=chunk;if(Buffer.byteLength(body)>5000){res.writeHead(413,{'content-type':'application/json'});res.end(JSON.stringify({error:'Question too long'}));return;}}
   const request=new Request('http://'+req.headers.host+req.url,{method:req.method,headers:req.headers,...(!['GET','HEAD'].includes(req.method)?{body}:{})});
   const response=await app.fetch(request,env);
   res.writeHead(response.status,Object.fromEntries(response.headers));
   res.end(Buffer.from(await response.arrayBuffer()));return;
  }
  if(!['GET','HEAD'].includes(req.method)){res.writeHead(405);res.end('Method not allowed');return;}
  const file=path.resolve('public','.'+(pathname==='/'?'/index.html':pathname));
  if(!file.startsWith(path.resolve('public')+path.sep)||!existsSync(file)||!statSync(file).isFile()){res.writeHead(404);res.end('Not found');return;}
  res.writeHead(200,{'content-type':types[path.extname(file)]||'application/octet-stream','x-content-type-options':'nosniff'});
  res.end(req.method==='HEAD'?undefined:readFileSync(file));
 }catch{res.writeHead(500);res.end('Server error');}
}).listen(port,host,()=>console.log(`FireLens running at http://${host}:${port}/`));
