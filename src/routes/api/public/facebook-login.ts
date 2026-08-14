import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/public/facebook-login')({
  server: {
    handlers: {
      GET: async () => {
        const APP_ID = '713747984641816';
        const REDIRECT_URI = 'https://project--a4426e19-b75d-4caf-bbd2-f5a39957c344-dev.lovable.app/api/public/facebook-callback';
        const scope = 'ads_read,business_management,read_insights';

        const loginUrl = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${APP_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${scope}&response_type=code`;

        return new Response(null, {
          status: 302,
          headers: {
            Location: loginUrl,
          },
        });
      }
    }
  }
})
