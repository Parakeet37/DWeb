var http = require('http')
var fs = require('fs')
var pug = require('pug')
var formidable = require('formidable')
var express = require('express')
var mime = require('mime')

var app = express()

var s = /\/.*/

app.get("/", (req, res)=>{
    var array_ficheiros = new Array();
    fs.readdir('uploaded', (erro, ficheiros)=>{
        if (erro){
            res.write(pug.renderFile('layouts/erro.pug', {e: 'Ocorreram erros a procurar ficheiros no filesystem!'}))
            res.end()
        } else {
            for (var i = 0;i<ficheiros.length; i++){
                array_ficheiros.push({"nome": ficheiros[i]})
            }
            res.write(pug.renderFile('layouts/index.pug', {"ficheiros": array_ficheiros.sort((a, b) => a.nome.localeCompare(b.nome))}))
            res.end()
        }
    })
})

app.post("/", (req, res)=>{
    var form = new formidable.IncomingForm()
    form.parse(req, (erro, fields, files)=>{
        var fenviado = files.ficheiro.path
        var fnovo = './uploaded/'+files.ficheiro.name
        fs.rename(fenviado, fnovo, erro => {
            if(!erro) {
                var array_ficheiros = new Array();
                fs.readdir('uploaded', (erro, ficheiros)=>{
                    if (erro){
                        res.write(pug.renderFile('layouts/erro.pug', {e: 'Ocorreram erros a procurar ficheiros no filesystem!'}))
                        res.end()
                    } else {
                        for (var i = 0;i<ficheiros.length; i++){
                            array_ficheiros.push({"nome": ficheiros[i]})
                        }
                        res.write(pug.renderFile('layouts/index.pug', {"ficheiros": array_ficheiros.sort((a, b) => a.nome.localeCompare(b.nome))}))
                        res.end()
                    }
                })
            }
            else {
                res.write(pug.renderFile('layouts/erro.pug', {e: 'Ocorreram erros no armazenamento do ficheiro!'}))
                res.end()
            }
        })
    })
})

app.get("/w3.css", (req, res)=>{
    res.writeHead(200, {'Content-type': 'text/css'})
    fs.readFile('styles/w3.css', (erro, dados)=>{
        if(!erro) res.write(dados)
        else res.write(pug.renderFile('layouts/erro.pug', {e: 'Ocorreram erros no armazenamento do ficheiro de estilo!'}))
        res.end()
    })
})

app.get(s, (req, res)=>{
    fs.readFile('uploaded/'+req.url.split("/")[1], (erro, dados)=>{
        if(!erro) {
            console.log(mime.getType(req.url.split("/")[1]))
            res.writeHead(200, {'Content-type': mime.getType(req.url.split("/")[1])})
            res.write(dados)
        } else res.write(pug.renderFile('layouts/erro.pug', {e: 'Ocorreram erros no envio do ficheiro!'}))
        res.end()
    })
})

http.createServer(app).listen(5000, ()=>{
    console.log("O servidor está à escuta na porta 5000")
})
