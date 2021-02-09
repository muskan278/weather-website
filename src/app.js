const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')


console.log(__dirname )
console.log(__filename)
const app=express()
const port=process.env.PORT || 3000
//Define paths for Express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../template/views')
const partialsPath=path.join(__dirname,'../template/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather app',
        name:'Muskan Agarwal'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Muskan Agarwal'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText: 'This is some helpful text.',
        title:'Help',
        name:'Muskan Agarwal'
    })
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        error:'Help Article not found',
        title:'404 page',
        name:'Muskan Agarwal'
    })
})


app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error:'You must provide the address term'
        })
    }
    geocode(req.query.address, (error, {latitude,longitude,location}={}) => {
        if (error) {
            return res.send({error})
            // return console.log(error)
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
                // return console.log(error)
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
            // console.log(location)
            // console.log(forecastData)
        })
    })
    // console.log(req.query.address)
    // res.send({
    //     forecast:'rain',
    //     location:'Dumka',
    //     address:req.query.address
    // })
})

app.get('/products',(req,res)=>{
    if(!req.query.search)
    {
        return res.send({
            error:'You must provide the search term'
        })
    }
    console.log(req.query.search)
    res.send({
        forecast:'rain',
        location:'Dumka'
    })
})


app.get('*',(req,res)=>{
    // res.send('My 404 page')
    res.render('error',{
        error:'Page not found',
        title:'404 page',
        name:'Muskan Agarwal'
    })
})
//app.com 
/*
app.get('',(req,res)=>{
    // res.send('<h1>Hello express</h1>')
    res.send([{
        name:'Andrew',
        age:29
    },
    {
        name:'Andrew',
        age:29
    },
    {
        name:'Andrew',
        age:29
    }
    ])
})

app.get('/help',(req,res)=>{
    res.send('<h1>Help page</h1>')
})

app.get('/about',(req,res)=>{
    res.send('<title>hello ji</title><h1>About page</h1>')
})
*/
//app.com
//app.com/help
//app.com/about

app.listen(port,()=>{
    console.log('Server is up and running on port 3000')
})