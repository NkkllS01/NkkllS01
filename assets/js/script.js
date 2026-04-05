const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.panel');
const filters = document.querySelectorAll('.filter');
const projects = document.querySelectorAll('.project');
const yearElement = document.getElementById('year');
const toggleDetailsBtn = document.getElementById('toggle-details');
const sidebarDetails = document.getElementById('sidebar-details');

function activateTab(targetId) {
  tabs.forEach((tab) => {
    const isTarget = tab.dataset.tab === targetId;
    tab.classList.toggle('active', isTarget);
    tab.setAttribute('aria-selected', String(isTarget));
  });

  panels.forEach((panel) => {
    panel.classList.toggle('active', panel.id === targetId);
  });
}

tabs.forEach((tab) => {
  tab.addEventListener('click', () => activateTab(tab.dataset.tab));
});

filters.forEach((filterButton) => {
  filterButton.addEventListener('click', () => {
    const target = filterButton.dataset.filter;

    filters.forEach((button) => {
      button.classList.toggle('active', button === filterButton);
    });

    projects.forEach((project) => {
      const kind = project.dataset.kind;
      const shouldShow = target === 'all' || target === kind;
      project.classList.toggle('is-hidden', !shouldShow);
    });
  });
});

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

if (toggleDetailsBtn && sidebarDetails) {
  toggleDetailsBtn.addEventListener('click', () => {
    sidebarDetails.classList.toggle('is-collapsed');
    const expanded = !sidebarDetails.classList.contains('is-collapsed');
    toggleDetailsBtn.setAttribute('aria-expanded', String(expanded));
  });
}
