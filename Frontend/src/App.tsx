import { LocationProvider, Router, Route } from "preact-iso";
import Navbar from "./components/Navbar.tsx";
import Home from "./pages/Home.tsx";
import News from "./pages/News.tsx";
import Investigations from "./pages/Investigations.tsx";
import CorruptionTracker from "./pages/CorruptionTracker.tsx";
import DistrictReports from "./pages/DistrictReports.tsx";
import FactCheck from "./pages/FactCheck.tsx";
import About from "./pages/About.tsx";
import Contact from "./pages/Contact.tsx";

function NotFound() {
  return (
    <div>
      <h1>404 — Page Not Found</h1>
    </div>
  );
}

export default function App() {
  return (
    <LocationProvider>
      <Navbar />
      <Router>
        <Route path="/" component={Home} />
        <Route path="/news" component={News} />
        <Route path="/investigations" component={Investigations} />
        <Route path="/corruption-tracker" component={CorruptionTracker} />
        <Route path="/district-reports" component={DistrictReports} />
        <Route path="/fact-check" component={FactCheck} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route default component={NotFound} />
      </Router>
    </LocationProvider>
  );
}