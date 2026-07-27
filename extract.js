const fs = require('fs');

let content = fs.readFileSync('index.js', 'utf8');

const regex = /json = \([\s\S]*?)\;\s*json2 = \([\s\S]*?)\;\s*json3 = \([\s\S]*?)\;\s*editwk = \([\s\S]*?)\;\s*jsonweldf = \([\s\S]*?)\;\s*jsonweilinvae = \([\s\S]*?)\;\s*jsonvae = \([\s\S]*?)\;/;

const match = content.match(regex);
if (match) {
    const workflows = {
        json: match[1],
        json2: match[2],
        json3: match[3],
        editwk: match[4],
        jsonweldf: match[5],
        jsonweilinvae: match[6],
        jsonvae: match[7]
    };
    
    fs.writeFileSync('workflows.json', JSON.stringify(workflows, null, 2));
    console.log('workflows.json created');
    
    // Replace the huge strings with null in index.js
    const replaceStr = "json = null; json2 = null; json3 = null; editwk = null; jsonweldf = null; jsonweilinvae = null; jsonvae = null;";
    content = content.replace(regex, replaceStr);
    
    // Inject async load into main()
    const mainRegex = /async function main\(\) \{[\s\S]*?cssFiles\.forEach\(loadCSS\);/;
    const injectStr = 
  try {
    const wfResponse = await fetch(\\/workflows.json\);
    const wfData = await wfResponse.json();
    defaultSettings.comfyui.workflows["\\u9ED8\\u8BA4"] = wfData.json;
    defaultSettings.comfyui.workflows["\\u9ED8\\u8BA4-\\u72EC\\u7ACBVAE"] = wfData.jsonvae;
    defaultSettings.comfyui.workflows["\\u9ED8\\u8BA4\\u4EBA\\u7269\\u4E00\\u81F4"] = wfData.json2;
    defaultSettings.comfyui.workflows["\\u9762\\u90E8\\u7EC6\\u5316"] = wfData.json3;
    defaultSettings.comfyui.workflows["\\u65B0\\u7248\\u9ED8\\u8BA4"] = wfData.jsonweldf;
    defaultSettings.comfyui.workflows["\\u65B0weilin-vae"] = wfData.jsonweilinvae;
    defaultSettings.comfyui.workflows["\\u56FE\\u50CF\\u7F16\\u8F91"] = wfData.editwk;
    defaultSettings.comfyui.worker = wfData.jsonweldf;
    defaultSettings.comfyui.editWorker = wfData.editwk;
  } catch(e) { console.error("Failed to load workflows.json", e); }
;
    content = content.replace(mainRegex, (m) => m + injectStr);
    
    fs.writeFileSync('index.js', content);
    console.log('index.js workflows extracted');
} else {
    console.log('Regex match failed for JSON extraction');
}
