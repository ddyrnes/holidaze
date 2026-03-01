# Holidaze

A modern accommodation booking front-end application built with React and TypeScript for Noroff Project Exam 2.

## Links

- Live Site: https://dd-holidaze.netlify.app/
- GitHub Repo: https://github.com/ddyrnes/holidaze

## Project Description

Holidaze allows customers to browse and book venues, while venue managers can create, edit, and manage venue listings.  
The application includes authentication, booking flows, and venue management in one responsive interface.

## Features

### Customer Features

- Browse and search venues
- View detailed venue pages with image galleries
- Check date availability in calendar
- Book venues
- View upcoming bookings in profile
- Update profile avatar

### Venue Manager Features

- All customer features
- Create venues with images, amenities, and location
- Edit venue details
- Delete venues
- View bookings for managed venues

## Tech Stack

- React 19
- TypeScript
- Styled Components
- React Router
- React Hook Form
- React Hot Toast
- Vite

## Installation

1. Clone the repository:

```bash
git clone https://github.com/ddyrnes/holidaze.git
cd holidaze
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```env
VITE_API_KEY=your_api_key_here
```

4. Start development server:

```bash
npm run dev
```

5. Open in browser:

```text
http://localhost:5173
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run linter

## API Key / Authentication Notes

- Register via the Noroff API and generate an API key from your profile.
- The Holidaze API requires `@stud.noroff.no` email format for registration.
- Add `VITE_API_KEY` to your local `.env` and deployment environment variables.

## Deployment

Configured for Netlify with SPA routing support via `netlify.toml`.

## Screenshots

![Holidaze venue page](https://raw.githubusercontent.com/ddyrnes/portfolio/main/images/holidaze1.png)
![Holidaze booking view](https://raw.githubusercontent.com/ddyrnes/portfolio/main/images/holidaze2.png)

## Author

Daniel Dyrnes
