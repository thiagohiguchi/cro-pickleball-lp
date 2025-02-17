# CRO Pickleball LP

## Overview

This project is a frontend test for a role at Verticurl. The objective is to replicate a provided design using **HTML**, **SASS**, **BEM**, and **VanillaJS**, while ensuring the page is responsive, interactive, and optimized for different screen sizes.

**Gulp** is used in this project to automate tasks like minification and live reloading, making the development process more efficient.

There are two fully functional pages, home and speakers. To simplify access, the pages have been deployed remotely.

- **Home**: https://thiagohiguchi.github.io/cro-pickleball-lp/
- **Speakers**: https://thiagohiguchi.github.io/cro-pickleball-lp/speakers.html

Otherwise, after running the process locally, the pages are accessible throuaout the links:

- **Home**: http://localhost:9000
- **Speakers**: http://localhost:9000/speakers.html

### Technologies:

- **HTML Markup**: Pug
- **Styles**: SASS (CSS preprocessor)
- **JavaScript**: Vanilla JavaScript
- **CSS Methodology**: BEM (Block-Element-Modifier)
- **Tools**: Gulp 5

## Features

- Responsive design, adaptable to desktop, tablet, and mobile screens
- Interactive animations
- Modal popup for speaker descriptions with dynamic content
- BEM methodology for consistent and maintainable CSS

## Project Design & Adjustments

- To enhance the development experience and streamline setup, a custom Gulp configuration is provided to assist with task management.
- As no mobile mockups were provided, a simplified version was designed to ensure proper page presentation.
- The font used is proprietary, so Harabara and Tahoma were used as alternative font families.
- The pages are relatively simple, so a more complex architecture was not implemented.

## Requirements

- **Browsers**: The project must work on the latest versions of **Google Chrome**, **Firefox**, **Safari**, **Edge**, and **Opera**.
- **Devices**: Ensure the page is responsive and looks great on any device with a screen width greater than or equal to 320px.

## Getting Started

Follow these steps to set up the project locally:

### 1. Clone the repository

If you're working with a GitHub repository, first clone it:

```
git clone https://github.com/thiagohiguchi/cro-pickleball-lp.git
cd cro-pickleball-lp
```

### 2. Setup Node 20 and install dependencies

Make sure to run Node v20, otherwise some deprecated libs might not work properly.

Install the required npm dependencies:

```
npm install
```

:warning: Install GULP globally:

```
npm install --global gulp-cli
```

### 3. Run the Development Server

To start the development server and preview the site locally, run:

```
npm run dev
```

This command will:

- Start the local server in **development mode**
- Open the site in your default web browser
  - **Home**: http://localhost:9000
  - **Speakers**: http://localhost:9000/speakers.html

### 4. Build the Project

To generate production-ready static files (minified and optimized), run:

```
npm run build
```

This will create the bundled files in the `dist/` directory.

### 5. Deploy to GitHub Pages

To deploy the project to GitHub Pages, run:

```
npm run deploy
```

This will:

- Build the project
- Deploy the contents of the `dist/` folder to the `gh-test` branch of your GitHub repository

## Project Structure

The project is organized as follows:

```
.
├── README.md                # Project overview and setup guide
├── package-lock.json        # Auto-generated lock file for npm
├── package.json             # Project dependencies and scripts
├── src/
│   ├── assets/              # Static files (e.g., fonts, SVGs)
│   ├── css/                 # Global or third-party CSS files
│   ├── images/              # Image files (JPG, PNG, GIF, etc.)
│   ├── js/                  # JavaScript entry point and other custom scripts
│   ├── pug/                 # Pug templates and layouts
│   └── sass/                # Sass files (includes styles for layout, components)
└── gulpfile.js              # Gulp configuration for processing and bundling assets
```

## Next Steps

- [ ] Purge unused CSS during the production build.
- [ ] Implement linting to ensure better code consistency.
- [ ] Improve SEO support.
- [ ] Inline critical CSS for improved web performance.
- [ ] Improve the Gulp configuration to prevent minifying images during every build.
- [ ] Adopt a more efficient approach to handling images (webp, srcset, and fallback for less commonly used clients).
- [ ] Review and optimize Sass mixins and variables for enhanced reusability and maintainability.
- [ ] Implement lazy loading for images and other assets where applicable.
- [ ] Ensure all HTML elements have appropriate ARIA attributes for improved accessibility.
- [ ] Optimize meta tags and content to boost SEO performance.
- [ ] Set up a continuous integration/continuous deployment (CI/CD) pipeline for automated testing and deployment.
- [ ] Implement unit tests for JavaScript components to ensure code reliability.
- [ ] Consider using a testing framework like Jest or Mocha.
- [ ] Setup a CDN for faster assets delivery.
