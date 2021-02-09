// console.log('From js file')

const weatherForm=document.querySelector('form')
const searchElement=document.querySelector('input')
const msg1=document.querySelector('#msg1')
const msg2=document.querySelector('#msg2')
msg1.textContent=''
msg2.textContent=''
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location=searchElement.value;

    msg1.textContent='Loading'
    msg2.textContent=''

    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data={})=>{
        if(data.error)
        {
            // console.log(data.error)
            msg1.textContent=data.error
        }
        else
        {
            // console.log(data.location)
            // console.log(data.forecast)
            msg1.textContent=data.location
            msg2.textContent=data.forecast
        }
    })
})
})


/*
fetch('http://localhost:3000/weather?address=boston').then((response)=>{
    response.json().then((data={})=>{
        if(data.error)
        console.log(data.error)
        else
        {
            console.log(data.location)
            console.log(data.forecast)
        }
    })
})
*/
/*

fetch('https://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data)
    })
})


fetch('http://localhost:3000/weather?address=boston').then((response)=>{
    response.json().then((error,{latitude,longitude,location}={})=>{
        if(error)
        console.log(error)
        else
        {
            console.log(location)
            console.log(forecast)
        }
    })
})
*/