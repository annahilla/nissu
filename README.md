# Nissu – Habit Streak Tracker App

**Nissu** is a fun and motivating habit streak tracker built with React Native and Expo. Complete daily habits, maintain your streaks, and help a little cat named Nissu build a tall cozy home for each habit – one floor at a time!

<p align="center">
  <img src="/assets/app-preview/screen-1.png" width="24%" />
  <img src="/assets/app-preview/screen-2.gif" width="24%" />
  <img src="/assets/app-preview/screen-3.gif" width="24%" />
  <img src="/assets/app-preview/screen-4.gif" width="24%" />
</p>

## Features

- Create and manage daily habits
- Track habit streaks and keep consistency
- Build Nissu's house with every successful streak for each habit
- Earn **streak protectors** every 7 days to preserve your progress
- Cloud backend using Appwrite for auth and data

## Tech Stack

- **React Native** with [Expo](https://expo.dev)
- **Tailwind CSS** via [NativeWind](https://www.nativewind.dev)
- **Appwrite** for authentication and database
- **Figma** for design creation

## Getting Started

Clone the repo and install dependencies:

```bash
git clone https://github.com/annahilla/nissu
cd nissu
npm install
npx start
```

## Environment Variables

To connect the app with your Appwrite backend, create a `.env` file at the root of the project with the following values:

```env
EXPO_PUBLIC_APPWRITE_ENDPOINT="https://cloud.appwrite.io/v1"
EXPO_PUBLIC_APPWRITE_PROJECT_ID=your-project-id
EXPO_PUBLIC_APPWRITE_DB=your-database-id
EXPO_PUBLIC_APPWRITE_COL_HABITS_ID=your-habits-collection-id
EXPO_PUBLIC_APPWRITE_COL_STREAK_ID=your-streak-protector-collection-id
EXPO_PUBLIC_APPWRITE_BUNDLE_ID=your.ios.bundle.id
EXPO_PUBLIC_APPWRITE_PACKAGE_NAME=your.android.package.name
```

## View the App

You can preview the app on your device or emulator:

- **Expo Go**: Download the Expo Go app on your phone. Run npx expo start and scan the QR code with Expo Go.
- **Android Studio**: Make sure your emulator is running. Run npx expo start, then press: a for Android emulator.

## Authentication

- Login with email and password (via Appwrite)
- Auth state is managed through AuthContext

## Coming Soon

- Handle streak protector use
- Visual house-building animation
- Sound effects and device vibration
- Push notifications
