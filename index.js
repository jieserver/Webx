const path = require('path')
const Express = require('express')
const proxy = require('http-proxy-middleware')
const _ = require('lodash')

const proxyMap = {
    '/test1,/npmsrc,/markdown,/mm':{
        target:'http://localhost:10000',
        changeOrigin: true,
        pathRewrite:{
            '^/test1':'/index.html'
        }
    },
    '/socket.io':{
        target:'http://localhost:8765',
        ws:true
    }
}
const app = new Express()

app.use('/',Express.static(path.resolve('./static')))

_.each(proxyMap,(v,k)=>{
    app.use(proxy(k.split(','),v))
})


app.listen(8700)