import Image from 'next/image';
import Link from 'next/link';
import { College } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, IndianRupee } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CollegeCard({ college }: { college: College }) {
  return (
    <Card className="overflow-hidden flex flex-col h-full hover:shadow-lg transition-all duration-300 border border-gray-100 bg-white rounded-xl">
      <div className="relative h-[200px] w-full bg-gray-100">
        <Image 
          src={college.image} 
          alt={college.name} 
          fill 
          className="object-cover transition-transform duration-500 hover:scale-105" 
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge className="bg-white/90 text-gray-900 border-none font-semibold shadow-sm backdrop-blur-sm">
            Top Rated
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start gap-4 mb-3">
          <Link href={`/colleges/${college.id}`} className="hover:text-green-600 transition-colors">
            <h3 className="font-bold text-lg leading-tight text-gray-900 line-clamp-2">{college.name}</h3>
          </Link>
        </div>
        
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">
          {college.overview}
        </p>

        <div className="flex flex-col gap-3 mt-auto mb-5">
          <div className="flex items-center text-sm text-gray-600 gap-2">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span className="truncate">{college.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 gap-2">
            <Star className="w-4 h-4 fill-current text-yellow-400" />
            <span className="font-medium text-gray-900">{college.rating}</span>
            <span className="text-gray-400 text-xs">({college.reviews.length} reviews)</span>
          </div>
        </div>
        
        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Fees</span>
            <div className="flex items-center gap-1 font-bold text-gray-900">
              <IndianRupee className="w-4 h-4" />
              {(college.fees / 100000).toFixed(2)}L
            </div>
          </div>
          
          <div className="flex gap-2">
            <Link href={`/compare?add=${college.id}`}>
              <Button variant="outline" size="sm" className="text-xs border-gray-200 text-gray-700 hover:bg-gray-50">Compare</Button>
            </Link>
            <Link href={`/colleges/${college.id}`}>
              <Button size="sm" className="text-xs bg-gray-900 hover:bg-gray-800 text-white">View</Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
