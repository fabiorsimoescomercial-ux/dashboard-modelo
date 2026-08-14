import { createFileRoute } from '@tanstack/react-router'
import axios from 'axios';

export const Route = createFileRoute('/api/public/facebook-callback')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const code = url.searchParams.get('code');
        
        if (!code) {
          return new Response('Code not provided', { status: 400 });
        }

        const APP_ID = '1843053493802626';
        const APP_SECRET = 'bb45526d0d4f88551ff3dcb740a5e6a0'; 
        const REDIRECT_URI = 'https://project--a4426e19-b75d-4caf-bbd2-f5a39957c344-dev.lovable.app/api/public/facebook-callback';
        const AD_ACCOUNT_ID = 'act_713747984641816';

        try {
          // 1. Exchange code for token
          const tokenRes = await axios.get(`https://graph.facebook.com/v18.0/oauth/access_token`, {
            params: {
              client_id: APP_ID,
              client_secret: APP_SECRET,
              redirect_uri: REDIRECT_URI,
              code: code
            }
          });

          const access_token = tokenRes.data.access_token;

          // 2. Pega dados direto da conta travada
          const insightsRes = await axios.get(`https://graph.facebook.com/v18.0/${AD_ACCOUNT_ID}/insights`, {
            params: { 
              access_token, 
              fields: 'spend,impressions,clicks,ctr,cpc', 
              date_preset: 'last_30d' 
            }
          });

          // Redirect back to dashboard with the insights data
          return new Response(null, {
            status: 302,
            headers: {
              Location: `/?data=${encodeURIComponent(JSON.stringify(insightsRes.data))}`,
            },
          });
        } catch (error: any) {
          console.error('Facebook OAuth Error:', error.response?.data || error.message);
          return new Response(`Facebook authentication failed: ${error.message}`, { status: 500 });
        }
      }
    }
  }
})
