#Dependencies
async = require('async')

#Configuration
environment = require('./config/config.js')()
configDB = require('./config/database.js')(environment)

ExampleModel = require(__dirname + '/models/example.model.js')


exports.getExamples = (db, input, callback) ->
  ExampleModel.find(filter).sort({title:-1}).exec((err, examplesFound) ->
    console.log err if err
    err = null if !err?
    callback(err, examplesound)
  )