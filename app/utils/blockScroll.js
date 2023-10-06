export default (action = 'toggle') => {
    if(action === 'toggle'){
        document.body.querySelector("#__next").classList.toggle('hide-scroll')
        document.body.classList.toggle('hide-scroll')
    }
    if(action === 'remove'){
        document.body.querySelector("#__next").classList.remove('hide-scroll')
        document.body.classList.remove('hide-scroll')
    }
    if(action === 'add'){
        document.body.querySelector("#__next").classList.add('hide-scroll')
        document.body.classList.add('hide-scroll')
    }
}