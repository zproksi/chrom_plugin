"use strict"

let enabled = true
const keys = ["enabled", "item0", "item1", "item2", "item3", "item4","item5", "item6", "item7", "item8", "item9"]

function removeDivsByClass(className) {
  if (className.trim() === "") {
    return // Stop function execution
  }
  const formattedClassName = className.replace(/ /g, "."); // Replace spaces with dots
//  console.log(`call ${className} ${formattedClassName}`);
  const divs = document.querySelectorAll(`div.${formattedClassName}`);
  if (divs.length > 0) {
    divs.forEach((div) => {
      div.remove(); // Remove each div
    });
  } else {
    removeElementById(className)
  }
}

function removeElementById(elementId) {
  // Check if elementId is valid
  if (elementId.trim() === "") {
    return // Stop function execution
  }

  // Find the element by its ID
  const element = document.getElementById(elementId);

  // Check if the element exists
  if (element) {
    element.remove();  // Remove the element
    console.log(`Removed element with id: ${elementId}`);
  }
}

// "Layout-sc-1xcs6mc-0 ScLayoutCssVars-sc-1pn65j5-0 ibyWQL mzLVD tw-root--theme-light"
// "Layout-sc-1xcs6mc-0 jWeQYG"
// twilight-sticky-footer-root
chrome.storage.sync.get(keys, (data) => {
  if (data.enabled === false) {enabled = false}

  if (enabled) {

    for (let i = 0; i < 10; i++) {
      removeDivsByClass(data[`item${i}`]); // removeDivsByClass(data.item0);
    }
  }
})

// Ensure the content script works once the DOM is fully loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeContentScript);
} else {
  initializeContentScript();
}

// Define the function
function initializeContentScript() {
  // Remove elements with saved class names
  chrome.storage.sync.get(keys, (data) => {
    if (data.enabled) {
      for (let i = 0; i < 10; i++) {
        removeDivsByClass(data[`item${i}`]); // removeDivsByClass(data.item0);
      }
    }
  });
}

setInterval(initializeContentScript, 3505);
