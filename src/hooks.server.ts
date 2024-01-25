import type { Handle } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import * as jwt from 'jsonwebtoken';
import { JwksClient } from 'jwks-rsa';

export const handle: Handle = async ({ event, resolve }) => {
  // The Application Audience (AUD) tag for your application
  const AUD = event.platform?.env.ACCESS_AUD;

  // Your CF Access team domain
  const TEAM_DOMAIN = event.platform?.env.TEAM_DOMAIN;
  const CERTS_URL = `${TEAM_DOMAIN}/cdn-cgi/access/certs`;

  if (!AUD || !TEAM_DOMAIN) {
    event.locals.user = { message: 'No config found.' };
    return await resolve(event);
  }

  const client = new JwksClient({
    jwksUri: CERTS_URL
  });

  const getKey: jwt.GetPublicKeyOrSecret = (header, callback) => {
    client.getSigningKey(header.kid, function (err, key) {
      callback(err, key?.getPublicKey());
    });
  };

  const token = event.cookies.get('CF_Authorization');
  if (!token) {
    //return json({ message: 'No token found' }, { status: 403 });
    event.locals.user = { message: 'No token found' };
    return await resolve(event);
  }

  try {
    const dec = await new Promise<string | jwt.JwtPayload | undefined>((res, rej) => {
      jwt.verify(token ?? '', getKey, { audience: AUD }, (err, decoded) => {
        if (err) {
          return rej();
        }
        res(decoded);
      });
    });
    event.locals.user = dec;
    const response = await resolve(event);
    return response;
  } catch {
    //return json({ message: 'Invalid token' }, { status: 403 });
    event.locals.user = { message: 'Invalid token' };
    return await resolve(event);
  }
};
