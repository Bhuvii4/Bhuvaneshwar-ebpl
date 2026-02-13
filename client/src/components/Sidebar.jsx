import React from 'react';
import { FaThLarge, FaCheckSquare, FaChartPie, FaCog, FaSignOutAlt, FaGraduationCap } from 'react-icons/fa';

const Sidebar = () => {
    return (
        <aside className="w-64 bg-slate-900 text-white min-h-screen hidden md:flex flex-col">
            <div className="h-16 flex items-center px-6 border-b border-slate-800">
                <FaGraduationCap className="text-2xl text-indigo-500 mr-3" />
                <span className="text-lg font-bold tracking-wide">StudentFocus</span>
            </div>

            <div className="flex-1 py-6 px-4 space-y-2">
                <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Menu</p>
                <a href="#" className="flex items-center space-x-3 px-4 py-3 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-900/20">
                    <FaThLarge />
                    <span className="font-medium">Dashboard</span>
                </a>
                <a href="#" className="flex items-center space-x-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors">
                    <FaCheckSquare />
                    <span className="font-medium">My Tasks</span>
                </a>
                <a href="#" className="flex items-center space-x-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors">
                    <FaChartPie />
                    <span className="font-medium">Analytics</span>
                </a>

                <div className="pt-8">
                    <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Settings</p>
                    <a href="#" className="flex items-center space-x-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors">
                        <FaCog />
                        <span className="font-medium">Preferences</span>
                    </a>
                </div>
            </div>

            <div className="p-4 border-t border-slate-800">
                <button className="flex items-center space-x-3 px-4 py-3 text-slate-400 hover:text-rose-400 hover:bg-slate-800 w-full rounded-xl transition-colors">
                    <FaSignOutAlt />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
