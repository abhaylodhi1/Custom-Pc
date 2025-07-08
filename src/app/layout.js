import './globals.css';
import LayoutWrapper from './components/LayoutWrapper';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'PC Gaming Store',
  description: 'Buy and customize your dream gaming setup!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#0f172a] text-white">
        <LayoutWrapper>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#1e1b4b',
                color: '#e0e7ff',
                border: '1px solid #7c3aed',
                padding: '16px',
                fontSize: '15px',
              },
              success: {
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#ecfdf5',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fee2e2',
                },
              },
            }}
          />
        </LayoutWrapper>
      </body>
    </html>
  );
}
