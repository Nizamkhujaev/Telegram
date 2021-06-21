let token = window.localStorage.getItem('token');
if(!token) {
    window.location = '/login'
}

let form = document.querySelector('.form')
let input = document.querySelector('.input')
let chatCard = document.querySelector('.chat-card')
let member = document.querySelector('#member')

async function getFunc() {
    let userMessages = await request('/message', 'GET')
    // console.log(userMessages)  
    
    chatCard.innerHTML = null

    userMessages.forEach(item => {
        input.addEventListener('keypress', function() {
            member.textContent = `${localStorage.getItem('username') + ' ' + 'is typing...'}`
        })
        
        let div = document.createElement('div')
        let name = document.createElement('h4')
        let text = document.createElement('p')
        let time = document.createElement('span')

        div.setAttribute('class', 'over')

        name.textContent = item.userName
        text.textContent = item.message
        time.textContent = item.date

        if(item.userName[0][0] == 'S' || item.userName[0][0] == 's') {
            name.setAttribute('class','s')
        } else if(item.userName[0][0] == 'A' || item.userName[0][0] == 'a') {
            name.setAttribute('class', 'a')
        } else if(item.userName[0][0] == 'U' || item.userName[0][0] == 'u') {
            name.setAttribute('class', 'u')
        } else if(item.userName[0][0] == 'J' || item.userName[0][0] == 'j') {
            name.setAttribute('class', 'j')
        }
        
        
        if(item.userName == localStorage.getItem('username')) {
            div.setAttribute('class','self')
            name.textContent = null
        }
        div.appendChild(name)
        div.appendChild(text)
        div.appendChild(time)
        chatCard.appendChild(div)


    })
}

getFunc()

// console.log(typeof localStorage.getItem('username'))

    form.addEventListener('submit', async e => {
        e.preventDefault()

        let obj

    
        if(input.value.length > 1) {
             obj ={
                message: input.value,
                userName: localStorage.getItem('username')
            }
        } else {
            obj ={
                message: 'Eeeeee yozish esdan chqbtiyu',
                userName: localStorage.getItem('username')
            }
        }
    
        let response = await request('/message', 'POST', obj)
    
        console.log(response)
    
        if(response) {
            getFunc()
        }
    
        form.reset()
    
    })