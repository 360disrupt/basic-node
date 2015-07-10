fs=require('fs')
applicationDir = '../../.tmp/serve/'

environment = 'test'
mongoService = require(applicationDir + 'backend/mongo.service.js')
mongoose = require('mongoose')
configDB = require(applicationDir + 'backend/config/database.js')(environment)

ObjectId = require('mongoose').Types.ObjectId
RecipeModel = require(applicationDir + 'backend/models/example.model.js')

if !db?
  mongoose.connect(configDB.url,{auth:{authdb:configDB.authdb}}, (err)->
    if (err)
      console.log(err)
  )
  db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error:'))
  db.once('open', () ->
    console.log "Database established"
    #Delete all data and seed new data
  )

console.log ">>>>>>>>>>>STARTING"

describe('database service recipes', () ->
  beforeEach((done)->
    ExampleModel.remove({}, (err) ->
      console.log('collection examples removed seeding new one')
      fs.readFile(__dirname + '/../../mongo/seed-for-test/examples.json','utf-8', (err,fileData) ->
        if err?
          console.log err
          done()

        fileData = JSON.parse(fileData)
        newFileArray = []
        for singleFileData in fileData
          singleFileData._id = new ObjectId(singleFileData._id.$oid)
          newFileArray.push(singleFileData)

        ExampleModel.create(newFileArray, (err, examples) ->
          if err?
            console.log err
            done()
          console.log('examples saved')
          done()
        )
      )
    )
  )

  it('should get all examples', (done) ->
    mongoService.getExamples(db, 'input',(err, cb) ->
      expect(err).toBeNull()
      expect(cb.length).toBe(50) #expect to be 50
      done()
    )
  )
)
return
