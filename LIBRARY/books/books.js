const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

//load mongoose
const mongoose = require('mongoose');
require('./Book');
const Book = mongoose.model('Book');

mongoose.connect(
  'mongodb://eduonix:ugadugmlab1@ds263640.mlab.com:63640/booksservice',
  () => {
    console.log('Database is connected!');
  }
);

app.listen(4545, () => {
  console.log('this is our books service');
});

app.get('/', (req, res) => {
  res.send('this is our main endpoint!');
});

app.post('/book', (req, res) => {
  var newBook = {
    title: req.body.title,
    author: req.body.author,
    numberPages: req.body.numberPages,
    publisher: req.body.publisher
  };
  var result = '';
  //create a new mongoose book
  var book = new Book(newBook);

  book
    .save()
    .then(() => {
      result = 'book saved';
      res.send('result:' + result);
    })
    .catch(err => {
      if (err) {
        throw err;
      }
    });
});

app.get("/books", (req, res) => {
  Book.find().then((books) => {
    res.json(books)
  }).catch(err=>{
      if(err){
          throw err;
      }
  })

  
});


app.get("/book/:id", (req,res)=>{

    Book.findById(req.params.id).then((book)=>{
        if(book){
            res.json(book)
        }else{
            res.sendStatus(404);
        }


    }).catch(err =>{
        if(err){
            throw err;
        }
    })

  });
