'use client';

import { useState } from 'react';
import useSWR from 'swr';
import { College } from '@/types';
import { CollegeCard } from './CollegeCard';
import { SlidersHorizontal, ChevronDown, Loader2, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const LOCATIONS = ["Mumbai", "Delhi", "Tamil Nadu", "Rajasthan"];
const COURSES = ["Computer Science", "Mechanical Engineering", "Electrical Engineering", "Civil Engineering"];

export function CollegeListing() {
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  
  const handleLocationToggle = (loc: string) => {
    setSelectedLocations(prev => 
      prev.includes(loc) ? prev.filter(l => l !== loc) : [...prev, loc]
    );
    setPage(1);
  };

  const handleCourseToggle = (course: string) => {
    setSelectedCourses(prev => 
      prev.includes(course) ? prev.filter(c => c !== course) : [...prev, course]
    );
    setPage(1);
  };

  // Mock API logic using searchParams
  // For this redesign, we'll send a combined query to mock the complex filter
  const query = new URLSearchParams({
    page: page.toString(),
    limit: '10'
  });
  
  if (selectedLocations.length > 0) {
    // Assuming backend takes comma-separated locations
    query.set('location', selectedLocations.join(','));
  }
  
  if (selectedCourses.length > 0) {
    query.set('q', selectedCourses.join(','));
  }

  const { data, error, isLoading } = useSWR<{ data: College[], meta: { totalPages: number } }>(
    `/api/colleges?${query.toString()}`,
    fetcher
  );

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="py-12 md:py-16 bg-white border-b border-gray-100 mb-8 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-gray-500 mb-6">
            <span>Home</span> <span className="text-gray-300">»</span> <span className="text-gray-900">College Platform</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            <span className="text-purple-600">College</span> Dhekho Platform
          </h1>
          <p className="text-lg text-gray-600 mb-10 max-w-3xl leading-relaxed">
            Discover our range of fully detailed college profiles, placement statistics, and reviews. 
            Created by education pros, these responsive listings are perfect for finding your dream institution.
          </p>
          
          <div className="flex flex-wrap gap-3">
            {['college', 'engineering', 'campus', 'study', 'university', 'placements', 'management'].map(tag => (
              <button key={tag} className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-sm font-medium text-gray-700 transition-colors shadow-sm">
                <Search className="w-3.5 h-3.5 text-gray-400" />
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-7xl pb-16">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Sidebar */}
          <div className="w-full lg:w-[260px] shrink-0">
            <div className="flex items-center gap-2 font-bold text-gray-900 mb-8 pb-4 border-b border-gray-200">
              <SlidersHorizontal className="w-5 h-5" />
              Hide Filters
            </div>

            <div className="space-y-8">
              {/* Filter Group: Locations */}
              <div>
                <h3 className="font-bold text-gray-900 mb-4">Locations</h3>
                <div className="space-y-3">
                  {LOCATIONS.map(loc => (
                    <label key={loc} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedLocations.includes(loc) ? 'bg-green-500 border-green-500' : 'border-gray-300 group-hover:border-green-400'}`}>
                        {selectedLocations.includes(loc) && (
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className="text-gray-700 text-sm group-hover:text-gray-900">{loc}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Filter Group: Courses */}
              <div>
                <h3 className="font-bold text-gray-900 mb-4">Courses</h3>
                <div className="space-y-3">
                  {COURSES.map(course => (
                    <label key={course} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedCourses.includes(course) ? 'bg-green-500 border-green-500' : 'border-gray-300 group-hover:border-green-400'}`}>
                        {selectedCourses.includes(course) && (
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className="text-gray-700 text-sm group-hover:text-gray-900">{course}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Grid Area */}
          <div className="flex-1">
            <div className="flex items-center justify-end mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-600 font-medium cursor-pointer hover:text-gray-900">
                Sort by <span className="font-bold text-gray-900">Relevant</span>
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>

            {error && <div className="text-red-500 py-8 text-center bg-red-50 rounded-lg">Failed to load colleges.</div>}
            
            {isLoading && (
              <div className="flex justify-center items-center py-32">
                <Loader2 className="w-10 h-10 animate-spin text-green-500" />
              </div>
            )}

            {!isLoading && !error && data?.data.length === 0 && (
              <div className="text-center py-32 bg-white rounded-xl border border-gray-100 shadow-sm">
                <p className="text-gray-500 text-lg">No colleges found matching your criteria.</p>
                <Button variant="outline" className="mt-4" onClick={() => { setSelectedLocations([]); setSelectedCourses([]); }}>
                  Clear all filters
                </Button>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data?.data.map((college) => (
                <CollegeCard key={college.id} college={college} />
              ))}
            </div>

            {/* Pagination Controls */}
            {data && data.meta.totalPages > 1 && (
              <div className="mt-12 flex justify-center gap-3">
                <Button 
                  variant="outline" 
                  disabled={page === 1}
                  onClick={() => setPage(p => p - 1)}
                  className="px-6 border-gray-200"
                >
                  Previous
                </Button>
                <Button 
                  variant="outline" 
                  disabled={page === data.meta.totalPages}
                  onClick={() => setPage(p => p + 1)}
                  className="px-6 border-gray-200"
                >
                  Next
                </Button>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
}
