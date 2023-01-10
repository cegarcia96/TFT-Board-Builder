const mongoose = require("mongoose")
mongoose.connect('mongodb://localhost/mvp')

const championSchema = new mongoose.Schema({
  name: {type: String, unique: true},
  traits: [{type: String}],
  cost: {type: Number}
})

const boardSchema = new mongoose.Schema({
  boardName: {type: String, unique: true},
  board: {type: String},
  notes: {type: String}
})

const Champion = mongoose.model('Champion', championSchema);
const Board = mongoose.model('Board', boardSchema);

const getChampions = () => {
  return Champion.find({})
}

const saveBoard = (board) => {
  let options = { upsert: true, new: true, setDefaultsOnInsert: true }
  return Board.findOneAndUpdate({boardName: board.boardName}, board, options)
}

const findBoard = (boardName) => {
  return Board.find({boardName: boardName})
}

module.exports = {
  getChampions: getChampions,
  saveBoard: saveBoard,
  findBoard: findBoard
}