var http = require('http')
var url = require('url')
var fs = require('fs')
var pug = require('pug')

http.createServer((req, res)=>{
    var myURL = url.parse(req.url, true)
    var s = /\/obra\//
    var obras = new Array();
    if (myURL.pathname == '/index' || myURL.pathname == '/'){
        fs.readdir('json', (erro, ficheiros)=>{
            if (erro){
                res.write('<p><b>ERRO: </b>'+ erro + '</p>')
            } else {
                for (var i = 0;i<ficheiros.length; i++){
                    var data = require('./json/'+ficheiros[i])
                    obras.push(data)
                }
                res.write(pug.renderFile('layout/index.pug', {"obras": obras.sort((a, b) => a.titulo.localeCompare(b.titulo))}))
                res.end()
            }
        })
    } else if (s.test(myURL.pathname)){
        res.writeHead(200, {'Content-Type': 'text/html'})
        //Estamos num elemento
        var elem = myURL.pathname.split("/")
        fs.readFile('json/'+ elem[2] + '.json', (erro, dados)=>{
            if(!erro){
                res.write(pug.renderFile('layout/template.pug', {"obra": JSON.parse(dados)}))
            }
            else
                res.write('<p><b>ERRO: </b>'+ erro + '</p>')
            res.end()
        })
    }
    else if (myURL.pathname == '/w3.css'){
        res.writeHead(200, {'Content-type': 'text/css'})
        fs.readFile('styles/w3.css', (erro, dados)=>{
            if(!erro) {
                res.write(dados)
            } else
                res.write('<p><b>ERRO: </b>'+ erro + '</p>')
            res.end()
        })
    }
    else{
        res.writeHead(200, {'Content-type': 'text/html'})
        res.write('<p><b>ERRO </b></p>')
        res.end()
    }
}).listen(5000, ()=>{
    console.log("O servidor está à escuta na porta 5000")
})