# WDING® - San Diego Wedding Planning Agency

A beautiful, modern wedding planning website built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## ✨ Features

- **Modern Design**: Elegant, responsive design inspired by the Dribbble template
- **Smooth Animations**: Page transitions and scroll animations using Framer Motion
- **Performance Optimized**: Server Components by default, optimized images
- **Fully Typed**: TypeScript throughout the codebase
- **Accessible**: Built with Radix UI primitives for accessibility

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **UI Components**: Custom components with Radix UI
- **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/charmas3r/cursor-website.git
cd cursor-website
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
├── app/
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Home page
├── components/
│   ├── ui/              # Reusable UI components
│   │   ├── button.tsx
│   │   └── card.tsx
│   ├── Navigation.tsx   # Main navigation
│   ├── Hero.tsx         # Hero section
│   ├── Services.tsx     # Services section
│   ├── About.tsx        # About section
│   ├── Gallery.tsx      # Portfolio gallery
│   ├── Contact.tsx      # Contact form
│   └── Footer.tsx       # Footer
├── lib/
│   └── utils.ts         # Utility functions
├── .cursor/
│   └── rules/           # Cursor MDC rules
└── public/              # Static assets
```

## 🎨 Design System

### Colors

- **Cream**: Warm, elegant backgrounds
- **Blush**: Accent color for CTAs and highlights
- **Sage**: Secondary accent for nature-inspired elements
- **Charcoal**: Text and dark elements

### Typography

- **Serif**: Playfair Display for headings
- **Sans**: DM Sans for body text

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests
- `npm run test:coverage` - Run tests with coverage

## 🧪 Testing

Tests are written with Vitest and React Testing Library. Run tests with:

```bash
npm test
```

For coverage reports:

```bash
npm run test:coverage
```

## 📄 License

This project is private and proprietary.

## 🤝 Support

For support, email hello@wding.com or visit our website.




