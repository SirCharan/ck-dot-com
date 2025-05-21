# Charandeep Kapoor - Personal Portfolio

A modern, responsive portfolio website showcasing expertise in crypto, finance, and mathematics. Built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern UI**: Built with React 18, TypeScript, and shadcn/ui
- **Responsive Design**: Fully responsive across all devices
- **Performance Optimized**: Built with Vite for fast development and production builds
- **SEO Friendly**: Comprehensive SEO strategy with structured data, meta tags, sitemap, and React Helmet integration
- **Interactive Elements**: Animated sections and components
- **Crypto Integration**: Live crypto price widgets and financial tools
- **Academic & Professional Profile**: Showcases experience, education, and skills
- **Dark Theme**: Crypto-themed dark mode design
- **Component Library**: Uses shadcn/ui components for consistent design

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Build Tool**: Vite
- **State Management**: React Query (TanStack Query)
- **Routing**: React Router
- **UI Components**: Radix UI primitives, shadcn/ui
- **Data Visualization**: Recharts
- **Form Management**: React Hook Form with Zod validation
- **Analytics**: Vercel Analytics
- **SEO**: React Helmet Async, Structured Data

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/SirCharan/crypto-math-folio-web.git
cd crypto-math-folio-web
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
bun install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
bun dev
```

4. Build for production:
```bash
npm run build
# or
yarn build
# or
bun build
```

## 🏗️ Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── ui/             # shadcn UI components
│   ├── About.tsx       # About section component
│   ├── Academic.tsx    # Academic background component
│   ├── Contact.tsx     # Contact form component
│   ├── CryptoWidget.tsx # Crypto price widget
│   ├── Experience.tsx  # Professional experience component
│   ├── FinancialTools.tsx # Financial calculators component
│   ├── Hero.tsx        # Hero/landing section component
│   ├── Personal.tsx    # Personal details component
│   └── Sidebar.tsx     # Navigation sidebar component
├── pages/              # Page components
│   ├── Index.tsx       # Main landing page
│   └── NotFound.tsx    # 404 page
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and configurations
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

## 🎨 Design System

The project uses a custom design system with the following key colors:
- Primary: Crypto Purple (#8B5CF6)
- Secondary: Crypto Indigo (#6366F1)
- Background: Crypto Black
- Text: White

## 📱 Key Components

- **Hero**: Animated landing section with particles effect
- **About**: Professional summary and key skills
- **Experience**: Timeline of professional experience
- **Academic**: Education background and qualifications
- **FinancialTools**: Interactive financial calculators
- **CryptoWidget**: Live cryptocurrency price tracker
- **Contact**: Contact form with validation

## 🌐 Deployment

The website is deployed at [charandeepkapoor.com](https://charandeepkapoor.com)

## 🧪 Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build locally

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
