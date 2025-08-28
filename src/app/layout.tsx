import './globals.css';

export const metadata = {
  title: 'To-Do',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        {children}
      </body>
    </html>
  );
}