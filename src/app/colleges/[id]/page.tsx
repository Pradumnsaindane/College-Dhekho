import { CollegeDetailClient } from './CollegeDetailClient';

export default async function CollegePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  return <CollegeDetailClient id={id} />;
}
