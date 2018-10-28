const mongoose = require("mongoose");

// A model 
mongoose.model("Book",{
   //Title, Author, NumberPages, publisher

    title:{
        type:String,
        require: true
    },
    author:{
        type:String,
        require: true
    },
    numberPages:{
        type: String,
        require: false
    },
    publisher:{
        type:String,
        require: false
    }


});

