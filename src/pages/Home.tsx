import { Hammer, Trees, Award, Heart } from 'lucide-react';
import { Link } from '../components/Router';
import { useTranslation } from '../contexts/TranslationContext';

export function Home() {
  const { t } = useTranslation();

  return (
    <div>
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/phototable.jpg)' }}></div>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 via-slate-800/60 to-amber-900/70"></div>

        <div className="relative z-10 text-center text-white px-4">
          <div className="mb-6">
            <img src="/image.png" alt="Aquawood Logo" className="h-32 w-32 mx-auto rounded-full shadow-2xl border-4 border-amber-500" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
            <span className="text-amber-400">AQUAWOOD</span>
          </h1>
          <p className="text-2xl md:text-3xl mb-2 text-amber-300 tracking-wider font-light">{t('home.tagline')}</p>
          <p className="text-xl md:text-2xl mb-8 text-stone-200 max-w-2xl mx-auto leading-relaxed">
            {t('home.subtitle')}
          </p>
          <Link
            to="/projects"
            className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-xl"
          >
            {t('home.viewOurWork')}
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">{t('home.ourStory')}</h2>
          <div className="w-24 h-1 bg-amber-600 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="bg-slate-800 rounded-2xl p-8 md:p-10 shadow-xl">
            <p className="text-lg text-stone-200 leading-relaxed">
              {t('home.storyText')}
            </p>
          </div>
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-amber-200 to-amber-400 rounded-2xl shadow-2xl transform rotate-3"></div>
            <div className="absolute inset-4 rounded-2xl shadow-xl overflow-hidden">
              <img 
                src="/jaimeFrontPage.jpg" 
                alt="Aquawood craftsmanship" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-8 mt-16">
          <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
              <Hammer className="text-amber-600" size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">{t('home.handcrafted')}</h3>
            <p className="text-slate-600">{t('home.handcraftedDesc')}</p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
              <Trees className="text-amber-600" size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">{t('home.localWood')}</h3>
            <p className="text-slate-600">{t('home.localWoodDesc')}</p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
              <Award className="text-amber-600" size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">{t('home.qualityFirst')}</h3>
            <p className="text-slate-600">{t('home.qualityFirstDesc')}</p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
              <Heart className="text-amber-600" size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">{t('home.madeWithLove')}</h3>
            <p className="text-slate-600">{t('home.madeWithLoveDesc')}</p>
          </div>
        </div>
      </section>

      <section className="bg-slate-800 text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{t('home.readyToCreate')}</h2>
          <p className="text-xl text-stone-300 mb-8 leading-relaxed">
            {t('home.readyToCreateDesc')}
          </p>
          <Link
            to="/contact"
            className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105"
          >
            {t('home.getInTouch')}
          </Link>
        </div>
      </section>
    </div>
  );
}
