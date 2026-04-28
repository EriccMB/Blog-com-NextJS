import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';

const jwtSecretKey = process.env.JWT_SECRET_KEY;
const jwtEncodedKey = new TextEncoder().encode(jwtSecretKey);

const loginExpSeconds = Number(process.env.LOGIN_EXPIRATION_SECONDS) || 86400;
const loginExpStr = process.env.LOGIN_EXPIRATION_STRING || '1d';
const loginCookieName = process.env.LOGIN_COOKIE_NAME || 'loginSession';

type JwtPayload = {
  username: string;
  expiresAt: Date;
};

export async function hashPassword(password: string) {
  const hash = await bcrypt.hash(password, 10);
  const base64 = Buffer.from(hash).toString('base64');
  return base64;
}

export async function verifyPassword(password: string, base64Hase: string) {
  const hash = Buffer.from(base64Hase, 'base64').toString('utf-8');
  return bcrypt.compare(password, hash);
}

export async function createLoginSession(username: string) {
  const expiresAt = new Date(Date.now() + loginExpSeconds * 1000);
  //ISSO QUE VAI SER JOGADO DENTRO DO COOKIE, O JWT
  const loginSession = await signJwt({ username, expiresAt });
  //PEGAR O COOKIE USANDO O NEXT, SÓ PODE SER USADO EM SERVER ACTIONS OU ROUTEHANDLERS
  const cookieStore = await cookies();

  //QUEM CONTROLA (CRIA/EXCLUI) O COOKIE É O SERVIDOR
  //NOME DO COOKIE + JWT
  cookieStore.set(loginCookieName, loginSession, {
    httpOnly: true, //SÓ É LIDO PELO SERVIDOR, NÃO É LIDO PELO NAVEGADOR
    secure: true,
    sameSite: 'strict',
    expires: expiresAt,
  });
}

export async function deleteLoginSession() {
  const cookieStore = await cookies();
  cookieStore.set(loginCookieName, '', { expires: new Date(0) });
  cookieStore.delete(loginCookieName);
}

export async function signJwt(jwtpayload: JwtPayload) {
  return new SignJWT(jwtpayload)
    .setProtectedHeader({
      alg: 'HS256',
      typ: 'JWT',
    })
    .setIssuedAt()
    .setExpirationTime(loginExpStr)
    .sign(jwtEncodedKey);
}
