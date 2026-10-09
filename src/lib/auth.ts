const ALLOWED_DOMAIN = '@spun.com.br';
const REQUIRED_PASS = 'KRJtLi2mkT7G6ZSbFb6ziHUl';
const MAX_ATTEMPTS = 5;
const LOCKOUT_TIME_MS = 15 * 60 * 1000; // 15 minutos
const SESSION_KEY = 'spun_secure_session';
const ATTEMPTS_KEY = 'spun_login_attempts';

interface SessionData {
  email: string;
  expiresAt: number;
  signature: string;
}

function generateSignature(email: string, expiresAt: number): string {
  const secret = 'spun_internal_secret_key_2026';
  return btoa(`${email}:${expiresAt}:${secret}`);
}

export function loginUser(email: string, pass: string): { success: boolean; message?: string; lockoutMinutes?: number } {
  // Check rate limit / lockout
  const attemptsData = localStorage.getItem(ATTEMPTS_KEY);
  if (attemptsData) {
    const { count, lockUntil } = JSON.parse(attemptsData);
    if (lockUntil && Date.now() < lockUntil) {
      const remainingMin = Math.ceil((lockUntil - Date.now()) / 60000);
      return { success: false, message: `Muitas tentativas incorretas. Tente novamente em ${remainingMin} minuto(s).`, lockoutMinutes: remainingMin };
    }
  }

  const cleanEmail = email.trim().toLowerCase();

  // Validate domain
  if (!cleanEmail.endsWith(ALLOWED_DOMAIN)) {
    recordFailedAttempt();
    return { success: false, message: `Acesso permitido apenas para e-mails ${ALLOWED_DOMAIN}` };
  }

  // Validate password
  if (pass !== REQUIRED_PASS) {
    recordFailedAttempt();
    return { success: false, message: 'E-mail ou senha incorretos.' };
  }

  // Clear attempts on success
  localStorage.removeItem(ATTEMPTS_KEY);

  // Set signed session token (8 hours)
  const expiresAt = Date.now() + 8 * 60 * 60 * 1000;
  const session: SessionData = {
    email: cleanEmail,
    expiresAt,
    signature: generateSignature(cleanEmail, expiresAt)
  };

  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return { success: true };
}

function recordFailedAttempt() {
  const attemptsData = localStorage.getItem(ATTEMPTS_KEY);
  let count = 0;
  if (attemptsData) {
    const parsed = JSON.parse(attemptsData);
    count = parsed.count || 0;
  }
  count += 1;
  const lockUntil = count >= MAX_ATTEMPTS ? Date.now() + LOCKOUT_TIME_MS : null;
  localStorage.setItem(ATTEMPTS_KEY, JSON.stringify({ count, lockUntil }));
}

export function validateSession(): boolean {
  const rawSession = localStorage.getItem(SESSION_KEY);
  if (!rawSession) return false;

  try {
    const session: SessionData = JSON.parse(rawSession);
    if (!session.email || !session.expiresAt || !session.signature) {
      logoutUser();
      return false;
    }

    if (Date.now() > session.expiresAt) {
      logoutUser();
      return false;
    }

    const expectedSignature = generateSignature(session.email, session.expiresAt);
    if (session.signature !== expectedSignature) {
      logoutUser();
      return false;
    }

    return true;
  } catch {
    logoutUser();
    return false;
  }
}

export function logoutUser() {
  localStorage.removeItem(SESSION_KEY);
}
