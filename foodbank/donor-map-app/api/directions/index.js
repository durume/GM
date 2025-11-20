module.exports = async function (context, req) {
    // Set CORS headers
    context.res = {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        }
    };

    // Handle OPTIONS preflight request
    if (req.method === 'OPTIONS') {
        context.res.status = 200;
        context.res.body = '';
        return;
    }

    try {
        // Get parameters from query string
        const origin = req.query.origin;
        const destination = req.query.destination;

        // Validate required parameters
        if (!origin || !destination) {
            context.res.status = 400;
            context.res.body = {
                error: 'Missing required parameters: origin and destination'
            };
            return;
        }

        // Validate format (should be "lng,lat")
        const originParts = origin.split(',');
        const destParts = destination.split(',');

        if (originParts.length !== 2 || destParts.length !== 2) {
            context.res.status = 400;
            context.res.body = {
                error: 'Invalid coordinate format. Expected: lng,lat'
            };
            return;
        }

        // Get the REST API key from environment variables (secure!)
        const apiKey = process.env.KAKAO_REST_API_KEY;

        if (!apiKey) {
            context.log.error('KAKAO_REST_API_KEY not configured');
            context.res.status = 500;
            context.res.body = {
                error: 'Server configuration error'
            };
            return;
        }

        // Build the Kakao Directions API URL
        const kakaoUrl = `https://apis-navi.kakaomobility.com/v1/directions?origin=${origin}&destination=${destination}&priority=RECOMMEND&car_fuel=GASOLINE&car_hipass=false&alternatives=false&road_details=false`;

        // Make the request to Kakao API
        const fetch = require('node-fetch');
        const response = await fetch(kakaoUrl, {
            method: 'GET',
            headers: {
                'Authorization': `KakaoAK ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });

        // Get the response data
        const data = await response.json();

        // Return the response to the client
        if (response.ok) {
            context.res.status = 200;
            context.res.body = data;
        } else {
            context.log.error('Kakao API error:', data);
            context.res.status = response.status;
            context.res.body = {
                error: 'Failed to get directions',
                details: data
            };
        }

    } catch (error) {
        context.log.error('Error processing request:', error);
        context.res.status = 500;
        context.res.body = {
            error: 'Internal server error',
            message: error.message
        };
    }
};
