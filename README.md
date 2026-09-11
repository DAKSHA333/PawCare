# PawCare

PawCare coordinates registration, vaccination, sightings, follow-ups, and public care records for community dogs across Bengaluru.

## Run locally

```bash
npm install
npm run dev
```

Create an optimised production build with `npm run build`.

## Access roles

The application provides separate workspaces for municipal administrators, NGO workers, veterinarians, field volunteers, and verified community feeders. Route access and write actions are checked against the signed-in role.

| Role | Email | Initial password |
|---|---|---|
| BBMP / Municipal Admin | `admin@pawcare.in` | `Admin@123` |
| NGO Worker | `ngo@pawcare.in` | `Ngo@123` |
| Veterinarian | `vet@pawcare.in` | `Vet@123` |
| Field Volunteer | `volunteer@pawcare.in` | `Volunteer@123` |
| Verified Community Feeder | `feeder@pawcare.in` | `Feeder@123` |

Dog registration accepts camera capture or JPG, PNG, and WebP uploads up to 12 MB. Images are resized and compressed before being attached to the record.

During registration, MediaPipe's MobileNet image embedder compares the uploaded photo with registry photos. PawCare combines that visual score with location, coat, gender, markings, and tag signals and requires a person to confirm the match.

The city map includes the 2025 Greater Bengaluru Authority ward boundaries from OpenCity/Bharatlas under ODbL 1.0. Its hotspot layer calculates each ward's average care-priority score from registered dogs.

## Validation

```bash
npm run build
```

