# Dashboard Backend (Isolated)

This backend is separate from existing backend modules.

## Run

From the project root:

```bash
node backend/dashboard-backend/src/server.js
```

## Endpoints

- `GET /health`
- `GET /api/dashboard/notifications`
- `GET /api/dashboard/orders`
- `GET /api/dashboard/insights`
- `GET /api/dashboard/feedback`
- `POST /api/dashboard/feedback`

Sample POST body:

```json
{
  "rating": 5,
  "message": "Great dashboard experience"
}
```

