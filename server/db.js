const mongoose = require("mongoose")
mongoose.connect('mongodb://localhost/mvp')

const championSchema = new mongoose.Schema({
  name: {type: String, unique: true},
  traits: [{type: String}],
  cost: {type: Number}
})

const boardSchema = new mongoose.Schema({
  boardName: {type: String},
  board: {type: String},
  notes: {type: String},
  email: {type: String}
})

const Champion = mongoose.model('Champion', championSchema);
const Board = mongoose.model('Board', boardSchema);

const getChampions = () => {
  return Champion.find({})
}

const saveBoard = (board) => {
  let options = { upsert: true, new: true, setDefaultsOnInsert: true }
  return Board.findOneAndUpdate({boardName: board.boardName, email: board.email}, board, options)
}

const findBoard = (boardName, email) => {
  return Board.find({boardName: boardName, email: email})
}

const getBoards = (email) => {
  return Board.find({email: email})
}

const deleteBoard = (boardName, email) => {
  return Board.findOneAndDelete({boardName: boardName, email: email})
}

module.exports = {
  getChampions: getChampions,
  saveBoard: saveBoard,
  findBoard: findBoard,
  getBoards: getBoards,
  deleteBoard: deleteBoard
}