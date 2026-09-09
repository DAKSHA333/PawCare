# PawCare

**One Stray. One Identity. One Health Record.**

PawCare is a hackathon-ready civic-tech prototype by **Idea Forge** for identifying, vaccinating, and tracking community dogs across Bengaluru.

## Problem

Community-dog records are often fragmented across municipal teams, NGOs, veterinarians, and local feeders. Dogs move between neighbourhoods, vaccination follow-ups are missed, and different teams can create duplicate records for the same animal.

## Solution

PawCare gives every registered dog one permanent city-wide identity. A shared record connects the PawCare ID, QR tag, photos, identifying features, vaccination and treatment history, movement timeline, responsible teams, and follow-up priority.

## Key innovations

- One permanent PawCare ID that remains unchanged when a dog moves
- Explainable Smart Match scores using location, coat, gender, markings, and tag ID
- Transparent Priority Engine for overdue, unvaccinated, low-coverage, recent-sighting, and medical-risk cases
- QR-based public profiles that omit sensitive administrative details
- A shared data model used by the dashboard, map, registry, profiles, drives, reports, and alerts

Smart Match is a deterministic prototype. It does not perform production AI photo recognition and its score is not a probability.

## Features

- Responsive landing page, command dashboard, Bengaluru map, registry, and digital profiles
- Multi-step dog registration with duplicate review and local photo storage
- Vaccination and health updates that immediately refresh coverage analytics
- Vaccination drive planning and area priority lists
- Assignable and completable smart follow-up queue
- Community report flow with nearby identity suggestions
- Organisation network, charts, CSV export, alerts, and activity feed
- Demo role selector for municipal admin, NGO, veterinarian, volunteer, and feeder views
- Presentation Mode for a guided two-minute demo
- Resettable, automatically seeded local demo database with 33 dogs

## Architecture

- React 19, TypeScript, and Vite
- React Router for client-side routes
- Leaflet with OpenStreetMap tiles
- Recharts for impact and coverage charts
- Lucide icons, QRCode SVG, and Sonner toasts
- `localStorage` for prototype persistence; there is no backend or real authentication

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:5173`. Create a production build with `npm run build`.

## Demo access

No credentials are required. Choose **BBMP / Municipal Admin** or **Veterinarian** to demonstrate clinical vaccination updates. Other roles show field and community-oriented actions.

## Two-minute demo

1. Open the dashboard and point out the shared Bengaluru coverage and priority actions.
2. Click **Presentation Mode**, then continue to the city map.
3. Open the highlighted unvaccinated dog and show its permanent identity, QR tag, and movement history.
4. As Municipal Admin or Veterinarian, choose **Update Record**, record an anti-rabies vaccination, and set next year's booster date.
5. Continue Presentation Mode to show the status change on the profile and public QR view.
6. Return to the dashboard and show the vaccinated total and city coverage update.

## Future scope

- AI visual dog re-identification with evaluated confidence and human review
- Government API integration and real ward-boundary data
- Offline field-worker mobile app
- NFC, RFID, and microchip integrations
- SMS and WhatsApp vaccination reminders
- GIS route optimisation for vaccination drives
- Predictive rabies-risk mapping using validated public-health models

## Prototype limitations

- Data is illustrative and saved per browser/device
- Roles are a demonstration switch, not secure authentication
- Photos are illustrative; dog identity and Bengaluru provenance are not asserted
- The map uses point markers and illustrative coverage circles rather than official ward polygons
- The QR scanner uses a demo animation; generated QR codes open real prototype public-profile links
- Public-health projections are labelled demo estimates and are not epidemiological predictions
