# 📋 Evidence Upload & Documentation Feature

## Overview
Each checklist question now has an **Evidence & Documentation** section where auditors and factories can upload proof of compliance.

## Features

### 🔗 Two Upload Options
1. **Link**: Share external documentation (Google Drive, websites, etc.)
2. **File**: Upload documents directly (PDFs, images, reports, etc.)

### 📝 Evidence Information
For each evidence item, you can provide:
- **Title**: Description of the evidence
- **Notes**: Additional context about the proof
- **Source**: Link URL or uploaded file
- **Automatic tracking**: Date uploaded, file name

### 🎨 User Interface

#### Evidence Section (Always Visible)
```
📋 Evidence & Documentation [Show/Hide]
No evidence uploaded yet
```

#### Evidence Form (Click [Show/Hide] to expand)
```
┌─────────────────────────────────────────┐
│ Type: [Link ▼]                          │
│ Title/Description: [_____________]      │
│ Additional notes: [___________]         │
│                                         │
│ [Upload Evidence]                       │
└─────────────────────────────────────────┘
```

#### Evidence List (After Upload)
```
┌─ Evidence Item ────────────────────────┐
│ 📄 File or 🔗 Link [type badge]       │
│                                        │
│ Title: "Safety Inspection Report"      │
│ Link: https://example.com/safety.pdf   │
│ Notes: "Q2 2026 safety audit"          │
│ Uploaded: 6/13/2026                    │
│                                    [Delete]
└────────────────────────────────────────┘
```

## How to Use

### Upload a Link
1. Click **[Show/Hide]** to expand the Evidence form
2. Keep type as **Link**
3. Enter **Title** (e.g., "Safety Inspection Report")
4. Enter **URL** (e.g., https://drive.google.com/...)
5. Add **Notes** if needed (e.g., "Q2 2026 audit")
6. Click **[Upload Evidence]**

### Upload a File
1. Click **[Show/Hide]** to expand the Evidence form
2. Change type to **File**
3. Enter **Title** (e.g., "Wage Payment Slip")
4. Click **Choose file** and select a document
5. Add **Notes** if needed
6. Click **[Upload Evidence]**

### View Uploaded Evidence
- Evidence appears immediately below the form
- Shows type badge (📄 File or 🔗 Link)
- Click links to open in new tab
- Delete button to remove if needed

## Database Schema

```javascript
evidence: [{
  type: 'file' | 'link',           // Type of evidence
  title: String,                    // What is this evidence
  fileName: String,                 // For files: name of uploaded file
  fileUrl: String,                  // For files: base64 encoded content
  link: String,                     // For links: URL to external resource
  description: String,              // Additional notes/context
  uploadedAt: Date,                 // When added
  uploadedBy: String                // Who added it (default: "User")
}]
```

## API Endpoints

### Add Evidence
```
POST /api/checklist/:id/evidence
Body: {
  type: "link" | "file",
  title: "Evidence Title",
  link: "https://...",  // for links
  fileName: "doc.pdf",  // for files
  fileUrl: "base64...", // for files
  description: "Notes"
}
Response: Updated ChecklistItem with evidence array
```

### Delete Evidence
```
DELETE /api/checklist/:id/evidence/:evidenceId
Response: Updated ChecklistItem
```

## Use Cases

### For Auditors
- **Verify Compliance**: Review actual factory documents for proof
- **Build Cases**: Link to worker interviews, photos, records
- **Track Progress**: Monitor remediation with dated evidence
- **Share Findings**: Show auditor reports and inspection results

### For Factories
- **Prove Compliance**: Upload wage records, safety reports, training logs
- **Document Remediation**: Show corrective action documentation
- **Maintain Records**: Keep all compliance proof in one place
- **Support Assessment**: Provide context for auditor review

### Real-World Examples
- **Child Labour Prevention**: Upload age verification documents for all workers
- **Wage Compliance**: Upload payroll records, bank statements
- **Safety**: Upload inspection reports, equipment maintenance logs, training certificates
- **Working Hours**: Upload time sheets, scheduling records
- **Union Rights**: Upload collective bargaining agreements, meeting minutes

## Technical Details

### File Uploads
- Files are encoded as base64 and stored in MongoDB
- Supports any file type (PDF, PNG, JPG, DOC, XLS, etc.)
- File size handled by browser file input limits
- Data persists with the question document

### Links
- External URLs can point to any resource
- Works with Google Drive, Dropbox, websites, etc.
- No file size limits (external storage)
- Auditor clicks to open original resource

### Storage
- Evidence stored in MongoDB as nested array
- Each ChecklistItem can have multiple evidence items
- Evidence includes upload metadata (date, file name)
- Supports full CRUD operations (Create, Read, Update, Delete)

## Security Considerations
- Files stored as base64 in database (client-side upload)
- Links stored as URLs (external storage)
- File type validation done by browser
- No malware scanning (should add for production)
- Access control needed for different user roles

## Future Enhancements
1. **File Management**: Cloud storage (S3, GCS) instead of MongoDB
2. **Preview**: Show document previews in modal
3. **Versioning**: Track changes and previous versions
4. **Comments**: Auditor notes on specific evidence
5. **Filtering**: Show/hide evidence by type or date
6. **Approvals**: Auditor sign-off on submitted evidence
7. **Bulk Upload**: Upload multiple files at once
8. **Search**: Find questions with specific evidence

---

**Version**: 1.0  
**Released**: June 13, 2026  
**Supports**: All 259 checklist questions
