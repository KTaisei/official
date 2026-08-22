export interface Env { GITHUB_CLIENT_ID: string; GITHUB_CLIENT_SECRET: string; ALLOWED_GITHUB_LOGIN: string; }
const json = (body: unknown, init: ResponseInit = {}) => new Response(JSON.stringify(body), { ...init, headers: { 'content-type': 'application/json', ...(init.headers || {}) } });
export default { async fetch(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  if (url.pathname === '/auth') {
    const state = crypto.randomUUID();
    const target = new URL('https://github.com/login/oauth/authorize');
    target.searchParams.set('client_id', env.GITHUB_CLIENT_ID); target.searchParams.set('scope', 'repo'); target.searchParams.set('state', state);
    return new Response(`<script>location.replace(${JSON.stringify(target.toString())})</script>`, {headers:{'content-type':'text/html'}});
  }
  if (url.pathname === '/callback') {
    const code = url.searchParams.get('code'); if (!code) return new Response('Missing OAuth code', {status:400});
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {method:'POST', headers:{accept:'application/json','content-type':'application/json'}, body:JSON.stringify({client_id:env.GITHUB_CLIENT_ID,client_secret:env.GITHUB_CLIENT_SECRET,code})});
    const { access_token } = await tokenRes.json() as {access_token?:string}; if (!access_token) return new Response('OAuth failed',{status:401});
    const user = await fetch('https://api.github.com/user',{headers:{authorization:`Bearer ${access_token}`}}).then(async r => await r.json() as {login:string});
    if (user.login !== env.ALLOWED_GITHUB_LOGIN) return new Response('Not authorized',{status:403});
    return new Response(`<script>window.opener.postMessage('authorization:github:success:${access_token}','*');window.close()</script>`,{headers:{'content-type':'text/html'}});
  }
  return json({error:'Not found'},{status:404});
} };
