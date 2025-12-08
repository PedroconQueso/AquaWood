import { useState } from 'react';
import { MapPin, Phone, Mail, Instagram, Facebook, Send } from 'lucide-react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-4">Get In Touch</h1>
        <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Have a project in mind? We'd love to hear from you. Reach out and let's create something beautiful together.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        <div>
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Contact Information</h2>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                  <MapPin className="text-amber-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-1">Address</h3>
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
                  <h3 className="font-semibold text-slate-800 mb-1">Phone</h3>
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
                  <h3 className="font-semibold text-slate-800 mb-1">Email</h3>
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
            <h2 className="text-2xl font-bold mb-6">Follow Us</h2>
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

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Send Us a Message</h2>

          {submitted ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <div className="text-green-600 text-5xl mb-4">✓</div>
              <h3 className="text-xl font-semibold text-green-800 mb-2">Message Sent!</h3>
              <p className="text-green-700">We'll get back to you as soon as possible.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-700 text-white px-6 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
              >
                <Send size={20} />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
