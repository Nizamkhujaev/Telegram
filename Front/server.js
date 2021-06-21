const http = require('http')
const fs = require('fs')
const path = require('path')
const host = 'localhost'
const PORT = 3152

const server = http.createServer((req, res) => {
	if(req.url === '/' && req.method === 'GET') {
		fs.readFile(path.join('Front','assets', 'index.html'), 'UTF-8', (err, data) => {
			res.writeHead(200, { 'Content-Type': 'text/html' })
			return res.end(data)
		})
	}  else if(req.url === '/login' && req.method === 'GET') {
        fs.readFile(path.join('Front','assets', 'pages', 'login.html'), 'UTF-8', (err, data) => {
			res.writeHead(200, { 'Content-Type': 'text/html' })
			return res.end(data)
		})
    } else if(req.url === '/register' && req.method === 'GET') {
        console.log(req.url)
        fs.readFile(path.join('Front','assets', 'pages', 'register.html'), 'UTF-8', (err, data) => {
			res.writeHead(200, { 'Content-Type': 'text/html' })
			return res.end(data)
		})
    }else if(req.url === '/chat' && req.method === 'GET') {
        console.log(req.url)
        fs.readFile(path.join('Front','assets', 'pages', 'chat.html'), 'UTF-8', (err, data) => {
			res.writeHead(200, { 'Content-Type': 'text/html' })
			return res.end(data)
		})
    } else {
		const filePath = req.url
		const reqMimeType = path.extname(filePath)
		if(!reqMimeType) return;

		const mimeTypes = {
			'.css': 'text/css',
			'.html': 'text/html',
			'.js': 'text/javascript'
		}

		const contentType = mimeTypes[reqMimeType] || 'application/octet-stream'

		fs.readFile(path.join('Front','assets', filePath), (err, data) => {
			res.writeHead(200, { 'Content-Type': contentType })
			return res.end(data)
		})
	}
})

server.listen( PORT, () => console.log('http://' + host + ':' + PORT))