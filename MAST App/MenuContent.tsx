import React, { createContext, useContext, useMemo, useState } from 'react';
import { Course, MenuItem } from './MenuTypes';
import { seedItems } from './MenuData';

type Ctx = {
  items: MenuItem[];
  activeFilters: Set<Course>;
  setFilters: (filters: Set<Course>) => void;
  addItem: (item: MenuItem) => void;
  removeItem: (id: string) => void;
};

const MenuCtx = createContext<Ctx | null>(null);

export function MenuProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<MenuItem[]>(seedItems);
  const [activeFilters, setActiveFilters] = useState<Set<Course>>(new Set());

  const value = useMemo<Ctx>(
    () => ({
      items,
      activeFilters,
      setFilters: (f) => setActiveFilters(new Set(f)),
      addItem: (item) => setItems((prev) => [item, ...prev]),
      removeItem: (id) => setItems((prev) => prev.filter((i) => i.id !== id)),
    }),
    [items, activeFilters]
  );

  return <MenuCtx.Provider value={value}>{children}</MenuCtx.Provider>;
}

export function useMenu() {
  const ctx = useContext(MenuCtx);
  if (!ctx) throw new Error('useMenu must be used within MenuProvider');
  return ctx;
}
