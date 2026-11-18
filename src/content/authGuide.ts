import type { Guide } from './types'

/**
 * Guide for README curriculum step 7: who is making the request and what
 * they may do. Not a journey step — linked from the backend application
 * and response guides instead.
 */
export const authGuide: Guide = {
  id: 'auth',
  name: 'Authentication and authorization',
  category: 'security',
  tags: [
    'authentication',
    'authorization',
    'sessions',
    'cookies',
    'jwt',
    'oauth',
    'openid connect',
    'permissions',
    'access control',
    'login',
    'identity',
  ],
  status: 'review',
  concept:
    'Authentication proves who is making the request (a session, a token, a login); authorization decides what that identity is allowed to do. They are two separate checks, usually run one after the other.',
  problemSolved:
    'It explains how a server knows the caller’s identity and permissions, so learners can protect routes, choose between sessions and tokens, and return the right 401 or 403 instead of a vague failure.',
  position:
    'It sits inside the backend application, right after the route matches: the request carries credentials, the application verifies them, and only then is the protected work — reading or writing data — allowed to happen.',
  howItWorks: [
    {
      id: 'credentials-arrive',
      title: 'Credentials arrive with the request',
      explanation:
        'The browser attaches either a session cookie or an Authorization header carrying a token. The server does not yet know who sent the request — it only sees the credential.',
      visualState: 'credentials-received',
    },
    {
      id: 'verify-identity',
      title: 'The server verifies the identity',
      explanation:
        'For a session cookie, the server looks up the session record it issued earlier. For a signed token, the server checks the signature and expiry. If neither holds, the caller is anonymous and the request stops with 401.',
      visualState: 'identity-verified',
    },
    {
      id: 'load-permissions',
      title: 'Load what the identity may do',
      explanation:
        'Authorization turns the identity into rights: an owner may edit their order, a staff account may edit any, a guest may only read. Permissions come from roles or from ownership of the specific record.',
      visualState: 'permissions-loaded',
    },
    {
      id: 'allow-or-deny',
      title: 'Allow or deny the action',
      explanation:
        'Unknown identity answers 401 Unauthorized; a known identity without the right permission answers 403 Forbidden. The difference tells the client whether to log in or to stop asking.',
      visualState: 'access-decided',
    },
    {
      id: 'issue-and-refresh',
      title: 'Issue, refresh, and revoke',
      explanation:
        'On login the server issues a session or token; short-lived access tokens get refreshed by a longer-lived one; logout revokes the session or discards the credentials. State on the server can be ended early, stateless tokens expire on their own.',
      visualState: 'session-issued',
    },
  ],
  visual: {
    kind: 'sequence',
    title: 'Authentication and authorization in one request',
    description:
      'Follow the place-order request through the two checks: first who the caller is, then what the caller may do.',
    fallback:
      'Request with session cookie → server looks up the session (signature check for tokens) → identity confirmed or rejected: no/invalid credential → 401 Unauthorized. Identity confirmed → load permissions → allowed → protected work runs; not allowed → 403 Forbidden. Login issues a new session; logout revokes it.',
    steps: [
      {
        id: 'authn-check',
        title: 'Authentication check',
        explanation: 'The credential proves who is sending the request; a failure here ends at 401.',
        visualState: 'identity-verified',
      },
      {
        id: 'authz-check',
        title: 'Authorization check',
        explanation:
          'The identity is mapped to permissions; a failure here ends at 403 even though the login was valid.',
        visualState: 'access-decided',
      },
      {
        id: 'protected-work',
        title: 'Protected work runs',
        explanation: 'Only after both checks does the handler touch the data the identity may use.',
        visualState: 'permissions-loaded',
      },
    ],
  },
  example: {
    scenario:
      'Two place-order requests arrive: one from a signed-in customer, one from a visitor who never logged in.',
    request:
      'With session cookie: POST /orders → 201 Created. Without any credential: POST /orders → 401 Unauthorized {"error":{"code":"unauthorized","message":"log in to place an order"}}',
    outcome:
      'The signed-in request proceeds because authentication and authorization both passed; the anonymous request stops at the first check with 401 — the client knows to show the login screen, not an error dialog.',
  },
  benefits: [
    'Separating the two checks makes failures precise: 401 means “log in”, 403 means “your account may not do this”.',
    'Sessions keep identity state on the server, so logout and revocation take effect immediately.',
    'Signed tokens let the server verify identity without a lookup on every request.',
    'Permissions expressed per role or per record scale from a small app to a large one without rewriting checks.',
  ],
  tradeoffs: [
    'Sessions need server storage and careful scaling; tokens move that cost to the client but make early revocation hard.',
    'Tokens kept in JavaScript-accessible storage are easier for scripts to steal than httpOnly cookies.',
    'OAuth 2.0 and OpenID Connect solve real problems but add moving parts that a simple app may not need yet.',
    'Permission bugs fail open or closed invisibly — every new protected route needs its own review.',
  ],
  alternatives: [
    'HTTP Basic authentication over HTTPS for internal tools',
    'API keys for machine-to-machine calls with no interactive login',
    'Passwordless sign-in: magic links or one-time codes',
    'WebAuthn / passkeys instead of passwords',
  ],
  prerequisites: ['client-http', 'backend-application'],
  relatedGuides: ['backend-application', 'response'],
  learnNext: ['response'],
  aliases: [
    'auth',
    'authentication',
    'authorization',
    'login',
    'logout',
    'session',
    'cookie',
    'jwt',
    'oauth',
    'oauth 2.0',
    'openid connect',
    'sso',
    'single sign on',
    'bearer token',
    'token',
    'permissions',
    'access control',
    'identity',
    '401',
    '403',
  ],
  searchProblems: [
    'How do I know who is making the request?',
    'What is the difference between authentication and authorization?',
    'Should I use sessions or JWT?',
    'How does login work behind the scenes?',
    'What is the difference between 401 and 403?',
    'How do I protect an API route?',
    'Who is allowed to perform this action?',
  ],
  sources: [
    {
      title: 'HTTP authentication',
      url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication',
      publisher: 'MDN Web Docs',
      accessedAt: '2026-11-18',
    },
    {
      title: 'RFC 6265: HTTP State Management Mechanism (cookies and sessions)',
      url: 'https://www.rfc-editor.org/rfc/rfc6265.html',
      publisher: 'IETF',
      accessedAt: '2026-11-18',
    },
    {
      title: 'RFC 6749: The OAuth 2.0 Authorization Framework',
      url: 'https://www.rfc-editor.org/rfc/rfc6749.html',
      publisher: 'IETF',
      accessedAt: '2026-11-18',
    },
    {
      title: 'RFC 7519: JSON Web Token (JWT)',
      url: 'https://www.rfc-editor.org/rfc/rfc7519.html',
      publisher: 'IETF',
      accessedAt: '2026-11-18',
    },
    {
      title: 'OpenID Connect Core 1.0',
      url: 'https://openid.net/specs/openid-connect-core-1_0.html',
      publisher: 'OpenID Foundation',
      accessedAt: '2026-11-18',
    },
  ],
  lastReviewed: '2026-11-18',
  publicationReview: {
    toolNameConfidence: 'confirmed',
    requiresReview: false,
    reviewNotes:
      'Phase 13 content review completed; sources are MDN, the RFC editor, and the OpenID Foundation. Revisit with the next scheduled review.',
  },
}
