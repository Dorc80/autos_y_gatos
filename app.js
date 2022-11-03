const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {

    if (req.url === '/autos') {
        responseHtml('vistas/autos.html', res);
    } else if (req.url === '/gatos') {
        responseHtml('vistas/gatos.html', res);
    } else if (req.url === '/autos/nuevo') {
        responseHtml('vistas/autosFormulario.html', res);
    } else if (req.url.startsWith('/imagenes/auto') || req.url.startsWith('/imagenes/gato')) {
        let name = req.url.substring(10, 15);
        responseJpeg(`imagenes/${name}.jpeg`, res);
    } else if (req.url.startsWith('/css')) {
        let name = req.url.substring(1, req.url.length);
        responseCss(name, res);
    } else {
        responseHtml('vistas/404.html', res);
    }

})

function responseHtml(path, res) {
    responseUTFResource(path, res, 'text/html');
}

function responseJpeg(path, res) {
    responseResource(path, res, 'image/jpeg');
}

function responseCss(path, res) {
    responseResource(path, res, 'text/css');
}

function responseResource(path, res, type) {
    fs.readFile(path, (err, data) => {
        res.writeHead(200, { 'Content-Type': type });
        res.write(data);
        res.end();
    });
}

function responseUTFResource(path, res, type) {
    fs.readFile(path, 'utf-8', (err, data) => {
        res.writeHead(200, { 'Content-Type': type });
        res.write(data);
        res.end();
    });
}

server.listen(7077)
console.log("listening on port 7077");