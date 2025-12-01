# Horse Race 🐎

A modern Vue 3 horse racing game built with Vite, TypeScript, and Pinia for state management. Features interactive gameplay with real-time animations, internationalization support, and comprehensive test coverage.

## Features ✨

- 🎮 Interactive horse racing game with Vue 3
- 🌍 Multi-language support (English & Turkish)
- 💾 State management with Pinia
- 🎨 Responsive UI with SCSS styling
- 🧪 Comprehensive unit tests with Vitest
- 🔍 End-to-end tests with Cypress
- ⚡ Fast development with Vite HMR
- 📱 Modern TypeScript support

## Requirements

- Node.js: `^20.19.0` or `>=22.12.0`
- npm or yarn package manager

## Getting Started 🚀

### Installation

```sh
npm install
```

### Development Server

Start the development server with hot module reloading:

```sh
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

Create an optimized production build:

```sh
npm run build
```

Preview the production build locally:

```sh
npm run preview
```

## Testing 🧪

### Unit Tests

Run unit tests with Vitest:

```sh
npm run test:unit
```

Run tests in watch mode for development:

```sh
npm run test:unit:dev
```

### End-to-End Tests

Run E2E tests with Cypress:

```sh
npm run test:e2e
```

Open Cypress test runner in interactive mode:

```sh
npm run test:e2e:dev
```

## Code Quality 🔧

### Type Checking

Check TypeScript types:

```sh
npm run type-check
```

### Linting

Run ESLint to fix code style issues:

```sh
npm run lint
```

### Formatting

Format code with Prettier:

```sh
npm run format
```

## IDE Setup 💻

### Recommended IDE

[VS Code](https://code.visualstudio.com/) with the following extensions:

- [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) - Vue 3 language support (disable Vetur if installed)
- [TypeScript Vue Plugin](https://marketplace.visualstudio.com/items?itemName=Vue.volar) - TypeScript support for Vue files

### Browser Extensions

**Chromium-based (Chrome, Edge, Brave, etc.):**

- [Vue.js DevTools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
- Enable Custom Object Formatter in DevTools: `chrome://flags` or settings

**Firefox:**

- [Vue.js DevTools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
- Enable Custom Object Formatter in about:debugging

## Project Structure 📁

```
src/
├── components/       # Reusable Vue components
├── stores/          # Pinia state management
├── i18n/            # Internationalization configuration
├── styles/          # Global SCSS styles
│   ├── _variables.scss  # SCSS variables for colors, spacing, typography
│   ├── _mixins.scss     # Reusable SCSS mixins for common patterns
│   └── index.scss       # Main stylesheet
└── __tests__/       # Unit test files
```

## Dependencies 📦

- **Vue 3** - Progressive JavaScript framework
- **Pinia** - State management
- **Vue I18n** - Internationalization
- **Lodash** - Utility library
- **Vite** - Next-generation build tool
- **TypeScript** - Type-safe JavaScript
- **Vitest** - Unit testing framework
- **Cypress** - E2E testing framework

## Development Scripts 📝

| Command                 | Purpose                  |
| ----------------------- | ------------------------ |
| `npm run dev`           | Start development server |
| `npm run build`         | Build for production     |
| `npm run preview`       | Preview production build |
| `npm run test:unit`     | Run unit tests           |
| `npm run test:unit:dev` | Run tests in watch mode  |
| `npm run test:e2e`      | Run E2E tests            |
| `npm run test:e2e:dev`  | Open Cypress test runner |
| `npm run type-check`    | Check TypeScript types   |
| `npm run lint`          | Fix linting issues       |
| `npm run format`        | Format code              |

## Configuration 🔧

See [Vite Configuration Reference](https://vite.dev/config/) for advanced build configuration options.

## Deployment 🚢

### Docker Deployment

The project includes a Dockerfile for containerized deployment:

```sh
docker build -t horse-race .
docker run -p 80:80 horse-race
```

The application is served with Nginx on port 80.

## License 📄

This project is licensed under the MIT License.
