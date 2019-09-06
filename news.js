const https = require('https');
const xml2js = require('xml2js');
const parser = new xml2js.Parser();

parser.on('error', function(err) { console.log('Parser error', err); });

let data = '';
let news = [];

https.get('https://news.google.com/rss?hl=en-US&gl=US&ceid=US:en', function(r) {
        if (r.statusCode >= 200 && r.statusCode < 400) {      
          r.on('data', function(data_) { data += data_.toString(); });
          r.on('end', function() {        
            parser.parseString(data, function(err, result) {
              if(err){
                console.log(err);
              }else{            
                for(var elem in result['rss']['channel']['0']['item']){
                  news.push(result['rss']['channel']['0']['item'][elem]['title'][0]);              
                }                                  
              }          
            });                                                  
          });
        }
});

module.exports = news;