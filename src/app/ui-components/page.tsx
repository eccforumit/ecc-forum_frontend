'use client';

import React from 'react';
import ButtonShowcase from '@/components/ui/ButtonShowcase';
import ThemeShowcase from '@/components/ui/ThemeShowcase';
import DocumentationShowcase from '@/components/ui/DocumentationShowcase';

export default function UIComponentsPage() {
  return (
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-2">UI Components</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        A showcase of all UI components used in the Forum ECC website
      </p>
      
      <div className="space-y-12">
        <section id="buttons">
          <ButtonShowcase />
        </section>
        
        <section id="theme">
          <ThemeShowcase />
        </section>
        
        <section id="documentation">
          <DocumentationShowcase />
        </section>
      </div>
    </main>
  );
}
