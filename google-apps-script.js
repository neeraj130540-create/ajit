/**
 * ============================================================
 * AJIT ENTERPRISES - Google Apps Script for Google Sheets
 * ============================================================
 *
 * SETUP INSTRUCTIONS:
 * -------------------
 * 1. Open Google Sheets (sheets.google.com) → Create a new sheet
 *    Name it: "Ajit Enterprises - Service Bookings"
 *
 * 2. Go to Extensions → Apps Script
 *
 * 3. Delete any existing code in the editor
 *
 * 4. Copy and paste ALL of this code into the editor
 *
 * 5. Click the Save icon (or Ctrl+S)
 *
 * 6. Click "Deploy" → "New Deployment"
 *    - Type: "Web app"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 *    → Click "Deploy"
 *    → Authorize the permissions when prompted
 *
 * 7. COPY the "Web app URL" that appears
 *
 * 8. Open: src/app/services/sheets.service.ts
 *    Replace the APPS_SCRIPT_URL value with your copied URL
 *
 * That's it! Your bookings will now be saved to Google Sheets.
 * ============================================================
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Add header row if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp',
        'Full Name',
        'Mobile Number',
        'Email Address',
        'Address',
        'Appliance Type',
        'Service Category',
        'Brand',
        'Problem Description',
        'Preferred Date',
        'Time Slot',
        'Status',
      ]);

      // Style the header
      var headerRange = sheet.getRange(1, 1, 1, 12);
      headerRange.setBackground('#1565C0');
      headerRange.setFontColor('#FFFFFF');
      headerRange.setFontWeight('bold');
      headerRange.setFontSize(11);
      sheet.setFrozenRows(1);

      // Set column widths
      sheet.setColumnWidth(1, 160); // Timestamp
      sheet.setColumnWidth(2, 150); // Name
      sheet.setColumnWidth(3, 130); // Phone
      sheet.setColumnWidth(4, 200); // Email
      sheet.setColumnWidth(5, 250); // Address
      sheet.setColumnWidth(6, 180); // Service Type
      sheet.setColumnWidth(7, 180); // Category
      sheet.setColumnWidth(8, 120); // Brand
      sheet.setColumnWidth(9, 300); // Problem
      sheet.setColumnWidth(10, 130); // Date
      sheet.setColumnWidth(11, 160); // Time Slot
      sheet.setColumnWidth(12, 100); // Status
    }

    // Parse the POST body
    var data = JSON.parse(e.postData.contents);

    // Append the booking data
    sheet.appendRow([
      new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      data.name || '',
      data.phone || '',
      data.email || '',
      data.address || '',
      data.serviceType || '',
      data.serviceCategory || '',
      data.brand || '',
      data.problem || '',
      data.preferredDate || '',
      data.timeSlot || '',
      'Pending', // Default status
    ]);

    // Alternate row colors for readability
    var lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      var rowRange = sheet.getRange(lastRow, 1, 1, 12);
      if (lastRow % 2 === 0) {
        rowRange.setBackground('#EBF3FF');
      } else {
        rowRange.setBackground('#FFFFFF');
      }
    }

    return ContentService.createTextOutput(
      JSON.stringify({
        status: 'success',
        message: 'Booking saved successfully!',
        row: lastRow,
      })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({
        status: 'error',
        message: error.toString(),
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// GET handler for testing
function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({
      status: 'ok',
      message: 'Ajit Enterprises Booking API is running.',
    })
  ).setMimeType(ContentService.MimeType.JSON);
}
