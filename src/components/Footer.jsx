import { Link } from "react-router-dom";
import facebookIcon from "../../assets/facebook.png";
import instagramIcon from "../../assets/instagram.png";
import twitterIcon from "../../assets/twitter.png";

function Footer() {
  return (
    <footer className="mt-14 bg-[#295846] text-white">
      <div className="section-wrap">
        <div className="mx-auto max-w-6xl py-16 text-center">
          <h2 className="font-heading text-6xl font-bold tracking-[-0.05em] text-white sm:text-7xl">
            KeenKeeper
          </h2>
          <p className="mx-auto mt-5 max-w-4xl text-sm leading-7 text-white/75">
            Your personal shelf of meaningful connections. Browse, tend, and
            nurture the relationships that matter most.
          </p>

          <div className="mt-8">
            <h3 className="text-2xl font-semibold text-white">Social Links</h3>
            <div className="mt-5 flex items-center justify-center gap-3">
              {[instagramIcon, facebookIcon, twitterIcon].map((iconSource) => (
                <button
                  key={iconSource}
                  type="button"
                  className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-white text-slate-900 transition hover:bg-white/90"
                  aria-label="Social icon"
                >
                  <img src={iconSource} alt="" className="h-[18px] w-[18px]" />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto flex max-w-6xl flex-col gap-4 border-t border-white/10 py-8 text-sm text-white/55 md:flex-row md:items-center md:justify-between">
          <div>{new Date().getFullYear()} KeenKeeper. All rights reserved.</div>
          <div className="flex items-center justify-center gap-6">
            <Link to="/">Privacy Policy</Link>
            <Link to="/">Terms of Service</Link>
            <Link to="/">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
