const http = require('http');
const news = require('./news');

http.createServer(function(req,res){
    res.writeHead(200, {'Content-type':'text/html'});
    let data = '<ul>';
    news.forEach(n => {
        data += '<li>' + n + '</li>';
    });
    data += '</ul>';
    res.write(data);
    res.end();
}).listen(3000);