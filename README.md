# Coforge Playwright UI Automation Tests

https://github.com/user-attachments/assets/5ac9a271-9d94-48b4-a669-b2705a1ee869

A UI automation testing project for [Coforge](https://www.coforge.com/), built using **Playwright, TypeScript, and the Page Object Model (POM)** design pattern.

The project automates key user interface interactions on the Coforge corporate website, including homepage validation, navigation verification, and Careers page job searching.

## 1. Technologies

| Technology | Purpose |
|---|---|
| Playwright | Browser automation and UI testing |
| TypeScript | Programming language |
| Node.js | JavaScript runtime |
| Page Object Model (POM) | Test architecture and maintainability |
| Playwright Fixtures | Page object initialization and dependency management |
| GitHub Actions | CI/CD automation |
| Chromium | Browser execution |

## 2. Features

- **Homepage Validation**
  - Verify that the Coforge homepage loads successfully.
  - Validate the page title.
  - Verify that the main page content is visible.

- **Navigation Testing**
  - Verify the visibility of Investors, Careers, and About Us navigation links.
  - Navigate to the Careers website.

- **Careers Page Testing**
  - Handle cookie consent when the prompt appears.
  - Verify the IT Job Openings section.
  - Search for job openings using a keyword.
  - Search using the keyword `test`.
  - Locate and open the first Senior Test Engineer result.

- **Page Object Model (POM)**
  - Separate page locators and interactions from test specifications.
  - Reuse common page functionality.
  - Improve test readability and maintainability.

- **Custom Playwright Fixtures**
  - Initialize page objects automatically.
  - Share common page objects across test specifications.
  - Use Playwright's isolated browser page for each test.

- **Multi-Environment Execution**
  - Support DEV, QA, and PROD configurations.
  - Configure environment-specific base URLs.

- **Automated CI/CD**
  - Execute UI tests through GitHub Actions.
  - Run DEV, QA, and PROD stages sequentially.
  - Generate HTML and JUnit reports.
  - Upload test reports and results as workflow artifacts.

## 3. Test Coverage

| Test Specification | Test Scenario |
|---|---|
| `home.spec.ts` | Verify that the Coforge homepage loads. |
| `home.spec.ts` | Verify Investors, Careers, and About Us navigation links. |
| `careers.spec.ts` | Search IT job openings and open the first Senior Test Engineer result. |

<img width="959" height="260" alt="image" src="https://github.com/user-attachments/assets/1042224e-a24d-4186-b0b2-a7c8152971be" 

**Note:** Careers job listings are dynamic and may change. The Careers test expects a Senior Test Engineer result to be available after searching for `test`.

## 4. Project Structure

```text
Coforge-Playwright-UI-Tests/
│
├── .github/
│   └── workflows/
│       └── playwright.yml
│
├── src/
│   ├── fixtures/
│   │   └── test-fixtures.ts
│   │
│   └── pages/
│       ├── BasePage.ts
│       ├── CareersPage.ts
│       ├── CommonPage.ts
│       └── HomePage.ts
│
├── tests/
│   ├── careers.spec.ts
│   └── home.spec.ts
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.ts
├── tsconfig.json
└── README.md
```

## 5. Page Object Model (POM) Design

The project follows the Page Object Model design pattern to separate test scenarios from page interactions.

### BasePage.ts
- Provides shared functionality for page objects.
- Contains reusable visibility validation methods.

### HomePage.ts
- Handles Coforge homepage navigation.
- Validates the homepage title and main content.
- Verifies the Investors, Careers, and About Us links.
- Provides navigation to the Careers website.

### CareersPage.ts
- Handles the IT Job Openings section.
- Manages job keyword searches.
- Locates and opens Senior Test Engineer search results.

### CommonPage.ts
- Handles common website interactions.
- Checks for cookie consent prompts.
- Accepts cookies when the Allow All button is available.

### test-fixtures.ts
- Creates reusable Playwright fixtures.
- Initializes HomePage, CareersPage, and CommonPage objects.
- Provides page objects directly to test specifications.

This structure makes the tests easier to maintain, reuse, and extend.

## 6. Environment Configuration

The project supports three execution environments:

- DEV
- QA
- PROD

Environment-specific URLs are configured in `playwright.config.ts`.

| Environment Variable | Description |
|---|---|
| `TEST_ENV` | Selects the execution environment. |
| `BASE_URL_DEV` | DEV environment URL. |
| `BASE_URL_QA` | QA environment URL. |
| `BASE_URL_PROD` | PROD environment URL. |

By default, all three environments point to:

`https://www.coforge.com/`

You can override these values when using separate deployments.

The `.env.example` file provides a reference for the environment variables. The current project reads environment variables from the execution environment; it does not automatically load `.env` files.

## 7. Running the Project Locally

### Prerequisites

- Node.js 20 or later
- npm
- Git

### Step 1: Clone the repository

```bash
git clone <your-repository-url>
```

### Step 2: Navigate to the project directory

```bash
cd Coforge-Playwright-UI-Tests
```

### Step 3: Install dependencies

```bash
npm ci
```

### Step 4: Install Playwright Chromium

```bash
npx playwright install chromium
```

For Linux CI environments, install browser dependencies as well:

```bash
npx playwright install --with-deps chromium
```

### Step 5: Execute the tests

Run all tests:

```bash
npm test
```

Run tests by environment:

```bash
npm run test:dev
```

```bash
npm run test:qa
```

```bash
npm run test:prod
```

Run tests with a visible browser:

```bash
npm run test:headed
```

### Step 6: View the HTML report

```bash
npm run report
```

Playwright generates reports in:

```text
playwright-report/
```

JUnit results are generated in:

```text
test-results/junit.xml
```

## 8. GitHub Actions CI/CD

The project uses **GitHub Actions** to automate UI test execution.

Workflow location:

```text
.github/workflows/playwright.yml
```

The workflow is triggered by:

- Push to `main` or `master`.
- Pull requests.
- Manual execution using `workflow_dispatch`.

### CI/CD Pipeline

The pipeline consists of three sequential stages:

**1. DEV Environment**
- Checks out the repository.
- Sets up Node.js 24.
- Installs npm dependencies.
- Installs Playwright Chromium.
- Executes DEV UI tests.
- Uploads test reports and results.

**2. QA Environment**
- Runs only after DEV succeeds.
- Installs dependencies and Chromium.
- Executes QA UI tests.
- Uploads test reports and results.

**3. PROD Environment**
- Runs only after QA succeeds.
- Installs dependencies and Chromium.
- Executes PROD UI tests.
- Uploads test reports and results.

### Pipeline Execution

```text
       GitHub Actions
              |
              v
       DEV UI Tests
              |
         Success?
              |
              v
        QA UI Tests
              |
         Success?
              |
              v
       PROD UI Tests
              |
              v
       Upload Reports
```
<img width="949" height="248" alt="image" src="https://github.com/user-attachments/assets/75f9699c-7373-457b-8345-fd903abb7e47" />
Each environment uses its own GitHub Actions Environment.

Configure the following environments in your repository:

- `dev`
- `qa`
- `prod`

Within each GitHub Environment, configure a repository/environment variable named:

`BASE_URL`

The workflow maps this variable to the corresponding environment-specific URL.

If no variable is configured, the workflow uses the public Coforge website as the default target.

### Test Artifacts

The workflow uploads the following artifacts:

- Playwright HTML reports.
- JUnit test results.
- Test execution evidence generated by Playwright.

Artifacts are uploaded even when tests fail, using `if: always()`.

Artifact retention: 7 days.

## 9. Test Reports and Execution Evidence

Playwright is configured to capture:

- Screenshots when tests fail.
- Video recordings retained on failure.
- Execution traces retained on failure.
- HTML test reports.
- JUnit XML reports.

These reports help investigate failures and provide visibility into automated test execution.

## 10. Important Notes

- The project currently uses Chromium for browser execution.
- DEV, QA, and PROD are separate CI/CD stages. They point to the public Coforge website by default unless configured with different deployment URLs.
- The Careers job listings are dynamic and subject to change.
- The automation validates job searching and opening a job result; it does not submit a job application.
- Production UI tests should be executed responsibly to avoid unnecessary traffic.

---

**Project Focus:** Playwright UI Automation | TypeScript | Page Object Model | Fixtures | GitHub Actions CI/CD