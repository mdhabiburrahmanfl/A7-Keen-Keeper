# KeenKeeper

KeenKeeper is a responsive friendship tracker that helps you stay intentional about the people who matter most. It highlights which friends are overdue for a check-in, lets you log calls/texts/videos from a detail page, and turns those interactions into a searchable timeline and analytics dashboard.

## Live Project Goals

- Keep the UI clean and responsive across mobile, tablet, and desktop
- Make relationship maintenance feel simple, calm, and visual
- Track quick check-ins without needing a backend

## Technologies Used

- React
- Vite
- React Router DOM
- Tailwind CSS
- Recharts
- Sonner
- Lucide React

## Key Features

1. Responsive dashboard with hero banner, summary cards, and a four-column friends grid on large screens
2. Friend detail pages with quick check-in buttons that instantly create timeline entries and show toast notifications
3. Timeline and analytics pages with interaction filters, search, sorting, and a pie chart for Call / Text / Video breakdowns

## Additional Features

- JSON-based friend data with realistic profiles
- Persistent timeline entries and goal edits using `localStorage`
- Loading animation while friend data is fetched
- Custom 404 page for unknown routes
- Deployment-safe SPA routing using `vercel.json` and `_redirects`

## Project Structure

```text
src/
  components/
  context/
  pages/
  utils/
public/data/
  friends.json
  timeline-seed.json
```

## Getting Started

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
```

## Pages Included

- `/` - Home dashboard
- `/friend/:friendId` - Friend detail page
- `/timeline` - Full interaction history
- `/stats` - Friendship analytics
- `*` - 404 page

## Notes

- Friend data is loaded from `public/data/friends.json`
- Timeline seed data is loaded from `public/data/timeline-seed.json`
- New check-ins and edited relationship goals are stored locally in the browser
