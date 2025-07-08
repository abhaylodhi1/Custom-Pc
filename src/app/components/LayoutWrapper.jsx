'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const hideLayout = pathname === '/login' || pathname === '/signup';

  return (
    <>
      {!hideLayout && <Header />}
      <main className="min-h-[80vh]">{children}</main>
      {!hideLayout && <Footer />}
    </>
  );
}
