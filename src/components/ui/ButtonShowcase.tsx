'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { FiCheck, FiArrowRight, FiGlobe } from 'react-icons/fi';

/**
 * This component demonstrates all the different button variants and sizes
 * It's a useful reference for designers and developers
 */
export const ButtonShowcase = () => {
  return (
    <div className="p-8 bg-white dark:bg-gray-900 rounded-lg shadow">
      <h1 className="text-2xl font-semibold mb-6">Button Component Showcase</h1>
      
      <section className="mb-8">
        <h2 className="text-lg font-medium mb-4">Button Variants</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary">Default</Button>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="primary">Link</Button>
          <Button variant="secondary">Danger</Button>
          <Button variant="outline">Success</Button>
          <Button variant="ghost">Warning</Button>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-medium mb-4">Button Sizes</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="xs">Extra Small</Button>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button size="xs">Extra Large</Button>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-medium mb-4">Button States</h2>
        <div className="flex flex-wrap gap-4">
          <Button>Normal</Button>
          <Button disabled>Disabled</Button>
          <Button isLoading>Loading</Button>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-medium mb-4">Button with Icons</h2>
        <div className="flex flex-wrap gap-4">
          <Button leftIcon={<FiCheck />}>Left Icon</Button>
          <Button rightIcon={<FiArrowRight />}>Right Icon</Button>
          <Button leftIcon={<FiCheck />} rightIcon={<FiArrowRight />}>Both Icons</Button>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-medium mb-4">Full Width Button</h2>
        <div className="max-w-md">
          <Button>Full Width Button</Button>
        </div>
      </section>
      
      <section className="mb-8">
        <h2 className="text-lg font-medium mb-4">i18n Translated Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <Button leftIcon={<FiGlobe />} variant="primary" />
          <Button variant="outline" />
          <Button  variant="ghost" />
          <Button variant="primary" />
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          These buttons use the translationKey prop for automatic translation based on the current language.
        </p>
      </section>
    </div>
  );
};

export default ButtonShowcase;
