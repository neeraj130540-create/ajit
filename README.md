# Ajit Enterprises - Angular 18 Service Booking App

> Professional AC, Refrigerator & Washing Machine repair service web application.

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm start

# Visit: http://localhost:4200
```

## Google Sheets Setup (Booking Form)

To enable the booking form to save data to Google Sheets:

1. **Create a Google Sheet** at [sheets.google.com](https://sheets.google.com)
2. Open **Extensions → Apps Script**
3. Paste the code from `google-apps-script.js`
4. Click **Deploy → New Deployment → Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
5. **Copy the Web App URL**
6. Open `src/app/services/sheets.service.ts`
7. Replace `YOUR_SCRIPT_ID` in `APPS_SCRIPT_URL` with your URL

## Features

- Hero section with auto-sliding background
- AC, Fridge & Washing Machine service cards
- Animated statistics counter
- Step-by-step "How It Works" section
- Fully validated booking form
- Google Sheets integration
- Floating WhatsApp button
- 100% Responsive design
- Smooth animations throughout

## Customize

| What | Where |
|------|-------|
| Shop name/logo | `navbar.component.html`, `footer.component.html` |
| Phone number | Replace `+919999999999` across all components |
| Email | Replace `info@ajitenterprises.com` |
| Address | `footer.component.html` |
| Colors | `src/styles.scss` (CSS variables at top) |
| Services list | `services.component.ts` |

## Build for Production

```bash
npm run build
# Output will be in: dist/ajit-enterprises/
```
