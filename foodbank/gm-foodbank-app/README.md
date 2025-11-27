# Gwangmyeong Food Bank - Donor Location Map

A modern web application built with React, TypeScript, and Mapbox GL JS to visualize donor locations on an interactive 3D map.

## Features

- **Interactive 3D Map**: Toggle between 2D and 3D views with Mapbox GL JS
- **Donor Markers**: Color-coded markers by donor type (Government, Corporate, Individual)
- **Detailed Popups**: Click markers to view donor information
- **Filtering**: Filter donors by type with real-time updates
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Stats**: View total donors and donors displayed on the map

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Mapping**: Mapbox GL JS + react-map-gl
- **Styling**: CSS3 with responsive design
- **Data**: JSON-based donor database

## Prerequisites

- Node.js (v18.16.0 or higher recommended)
- npm (v9.5.1 or higher)
- Mapbox API token (free tier available)

## Getting Started

### 1. Get Your Mapbox Token

1. Create a free account at [Mapbox](https://account.mapbox.com/auth/signup/)
2. Go to your [Access Tokens page](https://account.mapbox.com/access-tokens/)
3. Copy your default public token or create a new one

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Edit `.env` and add your Mapbox token:

```env
VITE_MAPBOX_TOKEN=your_actual_mapbox_token_here
```

### 4. Run Development Server

```bash
npm run dev
```

The app will open at `http://localhost:5173`

## Project Structure

```
donor-map-app/
├── src/
│   ├── components/
│   │   ├── DonorMap.tsx        # Main map component with 3D features
│   │   └── FilterControls.tsx  # Donor type filter UI
│   ├── data/
│   │   └── donors.json         # Donor database
│   ├── types/
│   │   └── donor.ts            # TypeScript type definitions
│   ├── App.tsx                 # Main app component
│   ├── App.css                 # App-specific styles
│   ├── index.css               # Global styles
│   └── main.tsx                # App entry point
├── .env                        # Environment variables (not in git)
├── .env.example                # Environment template
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Map Features

### 3D View Toggle
Click the "3D View" button in the top-left corner to switch between 2D and 3D perspectives.

### Marker Colors
- 🔵 **Blue**: Government donors
- 🟢 **Green**: Corporate donors
- 🟠 **Orange**: Individual donors

### Navigation Controls
- Zoom in/out
- Rotate view (in 3D mode)
- Reset bearing to north
- Fullscreen mode
- Scale indicator

## Data Management

### Donor Data Format

The donor data is stored in `src/data/donors.json`:

```json
{
  "metadata": {
    "lastUpdated": "2025-11-20T15:52:00Z",
    "totalDonors": 3,
    "geocodingStatus": "partial"
  },
  "donors": [
    {
      "id": "DONR001",
      "name": "광명시청",
      "type": "Government",
      "coordinates": {
        "lat": 37.4784878,
        "lng": 126.8642888
      },
      // ... other fields
    }
  ]
}
```

### Updating Donor Data

1. Edit `src/data/donors.json`
2. Ensure Korean addresses are geocoded to latitude/longitude
3. Save the file - hot reload will update the map automatically

### Geocoding Korean Addresses

For production use, implement automated geocoding using:
- **Kakao Maps API** (recommended for Korean addresses)
- **Mapbox Geocoding API** (included with Mapbox token)

## Deployment

### Azure Static Web Apps (Recommended)

1. Build the app:
```bash
npm run build
```

2. Deploy the `dist` folder to Azure Static Web Apps

3. Set environment variables in Azure:
   - `VITE_MAPBOX_TOKEN`: Your Mapbox token

### Alternative Deployment Options

- **Netlify**: Connect GitHub repo, set build command to `npm run build`, publish directory to `dist`
- **Vercel**: Same as Netlify
- **Azure App Service**: More control but higher cost

## Security Considerations

- ✅ `.env` file is git-ignored
- ✅ Mapbox token has domain restrictions (configure in Mapbox dashboard)
- ✅ No sensitive donor information exposed in client-side code
- ⚠️ Add authentication for production use
- ⚠️ Implement HTTPS in production

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimization

- Data is loaded once at startup
- Markers are rendered efficiently with react-map-gl
- 3D terrain uses Mapbox's optimized rendering
- Images and assets are optimized by Vite

## Troubleshooting

### Map doesn't load
- Check that `.env` file exists and contains valid Mapbox token
- Verify token hasn't expired in Mapbox dashboard
- Check browser console for errors

### Markers not showing
- Verify donor data has valid `coordinates` (not null)
- Check that `lat` and `lng` values are numbers
- Ensure coordinates are in valid range (lat: -90 to 90, lng: -180 to 180)

### 3D view not working
- 3D terrain requires Mapbox GL JS v2+
- Check browser WebGL support
- Try updating browser to latest version

## Future Enhancements

- [ ] Search functionality for donors
- [ ] Clustering for many markers
- [ ] Export donor list to CSV/Excel
- [ ] Route planning for donor visits
- [ ] Integration with Google Sheets for live data sync
- [ ] Multi-language support (Korean/English toggle)
- [ ] Dark mode support
- [ ] Analytics dashboard

## Contributing

This is a project for Gwangmyeong Food Bank. For questions or suggestions, please contact the development team.

## License

Proprietary - Gwangmyeong Food Bank

## Acknowledgments

- Built with [React](https://react.dev/)
- Maps powered by [Mapbox](https://www.mapbox.com/)
- Bootstrapped with [Vite](https://vitejs.dev/)
- Icons from Unicode emoji set
