/**
 * Palava Kalibari Trust — Membership registration automation
 * ----------------------------------------------------------------------------
 * WHAT THIS DOES (runs inside your Google account, not on the website):
 *   Every time someone submits the registration Google Form, this script:
 *     1. The response is already appended to the linked Google Sheet
 *        (that Sheet is your "master Excel" — download it any time via
 *         File → Download → Microsoft Excel (.xlsx)).
 *     2. Updates a live membership count on a "Dashboard" tab.
 *     3. Emails the admin (palavakalibaritrust@gmail.com) with the new entry.
 *
 * ONE-TIME SETUP
 *   a) Open the Google Form → Responses tab → "Link to Sheets" (creates the
 *      master response Sheet if you haven't already).
 *   b) In that Sheet: Extensions → Apps Script. Delete any sample code and
 *      paste THIS file. Save.
 *   c) Run the `setup` function once (Run ▸ setup). Approve the permission
 *      prompt (it needs Sheets + Send email on your behalf).
 *   d) Done. `setup` installs the on-form-submit trigger automatically.
 *
 * To test without a real submission: Run ▸ sendTestEmail.
 */

var ADMIN_EMAIL = 'palavakalibaritrust@gmail.com';
var DASHBOARD_SHEET = 'Dashboard';

/** Run this ONCE to install the trigger. */
function setup() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  // Remove duplicate triggers if setup is run again.
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (t.getHandlerFunction() === 'onFormSubmit') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('onFormSubmit')
    .forSpreadsheet(ss)
    .onFormSubmit()
    .create();
  updateDashboard_(ss); // seed the count from existing rows
  SpreadsheetApp.getUi &&
    Logger.log('Setup complete. Trigger installed and dashboard seeded.');
}

/** Fires automatically on every new form submission. */
function onFormSubmit(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var total = updateDashboard_(ss);

  // Build a readable summary of the submitted answers.
  var details = '';
  var nv = (e && e.namedValues) || {};
  Object.keys(nv).forEach(function (label) {
    var val = nv[label].join(', ');
    if (val) details += label + ': ' + val + '\n';
  });

  MailApp.sendEmail({
    to: ADMIN_EMAIL,
    subject: 'New PKT Membership Registration (#' + total + ')',
    body:
      'A new membership registration was received.\n\n' +
      details +
      '\nTotal registrations so far: ' +
      total +
      '\n\n— Palava Kalibari Trust website automation',
  });
}

/** Recomputes the member count and writes it to the Dashboard tab. */
function updateDashboard_(ss) {
  var responses = getResponsesSheet_(ss);
  var total = Math.max(0, responses.getLastRow() - 1); // minus header row

  var dash = ss.getSheetByName(DASHBOARD_SHEET);
  if (!dash) {
    dash = ss.insertSheet(DASHBOARD_SHEET);
    dash.getRange('A1').setValue('Total Members').setFontWeight('bold');
    dash.getRange('A2').setValue('Last Updated').setFontWeight('bold');
  }
  dash.getRange('B1').setValue(total);
  dash.getRange('B2').setValue(new Date());
  return total;
}

/** The first sheet is the form's linked response sheet. */
function getResponsesSheet_(ss) {
  var sheets = ss.getSheets();
  for (var i = 0; i < sheets.length; i++) {
    if (sheets[i].getName() !== DASHBOARD_SHEET) return sheets[i];
  }
  return sheets[0];
}

/** Optional: verify email delivery works. */
function sendTestEmail() {
  MailApp.sendEmail(
    ADMIN_EMAIL,
    'PKT automation — test email',
    'If you received this, the admin notification is working.'
  );
}
