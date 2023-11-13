import type { Metadata } from 'next'
import ThemeRegistry from './themeRegistry'

export const metadata: Metadata = {
  title: 'Crypto Tax Calculator App',
  description: 'Calculate your crypto tax for free',
}

export default function RootLayout(props: any) {
  const { children } = props;
  return (
    <html lang="en">
      <body>
        <ThemeRegistry options={{ key: 'mui' }}>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
