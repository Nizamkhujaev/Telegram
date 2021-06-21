const fs = require('fs')
const path = require('path')

const fetchAll = () => {
	try {
		let data = fs.readFileSync(path.join(process.cwd(),'Back', 'database', 'message.json'))
		return data
	} catch( error ) {
		return error
	}
}


const insert = (user) => {
	try {
		const { message,userName } = user
		let data = fs.readFileSync(path.join(process.cwd(),'Back', 'database', 'message.json'), 'UTF-8')
		let newMessage
		if(!data) {
			data = []
			newMessage = { id: 1, message,userName, date: new Date().getHours() + ':' + new Date().getMinutes }
		} else {
			data = JSON.parse(data)
			let id = data.length ? data[data.length -1].id + 1 : 1;
			newMessage = { id , message,userName, date: `${new Date().getHours() + ':' + new Date().getMinutes()}` }
		}
		data.push(newMessage)
		fs.writeFileSync(path.join(process.cwd(),'Back', 'database', 'message.json'), JSON.stringify(data, null, 4))
		return newMessage
	} catch(error) {
		throw error
	}
}


module.exports = {
	fetchAll,
	insert,
}
