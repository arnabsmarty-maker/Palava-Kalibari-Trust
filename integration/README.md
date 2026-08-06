# PKT Registration & Payment — Integration Guide

The website is a **static app with no backend**, so it cannot itself write to a
spreadsheet or send email. Registration therefore flows through your **Google
Form**, and a small **Apps Script** does the record-keeping and admin alerts.

## How it works end-to-end

1. On the site → **Membership → Register & Contribute**:
   - **Step 1 – Pay:** the member pays via the UPI QR (or Razorpay once you add
     the link). The site never claims "payment successful".
   - **Step 2 – Register:** the member opens your Google Form (embedded in a
     modal, or in a new tab) and submits their details **plus a screenshot of
     the payment**.
2. Google Forms appends the entry to its **linked Google Sheet = your master
   Excel** (download any time: File → Download → `.xlsx`).
3. The Apps Script (`AppsScript.gs`) fires on each submission and:
   - updates the **membership count** on a `Dashboard` tab, and
   - emails **palavakalibaritrust@gmail.com** with the new entry.

## Setup checklist (one time)

- [ ] **Form → payment proof:** add a **File upload** question ("Upload payment
      screenshot") to the form. (File-upload questions require the submitter to
      be signed in to Google — that's a Google requirement, not ours.)
- [ ] **Form → Responses → Link to Sheets** to create the master sheet.
- [ ] In that sheet: **Extensions → Apps Script**, paste `AppsScript.gs`, Save,
      then **Run ▸ setup** and approve permissions. (Installs the trigger + email.)
- [ ] Optional: **Run ▸ sendTestEmail** to confirm the admin alert works.

## Website configuration knobs

All in `src/App.jsx` (near the top, "Registration & payment integration"):

| Constant | Purpose |
|---|---|
| `REGISTRATION_FORM_ID` | Your Google Form id (already set to your form). |
| `ADMIN_EMAIL` | Admin address shown on the site (already `palavakalibaritrust@gmail.com`). |
| `UPI_VPA` | Your UPI ID — set this to auto-generate a **scannable QR** with the exact amount. |
| `UPI_QR_IMAGE` | Or drop your official QR at `public/upi-qr.png` (used if `UPI_VPA` is blank). |
| `RAZORPAY_PAYMENT_URL` | **Leave blank for now.** When your Razorpay link is ready, paste it here and the site automatically switches Step 1 to a one-click "Pay securely via Razorpay" button — nothing else to change. |

## When Razorpay is ready ("so we can ship")

Just set `RAZORPAY_PAYMENT_URL` to your Razorpay Payment Link / Page URL and
rebuild. The UPI block is replaced by the Razorpay button; registration (the
Google Form) stays exactly the same, so the master sheet + admin email keep
working. For a deeper server-side integration (auto-verified payments, no manual
proof), you'd add a small backend — happy to wire that up when you're there.
