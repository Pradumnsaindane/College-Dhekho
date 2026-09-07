import Link from 'next/link';
import { Search, Menu, User, BookOpen } from 'lucide-react';

export function Navbar() {
  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Top Banner (Optional for alerts/login) */}
      <div className="bg-gray-100 py-2 px-4 md:px-8 text-right text-sm">
        <Link href="/login" className="text-gray-600 hover:text-black font-medium inline-flex items-center gap-2">
          <span>Current students and staff</span>
          <User className="w-4 h-4" />
        </Link>
      </div>
      
      {/* Main Nav */}
      <div className="px-4 md:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="bg-black text-white p-2 rounded">
            <BookOpen className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl leading-none">College</span>
            <span className="font-bold text-xl leading-none">Dhekho</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8 font-semibold text-gray-800">
          <Link href="/clearing" className="hover:text-blue-600 transition-colors">Clearing</Link>
          <Link href="/undergraduate" className="hover:text-blue-600 transition-colors">Undergraduate</Link>
          <Link href="/postgraduate" className="hover:text-blue-600 transition-colors">Postgraduate</Link>
          <Link href="/research" className="hover:text-blue-600 transition-colors">Research</Link>
          <Link href="/international" className="hover:text-blue-600 transition-colors">International</Link>
          <Link href="/about" className="hover:text-blue-600 transition-colors">About us</Link>
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Search className="w-5 h-5 text-gray-700" />
            <span className="sr-only">Search</span>
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors lg:hidden">
            <Menu className="w-5 h-5 text-gray-700" />
            <span className="sr-only">Menu</span>
          </button>
        </div>
      </div>
    </header>
  );
}
