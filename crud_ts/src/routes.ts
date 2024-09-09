import { Router } from 'express';
import mysql from 'mysql';
 
const router = Router();
 
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ts_crud'
});
 
connection.connect();
 
// Rota de índice
router.get('/', (req, res) => {
  res.send('Welcome to the API');
});
 
// Rota GET para inserir dados no banco de dados
// http://localhost:3000/insere?name=Renato&description=programador
router.get('/insere', (req, res) => {
  const { name, description } = req.query;
 
  if (!name || !description) {
    return res.status(400).send('Name and description are required');
  }
 
  connection.query('INSERT INTO items (name, description) VALUES (?, ?)', [name, description], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(result);
    }
  });
});
 
// Rota GET para listar dados do banco de dados
// http://localhost:3000/leitura?identificador=<número do id da linha>
router.get('/leitura', (req, res) => {
  const id = req.query.identificador;
 
  if (!id) {
    return res.status(400).send('ID is required');
  }
 
  connection.query('SELECT * FROM items WHERE id = ?', [id], (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else if (results.length === 0) {
      res.status(404).send('Item not found');
    } else {
      res.json(results[0]);
    }
  });
});
 
// Rota GET para atualizar dados no banco de dados
// http://localhost:3000/atualizar?identificador=<número_do_id_da_linha>&name=<novo_nome>
router.get('/atualizar', (req, res) => {
  const id = req.query.identificador;
  const newName = req.query.name;
 
  if (!id || !newName) {
    return res.status(400).send('ID and new name are required');
  }
 
  connection.query('UPDATE items SET name = ? WHERE id = ?', [newName, id], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else if (result.affectedRows === 0) {
      res.status(404).send('Item not found');
    } else {
      res.send('Item updated successfully');
    }
  });
});
 
// Rota GET para excluir dados do banco de dados
// http://localhost:3000/excluir?identificador=<número_do_id_da_linha>
router.get('/excluir', (req, res) => {
  const id = req.query.identificador;
 
  if (!id) {
    return res.status(400).send('ID is required');
  }
 
  connection.query('DELETE FROM items WHERE id = ?', [id], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else if (result.affectedRows === 0) {
      res.status(404).send('Item not found');
    } else {
      res.send('Item deleted successfully');
    }
  });
});
 
export default router;