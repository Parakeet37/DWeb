var http = require('http')
var fs = require('fs')
var url = require('url')

http.createServer((req, res)=>{
    var myURL = url.parse(req.url, true)
    res.writeHead(200, {'Content-Type': 'text/html'})
    if (myURL.pathname == '/index' || myURL.pathname == '/'){
        myURL.pathname = "/"
        //Estamos no index
        fs.readFile('website/index.html', (erro, dados)=>{
            if(!erro)
                res.write(dados)
            else
                res.write('<p><b>ERRO: </b>'+ erro + '</p>')
            res.end()
        })
    } else if (myURL.pathname.includes('arqelem')){
        //Estamos num elemento
        var elem = myURL.pathname.split("/")
        fs.readFile('website/html/'+ elem[2] + '.html', (erro, dados)=>{
            if(!erro){
                res.write(dados)
            }
            else
                res.write('<p><b>ERRO: </b>'+ erro + '</p>')
            res.end()
        })
    }
}).listen(8081, ()=>{
    console.log("O servidor está à escuta na porta 8081")
})

