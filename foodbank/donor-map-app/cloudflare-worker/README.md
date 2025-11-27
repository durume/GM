# Cloudflare Worker - Kakao Directions API Proxy

This Cloudflare Worker securely proxies requests to the Kakao Directions API for the GitHub Pages deployment.

## Setup Instructions

### 1. Create a Cloudflare Account
If you don't have one, sign up at [cloudflare.com](https://cloudflare.com)

### 2. Install Wrangler CLI
```bash
npm install -g wrangler
```

### 3. Login to Cloudflare
```bash
wrangler login
```

### 4. Deploy the Worker
```bash
cd cloudflare-worker
wrangler deploy
```

### 5. Set the API Key Secret
```bash
wrangler secret put KAKAO_REST_API_KEY
```
When prompted, enter your Kakao REST API key.

### 6. Get Your Worker URL
After deployment, you'll get a URL like:
```
https://gm-foodbank-directions-api.<your-subdomain>.workers.dev
```

### 7. Add the URL to GitHub Secrets
Go to your repository Settings > Secrets and variables > Actions, and add:
- **Name**: `CLOUDFLARE_WORKER_URL`
- **Value**: `https://gm-foodbank-directions-api.<your-subdomain>.workers.dev`

## Testing the Worker

Test with curl:
```bash
curl "https://gm-foodbank-directions-api.<your-subdomain>.workers.dev/api/directions?origin=126.8932,37.4446&destination=126.8615,37.4762"
```

## Environment Variables

| Variable | Description | How to Set |
|----------|-------------|------------|
| KAKAO_REST_API_KEY | Kakao REST API key | `wrangler secret put KAKAO_REST_API_KEY` |

## CORS Configuration

The worker allows requests from:
- `https://durume.github.io` (GitHub Pages)
- `http://localhost:3000` (local development)
- `http://localhost:5173` (Vite dev server)

## Endpoints

### GET /api/directions
Proxies to Kakao Directions API.

**Query Parameters:**
- `origin`: Origin coordinates (lng,lat)
- `destination`: Destination coordinates (lng,lat)

**Example:**
```
/api/directions?origin=126.8932,37.4446&destination=126.8615,37.4762
```
