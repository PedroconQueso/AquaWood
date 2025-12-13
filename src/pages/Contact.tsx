import { MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';
import { Seo } from '../components/Seo';

export function Contact() {
  const { t } = useTranslation();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Seo
        title="Contact"
        description="Contact Aquawood Patagonia for custom handcrafted rustic tables and furniture in Quebec."
      />
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-4">{t('contact.title')}</h1>
        <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          {t('contact.subtitle')}
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">{t('contact.contactInfo')}</h2>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <MapPin className="text-amber-600" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-1">{t('contact.address')}</h3>
                <p className="text-slate-600">518 Chemin du Tour-du-Lac</p>
                <p className="text-slate-600">Quebec, QC G3B 0V6</p>
                <p className="text-slate-600">Canada</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <Phone className="text-amber-600" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-1">{t('contact.phone')}</h3>
                <a href="tel:5819939987" className="text-slate-600 hover:text-amber-600 transition-colors">
                  581-993-9987
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <Mail className="text-amber-600" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-1">{t('contact.email')}</h3>
                <a
                  href="mailto:aquawoodpatagonia@gmail.com"
                  className="text-slate-600 hover:text-amber-600 transition-colors break-all"
                >
                  aquawoodpatagonia@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 text-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">{t('contact.followUs')}</h2>
          <div className="space-y-4 max-w-md mx-auto">
            <a
              href="https://www.instagram.com/aquawoodpatagonia"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-4 p-4 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
            >
              <Instagram className="text-amber-400" size={28} />
              <div>
                <div className="font-semibold">Instagram</div>
                <div className="text-sm text-stone-300">@AquawoodPatagonia</div>
              </div>
            </a>

            <a
              href="https://www.facebook.com/profile.php?id=61570127055866"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-4 p-4 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
            >
              <Facebook className="text-amber-400" size={28} />
              <div>
                <div className="font-semibold">Facebook</div>
                <div className="text-sm text-stone-300">Aquawood</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
