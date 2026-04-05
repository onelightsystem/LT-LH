# Security Policy — @olsystem/lt-lh

## Supported Versions

| Version | Supported          |
|---------|--------------------|
| 0.1.x   | :white_check_mark: |

## Reporting a Vulnerability

**OneLightSystem OLS** takes the security of this package seriously.

If you discover a security vulnerability, please report it responsibly:

1. **Do NOT open a public GitHub issue.**
2. Email the OLS security team via the contact form at [https://www.olsme.com/Contact](https://www.olsme.com/Contact).
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

We aim to acknowledge reports within **48 hours** and provide a fix or mitigation within **7 days** for critical issues.

## Scope

This policy applies to:

- The `@olsystem/lt-lh` npm package (all published code in `dist/`)
- Vanilla JS widgets (`ols-lighttime-widget`, `ols-calendar-widget`, `calendar-orb`, `solar-day-arc`)
- React hook and core logic (`useLightTime`, `getLightHour`, `getLightDay`)
- All TypeScript source and built outputs

## Security Practices

- **No `eval()` or `new Function()`** — fully CSP-friendly
- **No inline style injection via JavaScript** — all styles are in dedicated `.css` files
- **Input validation** — Zod schemas enforce Light Time format and coordinate bounds
- **No network calls** — purely computational (no fetch, XHR, WebSocket, etc.)
- **Zero secrets or tokens** — requires no credentials or environment variables
- **Strict TypeScript** — compiled with `strict: true` and `noUncheckedIndexedAccess`
- **Minimal dependencies** — only `zod` as runtime dependency (~13 KB)

## Content Security Policy (CSP)

This package is designed to work under strict CSP headers:

```http
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self';
```

No `unsafe-inline` or `unsafe-eval` is required.

---

OneLightSystem OLS · [olsme.com](https://www.olsme.com)
