const hbs = require('hbs')
const path = require('path')
const express = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/weather')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()
const publicDirectroyPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectroyPath))
const viewpath = path.join(__dirname,'../templates/views')
const partialspath = path.join(__dirname,'../templates/partials')

//app.use --> customise your server
//express.static //serve a static file
//app.com --> domain
//app.com/home --> subdomain
//app.about -->subdomain

//app.get --> what server should do when someone visits a particular url


// app.use

// app.get('', (req, res)=> {
//     res.send('<h1>weather</h1>')

// })

//setup handlebars for express config
hbs.registerPartials(partialspath)
app.set('view engine', 'hbs')
app.set('views', viewpath)


app.get('', (req, res)=>{
    res.render('index', {
        title:'weather',
        name:'gopal'
    })
})


app.get('/about', (req,res)=>{
    res.render('about', {
        title:'About Me',
        name:"gopal"

    })
    console.log('namaste!!!')
})


app.get('/help', (req,res)=>{
    res.render('help', {
        title:'Help',
        name:"gopal",
        helpText:"Help"

    })
})


app.get('/weather', (req, res)=>{
    if (!req.query.address){
        return res.send({
            "error":"you must provide address"
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, place_name} = {}) => {
        if (error){
            return res.send({error})
        } else {
        forecast(latitude, longitude, (error, forecastdata) => {
            if (error){
                return res.send({error})
            }
            res.send({
                location: place_name,
                weather: forecastdata,
                address:req.query.address
            })
        })}
    })
})

app.get('/product', (req,res)=>{
    if (!req.query.search){
        return res.send({
            "error":"you must provide the search term"
        })
    }
    console.log(req.query.search)

    res.send({
        products:[]
    })
})

app.get('/help/*', (req,res)=>{
    res.render('404', {
        title:"Help article not found",
        name:"gopal",
        errorMessage:"Help article not found"
    })
})


app.get('*', (req,res)=> {
    res.render("404", {
        title:"Page not found",
        name : "gopal",
        errorMessage:"Page not found"
    }
    )
})

app.listen(3000, ()=>{
    console.log('server is up on port 3000')
})

//PORT = 3000 --> Developer port 
//HTTP --> 80 //production port 