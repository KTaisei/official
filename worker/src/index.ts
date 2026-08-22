export interface Env { GITHUB_CLIENT_ID: string; GITHUB_CLIENT_SECRET: string; ALLOWED_GITHUB_LOGIN: string; }
const json = (body: unknown, init: ResponseInit = {}) => new Response(JSON.stringify(body), { ...init, headers: { 'content-type': 'application/json', ...(init.headers || {}) } });
export default { async fetch(request: Request, env: Env): Promise<Response> {
  try {
  const url = new URL(request.url);
  if (url.pathname === '/auth') {
    const state = crypto.randomUUID();
    const target = new URL('https://github.com/login/oauth/authorize');
    target.searchParams.set('client_id', env.GITHUB_CLIENT_ID); target.searchParams.set('scope', 'repo'); target.searchParams.set('state', state);
    return new Response(`<script>location.replace(${JSON.stringify(target.toString())})</script>`, {headers:{'content-type':'text/html'}});
  }
  // Accept both the recommended /callback URL and a root callback configured
  // in an existing GitHub OAuth App.
  if (url.pathname === '/callback' || (url.pathname === '/' && url.searchParams.has('code'))) {
    const code = url.searchParams.get('code'); if (!code) return new Response('Missing OAuth code', {status:400});
    const form = new URLSearchParams({client_id:env.GITHUB_CLIENT_ID, client_secret:env.GITHUB_CLIENT_SECRET, code});
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {method:'POST', headers:{'Accept':'application/json','Content-Type':'application/x-www-form-urlencoded','User-Agent':'portfolio-decap-oauth'}, body:form.toString()});
    const tokenText = await tokenRes.text();
    if (!tokenRes.ok) return json({error: 'OAuth token exchange failed', detail: tokenText.slice(0, 240)}, {status: tokenRes.status});
    const tokenPayload = JSON.parse(tokenText) as {access_token?:string; error?:string};
    const { access_token } = tokenPayload; if (!access_token) return json({error: 'OAuth failed', detail: tokenPayload.error ?? 'No access token returned'}, {status:401});
    const userRes = await fetch('https://api.github.com/user', {headers:{authorization:`Bearer ${access_token}`, accept:'application/vnd.github+json', 'user-agent':'portfolio-decap-oauth'}});
    const userText = await userRes.text();
    if (!userRes.ok) return json({error: 'GitHub user verification failed', detail: userText.slice(0, 240)}, {status: userRes.status});
    const user = JSON.parse(userText) as {login:string};
    if (user.login !== env.ALLOWED_GITHUB_LOGIN) return new Response('Not authorized',{status:403});
    return new Response(`<script>window.opener.postMessage('authorization:github:success:${access_token}','*');window.close()</script>`,{headers:{'content-type':'text/html'}});
  }
  if (url.pathname === '/favicon.ico') return new Response(null, {status: 204});
  return json({error:'Not found'},{status:404});
  } catch (error) {
    console.error('OAuth Worker error', error);
    const message = error instanceof Error ? error.message : 'Unknown Worker exception';
    return json({error: 'OAuth processing failed', detail: message}, {status: 500});
  }
} };
