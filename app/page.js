import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import components with lazy loading
const ShowOff = dynamic(() => import('@/components/showOff/show-off'), { ssr: false });
const SimpleSlider = dynamic(() => import('../components/slickCarousel/page'), { ssr: false });
const Services = dynamic(() => import('./services/page'), { ssr: false });
const NewsSection = dynamic(() => import('./news/page'), { ssr: false });
const VidSection = dynamic(() => import('./vidSection/page'), { ssr: false });
const Gallery = dynamic(() => import('./gallery/page'), { ssr: false });
const Articles = dynamic(() => import('./Articles/page'), { ssr: false });
const FacebookContact = dynamic(() => import('../components/FaceCont/page'), { ssr: false });
const Map = dynamic(() => import('../components/map/page'), { ssr: false });

export default function Page() {
  return (
    <div>
      <div className='slider'>
        <SimpleSlider />
      </div>
      <div className='services'>
        <Services />
      </div>
      <div className='news py-3'>
        <NewsSection />
      </div>
      <div className='vid'>
        <VidSection />
      </div>
      <div className='gallery'>
        <Gallery />
      </div>
      <div className='show-off' dir='rtl'>
       <ShowOff />
      </div>
      <div className='articles'>
        <Articles />
      </div>
      <div className='face-contact'>
        <FacebookContact />
      </div>
      <div className='map'>
        <Map />
      </div>
    </div>
  );
}
