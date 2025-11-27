/**
 * Cloudflare Worker - Kakao Directions API Proxy
 *
 * This worker securely proxies requests to the Kakao Directions API
 * for the GitHub Pages deployment of GM Food Bank donor map.
 *
 * Environment Variables Required:
 * - KAKAO_REST_API_KEY: Your Kakao REST API key
 */

// Allowed origins for CORS
const ALLOWED_ORIGINS = [
  'https://durume.github.io',
  'http://localhost:3000',
  'http://localhost:5173',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5173'
];

// CORS headers
function getCorsHeaders(origin) {
  const isAllowed = ALLOWED_ORIGINS.some(allowed => origin?.startsWith(allowed));
  return {
    'Access-Control-Allow-Origin': isAllowed ? origin : ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
}

// Handle OPTIONS preflight requests
function handleOptions(request) {
  const origin = request.headers.get('Origin');
  return new Response(null, {
    status: 204,
    headers: getCorsHeaders(origin)
  });
}

// Main handler
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const origin = request.headers.get('Origin');

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return handleOptions(request);
    }

    // Only handle /api/directions endpoint
    if (url.pathname !== '/api/directions') {
      return new Response(JSON.stringify({ error: 'Not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
          ...getCorsHeaders(origin)
        }
      });
    }

    try {
      // Get query parameters
      const originCoord = url.searchParams.get('origin');
      const destination = url.searchParams.get('destination');

      // Validate parameters
      if (!originCoord || !destination) {
        return new Response(JSON.stringify({
          error: 'Missing required parameters: origin and destination',
          received: { origin: originCoord, destination }
        }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            ...getCorsHeaders(origin)
          }
        });
      }

      // Validate coordinate format (should be "lng,lat")
      const originParts = originCoord.split(',');
      const destParts = destination.split(',');

      if (originParts.length !== 2 || destParts.length !== 2) {
        return new Response(JSON.stringify({
          error: 'Invalid coordinate format. Expected: lng,lat',
          received: { origin: originCoord, destination }
        }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            ...getCorsHeaders(origin)
          }
        });
      }

      // Validate coordinates are numbers
      const coords = [...originParts, ...destParts].map(parseFloat);
      if (coords.some(isNaN)) {
        return new Response(JSON.stringify({
          error: 'Coordinates must be valid numbers',
          received: { origin: originCoord, destination }
        }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            ...getCorsHeaders(origin)
          }
        });
      }

      // Get API key from environment
      const apiKey = env.KAKAO_REST_API_KEY;
      if (!apiKey) {
        return new Response(JSON.stringify({
          error: 'Server configuration error: API key not configured'
        }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            ...getCorsHeaders(origin)
          }
        });
      }

      // Build Kakao Directions API URL
      const kakaoUrl = `https://apis-navi.kakaomobility.com/v1/directions?origin=${originCoord}&destination=${destination}&priority=RECOMMEND&car_fuel=GASOLINE&car_hipass=false&alternatives=false&road_details=false`;

      // Make request to Kakao API
      const kakaoResponse = await fetch(kakaoUrl, {
        method: 'GET',
        headers: {
          'Authorization': `KakaoAK ${apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      // Get response data
      const data = await kakaoResponse.json();

      // Return response
      return new Response(JSON.stringify(data), {
        status: kakaoResponse.status,
        headers: {
          'Content-Type': 'application/json',
          ...getCorsHeaders(origin)
        }
      });

    } catch (error) {
      return new Response(JSON.stringify({
        error: 'Internal server error',
        message: error.message
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...getCorsHeaders(origin)
        }
      });
    }
  }
};
