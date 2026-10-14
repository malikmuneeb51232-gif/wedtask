// Task Management Controller
let tasks = [
    { id: 1, title: 'Learn Git & GitHub', completed: true },
    { id: 2, title: 'Build Node.js Backend', completed: false },
    { id: 3, title: 'Push code to GitHub repository', completed: false }
];

// Get all tasks
const getAllTasks = (req, res) => {
    try {
        res.status(200).json({
            success: true,
            count: tasks.length,
            data: tasks
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Add a new task
const createTask = (req, res) => {
    try {
        const { title } = req.body;
        
        if (!title) {
            return res.status(400).json({ success: false, message: 'Task title is required' });
        }

        const newTask = {
            id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
            title,
            completed: false
        };

        tasks.push(newTask);
        res.status(201).json({
            success: true,
            message: 'Task created successfully',
            data: newTask
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Delete a task
const deleteTask = (req, res) => {
    try {
        const taskId = parseInt(req.params.id);
        const taskIndex = tasks.findIndex(t => t.id === taskId);

        if (taskIndex === -1) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }

        const deletedTask = tasks.splice(taskIndex, 1);
        res.status(200).json({
            success: true,
            message: 'Task deleted successfully',
            data: deletedTask
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

module.exports = {
    getAllTasks,
    createTask,
    deleteTask
};