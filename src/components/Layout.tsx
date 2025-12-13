import { ReactNode } from 'react';
import { Menu, X, LogOut, Languages } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from '../contexts/TranslationContext';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { t, locale, setLocale } = useTranslation();

  const navigation = [
    { name: t('nav.home'), path: '/', key: 'home' },
    { name: t('nav.projects'), path: '/projects', key: 'projects' },
    { name: t('nav.contact'), path: '/contact', key: 'contact' },
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-slate-800 text-white sticky top-0 z-50 shadow-lg">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center space-x-3">
              <img src="/image.png" alt="Aquawood" className="h-14 w-14 rounded-full" />
              <div>
                <div className="text-2xl font-bold tracking-wide text-amber-500">AQUAWOOD</div>
                <div className="text-xs text-amber-300 tracking-wider">BOIS RUSTIQUE</div>
              </div>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.key}
                  to={item.path}
                  className="text-stone-200 hover:text-amber-400 transition-colors font-medium"
                >
                  {item.name}
                </Link>
              ))}
              {user && (
                <>
                  <button
                    onClick={signOut}
                    className="flex items-center space-x-2 text-stone-200 hover:text-amber-400 transition-colors"
                  >
                    <LogOut size={18} />
                    <span>{t('nav.logout')}</span>
                  </button>
                </>
              )}
            </div>

            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden pb-4">
              {navigation.map((item) => (
                <Link
                  key={item.key}
                  to={item.path}
                  className="block py-2 text-stone-200 hover:text-amber-400 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {user && (
                <>
                  <button
                    onClick={() => {
                      signOut();
                      setMobileMenuOpen(false);
                    }}
                    className="block py-2 text-stone-200 hover:text-amber-400 transition-colors"
                  >
                    {t('nav.logout')}
                  </button>
                </>
              )}
            </div>
          )}
        </nav>
      </header>

      <main>{children}</main>

      <footer className="bg-slate-800 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img src="/image.png" alt="Aquawood" className="h-12 w-12 rounded-full" />
                <div>
                  <div className="text-xl font-bold text-amber-500">AQUAWOOD</div>
                  <div className="text-xs text-amber-300">BOIS RUSTIQUE</div>
                </div>
              </div>
              <p className="text-stone-300 text-sm leading-relaxed">
                {t('footer.description')}
              </p>
              <div className="mt-4">
                <Link
                  to={user ? '/admin' : '/login'}
                  className="inline-block text-sm text-stone-300 hover:text-amber-400 transition-colors"
                >
                  {user ? t('nav.admin') : t('nav.adminLogin')}
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-amber-400">{t('footer.contact')}</h3>
              <div className="space-y-2 text-sm text-stone-300">
                <p>518 Chemin du Tour-du-Lac</p>
                <p>Quebec, QC G3B 0V6</p>
                <p>Canada</p>
                <p className="pt-2">Phone: 581-993-9987</p>
                <p>Email: aquawoodpatagonia@gmail.com</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-amber-400">{t('footer.followUs')}</h3>
              <div className="space-y-2 text-sm">
                <a
                  href="https://www.instagram.com/aquawoodpatagonia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-stone-300 hover:text-amber-400 transition-colors"
                >
                  Instagram: @AquawoodPatagonia
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61570127055866"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-stone-300 hover:text-amber-400 transition-colors"
                >
                  Facebook: Aquawood
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-sm text-stone-400">
            <p>&copy; {new Date().getFullYear()} Aquawood Patagonia. {t('footer.rightsReserved')}</p>
          </div>
        </div>
      </footer>

      {/* Language Toggle Button - Fixed at bottom */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          <button
            onClick={() => {
              const nextLocale = locale === 'en' ? 'fr' : locale === 'fr' ? 'es' : 'en';
              setLocale(nextLocale);
            }}
            className="bg-amber-600 hover:bg-amber-700 text-white p-3 rounded-full shadow-lg transition-all transform hover:scale-110 flex items-center justify-center space-x-2 min-w-[60px]"
            aria-label="Toggle language"
          >
            <Languages size={20} />
            <span className="font-semibold">{locale.toUpperCase()}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
