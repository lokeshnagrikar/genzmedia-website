# GENZMEDIA - Creative Studio for Growth

A modern, professional website for GENZMEDIA, a creative studio specializing in graphic design, video editing, social media management, and Meta Ads for business owners and content creators.

## 🚀 Features

- **Responsive Design**: Fully responsive layout that works on all devices
- **Modern UI**: Built with Tailwind CSS and Radix UI components
- **Smooth Animations**: Engaging animations and transitions throughout the site
- **Dark Theme**: Sleek dark theme optimized for visual content
- **Performance Optimized**: Built with Next.js for optimal performance
- **SEO Ready**: Proper meta tags and semantic HTML structure

## 🛠️ Tech Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation
- **Analytics**: Vercel Analytics
- **Theme**: next-themes for dark/light mode support

## 📦 Dependencies

### Core Dependencies

- `next`: ^16.0.10
- `react`: ^19.2.0
- `react-dom`: ^19.2.0
- `typescript`: ^5
- `tailwindcss`: ^4.1.9

### UI & Components

- `@radix-ui/*`: Various Radix UI components for accessible UI elements
- `lucide-react`: ^0.454.0 (Icons)
- `class-variance-authority`: ^0.7.1 (Component variants)
- `clsx`: ^2.1.1 (Conditional classes)
- `tailwind-merge`: ^3.3.1 (Tailwind class merging)

### Forms & Validation

- `react-hook-form`: ^7.60.0
- `@hookform/resolvers`: ^3.10.0
- `zod`: ^3.25.76

### Additional Features

- `@vercel/analytics`: ^1.3.1
- `next-themes`: ^0.4.6
- `sonner`: ^1.7.4 (Toast notifications)
- `recharts`: ^2.15.4 (Charts, if used)
- `date-fns`: ^4.1.0 (Date utilities)

## 🏗️ Project Structure

```
genzmedia/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/           # Reusable UI components (Radix UI based)
│   ├── hero.tsx      # Hero section
│   ├── about.tsx     # About section
│   ├── services.tsx  # Services offered
│   ├── portfolio.tsx # Portfolio showcase
│   ├── who-we-work-with.tsx
│   ├── trust.tsx     # Trust indicators
│   ├── cta.tsx       # Call-to-action section
│   ├── footer.tsx    # Footer
│   └── navigation.tsx # Navigation bar
├── hooks/            # Custom React hooks
├── lib/
│   └── utils.ts      # Utility functions
├── public/           # Static assets
└── styles/
    └── globals.css   # Global styles
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- pnpm (recommended) or npm

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd genzmedia
```

2. Install dependencies:

```bash
pnpm install
# or
npm install
```

3. Run the development server:

```bash
pnpm dev
# or
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📜 Available Scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Build the project for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint for code linting

## 🎨 Services Offered

GENZMEDIA provides the following services:

1. **Graphic Designing** - Clean, modern designs for professional branding
2. **Thumbnail Design** - High-impact thumbnails for YouTube, Reels, and Shorts
3. **Video Editing** - Professional editing with clean cuts and smooth flow
4. **Social Media Management** - Content planning and consistent posting
5. **Meta Ads Management** - Performance-driven advertising campaigns

## 🌐 Deployment

This project is configured for deployment on Vercel. The build settings are optimized for Next.js applications.

### Environment Variables

No environment variables are required for basic functionality. However, you may want to add:

- `VERCEL_ANALYTICS_ID` - For Vercel Analytics (automatically handled by Vercel)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary to GENZMEDIA.

## 📞 Contact

For inquiries about services or collaborations, visit the website and use the contact form, or reach out through the provided contact information.

---

Built with ❤️ using Next.js and modern web technologies.
