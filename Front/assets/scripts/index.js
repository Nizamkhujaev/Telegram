let token = window.localStorage.getItem('token');
if(!token) {
    window.location = '/login'
}

let ownUserName = document.querySelector('#own-username')
let logOut = document.querySelector('#log-out')
let overlay = document.querySelector('.overlay')
let modal = document.querySelector('.modal-menu')
let body = document.querySelector('body')

ownUserName.textContent = localStorage.getItem('username')

logOut.addEventListener('click', e => {
    localStorage.removeItem("userName");
    localStorage.removeItem("token");
})

let burger = document.querySelector('.header-left')

burger.addEventListener('click', function(e) {
    modal.style.transition = 'all ease 0.4s'
    overlay.classList.add('visible')
    modal.classList.add('opened')
    body.classList.add('no-scroll')
})

overlay.addEventListener('click', e=> {
    overlay.style.transition = '0'
    modal.style.transition = '0'
    overlay.classList.remove('visible')
    modal.classList.remove('opened')
    body.classList.remove('no-scroll')
})

