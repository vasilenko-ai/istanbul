import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = { title: 'Стамбул — личный гид Олега и Маши', description: 'Где жить, есть и гулять в Стамбуле: личные рекомендации Олега и Маши.' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>{children}</body></html>;
}
