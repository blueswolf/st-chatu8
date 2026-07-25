import { extension_settings } from "../../../../extensions.js";
import { saveSettingsDebounced } from "../../../../../script.js";

const extensionName = "zinao-chatu";

export function initZinaoChatuUI() {
    const settings = extension_settings[extensionName];
    if (!settings) return;

    // --- 生图提示词模式切换逻辑 ---
    const modeToggle = document.getElementById("prompt-generation-mode-toggle");
    if (modeToggle) {
        // 读取存储的状态，默认值为 "inline"
        const isDblClick = settings.prompt_generation_mode === "dblclick";
        modeToggle.checked = isDblClick;
        updateModeDisplay(isDblClick);
        
        // 绑定事件
        modeToggle.addEventListener("change", (e) => {
            const checked = e.target.checked;
            settings.prompt_generation_mode = checked ? "dblclick" : "inline";
            saveSettingsDebounced();
            updateModeDisplay(checked);
        });
    }

    // --- 文本框与下拉框数据双向绑定 ---
    const fields = [
        "inline_char_desc", 
        "inline_prompt", 
        "inline_negative_prompt",
        "dblclick_api_endpoint", 
        "dblclick_api_key", 
        "dblclick_model_select",
        "dblclick_jailbreak_prompt", 
        "dblclick_gen_prompt", 
        "dblclick_user_req_prompt",
        "dblclick_postfix_prompt"
    ];

    fields.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            // 加载已有配置
            if (settings[id] !== undefined) {
                el.value = settings[id];
            }
            
            // 绑定保存逻辑 (防抖处理交由 saveSettingsDebounced)
            el.addEventListener("input", () => {
                settings[id] = el.value;
                saveSettingsDebounced();
            });
            el.addEventListener("change", () => {
                settings[id] = el.value;
                saveSettingsDebounced();
            });
        }
    });
}

function updateModeDisplay(isDblClick) {
    const inlineLabel = document.getElementById('label-mode-inline');
    const dblclickLabel = document.getElementById('label-mode-dblclick');
    const inlinePanel = document.getElementById('panel-mode-inline');
    const dblclickPanel = document.getElementById('panel-mode-dblclick');
    
    if (!inlineLabel || !dblclickLabel || !inlinePanel || !dblclickPanel) return;

    if (isDblClick) {
        inlineLabel.style.color = 'var(--zinao-chatu-text-secondary)';
        inlineLabel.style.fontWeight = 'normal';
        dblclickLabel.style.color = 'var(--zinao-chatu-accent-color)';
        dblclickLabel.style.fontWeight = 'bold';
        
        inlinePanel.style.display = 'none';
        dblclickPanel.style.display = 'block';
    } else {
        inlineLabel.style.color = 'var(--zinao-chatu-accent-color)';
        inlineLabel.style.fontWeight = 'bold';
        dblclickLabel.style.color = 'var(--zinao-chatu-text-secondary)';
        dblclickLabel.style.fontWeight = 'normal';
        
        inlinePanel.style.display = 'block';
        dblclickPanel.style.display = 'none';
    }
}
