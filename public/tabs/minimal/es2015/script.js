function activateTab(tab, tabs, panels) {
  // Unselect all tabs
  tabs.forEach((sibling) => {
    sibling.tabIndex = -1;
    sibling.classList.remove("tab--active");
    sibling.setAttribute("aria-selected", false);
  });
  // Hide all panels
  panels.forEach((panel) => {
    panel.hidden = true;
  });
  // Select this tab
  tab.tabIndex = 0;
  tab.classList.add("tab--active");
  tab.setAttribute("aria-selected", true);
  tab.focus();
  // Show this tab's panel
  const tabPanel = panels.find(
    (p) => p.id === tab.getAttribute("aria-controls")
  );
  tabPanel.hidden = false;
}

function hookTabWidget(tablist) {
  const tabs = Array.from(tablist.querySelectorAll("[role=tab]"));
  const panels = tabs.map((tab) =>
    document.getElementById(tab.getAttribute("aria-controls"))
  );
  const globalDir = getComputedStyle(tablist).direction === "ltr" ? 1 : -1;

  // Make sure direct tab selection works
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => activateTab(tab, tabs, panels));
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

    // Get new index and select the tab
    const currentIndex = tabs.findIndex(tab => tab.matches('[aria-selected=true]'));
    const deltaIndex = globalDir * (evt.key === 'ArrowRight' ? 1 : -1);
    const newIndex = Math.max(0, Math.min(tabs.length - 1, currentIndex + deltaIndex));
    activateTab(tabs[newIndex], tabs, panels);
  });
}

hookTabWidget(document.querySelector("[role=tablist]"));
