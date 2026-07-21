/**
 * UVR Green Energies — Channel Partner Event → Google Sheet
 *
 * SETUP:
 * 1. Open YOUR target Google Sheet (the one where you want rows).
 * 2. Copy the Spreadsheet ID from the browser URL:
 *      https://docs.google.com/spreadsheets/d/ <<< THIS_ID >>> /edit
 * 3. Paste it into SPREADSHEET_ID below (required — do not leave blank).
 * 4. Extensions → Apps Script → replace code with this file → Save.
 * 5. Deploy → Manage deployments → Edit → New version
 *      Execute as: Me | Who has access: Anyone → Deploy
 * 6. Put the /exec URL in .env as GOOGLE_SHEETS_WEBAPP_URL and restart the server.
 *
 * Rows appear on the tab named "Registrations" (created automatically).
 */

/** REQUIRED: ID from your Sheet URL between /d/ and /edit */
const SPREADSHEET_ID = 'PASTE_YOUR_SPREADSHEET_ID_HERE';

const SHEET_NAME = 'Registrations';

const HEADERS = [
  'Timestamp',
  'Full Name',
  'Phone',
  'Email',
  'Company',
  'City',
  'Preferred District',
  'Partner Type',
  'Experience Areas',
  'Years Experience',
  'How Did You Hear',
  'Notes',
  'Event Title',
  'Event Date',
  'Event Venue',
];

function doPost(e) {
  try {
    if (!SPREADSHEET_ID || SPREADSHEET_ID.indexOf('PASTE_') === 0) {
      return json_({
        result: 'error',
        error: 'Set SPREADSHEET_ID in Apps Script to your Google Sheet ID, then redeploy (New version).',
      });
    }

    if (!e || !e.postData || !e.postData.contents) {
      return json_({ result: 'error', error: 'Empty POST body' });
    }

    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = getOrCreateSheet_(ss);

    ensureHeaders_(sheet);

    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.fullName || '',
      data.phone || '',
      data.email || '',
      data.company || '',
      data.city || '',
      data.preferredDistrict || '',
      data.partnerType || '',
      data.experienceAreas || '',
      data.yearsExperience || '',
      data.hearAbout || '',
      data.notes || '',
      data.eventTitle || '',
      data.eventDate || '',
      data.eventVenue || '',
    ]);

    SpreadsheetApp.flush();

    return json_({
      result: 'success',
      spreadsheetName: ss.getName(),
      spreadsheetUrl: ss.getUrl(),
      sheetName: sheet.getName(),
      rowCount: sheet.getLastRow(),
    });
  } catch (err) {
    return json_({ result: 'error', error: String(err) });
  }
}

function doGet() {
  try {
    if (!SPREADSHEET_ID || SPREADSHEET_ID.indexOf('PASTE_') === 0) {
      return json_({
        result: 'ok',
        configured: false,
        message: 'Set SPREADSHEET_ID in the script, Save, then Deploy → New version.',
      });
    }
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    return json_({
      result: 'ok',
      configured: true,
      spreadsheetName: ss.getName(),
      spreadsheetUrl: ss.getUrl(),
      message: 'UVR Partner Event endpoint is live. Rows go to the Registrations tab.',
    });
  } catch (err) {
    return json_({ result: 'error', error: String(err) });
  }
}

/** Run this once from the Apps Script editor (Run ▶) to verify writing works. */
function testWriteOnce() {
  const fakeEvent = {
    postData: {
      contents: JSON.stringify({
        timestamp: new Date().toISOString(),
        fullName: 'Editor Test Write',
        phone: '9999999999',
        email: 'test@uvr.local',
        company: 'UVR Test',
        city: 'Vadodara',
        preferredDistrict: 'Vadodara',
        partnerType: 'New Channel Partner',
        experienceAreas: 'Residential Solar',
        yearsExperience: '1',
        hearAbout: 'Manual test',
        notes: 'Created by testWriteOnce()',
        eventTitle: 'test',
        eventDate: 'test',
        eventVenue: 'test',
      }),
    },
  };
  const out = doPost(fakeEvent);
  Logger.log(out.getContent());
}

function getOrCreateSheet_(ss) {
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  return sheet;
}

function ensureHeaders_(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
