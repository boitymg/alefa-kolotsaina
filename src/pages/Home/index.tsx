
import React from 'react';
import { Link } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';

// Components
import HeroSection from './components/HeroSection';
import FeaturedEvent from './components/FeaturedEvent';
import EventNews from './components/EventNews';
import MagazinePreview from './components/MagazinePreview';
import QuoteSection from './components/QuoteSection';
import VideoChannel from './components/VideoChannel';

const Home: React.FC = () => {
  const { events, videos, articles, settings, isLoading } = useAdmin();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-black uppercase tracking-widest text-xs">
        Initialisation...
      </div>
    );
  }

  const featuredEvent = events[0] || null;
  const otherEvents = events.slice(1, 4);
  const featuredArticle = articles[0] || null;

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-20">
      <section className="mb-24">
        <HeroSection title={settings.heroTitle} subtitle={settings.heroSubtitle} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <FeaturedEvent event={featuredEvent} />
          <EventNews events={otherEvents} />
        </div>
      </section>

      <section className="py-24 border-t-[12px] border-black">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-7">
            <div className="flex justify-between items-end mb-16 pb-4 border-b-2 border-black">
              <h2 className="brand-heading text-5xl uppercase italic">Magazine</h2>
              <Link to="/magazine" className="brand-heading text-lg hover:text-[#FF5733] tracking-widest">
                Sommaire →
              </Link>
            </div>
            <MagazinePreview article={featuredArticle} />
          </div>

          <div className="lg:col-span-5 flex flex-col">
            <QuoteSection
              title={settings.redacTitle}
              text={settings.redacText}
              signature={settings.redacSignature}
            />
            <VideoChannel videos={videos} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
