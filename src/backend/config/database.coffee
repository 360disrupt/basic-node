#config/database.js
module.exports = (environment) ->
  if(environment=='test')
    return {'url' : "mongodb://localhost/example-mongo-db", 'authdb':"admin"}

  else if(environment=='development')
    return {'url' : "mongodb://localhost/example-mongo-db", 'authdb':"admin"}

  else if(environment=='production')
    return {'url' : "mongodb://<username>:<pass>@proximus.modulusmongo.net:<port>/<authdb>", 'authdb':"<authdb>"}



