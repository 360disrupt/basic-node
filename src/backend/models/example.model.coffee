#load the things we need
mongoose = require('mongoose')

#define the schema for example model
exampleSchema = mongoose.Schema({
  idName: {
    type: String,
    required: true,
    unique: true
  },
  name: String
})


#create the model for example and expose it to our app
module.exports = mongoose.model('example', exampleSchema)