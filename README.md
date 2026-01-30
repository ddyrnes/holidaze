# Holidaze

[![Live Demo](https://img.shields.io/badge/demo-live-green)](https://dd-holidaze.netlify.app)

A modern accommodation booking application built with React for Noroff Project Exam 2.

Holidaze allows users to browse and book holiday venues, while venue managers can create and manage their listings.

## Features

### For Customers

- Browse all available venues
- Search for specific venues
- View venue details with image gallery
- Check availability via interactive calendar
- Book accommodations
- View upcoming bookings in profile
- Update profile avatar

### For Venue Managers

- All customer features
- Create new venues with images, amenities, and location
- Edit existing venue details
- Delete venues
- View all bookings for managed venues

## Built With

- [React 19](https://react.dev/) - JavaScript framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Styled Components](https://styled-components.com/) - CSS-in-JS styling
- [React Router](https://reactrouter.com/) - Client-side routing
- [React Hook Form](https://react-hook-form.com/) - Form management
- [React Hot Toast](https://react-hot-toast.com/) - Toast notifications
- [Vite](https://vitejs.dev/) - Build tool

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Daniel-Dyrnes/holidaze.git
   cd holidaze
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:

   ```
   VITE_API_KEY=your-api-key-here
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Getting an API Key

This project uses the [Noroff Holidaze API](https://docs.noroff.dev/docs/v2/holidaze/bookings). To get an API key:

1. Register an account on the Noroff API
2. Generate an API key from your profile
3. Add it to your `.env` file as `VITE_API_KEY`

The API key is required for authenticated requests (login, bookings, venue management).

## Testing the Application

### Creating a Test Account

To test the full functionality, you can register a new account. The API requires email addresses with the `@stud.noroff.no` domain.

**For testing purposes**, you can create a dummy account using any email in this format:

- `yourname@stud.noroff.no`
- `testuser123@stud.noroff.no`
- `anyname@stud.noroff.no`

The email doesn't need to be a real Noroff student email - it just needs to follow the format.

### User Roles

When registering, you can choose to be:

1. **Customer** - Can browse venues and make bookings
2. **Venue Manager** - Can do everything a customer can, plus create and manage venues

Check the "I want to register as a venue manager" checkbox during registration to become a venue manager.

## Available Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint               |

## Deployment

This project is configured for deployment on [Netlify](https://netlify.com).

The `netlify.toml` file includes:

- Build command: `npm run build`
- Publish directory: `dist`
- SPA redirect rules for client-side routing

**Important**: Remember to add your `VITE_API_KEY` as an environment variable in Netlify's dashboard under Site settings → Environment variables.

## Author

Daniel Dyrnes
