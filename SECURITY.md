# Security Policy — @onelightsystem/light-time

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Reporting a Vulnerability

**OneLightSystem OLS** takes the security of this package seriously.

If you discover a security vulnerability, please report it responsibly:

1. **Do NOT open a public GitHub issue.**
2. Email the OLS security team at the address listed on [olsme.com/Contact](https://www.olsme.com/Contact).
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

We aim to acknowledge reports within **48 hours** and provide a fix or mitigation within **7 days** for critical issues.

## Scope

This policy applies to:

- The `@onelightsystem/light-time` npm package (published code in `dist/`)
- Vanilla JS widgets (`ols-lighttime-widget.js`, `ols-calendar-widget.js`)
- React hook and core logic (`useLightTime`, `getLightHour`, `getLightDay`)

## Security Practices

- **No `eval()` or `Function()` constructors** — all code is CSP-friendly
- **No inline style injection via JS** — all styles are in dedicated `.css` files
- **Input validation** — Zod schemas enforce lat/lng bounds and Light Time format
- **No network calls** — this package is purely computational (no fetch, XHR, or WebSocket)
- **No secrets or tokens** — this package requires zero credentials
- **Strict TypeScript** — compiled with `strict: true` and `noUncheckedIndexedAccess`
- **Dependency minimalism** — only `zod` as a runtime dependency

## Content Security Policy (CSP)

This package is designed to work under strict CSP headers:

```
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self';
```

No `unsafe-inline` or `unsafe-eval` is required.

---

OneLightSystem OLS · Belmont, CA · [olsme.com](https://www.olsme.com)
