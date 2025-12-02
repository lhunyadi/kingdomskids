# 👑 Kingdom's Kids

<div align="center">

![Kingdom's Kids](https://img.shields.io/badge/Kingdom's_Kids-Faith_Based_Platform-gold?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-16.0.2-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?style=for-the-badge&logo=tailwindcss)

**🌟 Nurturing Faith, Inspiring Young Hearts 🌟**

[Live Website](https://kingdomskids.org) • [Report Bug](https://github.com/lhunyadi/kingdomskids/issues) • [Request Feature](https://github.com/lhunyadi/kingdomskids/issues)

</div>

---

## 📖 About The Project

**Kingdom's Kids** is a modern, faith-based web platform designed to inspire and nurture the spiritual growth of children. Built with cutting-edge web technologies, this platform provides an engaging, interactive, and visually stunning experience for families seeking to instill Christian values in their young ones.

### ✨ Key Features

- 🎨 **Modern UI/UX** - Beautiful, child-friendly design with smooth animations
- 📱 **Fully Responsive** - Seamless experience across all devices
- ⚡ **Lightning Fast** - Optimized performance with Next.js 16
- 🎭 **Smooth Animations** - Powered by Framer Motion and GSAP
- 🖱️ **Butter-Smooth Scrolling** - Enhanced with Lenis scroll library
- 🧩 **Component-Based Architecture** - Modular and maintainable codebase
- ♿ **Accessible** - Built with Radix UI primitives for accessibility

---

## 🛠️ Tech Stack

### Frontend Framework
| Technology | Version | Purpose |
|------------|---------|---------|
| [Next.js](https://nextjs.org/) | 16.0.2 | React framework with App Router |
| [React](https://react.dev/) | 19.2.0 | UI library |
| [TypeScript](https://www.typescriptlang.org/) | 5.x | Type-safe JavaScript |

### Styling & UI
| Technology | Version | Purpose |
|------------|---------|---------|
| [Tailwind CSS](https://tailwindcss.com/) | 4.x | Utility-first CSS framework |
| [Radix UI](https://www.radix-ui.com/) | Latest | Accessible component primitives |
| [Lucide React](https://lucide.dev/) | 0.554.0 | Beautiful icon library |
| [React Icons](https://react-icons.github.io/react-icons/) | 5.5.0 | Popular icon packs |

### Animation & Interactions
| Technology | Version | Purpose |
|------------|---------|---------|
| [Framer Motion](https://www.framer.com/motion/) | 12.23.24 | Declarative animations |
| [GSAP](https://greensock.com/gsap/) | 3.13.0 | Professional-grade animations |
| [Lenis](https://lenis.studiofreight.com/) | 1.3.15 | Smooth scroll library |

### Utilities
| Technology | Purpose |
|------------|---------|
| [clsx](https://github.com/lukeed/clsx) | Conditional class names |
| [class-variance-authority](https://cva.style/docs) | Component variant management |
| [tailwind-merge](https://github.com/dcastil/tailwind-merge) | Merge Tailwind classes intelligently |
| [cmdk](https://cmdk.paco.me/) | Command menu component |

---

## 📁 Project Structure

```
kingdomskids/
├── 📂 app/                    # Next.js App Router
│   ├── 📄 favicon.ico         # Site favicon
│   ├── 📄 globals.css         # Global styles
│   ├── 📄 layout.tsx          # Root layout component
│   └── 📄 page.tsx            # Home page
├── 📂 components/             # React components
│   ├── 📂 icons/              # Custom icon components
│   ├── 📂 ui/                 # Reusable UI components
│   ├── 📄 Header.tsx          # Main header component
│   ├── 📄 Header1.tsx         # Alternative header variant
│   ├── 📄 Header3.tsx         # Header variant 3
│   ├── 📄 Footer.tsx          # Footer component
│   └── 📄 Scroll.tsx          # Smooth scroll wrapper
├── 📂 lib/                    # Utility functions
├── 📂 public/                 # Static assets
├── 📄 components.json         # shadcn/ui configuration
├── 📄 next.config.ts          # Next.js configuration
├── 📄 tailwind.config.ts      # Tailwind CSS configuration
├── 📄 tsconfig.json           # TypeScript configuration
├── 📄 postcss.config.mjs      # PostCSS configuration
├── 📄 eslint.config.mjs       # ESLint configuration
└── 📄 package.json            # Project dependencies
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** 18.17 or later
- **npm**, **yarn**, **pnpm**, or **bun**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/lhunyadi/kingdomskids.git
   cd kingdomskids
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint for code quality |

---

## 🗺️ Roadmap & Future Releases

### 🎯 Version 0.2.0 - Core Features (Q1 2026)
- [ ] **Interactive Bible Stories** - Animated stories for children
- [ ] **Memory Verse Games** - Fun ways to memorize scripture
- [ ] **Prayer Journal** - Kids can write and track prayers
- [ ] **Parental Dashboard** - Monitor children's progress
- [ ] **Multi-language Support** - English, Spanish, and more

### 🎯 Version 0.3.0 - Enhanced Engagement (Q2 2026)
- [ ] **Achievement System** - Badges and rewards for learning
- [ ] **Audio Bible Stories** - Listen-along feature
- [ ] **Coloring Pages** - Printable and digital coloring activities
- [ ] **Worship Music Player** - Curated playlists for kids
- [ ] **Character Avatars** - Customizable profiles

### 🎯 Version 0.4.0 - Community Features (Q3 2026)
- [ ] **Church Integration** - Connect with local churches
- [ ] **Group Challenges** - Sunday school competitions
- [ ] **Family Devotionals** - Guided family worship time
- [ ] **Event Calendar** - VBS, camps, and church events
- [ ] **Push Notifications** - Daily verse reminders

### 🎯 Version 0.5.0 - Advanced Learning (Q4 2026)
- [ ] **Video Lessons** - Animated teaching content
- [ ] **Quiz System** - Test knowledge with fun quizzes
- [ ] **Progress Tracking** - Visual learning journey
- [ ] **Certificate Generation** - Completion certificates
- [ ] **Offline Mode** - Access content without internet

### 🎯 Version 1.0.0 - Full Platform Launch (2027)
- [ ] **Mobile Apps** - Native iOS and Android applications
- [ ] **API for Churches** - Integration capabilities
- [ ] **Premium Content** - Subscription-based advanced features
- [ ] **Teacher Resources** - Lesson plans and materials
- [ ] **Analytics Dashboard** - Insights for parents and educators

---

## 🎨 Design Philosophy

Kingdom's Kids follows these core design principles:

1. **🧒 Child-Centric** - Every design decision prioritizes children's needs and engagement
2. **🎨 Vibrant & Joyful** - Colors and animations that spark joy and curiosity
3. **📖 Faith-Focused** - Content that nurtures spiritual growth
4. **🔒 Safe & Secure** - A protected environment for young users
5. **♿ Accessible** - Inclusive design for all abilities

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style and conventions
- Write meaningful commit messages
- Add tests for new features when applicable
- Update documentation as needed
- Be respectful and constructive in discussions

---

## 📜 License

This project is currently unlicensed. Please contact the maintainers for usage permissions.

---

## 📞 Contact & Support

- **Website**: [kingdomskids.org](https://kingdomskids.org)
- **GitHub Issues**: [Report bugs or request features](https://github.com/lhunyadi/kingdomskids/issues)
- **Maintainer**: [@lhunyadi](https://github.com/lhunyadi)

---

## 🙏 Acknowledgments

- [Next.js Team](https://nextjs.org/) for the amazing framework
- [Vercel](https://vercel.com/) for hosting and deployment
- [Radix UI](https://www.radix-ui.com/) for accessible components
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first approach
- All contributors and supporters of this ministry

---

<div align="center">

**"Train up a child in the way he should go; even when he is old he will not depart from it."**
<br>
*— Proverbs 22:6*

---

Made with ❤️ and ✝️ for the Kingdom

![Stars](https://img.shields.io/github/stars/lhunyadi/kingdomskids?style=social)
![Forks](https://img.shields.io/github/forks/lhunyadi/kingdomskids?style=social)

</div>