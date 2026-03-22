# Portfolio Frontend

A modern, responsive personal developer portfolio website built with Angular 17+ and Three.js.

## 🚀 Features

- **Modern UI/UX**: Glass-morphism design with smooth animations
- **3D Effects**: Interactive Three.js hero section
- **Responsive Design**: Fully responsive layout for all devices
- **Dark/Light Theme**: Toggle between dark and light themes
- **Smooth Animations**: Scroll reveal and tilt effects
- **TypeScript**: Full TypeScript support for type safety
- **Component-Based Architecture**: Standalone components for better performance

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) (v20 or higher)
- [npm](https://www.npmjs.com/) (v9 or higher) or [yarn](https://yarnpkg.com/)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio-fronted
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API endpoint**
   
   Edit `src/environments/environment.ts` and set your backend API URL:
   ```typescript
   export const environment = {
     production: false,
     apiUrl: 'http://localhost:5000/api'
   };
   ```

## 🏃 Running the Project

1. **Start the development server**
   ```bash
   npm start
   ```
   or
   ```bash
   ng serve
   ```

   The application will be available at `http://localhost:4200`

2. **Open in browser**
   Navigate to `http://localhost:4200` in your browser

## 📦 Building for Production

1. **Build the application**
   ```bash
   npm run build
   ```
   or
   ```bash
   ng build --configuration production
   ```

   The build artifacts will be stored in the `dist/` directory.

2. **Preview the production build**
   ```bash
   npm run preview
   ```
   or
   ```bash
   ng serve --configuration production
   ```

## 🧪 Testing

1. **Run unit tests**
   ```bash
   npm test
   ```
   or
   ```bash
   ng test
   ```

2. **Run end-to-end tests**
   ```bash
   npm run e2e
   ```
   or
   ```bash
   ng e2e
   ```

3. **Run tests with coverage**
   ```bash
   ng test --code-coverage
   ```

## 📁 Project Structure

```
portfolio-fronted/
├── src/
│   ├── app/
│   │   ├── app.component.*          # Root component
│   │   ├── app.config.ts            # Application configuration
│   │   ├── app.routes.ts            # Route definitions
│   │   ├── core/                    # Core functionality
│   │   │   ├── models/              # TypeScript interfaces
│   │   │   └── services/            # Core services
│   │   ├── features/                # Feature components
│   │   │   ├── hero/                # Hero section with Three.js
│   │   │   ├── about/               # About section
│   │   │   ├── skills/              # Skills section
│   │   │   ├── experience/          # Experience section
│   │   │   ├── projects/            # Projects section
│   │   │   ├── achievements/        # Achievements section
│   │   │   └── contact/             # Contact section
│   │   └── shared/                  # Shared components
│   │       ├── components/          # Reusable components
│   │       │   ├── navbar/          # Navigation bar
│   │       │   ├── footer/          # Footer
│   │       │   └── loader/          # Loading spinner
│   │       └── directives/          # Custom directives
│   │           ├── tilt.directive.ts
│   │           └── scroll-reveal.directive.ts
│   ├── assets/                      # Static assets
│   ├── environments/                # Environment configurations
│   ├── index.html                   # Main HTML file
│   ├── main.ts                      # Application entry point
│   ├── polyfills.ts                 # Polyfills
│   ├── styles.scss                  # Global styles
│   └── test.ts                      # Test entry point
├── angular.json                     # Angular CLI configuration
├── package.json                     # Project dependencies
├── tsconfig.json                    # TypeScript configuration
└── README.md                        # This file
```

## 🎨 Features Overview

### Sections

1. **Hero**: Interactive 3D background with personal introduction
2. **About**: Personal information and bio
3. **Skills**: Display of technical skills with progress bars
4. **Experience**: Work experience timeline
5. **Projects**: Showcase of projects with images and descriptions
6. **Achievements**: Certifications and awards
7. **Contact**: Contact form with email integration

### Components

- **Navbar**: Responsive navigation with smooth scrolling
- **Footer**: Social links and copyright information
- **Loader**: Loading animation for better UX

### Directives

- **TiltDirective**: 3D tilt effect on hover
- **ScrollRevealDirective**: Reveal elements on scroll

### Services

- **PortfolioService**: API communication for portfolio data
- **AnimationService**: Animation utilities
- **ThemeService**: Theme management (dark/light)

## 🔧 Configuration

### Environment Variables

Edit `src/environments/environment.ts` for development:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000/api'
};
```

Edit `src/environments/environment.prod.ts` for production:
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-api-url.com/api'
};
```

### Angular CLI Configuration

The Angular CLI configuration is in `angular.json`. You can customize:
- Build options
- Serve options
- Test options
- Schematics

## 🎯 Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run unit tests
- `npm run e2e` - Run end-to-end tests
- `npm run lint` - Run linter
- `npm run format` - Format code with Prettier

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support, please open an issue in the repository.

## 🙏 Acknowledgments

- [Angular](https://angular.io/) - The web framework used
- [Three.js](https://threejs.org/) - 3D library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Lucide Icons](https://lucide.dev/) - Icon library