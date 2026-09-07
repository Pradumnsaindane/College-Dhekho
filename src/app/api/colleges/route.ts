import { NextResponse } from 'next/server';
import { College } from '@/types';

// Mock Dataset
export const mockColleges: College[] = [
  {
    id: "1",
    name: "Indian Institute of Technology (IIT) Bombay",
    location: "Mumbai, Maharashtra",
    fees: 1150000,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    overview: "IIT Bombay is a globally recognized institution for engineering education and research.",
    courses: ["Computer Science", "Mechanical Engineering", "Electrical Engineering", "Civil Engineering"],
    placements: {
      averagePackage: "21.82 LPA",
      highestPackage: "1.5 CPA",
      topRecruiters: ["Google", "Microsoft", "Jane Street", "Optiver"]
    },
    reviews: [
      { id: "r1", user: "Rahul", comment: "Excellent faculty and research opportunities.", rating: 5 },
      { id: "r2", user: "Sneha", comment: "Tough competition but great exposure.", rating: 4 }
    ]
  },
  {
    id: "2",
    name: "Birla Institute of Technology and Science (BITS)",
    location: "Pilani, Rajasthan",
    fees: 2200000,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    overview: "BITS Pilani is one of the premier engineering and sciences institutes in India.",
    courses: ["Computer Science", "Electronics & Instrumentation", "Mechanical", "Chemical"],
    placements: {
      averagePackage: "30.37 LPA",
      highestPackage: "60.75 LPA",
      topRecruiters: ["Amazon", "Uber", "Cisco", "Intel","Atlassinan"]
    },
    reviews: [
      { id: "r3", user: "Amit", comment: "No attendance policy is the best part!", rating: 5 },
      { id: "r4", user: "Priya", comment: "Fees is on the higher side.", rating: 4 }
    ]
  },
  {
    id: "3",
    name: "National Institute of Technology (NIT) Trichy",
    location: "Tiruchirappalli, Tamil Nadu",
    fees: 600000,
    rating: 4.5,
    image: "https://campusutra.com/wp-content/uploads/NIT-Trichy-1.jpg",
    overview: "NIT Trichy is one of the top NITs offering robust engineering programs.",
    courses: ["Architecture", "Computer Science", "Electronics & Communication"],
    placements: {
      averagePackage: "12.00 LPA",
      highestPackage: "42.00 LPA",
      topRecruiters: ["TCS", "Infosys", "IBM", "L&T","LY"]
    },
    reviews: [
      { id: "r5", user: "Karan", comment: "Great campus life and active clubs.", rating: 4 }
    ]
  },
  {
    id: "4",
    name: "Delhi Technological University (DTU)",
    location: "New Delhi, Delhi",
    fees: 900000,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    overview: "DTU is renowned for its strong alumni network and tech culture.",
    courses: ["Computer Engineering", "Software Engineering", "Mathematics & Computing"],
    placements: {
      averagePackage: "15.00 LPA",
      highestPackage: "1.2 CPA",
      topRecruiters: ["Atlassian", "Microsoft", "Goldman Sachs"]
    },
    reviews: [
      { id: "r6", user: "Riya", comment: "Amazing tech fests and coding culture.", rating: 5 }
    ]
  },
  {
    id: "5",
    name: "Vellore Institute of Technology (VIT)",
    location: "Vellore, Tamil Nadu",
    fees: 1600000,
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1590402494682-bf346f8fb954?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    overview: "VIT is known for its excellent infrastructure and massive student diversity.",
    courses: ["CSE Core", "CSE AI/ML", "IT", "ECE"],
    placements: {
      averagePackage: "8.19 LPA",
      highestPackage: "1.02 CPA",
      topRecruiters: ["Cognizant", "Wipro", "TCS", "Motorola"]
    },
    reviews: [
      { id: "r7", user: "Raj", comment: "Very strict rules but good placements.", rating: 3.5 }
    ]
  }
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ids = searchParams.get('ids');
  if (ids) {
    const idArray = ids.split(',');
    const selectedColleges = mockColleges.filter(c => idArray.includes(c.id));
    return NextResponse.json({ data: selectedColleges });
  }

  const q = searchParams.get('q')?.toLowerCase() || '';
  const location = searchParams.get('location')?.toLowerCase() || '';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);

  let filtered = mockColleges;

  if (q) {
    filtered = filtered.filter(c => c.name.toLowerCase().includes(q) || c.courses.some(course => course.toLowerCase().includes(q)));
  }
  
  if (location) {
    filtered = filtered.filter(c => c.location.toLowerCase().includes(location));
  }

  // Sorting could be added here (e.g. by fees or rating)

  const total = filtered.length;
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginated = filtered.slice(start, end);

  return NextResponse.json({
    data: paginated,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  });
}
