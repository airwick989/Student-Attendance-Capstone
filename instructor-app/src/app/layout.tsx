import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import "./globals.css";
import { Inter } from "next/font/google";
import SessionProvider from "./SessionProvider";
import Login from "./Login";
import Dashboard from "../../pages/dashboard/page"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'Classroom Map',
  description: 'Classroom Map',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          {!session ? <Login /> : <Dashboard />}
        </SessionProvider>
      </body>
    </html>
  );
}
