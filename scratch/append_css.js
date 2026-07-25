const fs = require('fs');
let css = fs.readFileSync('styles/main.css', 'utf8');

const newCss = `
/* Model Tabs CSS */
.zinao-chatu-model-tabs-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 15px;
    border-bottom: 1px solid var(--zinao-chatu-border-color);
}
.zinao-chatu-model-tab-label {
    padding: 8px 16px;
    cursor: pointer;
    border-radius: 4px 4px 0 0;
    font-weight: normal;
    color: var(--zinao-chatu-text-secondary);
    transition: all 0.2s ease;
    margin-bottom: -1px; /* overlap border */
    border: 1px solid transparent;
}
.zinao-chatu-model-tab-label:hover {
    background-color: var(--zinao-chatu-bg-tertiary);
}
input[name="model_tab_select"]:checked + .zinao-chatu-model-tab-label {
    background-color: var(--zinao-chatu-bg-primary, #1e1e2e);
    color: var(--zinao-chatu-accent-color);
    font-weight: bold;
    border: 1px solid var(--zinao-chatu-border-color);
    border-bottom-color: var(--zinao-chatu-bg-primary, #1e1e2e);
}
.model-tab-break {
    flex-basis: 100%;
    height: 0;
    margin: 0;
}
.model-tab-content {
    display: none;
    width: 100%;
    padding-top: 15px;
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
    console.log('CSS appended to main.css');
}
