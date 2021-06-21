const messageModel = require('./model.js')
let fs = require('fs')
let path = require('path')

const GET = (req, res) => {
	try {
		res.writeHead(200, { 'Content-Type': 'application/json' })
		return res.end( messageModel.fetchAll() )
	} catch(error) {
		res.statusCode = 400
		return res.end('An error occured!')
	}
}

const POST = (req, res) => {
	try {
		let buffer = ''
		req.on('data', (data) => buffer += data)
		req.on('end', () => {
			let newExpanse = messageModel.insert( JSON.parse( buffer.toString() ) )
			res.writeHead(201, { 'Content-Type': 'application/json' })
			return res.end(JSON.stringify({ message: 'You successfully joined!', body: newExpanse }))
		})
	} catch(error) {
		res.statusCode = 400
		return res.end('An error occured!')
	}
}

module.exports = { GET, POST }
