
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Building2, CheckCircle2, ShieldCheck, Wallet } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F1F1F6]">
      <header className="flex h-16 items-center px-4 md:px-8 border-b bg-white">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#3B3BDA] text-white">
            <Building2 size={20} />
          </div>
          <span className="text-xl font-bold tracking-tight">AgencySplit</span>
        </div>
        <div className="ml-auto flex gap-4">
          <Button variant="ghost" asChild>
            <Link href="/dashboard">Login</Link>
          </Button>
          <Button asChild className="bg-[#3B3BDA]">
            <Link href="/dashboard">Get Started</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
            Splitwise for <span className="text-[#3B3BDA]">Agency Partners.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Track client payments, agency costs, and partner profit shares. AgencySplit handles the math so you can focus on building your agency.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="h-12 px-8 bg-[#3B3BDA]">
              <Link href="/dashboard">Create My Agency</Link>
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8">
              See How it Works
            </Button>
          </div>
        </section>

        <section className="bg-white py-20 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-12">
              <div className="flex flex-col items-center text-center">
                <div className="h-14 w-14 rounded-2xl bg-[#F1F1F6] flex items-center justify-center text-[#3B3BDA] mb-6">
                  <Wallet size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">Track Every Dollar</h3>
                <p className="text-muted-foreground">Log income and expenses handled by different partners. No more messy spreadsheets.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="h-14 w-14 rounded-2xl bg-[#F1F1F6] flex items-center justify-center text-[#3B3BDA] mb-6">
                  <ShieldCheck size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">Smart Profit Sharing</h3>
                <p className="text-muted-foreground">Define partner share percentages. We calculate exactly who is owed what in real-time.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="h-14 w-14 rounded-2xl bg-[#F1F1F6] flex items-center justify-center text-[#3B3BDA] mb-6">
                  <CheckCircle2 size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">Simple Settlements</h3>
                <p className="text-muted-foreground">Get suggested transfers to settle balances with the fewest payments possible.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-white py-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-[#3B3BDA] text-white">
              <Building2 size={14} />
            </div>
            <span className="font-bold">AgencySplit</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2024 AgencySplit Inc. Built for agency owners.</p>
          <div className="flex gap-6 text-sm font-medium">
            <Link href="#">Terms</Link>
            <Link href="#">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
