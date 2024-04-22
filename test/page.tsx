import Link from "next/link";
import RootLayout from "../app/layout";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function Home () {
  return (
    <RootLayout>
      <main className="relative">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <section className='flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14'>
            <div className='w-full'>
              <h1>Hello Next.js 👋</h1>
              <p>
                <Link href="/login">Login</Link>
              </p>
            </div>
          </section>
        </div>
      </main>
    </RootLayout>
  );
}