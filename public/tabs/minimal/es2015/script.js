function activateTab(tab, tabs, togglePanelVisibility) {
  // Unselect old tab
  const old = tabs.find(tab => tab.matches('[aria-selected=true]'))
  old.tabIndex = -1;
  old.classList.remove("tab--active");
  old.setAttribute("aria-selected", false);
  // Hide old panel
  togglePanelVisibility(old, false);
  // Select this tab
  tab.tabIndex = 0;
  tab.classList.add("tab--active");
  tab.setAttribute("aria-selected", true);
  // Show this tab's panel
  togglePanelVisibility(tab, true);
}
function hookTabWidget(tablist) {
  // Some necessary globals
  const tabs = Array.from(tablist.querySelectorAll("[role=tab]"));
  const togglePanelVisibility = (tab, isVisible) => {
    const panelId = tab.getAttribute("aria-controls");
    const panel = document.getElementById(panelId);
    panel.hidden = !isVisible;
  }
  const globalDir = getComputedStyle(tablist).direction === "ltr" ? 1 : -1;
  // Make sure direct tab selection works
  tabs.forEach((tab) => {
    tab.addEventListener("focus", () => activateTab(tab, tabs, togglePanelVisibility));
  });
  // Make sure arrow keys work
  tablist.addEventListener("keydown", (evt) => {
    // Ignore irrelevant key presses
    if (!['ArrowLeft', 'ArrowRight'].includes(evt.key)) {
      return;
    }
    // Stop propagation and native behaviour
    evt.stopPropagation();
    evt.preventDefault();
    // Get new index and focus that tab
    const currentIndex = tabs.findIndex(tab => tab.matches('[aria-selected=true]'));
    const deltaIndex = globalDir * (evt.key === 'ArrowRight' ? 1 : -1);
    const newIndex = Math.max(0, Math.min(tabs.length - 1, currentIndex + deltaIndex));
    tabs[newIndex].focus();
  });
}
hookTabWidget(document.querySelector("[role=tablist]"));
