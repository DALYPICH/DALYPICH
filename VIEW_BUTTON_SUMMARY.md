# 👁️ View Button for Evidence - Feature Summary

## Overview
Each uploaded evidence item now has a **View** button (green) next to the Delete button to preview or open the evidence.

## View Button Features

### 🔗 For Links
- Clicks **View** → Opens URL in new browser tab
- Quick access to external documentation
- Works with Google Drive, Dropbox, websites, etc.

### 📸 For Images (JPG, PNG, GIF, BMP)
- Clicks **View** → Opens preview modal
- Shows image at full quality
- Fits to screen (max 90% viewport)
- Click X button or outside to close

### 📄 For PDFs
- Clicks **View** → Opens embedded PDF in modal
- Full PDF viewer with scrolling
- Click X button or outside to close
- Professional document preview

### 📁 For Other Files (DOCX, XLSX, TXT, etc.)
- Clicks **View** → Shows download button in modal
- Message: "Preview not available for this file type"
- Download button to save file locally
- File name displayed for reference

## UI Layout

### Evidence Item (After Upload)
```
┌─────────────────────────────────────────┐
│ 📄 File Badge    Title: "Safety Report" │
│                                         │
│ Link: safety_2026.pdf                   │
│ Notes: "Q2 2026 audit"                  │
│ Date: 6/13/2026                         │
│                                    [View]
│                                    [Delete]
└─────────────────────────────────────────┘
```

### Preview Modal (For Images & PDFs)
```
┌─────────────────────────────────────────┐
│ safety_2026.pdf                      [X]│
├─────────────────────────────────────────┤
│                                         │
│              [Document Preview]         │
│              [Scrollable for PDFs]      │
│                                         │
│                                         │
└─────────────────────────────────────────┘
```

### Download Modal (For Other Files)
```
┌─────────────────────────────────────────┐
│ invoice_2026.xlsx                    [X]│
├─────────────────────────────────────────┤
│                                         │
│              📁 File: invoice_2026.xlsx │
│                                         │
│    Preview not available for this type  │
│                                         │
│            [Download File]              │
│                                         │
└─────────────────────────────────────────┘
```

## How It Works

### Step 1: Upload Evidence
```
1. Click [Show/Hide] to expand form
2. Enter title and source
3. Click [Upload Evidence]
4. Evidence appears in list below
```

### Step 2: View Evidence
```
1. Find evidence item in list
2. Click green [View] button
3. Modal or new tab opens with preview
4. View/read/download file
5. Click X or click outside to close
```

## File Type Support

| File Type | Extension | Preview | Action |
|-----------|-----------|---------|--------|
| **Links** | - | Opens tab | Opens in new tab |
| **Images** | .jpg, .png, .gif, .bmp | Yes | Modal preview |
| **PDF** | .pdf | Yes | PDF viewer modal |
| **Word** | .doc, .docx | No | Download button |
| **Excel** | .xls, .xlsx | No | Download button |
| **Text** | .txt | No | Download button |
| **Other** | Any | No | Download button |

## Technical Details

### Image Preview
- Supported formats: JPG, JPEG, PNG, GIF, BMP
- Display: Responsive, maintains aspect ratio
- Max size: 90% of viewport
- Scrollable if larger than viewport

### PDF Preview
- Uses browser PDF viewer (if available)
- Embedded in modal with full controls
- Scrollable pages
- Print-friendly

### File Download
- Shows file name clearly
- Download button for any unsupported format
- Single-click download
- File saves to default downloads folder

### Modal Behavior
- Dark overlay (rgba(0,0,0,0.7))
- Centered on screen
- Fixed positioning (stays in place on scroll)
- Click outside to close
- X button in top right to close
- Smooth modal appearance

## User Experience

### Auditor Benefits
✅ Quick preview of compliance documentation  
✅ No need to leave application to view files  
✅ Professional modal presentation  
✅ All evidence types supported  

### Factory Benefits
✅ Easy document management  
✅ Proof of uploads visible immediately  
✅ Can review uploaded files before submitting  
✅ Organize supporting documentation  

## Button Styling

### View Button
- Color: Green (#27ae60)
- Size: Small (11px font)
- Padding: 4px 8px
- Position: Above Delete button
- Hover: Darker green (#229954)

### Delete Button
- Color: Red (#e74c3c)
- Size: Small (11px font)
- Position: Below View button
- Requires confirmation

## Examples

### View Image Evidence
```
User uploads: safety_inspection.jpg
Clicks View → Image opens in modal
Can see factory safety inspection photo
Clicks X → Returns to checklist
```

### View PDF Evidence
```
User uploads: wage_audit_2026.pdf
Clicks View → PDF opens in modal
Can scroll through document pages
Can print if needed
Clicks X → Returns to checklist
```

### View External Link
```
User adds: https://docs.google.com/...
Clicks View → Opens link in new tab
Auditor reviews Google Sheets/Docs
Can see shared documentation
```

### View Unsupported File
```
User uploads: employee_roster.xlsx
Clicks View → Modal shows download option
File name: employee_roster.xlsx
Clicks Download → File saved locally
```

---

**Version**: 1.0  
**Released**: June 13, 2026  
**Status**: Production Ready
