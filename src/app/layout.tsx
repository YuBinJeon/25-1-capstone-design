
import type {Metadata} from 'next';
import { Geist, Geist_Mono } from 'next/font/google'; // Corrected import for Geist_Mono
import './globals.css';
import { Toaster } from "@/components/ui/toaster"; // Import Toaster

const geistSans = Geist({ // Corrected instantiation
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({ // Corrected instantiation
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'SmartPool - Pool Management System', // Updated title
  description: 'Remotely monitor and control your pool system.', // Updated description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning> {/* Added suppressHydrationWarning for potential theme mismatches during development */}
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}> {/* Ensure font-sans is applied if Geist is the primary sans font */}
        {children}
        <Toaster /> {/* Added Toaster here for app-wide notifications */}
      </body>
    </html>
  );
}
