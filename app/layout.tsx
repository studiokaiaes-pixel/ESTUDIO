import type {Metadata} from 'next';
import { Inter, Montserrat } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: 'Estudio Bíblico - Cristología',
  description: 'Un espacio para crecer en la fe, entender la Biblia y conocer más a Cristo',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable} dark`}>
      <body className="bg-[#000000] text-white font-sans antialiased selection:bg-green-500/30" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
