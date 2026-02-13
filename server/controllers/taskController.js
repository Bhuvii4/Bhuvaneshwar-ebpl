const Task = require('../models/Task');

const getTasks = async (req, res) => {
    try {
        const { status, priority, search, sort } = req.query;
        let query = {};

        if (status) query.status = status;
        if (priority) query.priority = priority;

        if (search) {
            query.title = { $regex: search, $options: 'i' };
        }

        let tasksQuery = Task.find(query);

        if (sort === 'deadline') {
            tasksQuery = tasksQuery.sort({ deadline: 1 });
        } else {
            tasksQuery = tasksQuery.sort({ createdAt: -1 });
        }

        const tasks = await tasksQuery;
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createTask = async (req, res) => {
    try {
        const { title, description, deadline, priority, status } = req.body;

        if (!title) {
            res.status(400);
            throw new Error('Please add a task title');
        }

        const task = await Task.create({
            title,
            description,
            deadline,
            priority,
            status
        });

        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            res.status(404);
            throw new Error('Task not found');
        }

        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.json(updatedTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            res.status(404);
            throw new Error('Task not found');
        }

        await task.deleteOne();

        res.json({ id: req.params.id });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask
};
