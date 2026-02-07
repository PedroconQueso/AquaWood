import { MapPin, Phone, Mail, Instagram, Facebook, Ruler, TreeDeciduous, Palette, Footprints } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';
import { Seo } from '../components/Seo';

export function Contact() {
  const { t } = useTranslation();

  const woodTypes = [
    t('contact.maple'),
    t('contact.birch'),
    t('contact.cherry'),
    t('contact.ash'),
    t('contact.redPine'),
    t('contact.redOak'),
    t('contact.whiteOak'),
    t('contact.butternut'),
    t('contact.blackWalnut'),
  ];

  const customizationOptions = [
    { icon: Ruler, label: t('contact.dimensions') },
    { icon: TreeDeciduous, label: t('contact.woodType') },
    { icon: Palette, label: t('contact.epoxyOptions') },
    { icon: Footprints, label: t('contact.legStyle') },
  ];

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

      <div className="max-w-5xl mx-auto">
        {/* Customization Options Section */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-xl p-8 mb-8 border border-amber-200">
          <h2 className="text-2xl font-bold text-slate-800 mb-4 text-center">{t('contact.customizationTitle')}</h2>
          <p className="text-slate-600 text-center mb-8">{t('contact.customizationIntro')}</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {customizationOptions.map((option, index) => (
              <div key={index} className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow text-center">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <option.icon className="text-amber-600" size={24} />
                </div>
                <p className="font-medium text-slate-700 text-sm">{option.label}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-slate-600 italic bg-white rounded-lg p-4 shadow-sm">
            {t('contact.adviceText')}
          </p>
        </div>

        {/* Wood Types Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">{t('contact.woodTypesTitle')}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3">
            {woodTypes.map((wood, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-100 hover:border-amber-300 transition-colors"
              >
                <TreeDeciduous className="text-amber-600 flex-shrink-0" size={20} />
                <span className="text-slate-700 font-medium">{wood}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dimensions Guide Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-4 text-center">{t('contact.dimensionsTitle')}</h2>
          <p className="text-slate-600 text-center mb-6">{t('contact.dimensionsDesc')}</p>
          <div className="flex justify-center">
            <img
              src="/dimensions-guide.png"
              alt="Table dimensions guide"
              className="max-w-full h-auto rounded-lg shadow-md"
            />
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
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
            <div className="space-y-4">
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
    </div>
  );
}
