
'use client';

import { useEffect, useState } from 'react';
import { Navigation, MobileNav } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { getDB, saveDB } from '@/lib/mock-db';
import { Agency, Partner } from '@/lib/types';
import { Plus, Trash2, Mail, Percent, User, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function PartnersPage() {
  const [data, setData] = useState<any | null>(null);
  const [newPartner, setNewPartner] = useState({ name: '', email: '', sharePercentage: 0 });

  useEffect(() => {
    setData(getDB());
  }, []);

  const totalShare = data?.agency.partners.reduce((sum: number, p: Partner) => sum + p.sharePercentage, 0) || 0;

  const handleUpdateShare = (id: string, share: number) => {
    if (!data) return;
    const updatedPartners = data.agency.partners.map((p: Partner) => 
      p.id === id ? { ...p, sharePercentage: share } : p
    );
    const updated = { ...data, agency: { ...data.agency, partners: updatedPartners } };
    setData(updated);
    saveDB(updated);
  };

  const handleAddPartner = () => {
    if (!data || !newPartner.name || !newPartner.email) return;
    const partner: Partner = {
      id: Math.random().toString(36).substr(2, 9),
      ...newPartner
    };
    const updated = { ...data, agency: { ...data.agency, partners: [...data.agency.partners, partner] } };
    setData(updated);
    saveDB(updated);
    setNewPartner({ name: '', email: '', sharePercentage: 0 });
  };

  const deletePartner = (id: string) => {
    if (!data) return;
    const updated = { ...data, agency: { ...data.agency, partners: data.agency.partners.filter((p: Partner) => p.id !== id) } };
    setData(updated);
    saveDB(updated);
  };

  if (!data) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="flex flex-col md:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-card px-4 md:px-8">
          <h1 className="text-xl font-bold">Partners & Shares</h1>
        </header>

        <main className="flex-1 space-y-8 p-4 md:p-8 pb-24 md:pb-8">
          {totalShare !== 100 && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Invalid Shares</AlertTitle>
              <AlertDescription>
                Profit shares must sum to exactly 100%. Current total: {totalShare}%
              </AlertDescription>
            </Alert>
          )}

          <div className="grid gap-8 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Manage Partners</CardTitle>
                <CardDescription>Adjust profit shares for each agency partner.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {data.agency.partners.map((p: Partner) => (
                  <div key={p.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <User size={20} />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold">{p.name}</span>
                        <span className="text-xs text-muted-foreground">{p.email}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="relative w-20">
                        <Input 
                          type="number" 
                          value={p.sharePercentage}
                          className="pr-6"
                          onChange={(e) => handleUpdateShare(p.id, Number(e.target.value))}
                        />
                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">%</span>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => deletePartner(p.id)}>
                        <Trash2 size={16} className="text-muted-foreground hover:text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Add Partner</CardTitle>
                <CardDescription>Invite a new partner to the agency.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input 
                    placeholder="John Doe" 
                    value={newPartner.name}
                    onChange={(e) => setNewPartner({ ...newPartner, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <Input 
                    placeholder="john@example.com" 
                    value={newPartner.email}
                    onChange={(e) => setNewPartner({ ...newPartner, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Initial Profit Share (%)</Label>
                  <Input 
                    type="number"
                    value={newPartner.sharePercentage}
                    onChange={(e) => setNewPartner({ ...newPartner, sharePercentage: Number(e.target.value) })}
                  />
                </div>
                <Button onClick={handleAddPartner} className="w-full gap-2">
                  <Plus size={18} /> Add Partner
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
      <MobileNav />
    </div>
  );
}
