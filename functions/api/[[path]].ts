const BACKEND = 'http://85.94.164.150:8085';

export const onRequest: PagesFunction = async (context) => {
  const url = new URL(context.request.url);
  const target = `${BACKEND}${url.pathname}${url.search}`;

  const req = new Request(target, {
    method: context.request.method,
    headers: context.request.headers,
    body: ['GET', 'HEAD'].includes(context.request.method) ? undefined : context.request.body,
  });

  const res = await fetch(req);

  const headers = new Headers(res.headers);
  headers.set('Access-Control-Allow-Origin', '*');

  return new Response(res.body, { status: res.status, headers });
};
