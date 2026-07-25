const fs = require('fs');

// 1. Recover prompts.html
const oldMain = fs.readFileSync('scratch/old_main.html', 'utf8');
const promptSectionStart = '<div class="zinao-chatu-settings-section">';
const promptSectionEnd = '<!-- 核心通用设置 -->';
const startIdx = oldMain.indexOf('<!-- 生图提示词设置区域 -->');
const endIdx = oldMain.indexOf(promptSectionEnd);
if (startIdx !== -1 && endIdx !== -1) {
    let promptsHtml = oldMain.substring(startIdx, endIdx).trim();
    // Wrap it in the tab div
    promptsHtml = '<div id="ch-tab-prompts">\n' + promptsHtml + '\n</div>';
    fs.writeFileSync('html/settings/prompts.html', promptsHtml, 'utf8');
    console.log('prompts.html recovered');
} else {
    console.log('Failed to find prompt section bounds');
}

// 2. Append CSS to styles/main.css if missing
let css = fs.readFileSync('styles/main.css', 'utf8');
const newCss = `
/* Model Tabs CSS */
.zinao-chatu-model-tabs-container {
    display: flex;
    gap: 10px;
    margin-bottom: 15px;
    border-bottom: 1px solid var(--zinao-chatu-border-color);
    padding-bottom: 5px;
}
.zinao-chatu-model-tab-label {
    padding: 8px 16px;
    cursor: pointer;
    border-radius: 4px;
    font-weight: normal;
    color: var(--zinao-chatu-text-secondary);
    transition: all 0.2s ease;
}
.zinao-chatu-model-tab-label:hover {
    background-color: var(--zinao-chatu-bg-tertiary);
}
input[name="model_tab_select"]:checked + .zinao-chatu-model-tab-label {
    background-color: var(--zinao-chatu-bg-tertiary);
    color: var(--zinao-chatu-accent-color);
    font-weight: bold;
    border-bottom: 2px solid var(--zinao-chatu-accent-color);
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
}
.model-tab-content {
    display: none;
}
#tab-radio-novelai:checked ~ #model_tab_novelai,
#tab-radio-sd:checked ~ #model_tab_sd,
#tab-radio-comfyui:checked ~ #model_tab_comfyui,
#tab-radio-banana:checked ~ #model_tab_banana {
    display: block;
}
`;
if (!css.includes('.zinao-chatu-model-tab-label')) {
    fs.appendFileSync('styles/main.css', newCss, 'utf8');
    console.log('CSS appended to styles/main.css');
}

// 3. Re-assemble models.html
const extractContent = (filePath, removePromptSection = false, startKeyword = null) => {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove the outermost div id="ch-tab-xxx" wrapper
    content = content.replace(/<div id="(?:ch-tab-[a-z]+|zinao-chatu-tab-[a-z]+)"[^>]*>([\s\S]*?)<\/div>\s*$/i, '$1');
    content = content.replace(/^<div id="(?:ch-tab-[a-z]+|zinao-chatu-tab-[a-z]+)"[^>]*>/i, '');
    
    if (removePromptSection && startKeyword) {
        const startIndex = content.indexOf(startKeyword);
        if (startIndex !== -1) {
            // Find the <div class="zinao-chatu-settings-section"> that contains the startKeyword
            const searchSection = '<div class="zinao-chatu-settings-section">';
            const cutoffIndex = content.lastIndexOf(searchSection, startIndex);
            if (cutoffIndex !== -1) {
                content = content.substring(cutoffIndex);
            }
        }
    }
    
    return content;
};

const novelai = extractContent('html/settings/novelai.html', false);
const sd = extractContent('html/settings/sd.html', true, '<h3>Stable Diffusion 设置</h3>');
const comfyui = extractContent('html/settings/comfyui.html', true, '<h3>ComfyUI 设置</h3>');
const banana = extractContent('html/settings/banana.html', false);

const template = `<div id="ch-tab-models">
<div class="zinao-chatu-settings-section" style="margin-bottom: 20px;">
    <h3>生图模型设置</h3>
    
    <input type="radio" id="tab-radio-novelai" name="model_tab_select" style="display:none;" checked>
    <input type="radio" id="tab-radio-sd" name="model_tab_select" style="display:none;">
    <input type="radio" id="tab-radio-comfyui" name="model_tab_select" style="display:none;">
    <input type="radio" id="tab-radio-banana" name="model_tab_select" style="display:none;">
    
    <div class="zinao-chatu-model-tabs-container">
        <label for="tab-radio-novelai" class="zinao-chatu-model-tab-label">NovelAI</label>
        <label for="tab-radio-sd" class="zinao-chatu-model-tab-label">SD</label>
        <label for="tab-radio-comfyui" class="zinao-chatu-model-tab-label">ComfyUI</label>
        <label for="tab-radio-banana" class="zinao-chatu-model-tab-label">Banana/Grok</label>
    </div>
    
    <div id="model_tab_novelai" class="model-tab-content">
        ${novelai}
    </div>
    <div id="model_tab_sd" class="model-tab-content">
        ${sd}
    </div>
    <div id="model_tab_comfyui" class="model-tab-content">
        ${comfyui}
    </div>
    <div id="model_tab_banana" class="model-tab-content">
        ${banana}
    </div>
</div>
</div>`;

fs.writeFileSync('html/settings/models.html', template, 'utf8');
console.log('models.html rewritten successfully');
