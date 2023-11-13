import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ThemeRegistry from './themeRegistry'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Crypto Tax Calculator App',
  description: 'Calculate your crypto tax for free',
}

export default function RootLayout(props: any) {
  const { children } = props;
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeRegistry options={{ key: 'mui' }}>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
