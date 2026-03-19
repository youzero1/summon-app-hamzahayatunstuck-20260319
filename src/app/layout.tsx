import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import 'reflect-metadata';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Todo App',
  description: 'A full-stack Next.js todo application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen`}>
        <main className="max-w-4xl mx-auto p-4 md:p-8">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-blue-600">Todo App</h1>
            <p className="text-gray-600 mt-2">Manage your tasks efficiently</p>
          </header>
          {children}
        </main>
      </body>
    </html>
  );
}
