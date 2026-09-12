import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sistemas Adaptativos Inteligentes · CAETI',
  description: 'Presentación interactiva de los proyectos de investigación del CAETI 2026.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
