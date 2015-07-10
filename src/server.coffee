#Variables & Requirements ======================================================================
SESSION_SECRET = 'myCatEatsPizza2015'
COOKIE_MAX_AGE = null

environment = require('./backend/config/config.js')()

mongoose = require('mongoose')

morgan       = require('morgan')
logger = require('./backend/logger.js')

http = require('http')
portHTTP = process.env.PORT || 61361

express  = require('express')
cookieParser = require("cookie-parser")
session = require("express-session")
bodyParser = require("body-parser")
compress = require('compression')

parseurl = require('parseurl')


#Database ======================================================================

configDB = require('./backend/config/database.js')(environment)

mongoose.connect(configDB.url,{auth:{authdb:configDB.authdb}}, (err)->
  if (err)
    console.log('Database Error: ',err)
)
db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () ->
  console.log "Database established"
)

#App & Session ======================================================================

MongoStore = require("connect-mongo")(session)

app = express()
app.use( compress() )
app.use( cookieParser(SESSION_SECRET) )
app.use( bodyParser.json() )
app.use( bodyParser.urlencoded({extended:true}) )

app.use( session( {
  secret:SESSION_SECRET,
  resave: true,
  saveUninitialized: false,
  rolling: true,
  store: new MongoStore({mongooseConnection:db}),
  cookie: {
    httpOnly: false,
    secure: false,
    maxAge:COOKIE_MAX_AGE
  }
}))

app.use((req, res, next) ->
  if (parseurl(req).pathname=='/login' || req.session.userType)
    next()
  else
    #console.log "url #{parseurl(req).pathname} userType #{req.session.userType}"
    res.redirect('/login')
)

# Routes ======================================================================

rootPath = __dirname + '/../../'
app.use('/bower_components', express.static(rootPath + 'bower_components'))
app.use('/partials', express.static(__dirname + '/../partials'))
require('./backend/routes.js')(app, db, environment)

# Launch ======================================================================

if process.env.NODE_ENV?
  logger.info("NODE_ENV: #{process.env.NODE_ENV}")
else
  logger.info 'no environment specified'

http.createServer(app).listen(portHTTP, () ->
  logger.info("Unsecure Express server listening on port #{portHTTP} environment: #{environment}")
)