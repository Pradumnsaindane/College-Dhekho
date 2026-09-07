'use client';

import { useState } from 'react';
import useSWR from 'swr';
import Image from 'next/image';
import { College } from '@/types';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, IndianRupee, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const fetcher = (url: string) => fetch(url).then((res) => {
  if (!res.ok) throw new Error('Not found');
  return res.json();
});

export function CollegeDetailClient({ id }: { id: string }) {
  const { data: college, error, isLoading } = useSWR<College>(`/api/colleges/${id}`, fetcher);
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'placements' | 'reviews'>('overview');

  if (isLoading) return <div className="flex justify-center py-24"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>;
  if (error || !college) return <div className="text-center py-24 text-red-500">College not found</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Header section */}
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="w-full md:w-1/3 relative h-64 rounded-xl overflow-hidden bg-gray-200 shrink-0">
           <Image src={college.image} alt={college.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-3xl font-bold text-gray-900">{college.name}</h1>
            <Badge className="flex items-center gap-1 shrink-0 text-lg py-1 px-3">
              <Star className="w-4 h-4 fill-current text-yellow-500" />
              {college.rating}
            </Badge>
          </div>
          <div className="flex items-center text-gray-500 mt-2 gap-2">
            <MapPin className="w-5 h-5" />
            <span className="text-lg">{college.location}</span>
          </div>
          <div className="mt-6 flex items-center gap-2 text-xl">
            <IndianRupee className="w-6 h-6 text-gray-400" />
            <span className="font-semibold">{(college.fees / 100000).toFixed(2)} Lakhs</span>
            <span className="text-gray-500 text-sm">/ year</span>
          </div>
          <div className="mt-8 flex gap-4">
            <Button size="lg">Apply Now</Button>
            <Button size="lg" variant="outline">Compare</Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          {(['overview', 'courses', 'placements', 'reviews'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors capitalize ${
                activeTab === tab
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="py-4">
        {activeTab === 'overview' && (
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <p className="text-gray-700 leading-relaxed text-lg">{college.overview}</p>
          </div>
        )}
        {activeTab === 'courses' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Courses Offered</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {college.courses.map((course, idx) => (
                <Card key={idx}>
                  <CardContent className="p-4 font-medium text-gray-800">
                    {course}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
        {activeTab === 'placements' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Placement Statistics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <Card className="bg-blue-50 border-blue-100 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="text-blue-600 text-sm font-semibold mb-2">Average Package</div>
                  <div className="text-3xl font-bold">{college.placements.averagePackage}</div>
                </CardContent>
              </Card>
              <Card className="bg-green-50 border-green-100 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="text-green-600 text-sm font-semibold mb-2">Highest Package</div>
                  <div className="text-3xl font-bold">{college.placements.highestPackage}</div>
                </CardContent>
              </Card>
            </div>
            <h3 className="text-xl font-bold mb-4">Top Recruiters</h3>
            <div className="flex flex-wrap gap-2">
              {college.placements.topRecruiters.map((recruiter, idx) => (
                <Badge key={idx} variant="secondary" className="text-sm py-1 px-3">{recruiter}</Badge>
              ))}
            </div>
          </div>
        )}
        {activeTab === 'reviews' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Student Reviews</h2>
            {college.reviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-semibold text-gray-900">{review.user}</div>
                    <div className="flex items-center gap-1 text-yellow-500 text-sm font-medium">
                      <Star className="w-4 h-4 fill-current" /> {review.rating}
                    </div>
                  </div>
                  <p className="text-gray-600 italic">&quot;{review.comment}&quot;</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
