const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');
const { verifyToken } = require('../middleware/auth');

// Apply authentication middleware to all routes
router.use(verifyToken);

// Get all todos for a user
router.get('/', async (req, res) => {
  try {
    const userId = req.user.uid;
    const todosRef = db.collection('todos');
    const snapshot = await todosRef.where('userId', '==', userId).get();
    
    const todos = [];
    snapshot.forEach(doc => {
      todos.push({ id: doc.id, ...doc.data() });
    });
    
    // Sort in memory to avoid Firestore index requirement
    todos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    res.json(todos);
  } catch (error) {
    console.error('Get todos error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get todos by date range
router.get('/range', async (req, res) => {
  try {
    const userId = req.user.uid;
    const { startDate, endDate } = req.query;
    
    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'Start date and end date are required' });
    }
    
    const todosRef = db.collection('todos');
    const snapshot = await todosRef
      .where('userId', '==', userId)
      .get();
    
    const todos = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      // Filter by date range in memory to avoid Firestore index requirement
      if (data.startDate >= startDate && data.startDate <= endDate) {
        todos.push({ id: doc.id, ...data });
      }
    });
    
    // Sort in memory
    todos.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
    
    res.json(todos);
  } catch (error) {
    console.error('Get todos by range error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create a new todo
router.post('/', async (req, res) => {
  try {
    const userId = req.user.uid;
    const { title, description, startDate, endDate, categories } = req.body;
    
    if (!title || !startDate || !endDate) {
      return res.status(400).json({ error: 'Title, start date, and end date are required' });
    }
    
    const todoData = {
      userId,
      title,
      description: description || '',
      startDate,
      endDate,
      categories: categories || [],
      subtasks: [],
      completed: false,
      status: 'todo',
      createdAt: new Date().toISOString(),
      startedAt: null,
      completedAt: null,
      updatedAt: new Date().toISOString()
    };
    
    const docRef = await db.collection('todos').add(todoData);
    
    res.status(201).json({ id: docRef.id, ...todoData });
  } catch (error) {
    console.error('Create todo error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update todo (mark as done or update details)
router.put('/:id', async (req, res) => {
  try {
    const userId = req.user.uid;
    const todoId = req.params.id;
    const updates = req.body;
    
    // Verify todo belongs to user
    const todoRef = db.collection('todos').doc(todoId);
    const todoDoc = await todoRef.get();
    
    if (!todoDoc.exists) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    
    if (todoDoc.data().userId !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    
    const updateData = {
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    await todoRef.update(updateData);
    
    res.json({ id: todoId, ...todoDoc.data(), ...updateData });
  } catch (error) {
    console.error('Update todo error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Mark todo as completed (without deleting)
router.patch('/:id/complete', async (req, res) => {
  try {
    const userId = req.user.uid;
    const todoId = req.params.id;
    
    const todoRef = db.collection('todos').doc(todoId);
    const todoDoc = await todoRef.get();
    
    if (!todoDoc.exists) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    
    if (todoDoc.data().userId !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    
    await todoRef.update({
      completed: true,
      completedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    
    res.json({ message: 'Todo marked as completed' });
  } catch (error) {
    console.error('Complete todo error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Unmark todo as completed
router.patch('/:id/uncomplete', async (req, res) => {
  try {
    const userId = req.user.uid;
    const todoId = req.params.id;
    
    const todoRef = db.collection('todos').doc(todoId);
    const todoDoc = await todoRef.get();
    
    if (!todoDoc.exists) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    
    if (todoDoc.data().userId !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    
    await todoRef.update({
      completed: false,
      completedAt: null,
      updatedAt: new Date().toISOString()
    });
    
    res.json({ message: 'Todo marked as incomplete' });
  } catch (error) {
    console.error('Uncomplete todo error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete todo (optional - you mentioned not deleting but included for completeness)
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.user.uid;
    const todoId = req.params.id;
    
    const todoRef = db.collection('todos').doc(todoId);
    const todoDoc = await todoRef.get();
    
    if (!todoDoc.exists) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    
    if (todoDoc.data().userId !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    
    await todoRef.delete();
    
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Delete todo error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Add subtask to todo
router.post('/:id/subtasks', async (req, res) => {
  try {
    const userId = req.user.uid;
    const todoId = req.params.id;
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Subtask text is required' });
    }
    
    const todoRef = db.collection('todos').doc(todoId);
    const todoDoc = await todoRef.get();
    
    if (!todoDoc.exists) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    
    if (todoDoc.data().userId !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    
    const subtasks = todoDoc.data().subtasks || [];
    subtasks.push({
      text,
      completed: false,
      createdAt: new Date().toISOString()
    });
    
    await todoRef.update({
      subtasks,
      updatedAt: new Date().toISOString()
    });
    
    res.json({ message: 'Subtask added', subtasks });
  } catch (error) {
    console.error('Add subtask error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Toggle subtask completion
router.patch('/:id/subtasks/:index', async (req, res) => {
  try {
    const userId = req.user.uid;
    const todoId = req.params.id;
    const index = parseInt(req.params.index);
    const { completed } = req.body;
    
    const todoRef = db.collection('todos').doc(todoId);
    const todoDoc = await todoRef.get();
    
    if (!todoDoc.exists) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    
    if (todoDoc.data().userId !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    
    const subtasks = todoDoc.data().subtasks || [];
    if (index < 0 || index >= subtasks.length) {
      return res.status(400).json({ error: 'Invalid subtask index' });
    }
    
    subtasks[index].completed = completed;
    subtasks[index].completedAt = completed ? new Date().toISOString() : null;
    
    await todoRef.update({
      subtasks,
      updatedAt: new Date().toISOString()
    });
    
    res.json({ message: 'Subtask updated', subtasks });
  } catch (error) {
    console.error('Toggle subtask error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete subtask
router.delete('/:id/subtasks/:index', async (req, res) => {
  try {
    const userId = req.user.uid;
    const todoId = req.params.id;
    const index = parseInt(req.params.index);
    
    const todoRef = db.collection('todos').doc(todoId);
    const todoDoc = await todoRef.get();
    
    if (!todoDoc.exists) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    
    if (todoDoc.data().userId !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    
    let subtasks = todoDoc.data().subtasks || [];
    if (index < 0 || index >= subtasks.length) {
      return res.status(400).json({ error: 'Invalid subtask index' });
    }
    
    subtasks.splice(index, 1);
    
    await todoRef.update({
      subtasks,
      updatedAt: new Date().toISOString()
    });
    
    res.json({ message: 'Subtask deleted', subtasks });
  } catch (error) {
    console.error('Delete subtask error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Change task status (todo / inprogress / completed)
router.patch('/:id/status', async (req, res) => {
  try {
    const userId = req.user.uid;
    const todoId = req.params.id;
    const { status } = req.body;
    
    if (!['todo', 'inprogress', 'completed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status. Must be: todo, inprogress, or completed' });
    }
    
    const todoRef = db.collection('todos').doc(todoId);
    const todoDoc = await todoRef.get();
    
    if (!todoDoc.exists) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    
    if (todoDoc.data().userId !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    
    const updateData = {
      status,
      updatedAt: new Date().toISOString()
    };
    
    // Track timestamps based on status
    if (status === 'inprogress' && !todoDoc.data().startedAt) {
      updateData.startedAt = new Date().toISOString();
    }
    
    if (status === 'completed') {
      updateData.completed = true;
      updateData.completedAt = new Date().toISOString();
    } else {
      updateData.completed = false;
      if (status === 'todo') {
        updateData.completedAt = null;
      }
    }
    
    await todoRef.update(updateData);
    
    res.json({ message: `Status updated to ${status}`, status });
  } catch (error) {
    console.error('Change status error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Extend task by 1 day
router.patch('/:id/extend', async (req, res) => {
  try {
    const userId = req.user.uid;
    const todoId = req.params.id;
    
    const todoRef = db.collection('todos').doc(todoId);
    const todoDoc = await todoRef.get();
    
    if (!todoDoc.exists) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    
    if (todoDoc.data().userId !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    
    const currentEndDate = new Date(todoDoc.data().endDate);
    currentEndDate.setDate(currentEndDate.getDate() + 1);
    const newEndDate = currentEndDate.toISOString().split('T')[0];
    
    await todoRef.update({
      endDate: newEndDate,
      updatedAt: new Date().toISOString()
    });
    
    res.json({ message: 'Task extended by 1 day', endDate: newEndDate });
  } catch (error) {
    console.error('Extend task error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
