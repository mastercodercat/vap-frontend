# VAP Frontend

A React TypeScript application with AI-powered virtual assistant features, developer networking, and resume generation capabilities.

## Features

- **Authentication System**: Sign up, sign in, and persistent authentication across browser sessions
- **Dashboard**: Modern dashboard with sidebar navigation and analytics
- **Developer Network**: Connect with talented developers and find collaborators
- **AI Resume Generation**: Create professional resumes with AI assistance
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **State Management**: Redux Toolkit for predictable state management

## Authentication Persistence

The application automatically saves authentication state to localStorage and restores it on page refresh. This ensures users remain logged in across browser sessions.

### How it works:

1. **Login/Signup**: When users successfully authenticate, their user data and JWT token are saved to localStorage
2. **Page Refresh**: On app initialization, the stored authentication data is validated and restored
3. **Token Validation**: The system checks if the stored token is valid and not expired
4. **Auto Logout**: If the token is expired or invalid, users are automatically logged out

### Storage Key:

- `vap_auth`: Contains user data and JWT token

### Utility Functions:

- `saveAuthToStorage()`: Save authentication data to localStorage
- `loadAuthFromStorage()`: Load authentication data from localStorage
- `validateStoredAuth()`: Validate stored authentication data
- `clearAuthFromStorage()`: Clear authentication data from localStorage
- `isTokenExpired()`: Check if JWT token is expired

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd vap-frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:3000
```

4. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── SignInDialog.tsx
│   ├── SignUpDialog.tsx
│   ├── Sidebar.tsx
│   └── Header.tsx
├── pages/              # Page components
│   ├── HomePage.tsx
│   └── LandingPage.tsx
├── store/              # Redux store and slices
│   ├── index.ts
│   ├── hooks.ts
│   └── slices/
│       ├── authSlice.ts
│       └── uiSlice.ts
├── utils/              # Utility functions
│   └── authPersistence.ts
└── App.tsx             # Main application component
```

## Technologies Used

- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Radix UI** for accessible components
- **Redux Toolkit** for state management
- **React Router** for navigation

## API Integration

The application integrates with a backend API for authentication and data management. Make sure your backend server is running on the configured URL (default: `http://localhost:3000`).

### Authentication Endpoints:

- `POST /auth/login` - User sign in
- `POST /auth/register` - User sign up

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Environment Variables

- `VITE_API_URL` - Backend API URL (default: http://localhost:3000)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
