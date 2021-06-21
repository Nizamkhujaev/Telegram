const http = require('http')
const fs = require('fs')
const { host, PORT } = require('./config.js')
const Express = require('./lib/express.js')

// load modules
const authController = require('./modules/auth/controller.js')
const messageController = require('./modules/message/controller.js')

const server = http.createServer( (req, res) => {
	console.log(req.url, req.method)
	res.setHeader("Access-Control-Allow-Origin", "*");
  	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
	res.setHeader('Access-Control-Allow-Methods', '*')

	if(req.method === 'OPTIONS') return res.end('200')
	const app = new Express(req, res)

    app.post('/register', authController.REGISTER)
    app.post('/login', authController.LOGIN)
    app.post('/message', messageController.POST)
    app.get('/message', messageController.GET)


})

server.listen(PORT, () => console.log('Server is running on http://' + host + ':' + PORT))