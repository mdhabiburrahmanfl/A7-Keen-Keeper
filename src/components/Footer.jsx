import { Link } from "react-router-dom";
import facebookIcon from "../../assets/facebook.png";
import instagramIcon from "../../assets/instagram.png";
import logo from "../../assets/logo-xl.png";
import twitterIcon from "../../assets/twitter.png";

function Footer() {
  return (
    <footer className="mt-10 border-t border-slate-900/10 bg-slate-950 text-white">
      <div className="section-wrap">
        <div className="grid gap-10 py-12 md:grid-cols-[1.2fr_0.8fr_0.7fr]">
          <div className="space-y-4">
            <img src={logo} alt="KeenKeeper logo" className="h-10 w-auto" />
            <p className="max-w-md text-sm leading-7 text-slate-300">
              KeenKeeper helps you stay thoughtful on purpose with lightweight
              reminders, quick check-ins, and one calm view of your closest
              relationships.
            </p>
          </div>

          <div>
            <h3 className="font-heading text-lg font-semibold">Explore</h3>
            <div className="mt-4 flex flex-col gap-3 text-sm text-slate-300">
              <Link className="transition hover:text-white" to="/">
                Home
              </Link>
              <Link className="transition hover:text-white" to="/timeline">
                Timeline
              </Link>
              <Link className="transition hover:text-white" to="/stats">
                Stats
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-heading text-lg font-semibold">Follow</h3>
            <div className="mt-4 flex items-center gap-3">
              {[facebookIcon, instagramIcon, twitterIcon].map((iconSource) => (
                <button
                  key={iconSource}
                  type="button"
                  className="rounded-full border border-white/10 bg-white/5 p-3 transition hover:bg-white/10"
                  aria-label="Social icon"
                >
                  <img src={iconSource} alt="" className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 py-4 text-xs text-slate-400">
          {new Date().getFullYear()} KeenKeeper. Built to keep good friendships
          warm.
        </div>
      </div>
    </footer>
  );
}

export default Footer;

