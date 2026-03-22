# NutriApp - Premium Health Tracker

NutriApp is a modern, high-performance web application designed for tracking health and nutrition with a stunning **Premium Glassmorphism UI**.

![Dashboard Preview](public/preview.png) *(Note: Add a preview image in public/ if desired)*

## ✨ Features

- **Dashboard V2**: Modern glassmorphism interface with real-time progress tracking.
- **Kcal & Macro Tracker**: Circular visualization for daily calorie intake and progress bars for Protein, Carbs, and Fats.
- **Body Metrics**: Track Weight, IMC (BMI), and Fat Percentage.
- **Interactive History**: Visual evolution charts (Weight vs Time) using Recharts.
- **Daily Nutritional Tips**: Rotating tips authorized by WHO recommendations.
- **PWA Ready**: Installable application with offline support and prepared for Push Notifications.
- **Supabase Integration**: Real-time database for persistent and secure user data.

## 🚀 Tech Stack

- **Frontend**: React 18, TypeScript, Vite.
- **Styling**: Vanilla CSS with Glassmorphism & Custom Properties.
- **Icons**: Lucide React.
- **Charts**: Recharts.
- **Backend**: Supabase (PostgreSQL + Auth).
- **PWA**: Vite PWA Plugin.

## 🛠️ Setup & Installation

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd app-nutri
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Environment Variables**:
   Create a `.env` file in the root based on `.env.example`:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Database Setup**:
   Run the content of `supabase_init.sql` in your Supabase SQL Editor.

5. **Run in development**:
   ```bash
   pnpm run dev
   ```

6. **Build for production**:
   ```bash
   pnpm run build
   ```

## 📱 Mobile First
The interface is optimized for mobile devices with a fixed bottom navigation bar and touch-friendly interactive elements.

## 📄 License
MIT
