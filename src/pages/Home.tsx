import { Hammer, Trees, Award, Heart } from 'lucide-react';
import { Link } from '../components/Router';

export function Home() {
  return (
    <div>
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-700 to-amber-900"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>

        <div className="relative z-10 text-center text-white px-4">
          <div className="mb-6">
            <img src="/image.png" alt="Aquawood Logo" className="h-32 w-32 mx-auto rounded-full shadow-2xl border-4 border-amber-500" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
            <span className="text-amber-400">AQUAWOOD</span>
          </h1>
          <p className="text-2xl md:text-3xl mb-2 text-amber-300 tracking-wider font-light">Bois Rustique</p>
          <p className="text-xl md:text-2xl mb-8 text-stone-200 max-w-2xl mx-auto leading-relaxed">
            Handcrafted wooden furniture from the heart of Quebec
          </p>
          <Link
            to="/projects"
            className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-xl"
          >
            View Our Work
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">Our Story</h2>
          <div className="w-24 h-1 bg-amber-600 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              At Aquawood, we believe that every piece of wood tells a story. Our workshop in Quebec is where traditional craftsmanship meets contemporary design, creating timeless furniture that becomes part of your family's story.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              Specializing in custom handcrafted tables, we work with locally sourced wood to create pieces that showcase the natural beauty and character of each grain. Every creation is unique, built with meticulous attention to detail and a passion for the craft.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed">
              Whether you're looking for a rustic dining table, a statement coffee table, or a custom piece that reflects your personal style, we bring your vision to life with quality that lasts generations.
            </p>
          </div>
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-amber-200 to-amber-400 rounded-2xl shadow-2xl transform rotate-3"></div>
            <div className="absolute inset-4 bg-slate-700 rounded-2xl shadow-xl flex items-center justify-center">
              <Hammer size={120} className="text-amber-400 opacity-50" />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-8 mt-16">
          <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
              <Hammer className="text-amber-600" size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Handcrafted</h3>
            <p className="text-slate-600">Every piece is crafted by hand with traditional woodworking techniques</p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
              <Trees className="text-amber-600" size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Local Wood</h3>
            <p className="text-slate-600">We source quality wood from local Quebec suppliers</p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
              <Award className="text-amber-600" size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Quality First</h3>
            <p className="text-slate-600">Built to last with meticulous attention to detail</p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
              <Heart className="text-amber-600" size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Made with Love</h3>
            <p className="text-slate-600">Passion and care in every piece we create</p>
          </div>
        </div>
      </section>

      <section className="bg-slate-800 text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Create Something Special?</h2>
          <p className="text-xl text-stone-300 mb-8 leading-relaxed">
            Let's work together to bring your vision to life. From custom tables to unique furniture pieces, we're here to help.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105"
          >
            Get In Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
