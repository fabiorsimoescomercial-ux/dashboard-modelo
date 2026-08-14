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

        const APP_ID = '713747984641816';
        // IMPORTANT: In a real app, this secret should be in process.env['FACEBOOK_APP_SECRET']
        const APP_SECRET = 'YOUR_APP_SECRET_HERE'; 
        const REDIRECT_URI = 'https://project--a4426e19-b75d-4caf-bbd2-f5a39957c344-dev.lovable.app/api/public/facebook-callback';

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

          // 2. List ad accounts
          const accountsRes = await axios.get(`https://graph.facebook.com/v18.0/me/adaccounts`, {
            params: {
              access_token: access_token,
              fields: 'id,name'
            }
          });

          const accounts = accountsRes.data.data;
          
          if (!accounts || accounts.length === 0) {
            return new Response('No ad accounts found', { status: 404 });
          }

          // 3. Pick the first account
          const accountId = accounts[0].id;

          // Redirect back to dashboard with the account ID
          return new Response(null, {
            status: 302,
            headers: {
              Location: `/?account=${accountId}`,
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
