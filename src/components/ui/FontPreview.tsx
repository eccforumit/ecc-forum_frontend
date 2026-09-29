'use client';

import { useFontStyles } from '@/hooks/useFontStyles';

/**
 * A component to preview and showcase the different fonts used in the site
 */
export const FontPreview = () => {
  const fontStyles = useFontStyles();

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Font System</h2>
      
      {/* Heading Font - Montserrat */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">Heading Font</h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">Montserrat</span>
        </div>
        <div className="space-y-3 border-l-4 border-primary pl-4">
          <p style={{...fontStyles.heading, fontSize: '2.5rem'}} className="font-bold">
            Display Text
          </p>
          <p style={{...fontStyles.heading, fontSize: '2rem'}} className="font-bold">
            Heading 1 Text
          </p>
          <p style={{...fontStyles.heading, fontSize: '1.5rem'}} className="font-bold">
            Heading 2 Text
          </p>
          <p style={{...fontStyles.heading, fontSize: '1.25rem'}} className="font-semibold">
            Heading 3 Text
          </p>
        </div>
      </div>
      
      {/* Sans Font - Montserrat */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">UI Font</h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">Montserrat</span>
        </div>
        <div className="space-y-3 border-l-4 border-secondary pl-4">
          <p style={{...fontStyles.sans, fontSize: '1.25rem'}} className="font-medium">
            Button & UI Text
          </p>
          <p style={{...fontStyles.sans, fontSize: '1rem'}} className="font-medium">
            Navigation & Labels
          </p>
          <div style={{...fontStyles.sans, fontSize: '0.875rem'}} className="flex gap-4">
            <span className="bg-primary text-white px-3 py-1 rounded-md">Button</span>
            <span className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-md">Tab</span>
            <span className="border border-gray-300 dark:border-gray-600 px-3 py-1 rounded-md">Outline</span>
          </div>
        </div>
      </div>
      
      {/* Body Font - Verdana */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">Body Font</h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">Verdana</span>
        </div>
        <div className="space-y-3 border-l-4 border-gray-400 pl-4">
          <p style={{...fontStyles.body, fontSize: '1rem'}}>
            This is a paragraph of text that demonstrates the body font. The body font is used for paragraphs,
            content text, and most text blocks throughout the website. It&apos;s designed to be highly readable
            even at smaller sizes and for longer blocks of text.
          </p>
          <p style={{...fontStyles.body, fontSize: '0.875rem'}} className="text-gray-600 dark:text-gray-400">
            This is smaller body text often used for secondary information and captions.
            It should still maintain good readability even at this smaller size.
          </p>
        </div>
      </div>
    </div>
  );
};