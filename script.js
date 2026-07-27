const fs = require('fs');

function modifySettingsHtml() {
    let content = fs.readFileSync('settings.html', 'utf8');

    // 1. Title change
    content = content.replace(/<h2 style="margin: 0;">智绘姬 /g, '<h2 style="margin: 0;">紫脑插图 ');

    // 2. Remove zinao-chatu-ai-trigger
    content = content.replace(/<div id="zinao-chatu-ai-trigger"[\s\S]*?<\/div>/, '');

    // 3. Remove zinao-chatu-ai-dialog
    content = content.replace(/<!-- 智绘姬 AI 助手对话框[\s\S]*?<div class="zinao-chatu-ai-dialog-footer">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, '');

    // 4. Remove Zhihuiji settings panel
    content = content.replace(/<!-- 智绘姬设置面板 \(默认隐藏\) -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/, '');
    
    // 5. Remove Zhihuiji history panel
    content = content.replace(/<!-- 智绘姬历史记录面板 \(默认隐藏\) -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/, '');

    fs.writeFileSync('settings.html', content);
    console.log('settings.html modified');
}

function modifyOtherHtml() {
    try {
        let fabContent = fs.readFileSync('html/settings/fab.html', 'utf8');
        fabContent = fabContent.replace(/<div class="zinao-chatu-setting-item">\s*<div class="zinao-chatu-setting-header">\s*<label for="enable_chatu8_desktop_pet">智绘姬独立窗口<\/label>[\s\S]*?<\/div>\s*<\/div>/, '');
        fs.writeFileSync('html/settings/fab.html', fabContent);
        console.log('html/settings/fab.html modified');
    } catch(e) { console.log('fab.html skip'); }

    try {
        let themeContent = fs.readFileSync('html/settings/theme.html', 'utf8');
        themeContent = themeContent.replace(/<!-- 合并：悬浮球与智绘姬外观设置 -->/, '');
        themeContent = themeContent.replace(/<div class="zinao-chatu-setting-item">\s*<div class="zinao-chatu-setting-header">\s*<label for="enable_chatu8_desktop_pet">智绘姬独立窗口<\/label>[\s\S]*?<\/div>\s*<\/div>/, '');
        fs.writeFileSync('html/settings/theme.html', themeContent);
        console.log('html/settings/theme.html modified');
    } catch(e) { console.log('theme.html skip'); }

    try {
        let llmContent = fs.readFileSync('html/settings/llm.html', 'utf8');
        llmContent = llmContent.replace(/<!-- 智绘姬助手 -->[\s\S]*?<span class="zinao-chatu-request-card-hint"[\s\S]*?<\/span>\s*<\/div>\s*<\/div>/, '');
        fs.writeFileSync('html/settings/llm.html', llmContent);
        console.log('html/settings/llm.html modified');
    } catch(e) { console.log('llm.html skip'); }
}

modifySettingsHtml();
modifyOtherHtml();
