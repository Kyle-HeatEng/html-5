"use client";
import Splash from "@/components/splash";
import { SocketProvider } from "@/hooks/useSocket";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SocketProvider>
        <Splash />
      </SocketProvider>
    </main>
  );
}
