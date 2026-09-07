export interface College {
  id: string;
  name: string;
  location: string;
  fees: number;
  rating: number;
  image: string;
  overview: string;
  courses: string[];
  placements: {
    averagePackage: string;
    highestPackage: string;
    topRecruiters: string[];
  };
  reviews: {
    id: string;
    user: string;
    comment: string;
    rating: number;
  }[];
}
