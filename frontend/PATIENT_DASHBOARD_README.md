# Patient Dashboard Feature

## Overview
The Patient Dashboard provides a comprehensive view of patient diagnosis history and treatment progress tracking. This feature allows healthcare providers to monitor patient data, track healing progress, and view detailed clinical metrics.

## Components

### 1. DiagnosisHistory Component
Location: `frontend/src/components/patient/DiagnosisHistory.jsx`

**Features:**
- Display complete diagnosis history with clinical metrics
- Show risk level indicators (Low, Medium, High)
- Display confidence scores
- Show ABCDE criteria metrics (Asymmetry, Border, Color, Diameter, Evolution)
- Additional dermoscopic features (Pigment Net, Blue-White, Vessels)
- Timestamped entries with formatted dates
- Clinical notes display

**Props:**
- `diagnoses` (array): Array of diagnosis objects containing:
  - `date`: Diagnosis date/time
  - `condition`: Diagnosis name
  - `riskLevel`: Risk assessment (Low Risk, Medium Risk, High Risk)
  - `confidence`: Confidence percentage (0-100)
  - `notes`: Clinical notes
  - `metrics`: Object containing clinical measurements

### 2. TreatmentProgress Component
Location: `frontend/src/components/patient/TreatmentProgress.jsx`

**Features:**
- Visual progress tracking with animated progress bars
- Color-coded progress scores (Green: 80+, Yellow: 60-79, Orange: <60)
- Trend indicators (up, down, stable)
- Progress comparison over time
- Clinical notes for each progress entry
- Overall progress summary

**Props:**
- `progressEntries` (array): Array of progress objects containing:
  - `date`: Entry date
  - `score`: Progress score (0-100)
  - `title`: Progress entry title
  - `notes`: Clinical observations
  - `trend`: Trend indicator ('up', 'down', 'stable')

### 3. PatientDetail Page (Enhanced)
Location: `frontend/src/pages/PatientDetail.jsx`

**Features:**
- Tabbed interface for Diagnoses and Progress views
- Patient information card with avatar and key stats
- Quick action buttons (New Analysis, Share)
- Tab badges showing counts
- Responsive layout

### 4. PatientDashboard Page (New)
Location: `frontend/src/pages/PatientDashboard.jsx`

**Features:**
- Full-screen patient dashboard view
- Sticky header navigation
- Statistics cards showing:
  - Total diagnoses count
  - Total progress entries
  - High-risk diagnoses count
- Clean, modern UI matching the design mockups

## Usage

### Viewing Patient Dashboard
```javascript
// Navigate to patient detail page
<Link to={`/patients/${patientId}`}>View Patient</Link>

// Or navigate to full dashboard view
<Link to={`/patients/${patientId}/dashboard`}>Patient Dashboard</Link>
```

### Data Structure Examples

#### Diagnosis Object
```javascript
{
  date: 'October 30, 2025 at 04:23 PM',
  condition: 'Melanocytic Nevus',
  riskLevel: 'Low Risk',
  confidence: 86,
  notes: 'Benign-appearing nevus. Advise routine monitoring.',
  metrics: {
    asymmetry: 97,
    border: 91,
    colorVariation: 74,
    diameter: '9.0',
    evolution: 'Absent',
    pigmentNet: 15,
    blueWhite: 21,
    vessels: 2
  }
}
```

#### Progress Entry Object
```javascript
{
  date: 'Nov 4, 2025',
  score: 74,
  title: 'Healing Progress',
  notes: 'Slight improvement in border regularity and color uniformity.',
  trend: 'up'
}
```

## Styling

The dashboard uses Tailwind CSS with custom components defined in `index.css`:
- `.btn-primary` - Primary action buttons
- `.btn-secondary` - Secondary action buttons
- `.card` - Card containers
- Custom scrollbar styling
- Smooth transitions and animations

## Color Scheme

**Risk Levels:**
- Low Risk: Green (bg-green-100, text-green-700)
- Medium Risk: Yellow (bg-yellow-100, text-yellow-700)
- High Risk: Red (bg-red-100, text-red-700)

**Progress Scores:**
- Excellent (80-100): Green
- Good (60-79): Yellow
- Needs Attention (<60): Orange

## Responsive Design

The dashboard is fully responsive with:
- Mobile-first approach
- Grid layouts that adapt to screen size
- Touch-friendly buttons and interactions
- Readable text sizes across devices

## Future Enhancements

Potential improvements:
1. Export diagnosis history to PDF
2. Add filtering and search for diagnoses
3. Compare multiple progress entries side-by-side
4. Add image thumbnails to diagnosis entries
5. Implement real-time notifications for high-risk cases
6. Add charting/graphing for progress trends
7. Enable comments/annotations on entries

## Testing

To test the dashboard:
1. Navigate to any patient from the Patient List
2. View both "Diagnoses" and "Progress" tabs
3. Check responsive behavior on different screen sizes
4. Verify proper display of metrics and progress bars
5. Test navigation between views

## API Integration

Currently using mock data. To integrate with backend:
1. Replace mock data in `loadPatient()` function
2. Connect to actual API endpoints:
   - GET `/api/patients/{id}/diagnoses`
   - GET `/api/patients/{id}/progress`
3. Add error handling for API failures
4. Implement loading states during data fetch
