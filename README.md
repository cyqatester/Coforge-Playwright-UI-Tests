# Coforge Playwright UI Tests

https://github.com/user-attachments/assets/5ac9a271-9d94-48b4-a669-b2705a1ee869

A Playwright + TypeScript UI test project for [coforge.com](https://www.coforge.com/), using the Page Object Model (POM).

## Included coverage

1. Main Coforge page loads.
2. Top navigation links **Investors**, **Careers**, and **About Us** are visible.
3. From the home page, open **Careers**; if a cookie consent prompt appears, click **Allow all**; then scroll to **IT job openings**, search for `test`, and click the first visible **Senior Test Engineer** result.

The careers area is served from `careers.coforge.com`. The job listing is live content and can change; the third test intentionally fails if the expected job title is no longer returned.

<img width="959" height="260" alt="image" src="https://github.com/user-attachments/assets/1042224e-a24d-4186-b0b2-a7c8152971be" />

## Requirements

- Node.js 20+
- npm

## Install and run

```bash
npm install
npx playwright install --with-deps chromium
npm test
```

Run against one configured environment:

```bash
npm run test:dev
npm run test:qa
npm run test:prod
```

Set environment-specific URLs if DEV/QA/PROD are separate deployments:

```bash
# Linux/macOS
TEST_ENV=qa BASE_URL_QA=https://qa.example.com npm test

# Windows PowerShell
$env:TEST_ENV="qa"; $env:BASE_URL_QA="https://qa.example.com"; npm test
```

The default URLs point to the public Coforge website so the project runs without additional setup. In GitHub, configure repository/environment variable `BASE_URL` separately under the `dev`, `qa`, and `prod` GitHub Environments to override the URL for each job.

## GitHub Actions

Workflow: `.github/workflows/playwright.yml`

It defines three distinct jobs:

- **dev** runs first.
- **qa** runs only after DEV succeeds.
- **prod** runs only after QA succeeds.

<img width="949" height="248" alt="image" src="https://github.com/user-attachments/assets/75f9699c-7373-457b-8345-fd903abb7e47" />

Each job installs dependencies and Chromium, runs its corresponding npm script, and uploads the Playwright HTML report and test results even when tests fail.

Create GitHub Environments named `dev`, `qa`, and `prod`. Add a `BASE_URL` variable to each environment if they use different deployments. The workflow defaults to `https://www.coforge.com/` if the variable is not set.

## Project structure

```text
coforge-playwright/
├── .github/workflows/playwright.yml
├── src/pages/
│   ├── BasePage.ts
│   ├── HomePage.ts
│   └── CareersPage.ts
├── tests/
│   ├── home.spec.ts
│   └── careers.spec.ts
├── .env.example
├── .gitignore
├── package.json
├── playwright.config.ts
└── tsconfig.json
```

## POM design

- `BasePage` contains shared page-level functionality.
- `HomePage` owns home-page navigation and navigation to Careers.
- `CareersPage` owns the IT job openings section, keyword search, and job-result interaction.
- Spec files contain test intent and delegate page interactions to page objects.

## Selector maintenance

The tests use accessible roles, labels, and placeholders where possible. Coforge may update its navigation markup or careers search widget; if that happens, update the corresponding locators in `src/pages/` rather than placing selectors in the specs.

## Notes

- The public site is used as the default target for all three jobs. DEV/QA/PROD are separate pipeline stages, not claims that Coforge exposes three separate public environments.
- Avoid running production UI tests at high concurrency. This project uses a single Chromium project and two CI workers.
- The test clicks the first matching job title; it does not submit an application.
