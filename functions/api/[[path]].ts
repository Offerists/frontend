const DEFAULT_BACKEND_URL = 'http://144.31.141.142:8080';

export const onRequest: PagesFunction<{ BACKEND_URL?: string }> = async (context) => {
  const backend = context.env.BACKEND_URL ?? DEFAULT_BACKEND_URL;
  const url = new URL(context.request.url);
  const target = `${backend}${url.pathname}${url.search}`;

  const headerNames = [...context.request.headers.keys()].join(', ');
  console.log(`[proxy] ${context.request.method} ${target} | headers: ${headerNames}`);

  try {
    const outHeaders = new Headers();
    for (const [key, value] of context.request.headers) {
      if (!key.startsWith('cf-') && key !== 'host') {
        outHeaders.set(key, value);
      }
    }

    console.log(`[proxy] outgoing x-telegram-init-data present: ${outHeaders.has('x-telegram-init-data')}`);
    console.log(`[proxy] outgoing headers: ${[...outHeaders.keys()].join(', ')}`);

    const req = new Request(target, {
      method: context.request.method,
      headers: outHeaders,
      body: ['GET', 'HEAD'].includes(context.request.method) ? undefined : context.request.body,
    });

    const res = await fetch(req);

    if (res.status >= 400) {
      const body = await res.text();
      console.error(`[proxy] ${res.status} from ${target} | body: ${body}`);
      const headers = new Headers();
      headers.set('Access-Control-Allow-Origin', '*');
      headers.set('Content-Type', 'application/json');
      return new Response(body, { status: res.status, headers });
    }

    console.log(`[proxy] response ${res.status} from ${target}`);

    const headers = new Headers(res.headers);
    headers.set('Access-Control-Allow-Origin', '*');

    return new Response(res.body, { status: res.status, headers });
  } catch (err) {
    console.error(`[proxy] failed to reach ${target}:`, err);
    return new Response(JSON.stringify({ error: 'Failed to reach backend', detail: String(err) }), {
      status: 502,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }
};
