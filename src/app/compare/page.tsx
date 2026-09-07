import { Suspense } from 'react';
import { CompareClient } from './CompareClient';

export default function ComparePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-500">Loading comparison...</div>}>
      <CompareClient />
    </Suspense>
  );
}
