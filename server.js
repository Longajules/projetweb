const express = require('express'); // var expresse prend expresse pour le http
const app = express(); // instasie expresse
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: '172.29.18.119',
    user: 'userServerNode',
    password: 'userServerNode',
    database: 'bddesh'
});

connection.connect((err) => {
    if (err) {
        console.error('Erreur de connexion  a la base de données :', err);
        return;
    }
    console.log('connecte a la base de donnees MySQL');
});

app.use(express.static('public'));
app.use(express.json());

app.get('/login', (req, res) => { // C'est une route type get donc par navigateur
    res.send('page login');
});

app.get('/info', (req, res) => { // C'est une route mais type "get" donc que par formulaire
    res.json({ cle1: 'crée compte', cle2: '' }); // Requet json mieux compri par navigateur
});

app.post('/register', (req, res) => {

connection.query(
  'INSERT INTO `User` (`login`, `password`) VALUES (?,?)',
  //INSERT INTO `User`(`id`, `login`, `password`, `isAdmin`) VALUES ('[value-1]','[value-2]','[value-3]','[value-4]')
  [req.body.inputValue , req.body.inputValue2],
  (err, results) => {
    if (err) {
      console.error('Erreur lors de l\'insertion dans la base de données :', err);
      res.status(500).json({ message: 'Erreur serveur' });
      return;
    }
    console.log('Insertion réussie, ID utilisateur :', results.insertId);
    res.json({ message: 'Inscription réussie !', userId: results.insertId });
  }
);
});

app.listen(3000, () => { //express écoute sur le port 3000 et affiche un message dans le console
    console.log('server runing')
});  //Le poind virgule c'est juste pour dire la fin de la fonction