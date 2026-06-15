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

          // Evidence section
          const evidenceList = (item.evidence || []).map(ev => {
            const typeLabel = ev.type === 'file' ? '📄 File' : '🔗 Link';
            const content = ev.type === 'file'
              ? `<a href="${ev.fileUrl}" target="_blank" class="evidence-item-link">${ev.fileName}</a>`
              : `<a href="${ev.link}" target="_blank" class="evidence-item-link">${ev.link}</a>`;
            return `
              <div class="evidence-item">
                <div class="evidence-item-content">
                  <div class="evidence-item-type ${ev.type}">${typeLabel}</div>
                  <div class="evidence-item-title">${ev.title}</div>
                  <div>${content}</div>
                  ${ev.description ? `<div class="evidence-item-description">${ev.description}</div>` : ''}
                  <div class="evidence-item-date">${new Date(ev.uploadedAt).toLocaleDateString()}</div>
                </div>
                <button class="evidence-item-delete" onclick="deleteEvidence('${item._id}', '${ev._id}')">Delete</button>
              </div>
            `;
          }).join('');

          const evidenceHtml = `
            <div class="evidence-section">
              <div class="evidence-header">
                <span class="evidence-icon">📋</span>
                <span>Evidence & Documentation</span>
                <span class="evidence-toggle" onclick="toggleEvidenceForm('form-${item._id}')">[Show/Hide]</span>
              </div>
              <div id="form-${item._id}" style="display:none;">
                <div class="evidence-upload-form">
                  <select id="type-${item._id}" onchange="updateEvidenceType('${item._id}')">
                    <option value="link">Link</option>
                    <option value="file">File</option>
                  </select>
                  <input type="text" id="title-${item._id}" placeholder="Title/Description" />
                  <input type="url" id="link-${item._id}" placeholder="https://example.com" style="display:none;" />
                  <input type="file" id="file-${item._id}" style="display:none;" />
                  <textarea id="desc-${item._id}" placeholder="Additional notes"></textarea>
                  <button onclick="uploadEvidence('${item._id}')">Upload Evidence</button>
                </div>
              </div>
              ${evidenceList ? `<div class="evidence-list">${evidenceList}</div>` : '<div style="color: #95a5a6; font-size: 12px; padding: 8px;">No evidence uploaded yet</div>'}
            </div>
          `;

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
            ${evidenceHtml}
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

function toggleEvidenceForm(formId) {
  const form = document.getElementById(formId);
  if (form) {
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
  }
}

function updateEvidenceType(itemId) {
  const type = document.getElementById(`type-${itemId}`).value;
  const linkInput = document.getElementById(`link-${itemId}`);
  const fileInput = document.getElementById(`file-${itemId}`);

  if (type === 'link') {
    linkInput.style.display = 'block';
    fileInput.style.display = 'none';
  } else {
    linkInput.style.display = 'none';
    fileInput.style.display = 'block';
  }
}

async function uploadEvidence(itemId) {
  const type = document.getElementById(`type-${itemId}`).value;
  const title = document.getElementById(`title-${itemId}`).value;
  const description = document.getElementById(`desc-${itemId}`).value;

  if (!title) {
    alert('Please enter a title for the evidence');
    return;
  }

  try {
    let payload = { type, title, description };

    if (type === 'link') {
      const link = document.getElementById(`link-${itemId}`).value;
      if (!link) {
        alert('Please enter a URL');
        return;
      }
      payload.link = link;
    } else {
      const fileInput = document.getElementById(`file-${itemId}`);
      if (!fileInput.files.length) {
        alert('Please select a file');
        return;
      }

      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = async (e) => {
        payload.fileName = file.name;
        payload.fileUrl = e.target.result;

        const res = await fetch(`/api/checklist/${itemId}/evidence`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (res.ok) {
          loadChecklist();
        } else {
          alert('Failed to upload evidence');
        }
      };
      reader.readAsDataURL(file);
      return;
    }

    const res = await fetch(`/api/checklist/${itemId}/evidence`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      loadChecklist();
    } else {
      alert('Failed to upload evidence');
    }
  } catch (err) {
    console.error('Error uploading evidence:', err);
    alert('Error uploading evidence');
  }
}

async function deleteEvidence(itemId, evidenceId) {
  if (!confirm('Delete this evidence?')) return;

  try {
    const res = await fetch(`/api/checklist/${itemId}/evidence/${evidenceId}`, {
      method: 'DELETE'
    });

    if (res.ok) {
      loadChecklist();
    } else {
      alert('Failed to delete evidence');
    }
  } catch (err) {
    console.error('Error deleting evidence:', err);
    alert('Error deleting evidence');
  }
}

document.addEventListener('DOMContentLoaded', loadChecklist);
