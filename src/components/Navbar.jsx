import { BarChart3, Clock3, House, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";

const navigationLinks = [
  { to: "/", label: "Home", Icon: House },
  { to: "/timeline", label: "Timeline", Icon: Clock3 },
  { to: "/stats", label: "Stats", Icon: BarChart3 },
];

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  function renderNavLink(link, compact = false) {
    return (
      <NavLink
        key={link.to}
        end={link.to === "/"}
        to={link.to}
        className={({ isActive }) =>
          [
            "flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-200",
            compact ? "w-full justify-between" : "",
            isActive
              ? "bg-slate-900 text-white shadow-lg shadow-slate-900/15"
              : "text-slate-600 hover:bg-white hover:text-slate-900",
          ].join(" ")
        }
      >
        <span className="flex items-center gap-2">
          <link.Icon size={16} />
          {link.label}
        </span>
      </NavLink>
    );
  }

  return (
    <header className="sticky top-0 z-40 border-b border-white/60 bg-white/75 backdrop-blur-xl">
      <div className="section-wrap">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="KeenKeeper logo"
              className="h-8 w-auto sm:h-9"
            />
          </Link>

          <nav className="hidden items-center gap-2 md:flex">
            {navigationLinks.map((link) => renderNavLink(link))}
          </nav>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm md:hidden"
            onClick={() => setMobileOpen((currentValue) => !currentValue)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {mobileOpen ? (
          <nav className="flex flex-col gap-2 pb-4 md:hidden">
            {navigationLinks.map((link) => renderNavLink(link, true))}
          </nav>
        ) : null}
      </div>
    </header>
  );
}

export default Navbar;

