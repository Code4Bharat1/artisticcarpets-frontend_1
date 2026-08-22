# Implementation: Reverting back to Nodemailer

## Goal
Undo the Resend integration and revert the backend to using `nodemailer` (SMTP) for sending emails.

## Steps Completed

### 1. Dependency Management
- **Uninstalled**: `resend` package.
- **Installed**: `nodemailer` package in the `artisticcarpets-backend` directory.

### 2. Code Restoration (`services/email.service.js`)
- Completely reverted the `email.service.js` file back to its original state.
- Restored `nodemailer.createTransport()` logic which uses standard SMTP.
- The original Mock Mode logic (which simulates sending if `SMTP_USER` is missing) is fully functional again.

### 3. Environment Variables (`.env` & `.env.example`)
- Removed `RESEND_API_KEY`.
- Restored the old SMTP configuration block (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`).

## Status
Your backend is now exactly as it was originally, utilizing Nodemailer. If you want to configure real email sending, update the `SMTP_*` variables in the backend's `.env` file.
