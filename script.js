async function loadChecklist() {
  const container = document.getElementById('checklistContent');
  container.innerHTML = '<div class="loading">Loading checklist...</div>';

  try {
    const res = await fetch('/api/checklist');
    const items = await res.json();

    if (!items.length) {
      container.innerHTML = '<div class="loading">No checklist items found.</div>';
      return;
    }

    const totalCompleted = items.filter(i => i.progress === 100).length;
    const totalItems = items.length;
    const totalPercent = Math.round((totalCompleted / totalItems) * 100);
    document.getElementById('sectionProgress').textContent = `${totalPercent}% (${totalCompleted} / ${totalItems})`;

    const subsections = {};
    items.forEach(item => {
      if (!subsections[item.subsectionNumber]) {
        subsections[item.subsectionNumber] = {
          title: item.subsection,
          number: item.subsectionNumber,
          categories: {},
        };
      }
      const sub = subsections[item.subsectionNumber];
      if (!sub.categories[item.categoryNumber]) {
        sub.categories[item.categoryNumber] = {
          title: item.category,
          number: item.categoryNumber,
          items: [],
        };
      }
      sub.categories[item.categoryNumber].items.push(item);
    });

    let html = '';

    Object.values(subsections).forEach(sub => {
      const subItems = Object.values(sub.categories).flatMap(c => c.items);
      const subCompleted = subItems.filter(i => i.progress === 100).length;
      const subTotal = subItems.length;
      const subPercent = Math.round((subCompleted / subTotal) * 100);

      html += `<div class="subsection-header">
        <span class="subsection-number">${sub.number}.</span>
        <span class="subsection-title">${sub.title}</span>
        <span class="subsection-progress">${subPercent}% (${subCompleted} / ${subTotal})</span>
      </div>`;

      Object.values(sub.categories).forEach(cat => {
        const catCompleted = cat.items.filter(i => i.progress === 100).length;
        const catTotal = cat.items.length;
        const catPercent = Math.round((catCompleted / catTotal) * 100);

        html += `<div class="category-header">
          <span class="category-number">${cat.number}.</span>
          <span class="category-title">${cat.title}</span>
          <span class="category-progress">${catPercent}% (${catCompleted} / ${catTotal})</span>
        </div>`;

        html += '<div class="checklist-items">';
        cat.items.forEach(item => {
          const isComplete = item.progress === 100;
          const statusClass = isComplete ? 'complete' : 'incomplete';
          const statusText = `${item.progress}% (${item.completed}/${item.total})`;

          const legalHtml = item.legalReference
            ? `<div class="legal-reference">${item.legalReference}</div>`
            : '';
          const complianceHtml = item.compliancePoint
            ? `<div class="compliance-point">${item.compliancePoint}</div>`
            : '';
          const auditHtml = item.auditFindings
            ? `<div class="audit-findings"><div class="audit-findings-label">🔍 Audit Finding:</div>${item.auditFindings}</div>`
            : '';
          const commonProblemsHtml = item.commonProblems
            ? `<div class="common-problems"><strong>Common Problems:</strong> ${item.commonProblems}</div>`
            : '';
          const adviceHtml = item.advice
            ? `<div class="advice"><div class="advice-label">💡 Advice:</div>${item.advice}</div>`
            : '';
          const reminderHtml = item.reminder
            ? `<div class="reminder">${item.reminder}</div>`
            : '';
          const newBadge = item.isNewContent
            ? '<span class="new-badge">NEW - ILO Reference</span>'
            : '';
          const newClass = item.isNewContent ? ' new-content' : '';
          html += `<div class="checklist-item${newClass}">
            <div class="item-main">
              <span class="item-number">${item.questionNumber}.</span>
              <span class="item-question">${item.question} ${newBadge}</span>
              <span class="item-progress ${statusClass}">${statusText}</span>
              <div class="progress-bar-container">
                <div class="progress-bar ${statusClass}" style="width: ${item.progress}%"></div>
              </div>
            </div>
            ${legalHtml}
            ${complianceHtml}
            ${auditHtml}
            ${commonProblemsHtml}
            ${adviceHtml}
            ${reminderHtml}
          </div>`;
        });
        html += '</div>';
      });
    });

    container.innerHTML = html;
  } catch (err) {
    container.innerHTML = '<div class="error">Failed to load checklist. Is the server running?</div>';
  }
}

document.addEventListener('DOMContentLoaded', loadChecklist);
