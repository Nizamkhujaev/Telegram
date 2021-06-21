const fs = require('fs')
const path = require('path')
let cr = require('crypto')

const insert = (user) => {
	try {
		let { username, email, password } = user
		password = cr.createHash("md5").update(password.toString()).digest("hex")
		let data = fs.readFileSync(path.join(process.cwd(),'Back', 'database', 'users.json'), 'UTF-8')
		let newUser
		if(!data) {
			data = []
			newUser = {
				id: 1,
				username,
				email,
				password
			}
		} else {
			data = JSON.parse(data)
			let found = data.find(user => user.username == username)
			if(!found){
				let id = data.length ? data[data.length -1].id + 1 : 1;
				newUser = { id, username, email, password }
			} else {
				return
			}
		}
		data.push(newUser)
		fs.writeFileSync(path.join(process.cwd(),'Back', 'database', 'users.json'), JSON.stringify(data, null, 4))
		return newUser
	} catch(error) {
		throw error
	}
}

const login = (user) => {
	try {
		let { username, password } = user
		console.log(password)
		password = cr.createHash("md5").update(password.toString()).digest("hex")
		let data = fs.readFileSync(path.join(process.cwd(),'Back', 'database', 'users.json'), 'UTF-8')
		if(!data) return
		else {
			data = JSON.parse(data)
			let found = data.find(user => user.username == username && user.password == password)
			if(found){
				return found
			} else {
				return
			}
		}
	} catch(error) {
		throw error
	}
}


module.exports = {
	insert,
	login
}
