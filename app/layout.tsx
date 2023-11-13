import type { Metadata } from 'next'
import ThemeRegistry from './themeRegistry'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'Crypto Tax Calculator App',
  description: 'Calculate your crypto tax for free',
}

export default function RootLayout(props: any) {
  const { children } = props;
  return (
    <html lang="en">
      <ThemeRegistry options={{ key: 'mui' }}>
        <body>
          <Navbar />
          {children}
        </body>
      </ThemeRegistry>
    </html>
  );
}
