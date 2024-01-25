import { generateValidator } from '$lib/jwt';
import type { Handle } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  // The Application Audience (AUD) tag for your application
  const AUD = event.platform?.env.ACCESS_AUD;
  // Your CF Access team domain
  const TEAM_DOMAIN = event.platform?.env.TEAM_DOMAIN;

  if (!AUD || !TEAM_DOMAIN) {
    event.locals.user = { message: 'No config found.' };
    return await resolve(event);
  }

  try {
    const validator = generateValidator({ domain: TEAM_DOMAIN, aud: AUD });
    const { jwt, payload } = await validator(event.request);
    event.locals.user = payload?.email;
    const response = await resolve(event);
    return response;
  } catch (err: unknown) {
    //return json({ message: 'Invalid token' }, { status: 403 });
    if (err && typeof err === 'object' && 'message' in err) {
      event.locals.user = { message: err.message };
    }
    return await resolve(event);
  }
};
