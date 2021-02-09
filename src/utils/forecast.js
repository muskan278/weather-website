const request=require('request')
const forecast =(latitude,longitude,callback)=>{
    const url='https://api.openweathermap.org/data/2.5/onecall?lat='+latitude+'&lon='+longitude+'&appid=ccd6c09c3895525f1be59f612f49aa0d&units=imperial'
    request({url,json:true},(error,{body})=>{
        if(error)
        {
            callback('unable to connect to network',undefined)
        }else if(body.message)
        {
            callback('unable to find location',undefined)
        }
        else{
        // console.log(response.body.current)
        callback(undefined,"It is currently "+body.current.temp+" degrees out.The weather is "+body.current.weather[0].main)
        }
    })
}
module.exports=forecast