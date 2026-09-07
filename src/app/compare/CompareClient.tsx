'use client';

import { useEffect } from 'react';
import useSWR from 'swr';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { College } from '@/types';
import { Button } from '@/components/ui/button';
import { Loader2, Plus, X, Star, IndianRupee, MapPin } from 'lucide-react';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function CompareClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const idsParam = searchParams.get('ids');
  const addParam = searchParams.get('add');
  const ids = idsParam?.split(',').filter(Boolean) ?? (addParam ? [addParam] : []);

  useEffect(() => {
    if (!idsParam && addParam) {
      router.replace(`/compare?ids=${addParam}`);
    }
  }, [addParam, idsParam, router]);

  const query = ids.length > 0 ? `ids=${ids.join(',')}` : '';
  const { data, error, isLoading } = useSWR<{ data: College[] }>(
    query ? `/api/colleges?${query}` : null,
    fetcher
  );

  const removeCollege = (idToRemove: string) => {
    const newIds = ids.filter(id => id !== idToRemove);
    router.replace(`/compare?ids=${newIds.join(',')}`);
  };

  const colleges = data?.data || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Compare Colleges</h1>
        {colleges.length > 0 && colleges.length < 3 && (
          <Button variant="outline" onClick={() => router.push('/')}>
            <Plus className="w-4 h-4 mr-2" /> Add College
          </Button>
        )}
      </div>

      {isLoading && (
        <div className="flex justify-center py-24">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      )}

      {error && (
        <p className="py-24 text-center text-red-600">Unable to load colleges for comparison.</p>
      )}

      {!isLoading && !error && colleges.length === 0 && (
        <div className="text-center py-24 text-gray-500">
          <p className="text-lg mb-4">No colleges selected for comparison.</p>
          <Button onClick={() => router.push('/')}>Browse Colleges</Button>
        </div>
      )}

      {colleges.length > 0 && (
        <div className="overflow-x-auto pb-8">
          <table className="w-full min-w-[800px] border-collapse bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
            <thead>
              <tr>
                <th className="p-6 border-b border-r border-gray-200 bg-gray-50 text-left w-48 shrink-0">Features</th>
                {colleges.map((college, idx) => (
                  <th key={college.id} className={`p-6 border-b border-gray-200 text-left relative min-w-[300px] ${idx !== colleges.length - 1 ? 'border-r' : ''}`}>
                    <button 
                      onClick={() => removeCollege(college.id)}
                      className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                      aria-label="Remove college"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    <div className="flex flex-col items-start gap-4">
                      <div className="relative w-full h-32 rounded-md overflow-hidden bg-gray-100">
                        <Image src={college.image} alt={college.name} fill className="object-cover" />
                      </div>
                      <h3 className="font-bold text-lg">{college.name}</h3>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-6 border-b border-r border-gray-200 font-semibold text-gray-700 bg-gray-50">Location</td>
                {colleges.map((college, idx) => (
                  <td key={college.id} className={`p-6 border-b border-gray-200 ${idx !== colleges.length - 1 ? 'border-r' : ''}`}>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      {college.location}
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-6 border-b border-r border-gray-200 font-semibold text-gray-700 bg-gray-50">Rating</td>
                {colleges.map((college, idx) => (
                  <td key={college.id} className={`p-6 border-b border-gray-200 ${idx !== colleges.length - 1 ? 'border-r' : ''}`}>
                    <div className="flex items-center gap-2 font-medium">
                      <Star className="w-4 h-4 fill-current text-yellow-500" />
                      {college.rating} / 5
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-6 border-b border-r border-gray-200 font-semibold text-gray-700 bg-gray-50">Fees (per year)</td>
                {colleges.map((college, idx) => (
                  <td key={college.id} className={`p-6 border-b border-gray-200 ${idx !== colleges.length - 1 ? 'border-r' : ''}`}>
                    <div className="flex items-center gap-1 font-medium">
                      <IndianRupee className="w-4 h-4 text-gray-400" />
                      {(college.fees / 100000).toFixed(2)} Lakhs
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-6 border-b border-r border-gray-200 font-semibold text-gray-700 bg-gray-50">Average Package</td>
                {colleges.map((college, idx) => (
                  <td key={college.id} className={`p-6 border-b border-gray-200 font-medium text-blue-600 ${idx !== colleges.length - 1 ? 'border-r' : ''}`}>
                    {college.placements.averagePackage}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-6 border-b border-r border-gray-200 font-semibold text-gray-700 bg-gray-50">Highest Package</td>
                {colleges.map((college, idx) => (
                  <td key={college.id} className={`p-6 border-b border-gray-200 font-medium text-green-600 ${idx !== colleges.length - 1 ? 'border-r' : ''}`}>
                    {college.placements.highestPackage}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-6 border-r border-gray-200 font-semibold text-gray-700 bg-gray-50">Top Recruiters</td>
                {colleges.map((college, idx) => (
                  <td key={college.id} className={`p-6 ${idx !== colleges.length - 1 ? 'border-r border-gray-200' : ''}`}>
                    <p className="text-sm text-gray-600">{college.placements.topRecruiters.join(', ')}</p>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
