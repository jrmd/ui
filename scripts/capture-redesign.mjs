import {chromium} from '@playwright/test';
import fs from 'node:fs';
const browser=await chromium.launch({executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH});
const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
fs.mkdirSync('.impeccable/redesign',{recursive:true});
for(const [name,width,height] of [['desktop',1080,650],['mobile',390,844]]){await page.setViewportSize({width,height});for(const slug of ['button','badge','card','input','switch','text-reveal','tilt-card','area-chart','webgl-particle-field','webgl-ribbon-field','webgl-liquid-surface','webgl-orb','webgl-terrain','webgl-image-distortion']){await page.goto('http://localhost:3000/preview/'+slug);await page.getByText('Loading example…').waitFor({state:'hidden'});await page.evaluate(()=>document.fonts.ready);if(slug.startsWith('webgl')){await page.locator('canvas').waitFor();await page.waitForFunction(()=>{const c=document.querySelector('canvas');return c&&c.width>300;});await page.mouse.move(width*.57,height*.42);await page.waitForTimeout(800);}await page.screenshot({path:`.impeccable/redesign/${slug}-${name}.png`,fullPage:true});}}
await browser.close();fs.writeFileSync('.impeccable/redesign/errors.json',JSON.stringify(errors,null,2));console.log(JSON.stringify(errors));
