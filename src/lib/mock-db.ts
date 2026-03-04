
'use client';

import { Agency, Transaction, Settlement, Partner } from './types';

const STORAGE_KEY = 'agencysplit_data_v1';

interface DBStructure {
  agency: Agency;
  transactions: Transaction[];
  settlements: Settlement[];
}

const DEFAULT_DATA: DBStructure = {
  agency: {
    id: 'agency-1',
    name: 'Nebula Creative',
    partners: [
      { id: 'p1', email: 'alice@nebula.com', name: 'Alice Smith', sharePercentage: 60 },
      { id: 'p2', email: 'bob@nebula.com', name: 'Bob Jones', sharePercentage: 40 },
    ],
  },
  transactions: [
    {
      id: 't1',
      type: 'income',
      amount: 5000,
      date: new Date().toISOString().split('T')[0],
      description: 'Web Design Project - Client X',
      project: 'Project X',
      handledBy: 'p1',
    },
    {
      id: 't2',
      type: 'expense',
      amount: 1200,
      date: new Date().toISOString().split('T')[0],
      description: 'AWS Servers',
      category: 'Software',
      handledBy: 'p1',
    },
    {
      id: 't3',
      type: 'income',
      amount: 3000,
      date: new Date().toISOString().split('T')[0],
      description: 'Logo Branding - Client Y',
      project: 'Project Y',
      handledBy: 'p2',
    },
  ],
  settlements: [],
};

export function getDB(): DBStructure {
  if (typeof window === 'undefined') return DEFAULT_DATA;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    saveDB(DEFAULT_DATA);
    return DEFAULT_DATA;
  }
  return JSON.parse(stored);
}

export function saveDB(data: DBStructure) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function resetDB() {
  saveDB(DEFAULT_DATA);
  window.location.reload();
}
