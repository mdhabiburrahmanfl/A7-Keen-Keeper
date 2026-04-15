import { BarChart3, Clock3, House, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

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
            "flex items-center gap-2 rounded-md px-4 py-2.5 text-[15px] font-medium transition-colors duration-200",
            compact ? "w-full justify-between" : "",
            isActive
              ? "bg-[#295846] !text-white"
              : "text-[#64748b] hover:text-slate-900",
          ].join(" ")
        }
      >
        <span className="flex items-center gap-2 text-inherit">
          <link.Icon size={17} strokeWidth={1.9} />
          {link.label}
        </span>
      </NavLink>
    );
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
      <div className="section-wrap">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center">
            <span className="font-heading text-[24px] font-bold tracking-[-0.04em] text-slate-800">
              Keen<span className="text-[#295846]">Keeper</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1.5 md:flex">
            {navigationLinks.map((link) => renderNavLink(link))}
          </nav>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-700 md:hidden"
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
