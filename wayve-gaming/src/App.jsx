import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import About from './pages/About';
import Home from './pages/Home';
import Games from './pages/Games';
import GameDetail from './pages/GameDetail';
import Contact from './pages/Contact';
import CareersPage from './pages/CareersPage';
import Legal from './pages/Legal';
import CareerData from './pages/CareerData';
import ContactData from './pages/ContactData';
import GameCrud from './pages/GameCrud';
import Footer from './components/Footer';
import useTheme from './hooks/useTheme';
import LoadingScreen from './components/LoadingScreen';

export default function App() {
  const { toggleTheme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [pathname, setPathname] = useState(() => window.location.pathname);
  const normalizedPath = pathname.replace(/\/$/, '') || '/';
  const isAboutPage = normalizedPath === '/about';
  const isGamesPage = normalizedPath === '/games';
  const gameDetailMatch = normalizedPath.match(/^\/games\/([^/]+)$/);
  const isContactPage = normalizedPath === '/contact';
  const isCareersPage = normalizedPath === '/careers';
  const isCareerDataPage = normalizedPath === '/career-data';
  const isContactDataPage = normalizedPath === '/contact-data';
  const isGameCrudPage = normalizedPath === '/game-crud';
  const isLegalPage = ['/legal', '/privacy'].includes(normalizedPath);

  useEffect(() => {
    const handleClick = (e) => {
      const anchor = e.target.closest?.('a[href^="#"]');
      if (anchor) {
        const hash = anchor.getAttribute('href');
        if (!hash || hash === '#') return;

        const target = document.querySelector(hash);
        if (!target) return;

        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }

      const routeAnchor = e.target.closest?.('a[href^="/"]');
      if (!routeAnchor) return;

      const nextHref = routeAnchor.getAttribute('href');
      const [nextPath, hash] = nextHref.split('#');
      if (nextPath === window.location.pathname && !hash) return;

      e.preventDefault();
      window.history.pushState({}, '', nextHref);
      setPathname(nextPath);
      window.scrollTo({ top: 0, behavior: 'auto' });
      if (hash) {
        window.setTimeout(() => {
          document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
        }, 0);
      }
    };

    const handlePopState = () => setPathname(window.location.pathname);

    document.addEventListener('click', handleClick);
    window.addEventListener('popstate', handlePopState);
    return () => {
      document.removeEventListener('click', handleClick);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      <Navbar onToggleTheme={toggleTheme} currentPath={pathname} />

      <main>
        {isAboutPage ? (
          <About />
        ) : isGamesPage ? (
          <Games />
        ) : gameDetailMatch ? (
          <GameDetail slug={gameDetailMatch[1]} />
        ) : isCareerDataPage ? (
          <CareerData />
        ) : isContactDataPage ? (
          <ContactData />
        ) : isGameCrudPage ? (
          <GameCrud />
        ) : isContactPage ? (
          <Contact />
        ) : isCareersPage ? (
          <CareersPage />
        ) : isLegalPage ? (
          <Legal />
        ): (
          <Home />
        )}
      </main>

      <Footer />
    </>
  );
}