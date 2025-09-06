//"use strict"

function setBadgeText(enabled) {
    const text = enabled ? "ON" : "OFF"
    console.log(text)
    void chrome.action.setBadgeText({ text: text })
}

// Initialize checkbox and handle the ON/OFF switch
const checkbox = document.getElementById("enabled");
if (checkbox) {
    chrome.storage.sync.get("enabled", (data) => {
        checkbox.checked = !!data.enabled;
        console.log("Hello world from popup!")
        setBadgeText(data.enabled);
    });

    checkbox.addEventListener("change", (event) => {
        if (event.target instanceof HTMLInputElement) {
            const isChecked = event.target.checked;
            chrome.storage.sync.set({ "enabled": isChecked });
            setBadgeText(isChecked);
        }
    });
}

// Helper function to handle input elements and storage
function setupInput(elementId, storageKey) {
    const inputElement = document.getElementById(elementId);
    if (inputElement) {
        chrome.storage.sync.get(storageKey, (data) => {
            inputElement.value = data[storageKey] || "";
        });

        inputElement.addEventListener("change", (event) => {
            if (event.target instanceof HTMLInputElement) {
                chrome.storage.sync.set({ [storageKey]: event.target.value });
            }
        });
    }
}

// Set up input fields
setupInput("item0", "item0");
setupInput("item1", "item1");
setupInput("item2", "item2");
setupInput("item3", "item3");
setupInput("item4", "item4");
setupInput("item5", "item5");
setupInput("item6", "item6");
setupInput("item7", "item7");
setupInput("item8", "item8");
setupInput("item9", "item9");

