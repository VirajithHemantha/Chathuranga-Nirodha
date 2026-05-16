/**
 * Google Apps Script Web App for Wedding RSVP + Wishes
 *
 * Spreadsheet:
 * https://docs.google.com/spreadsheets/d/10zu_YrxK-DuJsZxYtIG5eSnybZ3d-KM6G1L_0cEjfE0/edit?usp=sharing
 *
 * Automatically creates required sheets and headers if they do not exist:
 * - rsvp
 * - wish
 */

const SPREADSHEET_ID = "10zu_YrxK-DuJsZxYtIG5eSnybZ3d-KM6G1L_0cEjfE0";
const RSVP_SHEET_NAME = "rsvp";
const WISH_SHEET_NAME = "wish";

function doPost(e) {
  return handleRequest_(e);
}

function doGet(e) {
  return handleRequest_(e);
}

function handleRequest_(e) {
  try {
    const params = parseParams_(e);
    const action = String(params.action || "").trim().toLowerCase();

    if (!action) {
      return jsonResponse_({ ok: false, message: "Missing action parameter" });
    }

    if (action === "rsvp") {
      return jsonResponse_(saveRsvp_(params));
    }

    if (action === "wish") {
      return jsonResponse_(saveWish_(params));
    }

    return jsonResponse_({ ok: false, message: "Invalid action parameter: " + action });
  } catch (error) {
    return jsonResponse_({
      ok: false,
      message: error && error.message ? error.message : "Unexpected error occurred",
    });
  }
}

function saveRsvp_(params) {
  const sheet = getSheet_(RSVP_SHEET_NAME);

  ensureHeader_(sheet, [
    "Timestamp",
    "Name",
    "Area / City",
    "Number of Guests",
    "Attendance Status",
    "Dietary Notes",
  ]);

  const name = String(params.name || "").trim();
  const place = String(params.place || "").trim();
  const attending = String(params.attending || "").trim();
  const guests = String(params.guests || "").trim();
  const dietaryNotes = String(params.dietaryNotes || "").trim();

  if (!name) {
    return { ok: false, message: "Name is required" };
  }

  const attendance = attending === "no" ? "Regretfully Declined" : "Delightfully Attending";

  sheet.appendRow([
    new Date(),
    name,
    place,
    guests || "1",
    attendance,
    dietaryNotes,
  ]);

  return { ok: true, message: "RSVP saved successfully" };
}

function saveWish_(params) {
  const sheet = getSheet_(WISH_SHEET_NAME);

  ensureHeader_(sheet, ["Timestamp", "Guest Name", "Wish / Message"]);

  const name = String(params.name || "").trim();
  const message = String(params.message || "").trim();

  if (!name || !message) {
    return { ok: false, message: "Name and message are required" };
  }

  sheet.appendRow([new Date(), name, message]);

  return { ok: true, message: "Wish saved successfully" };
}

function getSheet_(sheetName) {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = spreadsheet.getSheetByName(sheetName);

  if (!sheet) {
    // Automatically create the sheet if it doesn't exist
    sheet = spreadsheet.insertSheet(sheetName);
  }

  return sheet;
}

function ensureHeader_(sheet, headers) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    try {
      // Format header row for a clean, professional look
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#f3f4f6");
      headerRange.setFontColor("#111827");
      sheet.setFrozenRows(1);
      sheet.autoResizeColumns(1, headers.length);
    } catch (err) {
      // Ignore formatting errors if any
    }
  }
}

function parseParams_(e) {
  const params = {};

  // 1. Get simple parameters from URL or form-data (e.parameter)
  if (e && e.parameter) {
    Object.keys(e.parameter).forEach(key => {
      params[key] = e.parameter[key];
    });
  }

  // 2. Fallback to e.parameters if something was missed (multi-value)
  if (e && e.parameters) {
    Object.keys(e.parameters).forEach(key => {
      if (!params[key]) {
        params[key] = e.parameters[key][0];
      }
    });
  }

  // 3. Handle POST body content if it exists
  if (e && e.postData && e.postData.contents) {
    const contents = String(e.postData.contents || "").trim();
    if (contents) {
      try {
        if (contents.charAt(0) === "{" || contents.charAt(0) === "[") {
          const json = JSON.parse(contents);
          Object.assign(params, json);
        } else {
          // Assume form-encoded if not JSON
          const parsed = parseFormEncoded_(contents);
          Object.assign(params, parsed);
        }
      } catch (err) {
        // Ignore parsing errors, keep what we have from e.parameter
      }
    }
  }

  return params;
}

function parseFormEncoded_(raw) {
  const result = {};
  const pairs = String(raw || "").split("&");

  for (var i = 0; i < pairs.length; i++) {
    if (!pairs[i]) continue;
    var parts = pairs[i].split("=");
    var key = decodeURIComponent((parts[0] || "").replace(/\+/g, " "));
    var value = decodeURIComponent((parts.slice(1).join("=") || "").replace(/\+/g, " "));
    if (key) {
      result[key] = value;
    }
  }

  return result;
}

function jsonResponse_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
