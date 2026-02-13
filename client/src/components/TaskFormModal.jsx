import React, { useState, useEffect } from 'react';
import { FaTimes, FaSave } from 'react-icons/fa';

const TaskFormModal = ({ isOpen, onClose, onSave, taskToEdit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [status, setStatus] = useState('Pending');

    useEffect(() => {
        if (taskToEdit) {
            setTitle(taskToEdit.title);
            setDescription(taskToEdit.description || '');
            const date = new Date(taskToEdit.deadline);
            setDeadline(date.toISOString().split('T')[0]);
            setPriority(taskToEdit.priority);
            setStatus(taskToEdit.status);
        } else {
            resetForm();
        }
    }, [taskToEdit, isOpen]);

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setDeadline('');
        setPriority('Medium');
        setStatus('Pending');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const taskData = {
            title,
            description,
            deadline,
            priority,
            status
        };
        onSave(taskData);
        onClose();
        resetForm();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex justify-center items-center z-50 p-4 transition-all">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100">
                <div className="flex justify-between items-center px-6 py-5 border-b border-slate-100">
                    <h2 className="text-xl font-bold text-slate-800">{taskToEdit ? 'Edit Task' : 'Create New Task'}</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors bg-slate-50 p-2 rounded-full hover:bg-slate-100">
                        <FaTimes size={16} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div>
                        <label className="block text-slate-700 text-sm font-semibold mb-2" htmlFor="title">
                            Task Title <span className="text-rose-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                            placeholder="What do you need to do?"
                        />
                    </div>

                    <div>
                        <label className="block text-slate-700 text-sm font-semibold mb-2" htmlFor="description">
                            Description
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all resize-none"
                            rows="3"
                            placeholder="Add details, notes, or subtasks..."
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-slate-700 text-sm font-semibold mb-2" htmlFor="deadline">
                            Deadline <span className="text-rose-500">*</span>
                        </label>
                        <input
                            type="date"
                            id="deadline"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                            required
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                        <div>
                            <label className="block text-slate-700 text-sm font-semibold mb-2" htmlFor="priority">
                                Priority
                            </label>
                            <div className="relative">
                                <select
                                    id="priority"
                                    value={priority}
                                    onChange={(e) => setPriority(e.target.value)}
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all appearance-none"
                                >
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-slate-700 text-sm font-semibold mb-2" htmlFor="status">
                                Status
                            </label>
                            <div className="relative">
                                <select
                                    id="status"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all appearance-none"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4 space-x-3 border-t border-slate-100 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 text-slate-600 font-medium rounded-xl hover:bg-slate-100 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2.5 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-all flex items-center"
                        >
                            <FaSave className="mr-2" />
                            {taskToEdit ? 'Save Changes' : 'Create Task'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskFormModal;
