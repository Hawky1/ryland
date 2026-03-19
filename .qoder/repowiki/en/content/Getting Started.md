# Getting Started

<cite>
**Referenced Files in This Document**
- [README.md](file://README.md)
- [package.json](file://package.json)
- [vite.config.ts](file://vite.config.ts)
- [tailwind.config.ts](file://tailwind.config.ts)
- [postcss.config.js](file://postcss.config.js)
- [eslint.config.js](file://eslint.config.js)
- [index.html](file://index.html)
- [src/main.tsx](file://src/main.tsx)
- [src/App.tsx](file://src/App.tsx)
</cite>

## Table of Contents
1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Development Workflows](#development-workflows)
5. [Environment Configuration](#environment-configuration)
6. [Initial Project Structure Walkthrough](#initial-project-structure-walkthrough)
7. [Common Development Tasks](#common-development-tasks)
8. [Troubleshooting Guide](#troubleshooting-guide)
9. [System Requirements and Compatibility](#system-requirements-and-compatibility)
10. [Conclusion](#conclusion)

## Introduction
Welcome to the Ryland project! This guide helps you set up your development environment, choose a workflow, and start building. The project is a modern React application using Vite, TypeScript, Tailwind CSS, Radix UI, shadcn/ui components, and Supabase for backend needs. It supports multiple development approaches: using the Lovable platform, working locally with your IDE, or editing directly in GitHub.

## Prerequisites
Before you begin, ensure your machine meets the following requirements:
- Node.js and npm: Required for local development. The project specifies Node.js and npm as prerequisites and recommends installing Node.js via nvm.
- Git: Needed to clone the repository and push/pull changes.
- A modern web browser: For previewing your app during development.
- Optional: A code editor or IDE (e.g., VS Code) for local editing.

Key references:
- [README.md: Prerequisites and IDE workflow:21-22](file://README.md#L21-L22)
- [package.json: Scripts and toolchain:6-14](file://package.json#L6-L14)

## Installation
Follow these step-by-step instructions to install and run the project locally:

1. Clone the repository using the project’s Git URL.
   - Use your preferred Git client or command line to clone the repository.
   - Reference: [README.md: Clone instruction:26-27](file://README.md#L26-L27)

2. Navigate to the project directory.
   - Change into the newly created project folder.
   - Reference: [README.md: Directory navigation:29-30](file://README.md#L29-L30)

3. Install the necessary dependencies.
   - Run the package manager install command to fetch all required packages.
   - Reference: [README.md: Install dependencies:32-33](file://README.md#L32-L33)
   - Package list and scripts: [package.json:15-93](file://package.json#L15-L93)

4. Start the development server with auto-reloading and an instant preview.
   - Launch the Vite dev server for live reloading.
   - Reference: [README.md: Start dev server:35-36](file://README.md#L35-L36)
   - Dev script: [package.json: dev script](file://package.json#L7)

What you will see after successful startup:
- The development server starts on the configured host and port.
- Browser auto-refreshes on file changes.
- References:
  - [vite.config.ts: Server configuration:9-15](file://vite.config.ts#L9-L15)
  - [vite.config.ts: Host and port:10-11](file://vite.config.ts#L10-L11)

## Development Workflows
Choose the workflow that best fits your needs. All workflows sync changes back to the repository.

### Option A: Use Lovable Platform
- Visit the Lovable project page and start editing via prompts.
- Changes are committed automatically to the repository.
- Reference: [README.md: Lovable workflow:11-15](file://README.md#L11-L15)

### Option B: Work Locally with Your IDE
- Clone the repository locally.
- Open the project in your preferred IDE.
- Install dependencies and run the dev server.
- Push changes to keep Lovable synchronized.
- References:
  - [README.md: IDE workflow:17-22](file://README.md#L17-L22)
  - [README.md: Local steps:23-36](file://README.md#L23-L36)
  - [package.json: Scripts:6-14](file://package.json#L6-L14)

### Option C: Edit Directly in GitHub
- Navigate to the file you want to change.
- Click the Edit (pencil) button.
- Commit your changes directly in the browser.
- Reference: [README.md: GitHub editing:39-43](file://README.md#L39-L43)

### Option D: Use GitHub Codespaces
- From the repository main page, select the “Code” green button.
- Choose the “Codespaces” tab and create a new environment.
- Edit files inside the Codespace and push your changes.
- Reference: [README.md: GitHub Codespaces:45-51](file://README.md#L45-L51)

## Environment Configuration
Configure your development environment to match the project’s toolchain and build settings.

- Vite configuration
  - Host and port: The dev server binds to a host and runs on a specific port.
  - HMR overlay: Disabled for a cleaner developer experience.
  - Plugins: React plugin, optional component tagging in development, and image optimization.
  - Path aliases: An alias for the src directory improves import readability.
  - Build chunking: Vendor, UI, and Supabase bundles are separated for performance.
  - References:
    - [vite.config.ts: Server and HMR:9-15](file://vite.config.ts#L9-L15)
    - [vite.config.ts: Plugins:16-25](file://vite.config.ts#L16-L25)
    - [vite.config.ts: Aliases:26-30](file://vite.config.ts#L26-L30)
    - [vite.config.ts: Build chunks:31-41](file://vite.config.ts#L31-L41)

- PostCSS and Tailwind CSS
  - PostCSS enables Tailwind and Autoprefixer.
  - Tailwind scans component and page directories for class usage.
  - Dark mode and custom animations are configured.
  - References:
    - [postcss.config.js: PostCSS plugins:1-6](file://postcss.config.js#L1-L6)
    - [tailwind.config.ts: Content scanning:4-5](file://tailwind.config.ts#L4-L5)
    - [tailwind.config.ts: Theme and animations:7-96](file://tailwind.config.ts#L7-L96)

- ESLint configuration
  - TypeScript and React hooks recommended rules are applied.
  - Global browser environment is enabled.
  - Some rules are adjusted for a smoother developer experience.
  - Reference: [eslint.config.js: ESLint setup:7-26](file://eslint.config.js#L7-L26)

- Package scripts
  - Development, build, preview, lint, test, and watch scripts are defined.
  - Reference: [package.json: Scripts:6-14](file://package.json#L6-L14)

## Initial Project Structure Walkthrough
Explore the initial project layout to understand where to place your code and assets.

- Root-level files
  - README: Project overview, workflows, and deployment instructions.
  - package.json: Dependencies, devDependencies, and scripts.
  - vite.config.ts: Vite build and dev server configuration.
  - tailwind.config.ts: Tailwind CSS customization.
  - postcss.config.js: PostCSS pipeline setup.
  - eslint.config.js: Linting rules and configuration.
  - index.html: Application entry HTML file.
  - src/main.tsx: Entry point for the React application.
  - src/App.tsx: Top-level React component.

- Typical locations for new code
  - Pages and components: Add under directories scanned by Tailwind (as configured).
  - Assets: Place images and media in appropriate asset folders; Vite handles optimization.
  - Styles: Extend Tailwind utilities or add custom CSS as needed.

References:
- [README.md: Project overview:1-7](file://README.md#L1-L7)
- [package.json: Dependencies and scripts:15-93](file://package.json#L15-L93)
- [tailwind.config.ts: Content paths](file://tailwind.config.ts#L5)
- [index.html: Entry HTML](file://index.html)
- [src/main.tsx: Entry point](file://src/main.tsx)
- [src/App.tsx: Root component](file://src/App.tsx)

## Common Development Tasks
Perform everyday tasks to build and iterate quickly.

- Start the development server
  - Run the dev script to launch the Vite dev server with hot module replacement.
  - Reference: [package.json: dev script](file://package.json#L7)

- Preview the production build locally
  - Use the preview script to serve the production bundle locally.
  - Reference: [package.json: preview script](file://package.json#L11)

- Run tests
  - Execute unit tests with Vitest.
  - Watch mode is available for continuous feedback.
  - References:
    - [package.json: test scripts:12-13](file://package.json#L12-L13)
    - [vite.config.ts: Test integration:16-25](file://vite.config.ts#L16-L25)

- Lint your code
  - Run ESLint to catch potential issues early.
  - Reference: [package.json: lint script](file://package.json#L10)
  - [eslint.config.js: Rules:20-24](file://eslint.config.js#L20-L24)

- Optimize images
  - Image optimization is enabled via a Vite plugin with configurable quality settings.
  - Reference: [vite.config.ts: Image optimizer:19-24](file://vite.config.ts#L19-L24)

- Build for production
  - Produce optimized static assets for deployment.
  - Reference: [package.json: build script](file://package.json#L8)

## Troubleshooting Guide
Encounter a problem? Try these solutions.

- Node.js and npm not found
  - Ensure Node.js and npm are installed and accessible in your terminal.
  - Reference: [README.md: Prerequisites:21-22](file://README.md#L21-L22)

- Port conflicts during development
  - The dev server runs on a specific port. If it is in use, adjust the port in the Vite config.
  - Reference: [vite.config.ts: Port setting](file://vite.config.ts#L11)

- Hot reload not working
  - HMR overlay is disabled by default. Verify network and firewall settings.
  - Reference: [vite.config.ts: HMR overlay](file://vite.config.ts#L13)

- Tailwind classes not applying
  - Confirm that your files are included in the content paths scanned by Tailwind.
  - Reference: [tailwind.config.ts: Content paths](file://tailwind.config.ts#L5)

- ESLint errors blocking development
  - Review and fix lint warnings or adjust rules as needed.
  - Reference: [eslint.config.js: Rules:20-24](file://eslint.config.js#L20-L24)

- Missing dependencies after clone
  - Reinstall dependencies using the package manager.
  - Reference: [README.md: Install dependencies:32-33](file://README.md#L32-L33)

- Lovable synchronization issues
  - Changes made via Lovable are committed automatically. If your local branch diverges, pull or reset as needed.
  - Reference: [README.md: Lovable commits](file://README.md#L15)

## System Requirements and Compatibility
Ensure your environment matches the project’s technology stack.

- Node.js and npm
  - Required for running Vite, TypeScript, and the test/lint tooling.
  - Reference: [README.md: Prerequisites:21-22](file://README.md#L21-L22)

- Operating systems
  - The project targets modern browsers and Node.js environments compatible with Vite and React tooling.

- Browsers
  - The app uses modern JavaScript and CSS features. Use a recent browser for the best experience.

- Toolchain compatibility
  - Vite, React, TypeScript, Tailwind CSS, and ESLint are configured in this project. Keep dependencies updated to avoid breaking changes.
  - References:
    - [package.json: Dependencies:15-69](file://package.json#L15-L69)
    - [package.json: Dev dependencies:71-93](file://package.json#L71-L93)
    - [vite.config.ts: Plugins:16-25](file://vite.config.ts#L16-L25)
    - [tailwind.config.ts: Tailwind setup:1-96](file://tailwind.config.ts#L1-L96)
    - [eslint.config.js: ESLint setup:1-26](file://eslint.config.js#L1-L26)

## Conclusion
You are now ready to develop with the Ryland project. Choose your preferred workflow—Lovable, local IDE, or GitHub—and use the provided scripts and configurations to build, test, and iterate efficiently. Refer to the troubleshooting guide if you encounter issues, and consult the configuration files for advanced customization.