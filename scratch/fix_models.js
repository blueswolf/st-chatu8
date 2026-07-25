const fs = require('fs');

const extractContent = (filePath, removePromptSection = false, startKeyword = null) => {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/<div id="(?:ch-tab-[a-z]+|zinao-chatu-tab-[a-z]+)"[^>]*>([\s\S]*?)<\/div>\s*$/i, '$1');
    content = content.replace(/^<div id="(?:ch-tab-[a-z]+|zinao-chatu-tab-[a-z]+)"[^>]*>/i, '');
    
    if (removePromptSection && startKeyword) {
        const startIndex = content.indexOf(startKeyword);
        if (startIndex !== -1) {
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
    
    <div class="zinao-chatu-model-tabs-container">
        <input type="radio" id="tab-radio-novelai" name="model_tab_select" style="display:none;" checked>
        <label for="tab-radio-novelai" class="zinao-chatu-model-tab-label">NovelAI</label>

        <input type="radio" id="tab-radio-sd" name="model_tab_select" style="display:none;">
        <label for="tab-radio-sd" class="zinao-chatu-model-tab-label">SD</label>

        <input type="radio" id="tab-radio-comfyui" name="model_tab_select" style="display:none;">
        <label for="tab-radio-comfyui" class="zinao-chatu-model-tab-label">ComfyUI</label>

        <input type="radio" id="tab-radio-banana" name="model_tab_select" style="display:none;">
        <label for="tab-radio-banana" class="zinao-chatu-model-tab-label">Banana/Grok</label>
        
        <div class="model-tab-break"></div>
        
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
</div>
</div>`;

fs.writeFileSync('html/settings/models.html', template, 'utf8');
console.log('models.html rewritten successfully');
