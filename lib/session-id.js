import CookieMonster from '@firstandthird/cookie-monster';

function generateGUID() {
  return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
}

export default function sessionId(id = generateGUID(), name = 'session') {
  const existingCookie = CookieMonster.get(name);

  if (!existingCookie) {
    const timestamp = Date.now();

    CookieMonster.set(name, { id, timestamp });
  }
}
