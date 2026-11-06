# amplify-demo

Standalone Next.js 16 sample for researching how an internal admin UI (client-side app,
`basePath: /faber-admin`) can be hosted on AWS Amplify. Contains no company code or secrets;
the API is a public fake API (jsonplaceholder) or the mock Lambda in `mock-api/`.

## Branches

| Branch | Mode | How to deploy |
|---|---|---|
| `main` | SSR (`next start`, Amplify compute) | Amplify → Create new app → GitHub → `main` |
| `static` | Static export (`output: 'export'`, no server) | Build locally, upload `static-deploy.zip` with *Deploy without Git* |

## What the `static` branch mirrors from the real admin UI

| Real app pattern | Demo file |
|---|---|
| Route groups `(public)` / `(private)`, client-side guards using a token in `localStorage` | `app/(public)/layout.tsx`, `app/(private)/layout.tsx` |
| `/` has no content and redirects to the last visited page | `app/(private)/page.tsx`, `lib/auth.ts` |
| axios client: `baseURL` from `NEXT_PUBLIC_END_POINT`, `Authorization: Bearer`, refreshed token in `new-access-token` header | `lib/axiosClient.ts` |
| Lists fetched from the browser; detail pages use `?id=` (no `[id]` routes) | `app/(private)/users`, `app/(private)/user-detail` |
| SSO callback `/loading?code=...`, redirect URL built from `window.location.host` | `app/(public)/login`, `app/(public)/loading` |
| `useSearchParams` wrapped in `<Suspense>` | `app/(public)/loading/page.tsx` |
| `next/image` and favicon paths written with the `/faber-admin` prefix | `app/layout.tsx`, `app/(private)/layout.tsx` |
| `NEXT_PUBLIC_*` values baked in at build time | `app/(private)/env-demo` |

## Run locally

    npm install
    npm run dev            # http://localhost:3000/faber-admin

## Build the static deploy zip (branch `static`)

    rm -rf out dist static-deploy.zip
    NEXT_PUBLIC_APP_ENV=static-demo npm run build
    mkdir -p dist/faber-admin && cp -r out/. dist/faber-admin/
    python -I scripts/package_zip.py dist static-deploy.zip

Do not use PowerShell 5.1 `Compress-Archive`: it stores paths with backslashes
(`faber-admin\index.html`). Amplify then serves every URL as 404.

The zip contains a `faber-admin/` folder, so URLs match `basePath` without rewrite rules.
In Amplify add only:

    [
      { "source": "/",    "status": "302",     "target": "/faber-admin/" },
      { "source": "/<*>", "status": "404-200", "target": "/faber-admin/404.html" }
    ]

## Findings so far

- Next 16.4.3 SSR runs on Amplify compute for this sample (branch `main`), although AWS docs list 12–15.
- Static export fails to build if a page calls `useSearchParams()` outside `<Suspense>`:
  `useSearchParams() should be wrapped in a suspense boundary at page "/loading"`.
- Pages must not touch `localStorage` / `window` during render: static pages are rendered once at build time in Node.
- Next 16 writes segment prefetch files as nested folders (`__next.!<base64>/users/__PAGE__.txt`) but the
  browser requests a flat name (`__next.!<base64>.users.__PAGE__.txt`). A plain static server returns 404 for
  these prefetches. Navigation still works (Next falls back to `index.txt`); check the same on Amplify.

## CORS test (mock API)

Deploy `mock-api/index.mjs` as a Lambda Function URL, set `ALLOWED_ORIGINS`, then build with
`NEXT_PUBLIC_END_POINT=<function url>`. The Users page shows whether `new-access-token` is readable.
