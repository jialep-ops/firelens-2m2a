import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {createApp,modelConfig} from '../worker/index.js';

const experiments=JSON.parse(readFileSync('public/experiments.json','utf8'));
const ctx={};vm.createContext(ctx);vm.runInContext(readFileSync('public/data.js','utf8')+';globalThis.records=RECORDS',ctx);
const arc={LLM_PROVIDER:'vt-arc',ARC_API_KEY:'test-key-not-a-secret',ARC_MODEL:'test-model'};
const request=()=>new Request('https://example.test/api/explain',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({question:'How many FLEX tests ended in extinction?'})});
const valid={answer:'274 retained tests.',claims:[{text:'186 ended in extinction.',source_ids:['PSI-69']}],limitations:'These counts do not establish fire safety.'};

test('provider selection never silently uses a different configured account',()=>{
 assert.equal(modelConfig({...arc,ARC_API_KEY:'',OPENAI_API_KEY:'other',OPENAI_MODEL:'other'}),null);
 assert.equal(modelConfig({...arc,LLM_PROVIDER:'unsupported'}),null);
 assert.equal(modelConfig(arc).provider,'vt-arc');
});

test('VT ARC uses Chat Completions and preserves citation validation',async()=>{
 let called=false;
 const app=createApp({},ctx.records,experiments,{fetchImpl:async(url,options)=>{
  called=true;assert.equal(url,'https://llm-api.arc.vt.edu/api/v1/chat/completions');
  assert.equal(options.headers.authorization,'Bearer test-key-not-a-secret');
  const body=JSON.parse(options.body);assert.equal(body.model,'test-model');assert.equal(body.stream,false);
  assert.equal(body.messages[0].role,'system');assert.ok(JSON.parse(body.messages[1].content).datasets.some(s=>s.id==='PSI-69'));
  assert.equal(body.input,undefined);assert.equal(body.text,undefined);
  return Response.json({choices:[{message:{content:JSON.stringify(valid)}}]});
 }});
 const response=await app.fetch(request(),arc),result=await response.json();
 assert.equal(called,true);assert.equal(result.mode,'ai');assert.equal(result.provider,'vt-arc');assert.deepEqual(result.answer,valid);
 assert.equal(JSON.stringify(result).includes(arc.ARC_API_KEY),false);
});

test('VT ARC malformed output, invented citations, unsupported numbers and failures fall back to NASA evidence',async()=>{
 const cases=[Response.json({choices:[{message:{content:'not JSON'}}]}),Response.json({choices:[{message:{content:JSON.stringify({...valid,claims:[{text:'Observed.',source_ids:['invented']}]})}}]}),Response.json({choices:[{message:{content:JSON.stringify({...valid,answer:'999999 tests.'})}}]}),new Response('Service unavailable',{status:429})];
 for(const response of cases){
  const app=createApp({},ctx.records,experiments,{fetchImpl:async()=>response});
  const result=await(await app.fetch(request(),arc)).json();
  assert.equal(result.mode,'evidence');assert.equal(result.answer,undefined);assert.ok(result.datasets.length>0);
 }
 const offline=createApp({},ctx.records,experiments,{fetchImpl:async()=>{throw Error('offline');}});
 assert.equal((await(await offline.fetch(request(),arc)).json()).mode,'evidence');
});

test('OpenAI continues to use its Responses API and structured schema',async()=>{
 const app=createApp({},ctx.records,experiments,{fetchImpl:async(url,options)=>{
  assert.equal(url,'https://api.openai.com/v1/responses');
  const body=JSON.parse(options.body);assert.equal(body.store,false);assert.equal(body.text.format.type,'json_schema');
  return Response.json({output:[{content:[{type:'output_text',text:JSON.stringify(valid)}]}]});
 }});
 const result=await(await app.fetch(request(),{LLM_PROVIDER:'openai',OPENAI_API_KEY:'test-only',OPENAI_MODEL:'test-model'})).json();
 assert.equal(result.mode,'ai');assert.equal(result.provider,'openai');
});
