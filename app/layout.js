
import { Cairo } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.css';
import QueryProvider from "./QueryClientProvider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import dynamic from "next/dynamic";

const Nav = dynamic(() => import('../components/Nav/page'), {
  loading: () => null,
  ssr: false
});

const Footer = dynamic(() => import('../components/footer/page'), {
  loading: () => null,
  ssr: false
});

const FixedIcons = dynamic(() => import('../components/FixedIcons/page'), {
  loading: () => null,
  ssr: false
});


export const metadata = {
  title: 'اتيليه سماح القاسم - فساتين زفاف وخطوبة',
  description: 'اتيليه سماح القاسم يقدم فريق متخصص لمساعدتك في اختيار فستان الزفاف المثالي. نقدم أحدث موضة لفساتين الزفاف والخطوبة والسوارية للمحجبات وغير المحجبات.',
  keywords: ['فساتين زفاف', 'فساتين خطوبة', 'سوارية', 'اتيليه', 'سماح القاسم', 'فساتين للمحجبات'],
  viewport: 'width=device-width, initial-scale=1',
  charset: 'utf-8',
  robots: 'index, follow',
  language: 'Arabic',
  openGraph: {
    type: 'website',
    title: 'اتيليه سماح القاسم - إطلالة مميزة في ليلة زفافك',
    description: 'اختاري فستان زفافك المثالي مع فريق متخصص في اتيليه سماح القاسم. أحدث موضة لفساتين الزفاف والخطوبة والسوارية.',
    images: ['/showOff/bride-img.png'],
    locale: 'ar_EG',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'اتيليه سماح القاسم - فساتين زفاف وخطوبة',
    description: 'اختاري فستان زفافك المثالي مع فريق متخصص في اتيليه سماح القاسم',
    images: ['/showOff/bride-img.png'],
  },
  icons: {
    icon: '/favicon.ico',
  },
};


const cairo = Cairo({
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${cairo.className}`}>
        <QueryProvider>
          <Nav />
          {children}
          <FixedIcons />
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
