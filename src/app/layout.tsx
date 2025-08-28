import { ReactNode } from 'react';
import './globals.css';

export const metadata = {
  title: 'To-Do',
};

export default function RootLayout({ children }: {children:ReactNode}) {
  return (
    <html lang="ru">
      <body>
        {children}
      </body>
    </html>
  );
}