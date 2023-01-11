const express = require ('express')
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const port = 3001;
const db = require('./db.js');

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.get('/champs', (req, res) => {
  db.getChampions()
    .then((response) => res.status(200).send(response))
    .catch((error) => res.status(500).send(error))
})

app.post('/boards', (req, res) => {
  db.saveBoard(req.body)
    .then(() => res.status(201).send())
    .catch((error) => res.status(500).send(error))
})

app.get('/boards', (req, res) => {
  db.getBoards()
    .then((boards) => {
      res.status(200).send(boards.map((board) => {
        return board.boardName
      }))
    })
    .catch((error) => res.status(500).send(error))
})

app.get('/boards/:boardName', (req, res) => {
  db.findBoard(req.params.boardName)
    .then((response) => res.status(200).send(response))
    .catch((error) => res.status(500).send(error))
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})