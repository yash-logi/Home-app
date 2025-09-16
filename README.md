# Smart Home Energy Management System Frontend

## Description

A React-based frontend application for managing smart home energy systems. It provides an interface to monitor devices, control energy usage, and access remote features.

## Features

- Device monitoring and control
- Energy usage tracking
- Remote access capabilities
- Voice control integration
- Responsive UI with modern components

## Installation

1. Clone the repository.
2. Navigate to the frontend directory: `cd app/frontend`
3. Install dependencies: `npm install`

## Dependencies

### Runtime
- lucide-react: ^0.263.1
- react: ^18.2.0
- react-dom: ^18.2.0
- react-router-dom: ^6.8.0

### Development
- @vitejs/plugin-react: ^4.0.0
- jest: ^30.1.1
- vite: ^4.3.0

## Usage

Run the development server: `npm run dev`

Build for production: `npm run build`

Preview production build: `npm run preview`

Run tests: `npm test`

## Project Structure

- `src/App.jsx`: Main application component
- `src/components/`: Reusable UI components
  - DeviceCard.jsx
  - EnergyMonitor.jsx
  - RemoteAccess.jsx
  - VoiceControl.jsx
- `src/hooks/`: Custom React hooks
- `src/ui/`: UI library components

