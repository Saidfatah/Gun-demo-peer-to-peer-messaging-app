const express = require('express')
const GUN = require('gun');

const app = express()
const port = 3300
app.use(GUN.serve)



const server = app.listen(port,()=>{
    console.log('listening on port:'+port)
})
GUN({web:server})