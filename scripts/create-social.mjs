import {chromium} from '@playwright/test';
import {mkdir} from 'node:fs/promises';
import tools from '../src/data/tools.json' with {type:'json'};
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:1200,height:630},deviceScaleFactor:1});
await page.setContent(`<html><body style="margin:0;background:#f6f5ef;color:#173d30;font-family:Arial;padding:70px;box-sizing:border-box;width:1200px;height:630px"><div style="font-size:28px;font-weight:bold">↗ UtilityPilot</div><h1 style="font-size:90px;letter-spacing:-5px;line-height:1.03;margin:65px 0 25px">Small tasks.<br>Handled.</h1><p style="font-size:27px">${tools.length} practical tools for everyday digital work.</p><div style="font-size:20px;margin-top:45px">UTILITYPILOT.ONLINE · SIMPLE TOOLS. CLEAR RESULTS.</div></body></html>`);
await mkdir('public/assets',{recursive:true});await page.screenshot({path:'public/assets/social.png'});await browser.close();
