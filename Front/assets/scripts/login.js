let username = document.querySelector('.user-name')
let userEmail = document.querySelector('.user-email')
let userPassword = document.querySelector('.user-password')

let token = window.localStorage.getItem('token')

if(token) {
    window.location = '/'
}

form.onsubmit = async (e) => {
    e.preventDefault()

    let newUser = {
        username: username.value,
        password: userPassword.value,
    }

    let response = await request('/login', 'POST', newUser)
    if(response) {
        if(response.username == null) {
            alert(response.message)
        } else{
            window.localStorage.setItem('token', response.token)
            window.localStorage.setItem('username', response.username)
            window.location = '/'
        }
    }

}