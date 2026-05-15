# Gold Saving Admin Mobile Application (POC)

A modern, scalable React Native Admin Panel for a Gold Saving Application. Built with Clean Architecture and a premium fintech-style UI.

## 🚀 Tech Stack

- **Framework**: React Native (Expo)
- **Language**: TypeScript
- **Styling**: NativeWind (Tailwind CSS)
- **State Management**: Zustand
- **Navigation**: React Navigation (Stack, Tab)
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React Native
- **Animations**: React Native Reanimated
- **Charts**: Victory Native
- **List Performance**: @shopify/flash-list

## 📁 Folder Structure

```text
src/
├── assets/         # Images, fonts, and icons
├── components/     # Reusable UI components (Atomic design)
├── constants/      # API endpoints, routes, and app config
├── helpers/        # Formatters and validation helpers
├── hooks/          # Custom react hooks
├── interfaces/     # TypeScript types and interfaces
├── navigation/     # Navigation configuration
├── screens/        # Screen components organized by module
├── store/          # Zustand store slices
└── utils/          # Axios client and utility functions
```

## 🛠️ Features Implemented

1. **Authentication**: Admin login with validation and state management.
2. **Dashboard**: Stats overview, recent transactions, and quick actions.
3. **Customer Management**: Searchable customer list with status indicators.
4. **Scheme Management**: CRUD UI for gold saving schemes.
5. **Payment Tracking**: Transaction history with success/fail states.
6. **Due Monitoring**: Tracking overdue installments and collection tools.
7. **Banners & Offers**: UI for managing promotional content.

## 🏁 Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start the Project**:
   ```bash
   npx expo start
   ```

3. **Run on Device/Simulator**:
   - Press `a` for Android
   - Press `i` for iOS
   - Or scan the QR code with Expo Go app.

## 📄 License
This project is for POC purposes only.
