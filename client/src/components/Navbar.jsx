import React from 'react';
import { FaGraduationCap, FaBell } from 'react-icons/fa';

const Navbar = () => {
    return (
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-20 sticky top-0">
            {/* Mobile Logo (Visible only on small screens) */}
            <div className="flex items-center md:hidden">
                <div className="bg-indigo-600 p-1.5 rounded-lg text-white mr-2">
                    <FaGraduationCap />
                </div>
                <span className="font-bold text-slate-800">StudentFocus</span>
            </div>

            {/* Title (Hidden on mobile) */}
            <h2 className="hidden md:block text-xl font-semibold text-slate-800">Dashboard</h2>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
                <button className="p-2 text-slate-400 hover:text-indigo-600 rounded-full hover:bg-slate-50 transition-colors relative">
                    <FaBell />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border border-white"></span>
                </button>

                <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm border border-indigo-200">
                    S
                </div>
            </div>
        </header>
    );
};

export default Navbar;
