const DEFAULT_BACKEND_URL = 'http://144.31.141.142:8080';

export const onRequest: PagesFunction<{ BACKEND_URL?: string }> = async (context) => {
  const backend = context.env.BACKEND_URL ?? DEFAULT_BACKEND_URL;
  const url = new URL(context.request.url);
  const target = `${backend}${url.pathname}${url.search}`;

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
