# amplify-demo

Standalone Next.js 16 sample for the Amplify migration research (DEV_MIERUCA_SEO-14874).
Contains no Faber code or secrets.

## Run locally
    npm install
    copy .env.example .env.local
    npm run dev
Open http://localhost:3000/faber-admin

## Deploy on Amplify
1. Push to a GitHub repo.
2. AWS Amplify > Create new app > GitHub > select repo/branch.
3. Add env vars: NEXT_PUBLIC_DEMO_VAR, DEMO_SERVER_VAR.
4. Deploy, then open https://<branch>.<id>.amplifyapp.com/faber-admin

## Things to record for the ADR
- Does Next.js 16 build/run on Amplify?
- basePath behaviour (root URL 404 is expected)
- Build-time vs runtime env vars
- Build time, cost shown in Billing
