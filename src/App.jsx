import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import AppShell from "./components/AppShell";
import LoadingScreen from "./components/LoadingScreen";

const HomePage = lazy(() => import("./pages/HomePage"));
const TimelinePage = lazy(() => import("./pages/TimelinePage"));
const StatsPage = lazy(() => import("./pages/StatsPage"));
const FriendDetailsPage = lazy(() => import("./pages/FriendDetailsPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

function App() {
  return (
    <Suspense
      fallback={
        <div className="section-wrap pt-8">
          <LoadingScreen label="Loading page..." />
        </div>
      }
    >
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<HomePage />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/friend/:friendId" element={<FriendDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
