import React, { useState, useEffect } from 'react';
import { FaPlus, FaSpinner } from 'react-icons/fa';
import api from '../services/api';
import Layout from '../components/Layout';
import TaskCard from '../components/TaskCard';
import TaskFormModal from '../components/TaskFormModal';
import FilterSort from '../components/FilterSort';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);

    const [filterStatus, setFilterStatus] = useState('');
    const [filterPriority, setFilterPriority] = useState('');
    const [sortOrder, setSortOrder] = useState('createdAt');
    const [searchQuery, setSearchQuery] = useState('');

    const fetchTasks = async () => {
        setLoading(true);
        try {
            const params = {
                sort: sortOrder,
            };
            if (filterStatus) params.status = filterStatus;
            if (filterPriority) params.priority = filterPriority;
            if (searchQuery) params.search = searchQuery;

            const res = await api.get('/tasks', { params });
            setTasks(res.data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch tasks. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const debounce = setTimeout(() => {
            fetchTasks();
        }, 300);
        return () => clearTimeout(debounce);
    }, [filterStatus, filterPriority, sortOrder, searchQuery]);

    const handleAddTask = () => {
        setCurrentTask(null);
        setIsModalOpen(true);
    };

    const handleEditTask = (task) => {
        setCurrentTask(task);
        setIsModalOpen(true);
    };

    const handleSaveTask = async (taskData) => {
        try {
            if (currentTask) {
                await api.put(`/tasks/${currentTask._id}`, taskData);
            } else {
                await api.post('/tasks', taskData);
            }
            fetchTasks();
            setIsModalOpen(false);
        } catch (err) {
            alert('Failed to save task: ' + (err.response?.data?.message || err.message));
        }
    };

    const handleDeleteTask = async (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await api.delete(`/tasks/${id}`);
                setTasks(tasks.filter(t => t._id !== id));
            } catch (err) {
                alert('Failed to delete task');
            }
        }
    };

    const pendingTasks = tasks.filter(t => t.status === 'Pending');
    const completedTasks = tasks.filter(t => t.status === 'Completed');

    return (
        <Layout>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Task Board</h1>
                    <p className="text-slate-500 text-sm">Manage your academic tasks structurely</p>
                </div>
                <button
                    onClick={handleAddTask}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-200 flex items-center transition-all font-medium text-sm"
                >
                    <FaPlus className="mr-2" />
                    New Task
                </button>
            </div>

            <div className="mb-6">
                <FilterSort
                    filterStatus={filterStatus}
                    onFilterStatusChange={setFilterStatus}
                    filterPriority={filterPriority}
                    onFilterPriorityChange={setFilterPriority}
                    sortOrder={sortOrder}
                    onSortChange={setSortOrder}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                />
            </div>

            {error && (
                <div className="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-xl mb-6">
                    <span className="font-medium mr-2">Error:</span> {error}
                </div>
            )}

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <FaSpinner className="animate-spin text-4xl text-indigo-600" />
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
                    {/* Pending Column */}
                    <div className="bg-slate-100/50 p-4 rounded-2xl border border-slate-200/60 min-h-[500px]">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-slate-700 flex items-center">
                                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 mr-2.5"></span>
                                To Do
                            </h3>
                            <span className="bg-white text-slate-600 px-2 py-0.5 rounded-lg text-xs font-bold shadow-sm border border-slate-100">
                                {pendingTasks.length}
                            </span>
                        </div>
                        <div className="space-y-3">
                            {pendingTasks.map(task => (
                                <TaskCard key={task._id} task={task} onEdit={handleEditTask} onDelete={handleDeleteTask} />
                            ))}
                            {pendingTasks.length === 0 && (
                                <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl text-slate-400">
                                    <p className="text-sm">No pending tasks</p>
                                    <button onClick={handleAddTask} className="text-indigo-500 text-xs hover:underline mt-1 font-medium">Create one</button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Completed Column */}
                    <div className="bg-slate-100/50 p-4 rounded-2xl border border-slate-200/60 min-h-[500px]">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-slate-700 flex items-center">
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mr-2.5"></span>
                                Completed
                            </h3>
                            <span className="bg-white text-slate-600 px-2 py-0.5 rounded-lg text-xs font-bold shadow-sm border border-slate-100">
                                {completedTasks.length}
                            </span>
                        </div>
                        <div className="space-y-3">
                            {completedTasks.map(task => (
                                <TaskCard key={task._id} task={task} onEdit={handleEditTask} onDelete={handleDeleteTask} />
                            ))}
                            {completedTasks.length === 0 && (
                                <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl text-slate-400">
                                    <p className="text-sm">No completed tasks</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <TaskFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveTask}
                taskToEdit={currentTask}
            />
        </Layout>
    );
};

export default Dashboard;
