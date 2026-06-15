// Translation system
const translations = {
  en: {
    welcome: 'Welcome to DALYPICH',
    home: 'Home',
    about: 'About',
    contact: 'Contact',
    loading: 'Loading checklist...',
    noItems: 'No checklist items found.',
    commonProblemsLabel: 'Common Problems:',
    adviceLabel: 'Advice:',
    auditFindingsLabel: 'Audit Finding:',
    reminderLabel: 'Reminder:',
    evidence: 'Evidence & Documentation',
    addEvidence: '+ Add Evidence',
    noEvidenceUploaded: 'No evidence uploaded yet',
    evidenceType: 'Evidence Type:',
    link: '🔗 Link (Google Drive, Website, etc.)',
    file: '📄 File (Upload Document)',
    titleName: 'Title/Name:',
    url: 'URL:',
    selectFile: 'Select File:',
    additionalNotes: 'Additional Notes:',
    uploadEvidence: '📤 Upload Evidence',
    view: 'View',
    delete: 'Delete',
    failed: 'Failed to load checklist. Is the server running?'
  },
  km: {
    welcome: 'ស្វាគមន៍មកកាន់ DALYPICH',
    home: 'ទំព័រដើម',
    about: 'អំពី',
    contact: 'ទាក់ទង',
    loading: 'កំពុងផ្ទុកបញ្ជីពិនិត្យ...',
    noItems: 'រកមិនឃើញធាតុបញ្ជីពិនិត្យ។',
    commonProblemsLabel: 'បញ្ហាទូទៅ:',
    adviceLabel: 'ដំបូន្មាន:',
    auditFindingsLabel: 'ការស្វាគមន៍ឡើងវិញ៖',
    reminderLabel: 'ការរំលឹក៖',
    evidence: 'ភស្តុតាង និងឯកសារ',
    addEvidence: '+ បន្ថែមភស្តុតាង',
    noEvidenceUploaded: 'មិនមានភស្តុតាងដែលបានផ្ទុកឡើងនៅឡើយ',
    evidenceType: 'ប្រភេទភស្តុតាង:',
    link: '🔗 តំណភ្ជាប់ (Google Drive, គេហទំព័រ។ល។)',
    file: '📄 ឯកសារ (បង្កើនឯកសារ)',
    titleName: 'ចំណងជើង/ឈ្មោះ:',
    url: 'URL:',
    selectFile: 'ជ្រើសរើសឯកសារ:',
    additionalNotes: 'កំណត់ចំណាំបន្ថែម:',
    uploadEvidence: '📤 បង្កើនភស្តុតាង',
    view: 'មើល',
    delete: 'លុប',
    failed: 'បរាជ័យក្នុងការផ្ទុកបញ្ជីពិនិត្យ។ តើម៉ាស៊ីនមេកំពុងដំណើរការឬទេ?'
  }
};

let currentLanguage = localStorage.getItem('language') || 'en';

function changeLanguage(lang) {
  currentLanguage = lang;
  localStorage.setItem('language', lang);

  // Update language buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.remove('lang-btn-active');
  });
  event.target.classList.add('lang-btn-active');

  // Reload content
  loadChecklist();
  updatePageText();
}

function t(key) {
  return translations[currentLanguage][key] || translations['en'][key] || key;
}

function getTranslated(item, field) {
  if (currentLanguage === 'km' && item.translations && item.translations.km && item.translations.km[field]) {
    return item.translations.km[field];
  }
  return item[field] || '';
}

function updatePageText() {
  document.querySelector('h1').textContent = t('welcome');
  document.querySelectorAll('nav a')[0].textContent = t('home');
  document.querySelectorAll('nav a')[1].textContent = t('about');
  document.querySelectorAll('nav a')[2].textContent = t('contact');
  document.querySelector('footer p').textContent = `© 2026 DALYPICH. All rights reserved.`;
}

// Set initial language
document.addEventListener('DOMContentLoaded', () => {
  updatePageText();
  const langBtn = document.querySelector(`[onclick="changeLanguage('${currentLanguage}')"]`);
  if (langBtn) langBtn.classList.add('lang-btn-active');
});

async function loadChecklist() {
  const container = document.getElementById('checklistContent');
  container.innerHTML = `<div class="loading">${t('loading')}</div>`;

  try {
    const res = await fetch('/api/checklist');
    const items = await res.json();

    if (!items.length) {
      container.innerHTML = `<div class="loading">${t('noItems')}</div>`;
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

      // Get first item to access translation structure
      const firstItem = subItems[0];
      const subTitleDisplay = getTranslated(firstItem, 'subsection') || sub.title;

      html += `<div class="subsection-header" onclick="toggleSubsection('sub-${sub.number}')" style="cursor: pointer;">
        <span class="subsection-toggle">▼</span>
        <span class="subsection-number">${sub.number}.</span>
        <span class="subsection-title">${subTitleDisplay}</span>
        <span class="subsection-progress">${subPercent}% (${subCompleted} / ${subTotal})</span>
      </div>
      <div id="sub-${sub.number}" class="subsection-content" style="display: block;">`;

      Object.values(sub.categories).forEach(cat => {
        const catCompleted = cat.items.filter(i => i.progress === 100).length;
        const catTotal = cat.items.length;
        const catPercent = Math.round((catCompleted / catTotal) * 100);

        // Get first item to access translation structure
        const firstCatItem = cat.items[0];
        const catTitleDisplay = getTranslated(firstCatItem, 'category') || cat.title;

        html += `<div class="category-header">
          <span class="category-number">${cat.number}.</span>
          <span class="category-title">${catTitleDisplay}</span>
          <span class="category-progress">${catPercent}% (${catCompleted} / ${catTotal})</span>
        </div>`;

        html += '<div class="checklist-items">';
        cat.items.forEach(item => {
          const isComplete = item.progress === 100;
          const statusClass = isComplete ? 'complete' : 'incomplete';
          const statusText = `${item.progress}% (${item.completed}/${item.total})`;

          const legalHtml = getTranslated(item, 'legalReference')
            ? `<div class="legal-reference">${getTranslated(item, 'legalReference')}</div>`
            : '';
          const complianceHtml = getTranslated(item, 'compliancePoint')
            ? `<div class="compliance-point">${getTranslated(item, 'compliancePoint')}</div>`
            : '';
          const auditHtml = getTranslated(item, 'auditFindings')
            ? `<div class="audit-findings"><div class="audit-findings-label">🔍 ${t('auditFindingsLabel')}</div>${getTranslated(item, 'auditFindings')}</div>`
            : '';
          const commonProblemsHtml = getTranslated(item, 'commonProblems')
            ? `<div class="common-problems"><strong>${t('commonProblemsLabel')}</strong> ${getTranslated(item, 'commonProblems')}</div>`
            : '';
          const adviceHtml = getTranslated(item, 'advice')
            ? `<div class="advice"><div class="advice-label">💡 ${t('adviceLabel')}</div>${getTranslated(item, 'advice')}</div>`
            : '';
          const reminderHtml = getTranslated(item, 'reminder')
            ? `<div class="reminder"><div style="font-weight: bold; margin-bottom: 4px;">📌 ${t('reminderLabel')}</div>${getTranslated(item, 'reminder')}</div>`
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
                <div class="evidence-item-actions">
                  <button class="evidence-item-view" onclick="viewEvidence('${ev.type}', '${ev.type === 'file' ? ev.fileUrl : ev.link}', '${ev.fileName || ev.link}')">${t('view')}</button>
                  <button class="evidence-item-delete" onclick="deleteEvidence('${item._id}', '${ev._id}')">${t('delete')}</button>
                </div>
              </div>
            `;
          }).join('');

          const evidenceHtml = `
            <div class="evidence-section">
              <div class="evidence-header">
                <span class="evidence-icon">📋</span>
                <span>${t('evidence')}</span>
                <span class="evidence-toggle" onclick="toggleEvidenceForm('form-${item._id}')">[${t('addEvidence')}]</span>
              </div>

              <div id="form-${item._id}" class="evidence-form-container" style="display:none;">
                <div class="evidence-form-group">
                  <label class="form-label">${t('evidenceType')}</label>
                  <select id="type-${item._id}" class="form-select" onchange="updateEvidenceType('${item._id}')">
                    <option value="link">${t('link')}</option>
                    <option value="file">${t('file')}</option>
                  </select>
                </div>

                <div class="evidence-form-group">
                  <label class="form-label">${t('titleName')}</label>
                  <input type="text" id="title-${item._id}" class="form-input" placeholder="e.g., Payroll Record Q2 2026" />
                </div>

                <div class="evidence-form-group">
                  <label class="form-label" id="input-label-${item._id}">${t('url')}</label>
                  <input type="url" id="link-${item._id}" class="form-input" placeholder="https://drive.google.com/..." style="display:none;" />
                  <input type="file" id="file-${item._id}" class="form-input" style="display:none;" />
                </div>

                <div class="evidence-form-group">
                  <label class="form-label">${t('additionalNotes')}</label>
                  <textarea id="desc-${item._id}" class="form-textarea" placeholder="e.g., Q2 2026 wage records, verified with HR"></textarea>
                </div>

                <button class="btn-upload" onclick="uploadEvidence('${item._id}')">${t('uploadEvidence')}</button>
              </div>

              <div class="evidence-display-section">
                ${evidenceList ? `<div class="evidence-list">${evidenceList}</div>` : `<div class="no-evidence">📭 ${t('noEvidenceUploaded')}</div>`}
              </div>
            </div>
          `;

          const newBadge = item.isNewContent
            ? '<span class="new-badge">NEW - ILO Reference</span>'
            : '';
          const criticalBadge = item.reminder && item.reminder.includes('🚨 CRITICAL')
            ? '<span class="critical-badge">🚨 CRITICAL</span>'
            : '';
          const newClass = item.isNewContent ? ' new-content' : '';
          html += `<div class="checklist-item${newClass}">
            <div class="item-main">
              <span class="item-number">${item.questionNumber}.</span>
              <span class="item-question">${getTranslated(item, 'question')} ${newBadge} ${criticalBadge}</span>
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
      html += '</div>'; // Close subsection-content
    });

    container.innerHTML = html;
  } catch (err) {
    container.innerHTML = `<div class="error">${t('failed')}</div>`;
  }
}

function toggleSubsection(subsectionId) {
  const content = document.getElementById(subsectionId);
  const header = content.previousElementSibling;
  const toggle = header.querySelector('.subsection-toggle');

  if (content.style.display === 'none') {
    content.style.display = 'block';
    toggle.textContent = '▼';
    toggle.style.transform = 'rotate(0deg)';
  } else {
    content.style.display = 'none';
    toggle.textContent = '▶';
    toggle.style.transform = 'rotate(0deg)';
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
  const label = document.getElementById(`input-label-${itemId}`);

  if (type === 'link') {
    linkInput.style.display = 'block';
    fileInput.style.display = 'none';
    if (label) label.textContent = t('url');
  } else {
    linkInput.style.display = 'none';
    fileInput.style.display = 'block';
    if (label) label.textContent = t('selectFile');
  }
}

async function calculateProgressFromEvidence(itemId) {
  try {
    const res = await fetch(`/api/checklist/${itemId}`);
    const item = await res.json();

    // Calculate progress based on evidence
    let progress = 0;
    let completed = 0;

    if (item.evidence && item.evidence.length > 0) {
      progress = 50; // Evidence uploaded = 50%
      completed = 0;
    }

    // Update the item with new progress
    const updateRes = await fetch(`/api/checklist/${itemId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        progress: progress,
        completed: completed,
        total: 1
      })
    });

    if (updateRes.ok) {
      return true;
    }
  } catch (err) {
    console.error('Error calculating progress:', err);
  }
  return false;
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
          await calculateProgressFromEvidence(itemId);
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
      await calculateProgressFromEvidence(itemId);
      loadChecklist();
    } else {
      alert('Failed to upload evidence');
    }
  } catch (err) {
    console.error('Error uploading evidence:', err);
    alert('Error uploading evidence');
  }
}

function viewEvidence(type, url, name) {
  if (type === 'link') {
    window.open(url, '_blank');
  } else {
    // Show file preview in modal
    const modal = document.createElement('div');
    modal.className = 'evidence-modal';
    modal.id = 'evidence-modal';

    let content = '';
    const fileName = name.toLowerCase();

    // Check file type and show appropriate preview
    if (fileName.match(/\.(jpg|jpeg|png|gif|bmp)$/i)) {
      content = `<img src="${url}" alt="${name}" style="max-width: 100%; max-height: 80vh;">`;
    } else if (fileName.match(/\.pdf$/i)) {
      content = `<iframe src="${url}" style="width: 100%; height: 80vh; border: none;"></iframe>`;
    } else {
      // For other file types, show download link
      content = `
        <div style="text-align: center; padding: 40px;">
          <p>📁 File: <strong>${name}</strong></p>
          <p style="color: #7f8c8d; margin: 20px 0;">Preview not available for this file type</p>
          <a href="${url}" download="${name}" class="evidence-download-btn">Download File</a>
        </div>
      `;
    }

    modal.innerHTML = `
      <div class="evidence-modal-content">
        <div class="evidence-modal-header">
          <h3>${name}</h3>
          <button class="evidence-modal-close" onclick="closeEvidenceModal()">✕</button>
        </div>
        <div class="evidence-modal-body">
          ${content}
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    modal.style.display = 'flex';

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeEvidenceModal();
      }
    });
  }
}

function closeEvidenceModal() {
  const modal = document.getElementById('evidence-modal');
  if (modal) {
    modal.remove();
  }
}

async function deleteEvidence(itemId, evidenceId) {
  if (!confirm('Delete this evidence?')) return;

  try {
    const res = await fetch(`/api/checklist/${itemId}/evidence/${evidenceId}`, {
      method: 'DELETE'
    });

    if (res.ok) {
      await calculateProgressFromEvidence(itemId);
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
