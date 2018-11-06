var http = require('http')
var fs = require('fs')
var pug = require('pug')
var formidable = require('formidable')
var express = require('express')
var mime = require('mime')
var jsonfile = require('jsonfile')
var app = express()

var s = /\/.*/

app.get("/", (req, res)=>{
    jsonfile.readFile('db.json', (erro, ficheiros)=>{
        if(!erro){
            res.write(pug.renderFile('layouts/index.pug', {"ficheiros": ficheiros.sort((a, b) => a.nome.localeCompare(b.nome))}))
            res.end()
        }
    })
})

app.post("/", (req, res)=>{
    var form = new formidable.IncomingForm()
    form.parse(req, (erro, fields, files)=>{
        var fenviado = files.ficheiro.path
        var fnovo = files.ficheiro.name
        fs.rename(fenviado, './uploaded/'+fnovo, erro => {
            if(!erro) {
                jsonfile.readFile('db.json', (erro, ficheiros)=>{
                    if(!erro){
                        ficheiros.push({"nome": fnovo, "desc": fields.desc})
                        jsonfile.writeFile('db.json', ficheiros, err =>{
                            if (!err){
                                res.write(pug.renderFile('layouts/index.pug', {"ficheiros": ficheiros}))
                                res.end()
                            } else res.write(pug.renderFile('layouts/erro.pug', {e: 'Ocorreram erros na escrita na bd!'}))
                        })
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
