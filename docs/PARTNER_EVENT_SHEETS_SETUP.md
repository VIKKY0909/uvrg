# UVR Channel Partner Event — Google Sheets setup

Form posts → `POST /api/partner-event-register` (when Express is running) → your **Apps Script web app** → tab **Registrations**.

On some live hosts the `/api/*` route is missing (browser shows **404**). The form then posts **directly** to the Apps Script `/exec` URL (`VITE_GOOGLE_SHEETS_WEBAPP_URL`). Redeploy the frontend after changing that URL.

## Why the form can say success but the Sheet looks empty

Very common causes:

1. You are looking at **Sheet1**, but rows go to a tab named **Registrations** (bottom of the spreadsheet).
2. The script is bound to / writing a **different** Google Sheet than the one you have open.
3. You updated the script but did **not** deploy a **New version** (old deployment still runs).

Fix: use an explicit **Spreadsheet ID** in the script (see below). After a successful submit, the API response / server log will show the spreadsheet name and URL.

## What I need from you (if it still fails)

1. Your Sheet URL, e.g. `https://docs.google.com/spreadsheets/d/ABC123.../edit`
2. Or just the ID part (`ABC123...`)

## Setup (do all steps)

1. Open the Google Sheet where you want registrations.
2. Copy the ID from the URL:  
   `https://docs.google.com/spreadsheets/d/`**`SPREADSHEET_ID`**`/edit`
3. **Extensions → Apps Script** → replace all code with [`partner-event-google-apps-script.js`](./partner-event-google-apps-script.js).
4. Set this line to your real ID:

```javascript
const SPREADSHEET_ID = 'your_id_here';
```

5. **Save**.
6. In the editor, select function **`testWriteOnce`** → **Run** → authorize if asked.  
   You should see a row **Editor Test Write** on the **Registrations** tab.
7. **Deploy → Manage deployments → Edit (pencil)**  
   - Execute as: **Me**  
   - Who has access: **Anyone**  
   - Version: **New version** → **Deploy**
8. Confirm `.env` has the `/exec` URL, then restart `npm run dev`.
9. Submit the form once. Check the **Registrations** tab (not Sheet1).

## Quick checks

| Check | Expected |
|--------|----------|
| Incognito open of `/exec` URL | JSON with `"configured": true` and your spreadsheet name |
| Bottom tabs in the Sheet | A tab named **Registrations** |
| After submit | New row; server log: `Partner event registration saved: ...` |

## Column layout

| Timestamp | Full Name | Phone | Email | Company | City | Preferred District | Partner Type | Experience Areas | Years Experience | How Did You Hear | Notes | Event Title | Event Date | Event Venue |
