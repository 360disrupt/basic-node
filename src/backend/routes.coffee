USERTYPE_ADMIN = 5
USERTYPE_USER = 1

module.exports = (app, db, environment) ->

  express  = require('express')
  mongoService = require(__dirname + '/mongo.service.js')

  # normal routes ===============================================================
  # show the home page
  path = __dirname + '/../'
  console.log(path)
  app.use(express.static(path))

#==================================================== LOGIN ====================================================

  app.get('/login', (req, res) ->
    if environment == 'development'
      req.session.userType = USERTYPE_ADMIN
      return res.redirect('/')
    if req.query.password?
      password = req.query.password
      switch password
        when 'user'
          req.session.userType = USERTYPE_USER
        when 'admin'
          req.session.userType = USERTYPE_ADMIN
        else
          return res.json({ err: "wrong pass try again #{password}" })
      return res.redirect('/')
    else
      return res.json({ err: "currently in beta please login or change password #{environment}"})
  )


#==================================================== USER ROUTES ====================================================

  app.post('/getExamples', (req, res) ->
    if req.session.userType >= USERTYPE_USER

      mongoService.getExamples(db, 'some input', siteFilter,(err, examples) ->
        # if there is an error retrieving, send the error. nothing after res.json({ err: err })will execute
        if (err)
          return res.json({ err: err })
        return res.json(recipes)# return all todos in JSON format
      )
    else
      return res.json({ err: "currently in beta please login #{req.session.userType}" })
  )