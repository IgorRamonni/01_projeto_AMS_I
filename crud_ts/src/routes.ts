import { Router } from 'express';
import mysql from 'mysql';
const router = Router();
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'ts_crud'
});
connection.connect();
// Example route for creating an item
router.post('/item', (req, res) => {
  const { name, description } = req.body;
  connection.query('INSERT INTO items (name, description) VALUES (?, ?)', [name, description], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(result);
    }
  });
});
// More CRUD routes...
export default router;