import express from 'express';
const router = express.Router();

let users = [
    {
        "id": 1,
        "username": "john_doe",
        "email": "john.doe@example.com",
        "name": "John Doe",
        "age": 30
    },
    {
        "id": 2,
        "username": "jane_smith",
        "email": "jane.smith@example.com",
        "name": "Jane Smith",
        "age": 25
    },
    {
        "id": 3,
        "username": "bob_jones",
        "email": "bob.jones@example.com",
        "name": "Bob Jones",
        "age": 35
    },
    {
        "id": 4,
        "username": "mary_white",
        "email": "mary.white@example.com",
        "name": "Mary White",
        "age": 28
    },
    {
        "id": 5,
        "username": "david_brown",
        "email": "david.brown@example.com",
        "name": "David Brown",
        "age": 40
    },
    {
        "id": 6,
        "username": "sarah_adams",
        "email": "sarah.adams@example.com",
        "name": "Sarah Adams",
        "age": 32
    }
];

router.get('/api/users', (req, res) => {
    res.json(users);
});

router.delete('/api/users', (req, res) => {
    let id = parseInt(req.query.id);
    let index = users.findIndex(user => user.id === parseInt(id));
    if (index !== -1) {
        users.splice(index, 1);
        res.status(200).json(users);
    } else {
        res.status(404).json({ error: `User with ID ${id} not found.` });
    }
});

router.post('/api/users', (req, res) => {
    const { id, username, email, name, age } = req.query;
    const existingUser = users.find(user => user.id === id || user.username === username);
    if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
    }

    users.push({ id, username, email, name, age });
    res.status(201).json({ message: 'User added successfully', users });
});


export default router;
