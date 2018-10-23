var http = require('http')
var url = require('url')
var fs = require('fs')
var pug = require('pug')
var jsonfile = require('jsonfile')

var {parse} = require('querystring')

var myBD = "tasks.json"

http.createServer((req, res)=>{
    var myURL = url.parse(req.url, true)
    var query = myURL.query
    if (req.method == 'GET'){
        if (myURL.pathname == '/index' || myURL.pathname == '/'){
            res.writeHead(200, {'Content-Type': 'text/html'})
            jsonfile.readFile(myBD, (erro, tarefas)=>{
                if(!erro){
                    res.writeHead(200, {'Content-Type': 'text/html'})
                    tarefas.sort(function(a, b) {
                        return parseInt(a.id) - parseInt(b.id);
                    });
                    res.write(pug.renderFile('layouts/index.pug', {lista: tarefas}))
                    res.end()
                } else {
                    res.writeHead(200, {'Content-type': 'text/html'})
                    res.write(pug.renderFile('layouts/erro.pug', {e: "ERRO: na leitura da bd"}))
                    res.end()
                }
            })
        } else if (myURL.pathname == "/regista"){
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(pug.renderFile('layouts/form-tarefa.pug'))
            res.end()
        } else if (myURL.pathname == "/esconde") {
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(pug.renderFile('layouts/apagar.pug'))
            res.end()
        } else if (myURL.pathname == '/w3.css'){
            res.writeHead(200, {'Content-type': 'text/css'})
            fs.readFile('styles/w3.css', (erro, dados)=>{
                if(!erro) {
                    res.write(dados)
                } else
                    res.write('<p><b>ERRO: </b>'+ erro + '</p>')
                res.end()
            })
        } else{
            res.writeHead(200, {'Content-type': 'text/html'})
            res.write(pug.renderFile('layouts/erro.pug', {e: "ERRO: "+myURL.pathname+" não está implementado"}))
            res.end()
        }
    } else if (req.method == 'POST') {
        if (myURL.pathname == "/processaForm"){
            recuperaInfo(req, resultado=>{
                curr_date = new Date()
                resultado.data_registo = curr_date.getFullYear() + "-" + (curr_date.getMonth()+1) + "-" + curr_date.getDate()
                jsonfile.readFile(myBD, (erro, tarefas)=>{
                    resultado.id = tarefas.length + 1
                    if(!erro){
                        tarefas.push(resultado)
                        console.dir(tarefas)
                        jsonfile.writeFile(myBD, tarefas, erro=>{
                            if (erro) console.log(erro)
                            else console.log("Registo gravado")
                        })
                    }
                })
                res.end(pug.renderFile('layouts/tarefa-recebida.pug', {tarefa: resultado}))
            })
        } else if (myURL.pathname == "/postEsconder"){
            recuperaInfo(req, resultado=>{
                if (resultado.escondida == "true") resultado.escondida = true
                else resultado.escondida = false
                jsonfile.readFile(myBD, (erro, tarefas)=>{
                    if(!erro){
                        for (var i=0; i < tarefas.length; i++){
                            if (parseInt(tarefas[i].id) == parseInt(resultado.id)){
                                tarefas[i].escondida = resultado.escondida
                                console.log(tarefas[i])
                            }
                        }
                        jsonfile.writeFile(myBD, tarefas, erro=>{
                            if (erro) console.log(erro)
                            else console.log("Registo gravado")
                        })
                    }
                })
                res.end(pug.renderFile('layouts/post-apagar.pug', {tarefa: resultado}))
            })
        } else {
            res.writeHead(200, {'Content-type': 'text/html'})
            res.write(pug.renderFile('layouts/erro.pug', {e: "ERRO: "+myURL.pathname+" não está implementado"}))
            res.end()
        }
    } else {
        res.writeHead(200, {'Content-type': 'text/html'})
        res.write(pug.renderFile('layouts/erro.pug', {e: "ERRO: Método não está implementado"}))
        res.end()
    }
}).listen(5000, ()=>{
    console.log("O servidor está à escuta na porta 5000")
})

function recuperaInfo(request, callback){
    if (request.headers['content-type'] == 'application/x-www-form-urlencoded'){
        let body = ''
        request.on('data', bloco=>{
            body += bloco.toString()
        })
        request.on('end', ()=>{
            callback(parse(body))
        })
    }
}