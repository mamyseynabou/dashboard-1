const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Ajoutez votre mot de passe MySQL ici
    database: 'dashboard' // Assurez-vous que la base de données est créée dans MySQL
});

db.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à MySQL:', err);
        return;
    }
    console.log('Connecté à MySQL');
});

// Routes
app.post('/api/fournisseurs', (req, res) => {
    const { name, contact } = req.body;
    console.log('Données reçues pour fournisseurs:', req.body);
    const sql = 'INSERT INTO fournisseurs (name, contact) VALUES (?, ?)';
    db.query(sql, [name, contact], (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'insertion dans fournisseurs:', err);
            return res.status(500).send(err);
        }
        res.status(200).send({ id: result.insertId, name, contact });
    });
});

app.post('/api/produits', (req, res) => {
    const { name, price } = req.body;
    console.log('Données reçues pour produits:', req.body);
    const sql = 'INSERT INTO produits (name, price) VALUES (?, ?)';
    db.query(sql, [name, price], (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'insertion dans produits:', err);
            return res.status(500).send(err);
        }
        res.status(200).send({ id: result.insertId, name, price });
    });
});

app.post('/api/clients', (req, res) => {
    const { name, email } = req.body;
    console.log('Données reçues pour clients:', req.body);
    const sql = 'INSERT INTO clients (name, email) VALUES (?, ?)';
    db.query(sql, [name, email], (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'insertion dans clients:', err);
            return res.status(500).send(err);
        }
        res.status(200).send({ id: result.insertId, name, email });
    });
});

app.post('/api/commandes', (req, res) => {
    const { client, produit, quantite } = req.body;
    console.log('Données reçues pour commandes:', req.body);
    const sql = 'INSERT INTO commandes (client, produit, quantite) VALUES (?, ?, ?)';
    db.query(sql, [client, produit, quantite], (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'insertion dans commandes:', err);
            return res.status(500).send(err);
        }
        res.status(200).send({ id: result.insertId, client, produit, quantite });
    });
});

// Start Server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
