
# Grocer-ease UI - React Application

A smart shopping assistant React application that helps users navigate through stores, find items with AI assistance, and provides an interactive shopping experience.

## Features

- **Smart Shopping Assistant**: AI-powered chatbot for shopping guidance
- **Interactive Store Selection**: Browse and select from available stores
- **Dynamic Floorplans**: Interactive store layouts with product locations
- **Role-based Access**: Different interfaces for customers, staff, and owners
- **Modern React Architecture**: Component-based, modular design with separation of concerns

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Sidebar.js      # Navigation sidebar
│   ├── Hero.js         # Hero section component
│   ├── Features.js     # Features showcase
│   └── StoreSelection.js # Store selection interface
├── pages/              # Page components
│   ├── LaunchPage.js   # Main landing page
│   ├── StaffPage.js    # Staff dashboard
│   ├── CheckoutPage.js # Checkout interface
│   └── FloorplanPage.js # Interactive floorplan
├── styles/             # CSS modules
│   ├── global.css      # Global styles
│   ├── sidebar.css     # Sidebar styles
│   ├── hero.css        # Hero section styles
│   ├── features.css    # Features section styles
│   ├── store.css       # Store selection styles
│   ├── checkout.css    # Checkout page styles
│   └── floorplan.css   # Floorplan page styles
├── App.js              # Main app component with routing
└── index.js            # App entry point
```

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation & Running

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```

3. **Access the Application**
   - Open your browser and navigate to `http://localhost:3000`
   - The app will automatically reload when you make changes

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## Application Routes

- `/` - Landing page with store selection and features
- `/staff` - Staff dashboard with additional management tools
- `/checkout` - Checkout page for completing purchases
- `/floorplan` - Interactive store floorplan viewer

## User Roles

### Customer
- Browse stores and features
- Access basic shopping assistance
- View store information and hours

### Staff
- All customer features
- Upload inventory management
- Update store floorplans
- Upload Roomba mapping data
- Access to logout functionality

### Owner
- All staff features
- Additional administrative controls

## Key Components

### Sidebar Navigation
- Role-based menu items
- Smooth navigation between sections
- Responsive design for mobile devices

### Interactive Floorplan
- SVG-based store layouts
- Hover interactions for product information
- Real-time data display panel

### Store Selection
- Grid-based store listing
- Distance calculation (location permission required)
- Store hours and amenities display

## Future Development

- [ ] Implement actual AI chatbot integration
- [ ] Add location-based store filtering
- [ ] Integrate checkout payment processing
- [ ] Add user authentication system
- [ ] Implement inventory management backend
- [ ] Add Roomba data visualization

## Technologies Used

- **React 18** - UI framework
- **React Router DOM** - Client-side routing
- **CSS3** - Styling with modern features
- **Font Awesome** - Icon library
- **SVG** - Interactive floorplan graphics

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of a collaborative smart shopping assistant solution.
