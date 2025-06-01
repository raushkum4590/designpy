"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@stackframe/stack";
import { useEffect } from "react";

export default function Dashboard() {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    // If user is not authenticated, redirect to home
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  if (!user) {
    return <div>Loading...</div>;
  }

  // For now, redirect to workspace since that's your main app
  // You can build out a proper dashboard later
  useEffect(() => {
    router.push("/workspace");
  }, [router]);

  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-2xl font-bold">Welcome to Dashboard</h1>
      <p>Redirecting to workspace...</p>
    </div>
  );
}
