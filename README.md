# 📦 Order Tracking UI

![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![React Icons](https://img.shields.io/badge/react--icons-5.x-E91E63?style=for-the-badge&logo=react)
![Mobile First](https://img.shields.io/badge/Mobile--First-430px-10B981?style=for-the-badge)

A polished, mobile-first **Order Tracking UI** component built with the **Next.js App Router**, **TypeScript**, **Tailwind CSS v4**, and **react-icons**. The screen is center-aligned with a maximum width of **430px**, simulating a real mobile app shell across all screen sizes.

---

## ✨ Overview

This project implements a fully interactive order tracking screen — the kind you'd find inside a modern e-commerce or delivery app. It showcases four distinct tracking states, each with its own layout, banners, and actions, all toggled via an interactive **State Switcher Bar** at the top of the screen.

---

## 🚀 Key Features

### 🔀 Interactive 4-State Switcher
A horizontally scrollable, pill-tab controller that instantly switches between all four order tracking edge cases:

| State | Description |
|---|---|
| **Normal** | Default active tracking timeline — order is in transit |
| **Delayed** | Weather-related delay banner with updated ETA and priority support link |
| **Not Received** | Delivered but not received — warning banner with "Claim Not Received" action |
| **Not Available** | Tracking data not yet available — friendly empty state card with dispatch alert |

### 📍 Vertical Timeline Progress Bar
- 4 sequential stages: **Processing → Shipped → Out for Delivery → Delivered**
- Completed steps show a solid green check icon
- Active step pulses with a live blue indicator
- Upcoming steps render as muted/outlined nodes
- Tapping any step expands hidden scan metadata (Facility Code, Barcode)
- Connecting bar fill reflects current progress (full green, gradient, or muted)

### 🧾 Order Summary Card
- Collapsible accordion panel revealing order line items
- Product image thumbnail (via `next/image`), product title, variant, SKU, and quantity
- Full price breakdown: Subtotal, Express Shipping, Estimated Tax, **Total Paid**
- Shipping address and masked payment method display

### 🔔 Dynamic Notice Banners
Contextual banners that adapt to the active state:
- 🟡 **Delay Banner** — amber warning with carrier link for priority support
- 🔴 **Not Received Banner** — rose alert prompting a non-receipt investigation claim
- 🔵 **Info Banner** — indigo notice shown while tracking details are still processing

### 🛠️ Support Action Buttons
Two primary action triggers at the bottom of the mobile frame, each opening a dedicated modal:
- **Contact Support** — live chat or toll-free phone call options
- **Report Issue** — categorized issue ticket submission form
- **Claim Not Received** — special rose CTA button for the delivered-not-received state, opening a claim resolution form with a pre-flight checklist

### ⚡ Micro-Interactions
- Order ID **click-to-copy** with a checkmark feedback indicator
- Floating **toast notification** system for user action feedback
- Refresh spin animation on the status refresh button
- Dispatch alert toggle with subscribed/unsubscribed state
- Active tab scale bump on the state switcher

---

## 🏗️ Architecture

The codebase is structured for maximum readability and maintainability:

- **100% TypeScript** — every component, prop, and data object is strictly typed
- **Component Isolation** — each component is self-contained and under ~150–200 lines
- **Separate Data Layer** — all mock data lives in `data/mockData.ts`, completely decoupled from UI
- **Dedicated Type Definitions** — all interfaces and type aliases centralized in `types/tracking.ts`

---

## 📁 Folder Structure

```
vecosoft-order-tracking-task/
├── app/
│   ├── favicon.ico
│   ├── globals.css         # Tailwind v4 global styles
│   ├── layout.tsx          # Root layout with font configuration
│   └── page.tsx            # Main page — assembles all components
│
├── components/
│   ├── StateSwitcher.tsx   # Horizontally scrollable tab bar (4 states)
│   ├── Header.tsx          # Order ID, status badge, ETA, carrier info
│   ├── NoticeBanner.tsx    # Dynamic alert banners per state
│   ├── Timeline.tsx        # Vertical 4-stage progress bar + empty state
│   ├── OrderSummary.tsx    # Collapsible item card with price breakdown
│   └── SupportActions.tsx  # Action buttons + Support, Report & Claim modals
│
├── data/
│   └── mockData.ts         # Typed mock data for all 4 order states
│
├── types/
│   └── tracking.ts         # TypeScript interfaces and type aliases
│
├── public/
│   └── images/
│       └── headphones.jpg  # Product image asset
│
├── next.config.ts
├── postcss.config.mjs
├── tsconfig.json
└── package.json
```

---

## 🧩 Component Responsibilities

| Component | File | Responsibility |
|---|---|---|
| `StateSwitcher` | `components/StateSwitcher.tsx` | Scrollable pill tab bar to toggle between 4 edge-case view states |
| `Header` | `components/Header.tsx` | Order ID with copy action, status badge, estimated delivery, carrier tag |
| `NoticeBanner` | `components/NoticeBanner.tsx` | Contextual delay, warning, and info alert banners |
| `Timeline` | `components/Timeline.tsx` | Vertical 4-stage progress steps and empty/pending tracking state |
| `OrderSummary` | `components/OrderSummary.tsx` | Collapsible product card with pricing breakdown and shipping details |
| `SupportActions` | `components/SupportActions.tsx` | Support and report buttons with three interactive modal drawers |

---

## 🔷 TypeScript Types

All interfaces and type aliases are defined in [`types/tracking.ts`](./types/tracking.ts):

```typescript
type ViewState = "normal" | "delayed" | "delivered_not_received" | "tracking_not_available";
type OrderStatus = "In Transit" | "Shipment Delayed" | "Delivered Today" | "Processing Order";
type BadgeVariant = "blue" | "amber" | "emerald" | "slate";
type StepStatus = "completed" | "active" | "upcoming";

interface TimelineStep { ... }
interface OrderItem { ... }
interface NoticeBannerInfo { ... }
interface OrderDetails { ... }
```

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [Next.js](https://nextjs.org/) | 16.3.x | App Router, server components, `next/image` |
| [TypeScript](https://www.typescriptlang.org/) | 5.x | Full static type safety |
| [Tailwind CSS](https://tailwindcss.com/) | 4.x | Utility-first styling, `@tailwindcss/postcss` |
| [react-icons](https://react-icons.github.io/react-icons/) | 5.x | Feather icon set (`react-icons/fi`) |

---

## ⚙️ Getting Started

### Prerequisites

- **Node.js** `v18.0+`
- **npm** `v9.0+` (or `pnpm` / `yarn`)

### 1. Clone the Repository

```bash
git clone https://github.com/mahdihasanprogrammer/vecosoft-order-tracking-task.git
cd vecosoft-order-tracking-task
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production

```bash
npm run build
npm run start
```

---

## 📱 Design Decisions

- **Mobile-First Frame**: The entire UI is rendered inside a `max-w-[430px]` rounded card with `shadow-2xl`, mimicking a real device shell on desktop screens.
- **Glassmorphism Details**: StateSwitcher and modal backdrop utilize `backdrop-blur` and semi-transparent backgrounds for a premium feel.
- **Consistent Spacing**: All child components use uniform `w-full px-4 py-3 space-y-4` conventions to guarantee pixel-perfect alignment across state transitions.
- **No-Scrollbar Horizontal Tabs**: The state switcher uses CSS `scrollbar-width: none` and `flex-nowrap` so tabs never squeeze or truncate on any viewport.
- **Live Status Indicators**: Active tracking and the "Live" badge use `animate-pulse` for a real-time feel without WebSocket complexity.

---

## 📄 License

This project is created as part of a frontend development task for **Vecosoft**.

---

<div align="center">
  <sub>Built with ❤️ using Next.js, TypeScript & Tailwind CSS</sub>
</div>
