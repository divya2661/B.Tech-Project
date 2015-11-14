var express = require('express')
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request = require('request');
var cheerio = require('cheerio');

var app = express();

//scrapping the data from www.rome2rio.com
//replace Kota/Jodhpur to values provided by the user
app.get('/',function(req,res){

	console.log("welcome to app");
	url = 'http://www.rome2rio.com/s/Kota/Jodhpur';

	//var jsonobj ={};
	var scrape_obj = [];
	request(url,function(error,response,html){
		//console.log("here111");
		if(!error)
		{
			var $ = cheerio.load(html);
			var mode,time,money;
			var scrape_type = [".itinerary-title", ".tip-east", ".tip-west"];
			var jsonobj = {mode:"",details:"",price:""};
			
			for(i=0;i<3;i++)
			{
				$(scrape_type[i]).filter(function(){
					//console.log("here1");	

					var data = $(this);

					price = data.text();
					jsonobj.price  = price;
					console.log(price);
				});
			}
			//console.log(" price: "+price);
			//scrape_obj.push({price:price});
		}
		else
		{
			console.log("there is some error");
		}
	});
})

app.listen('4000')
console.log('App is running at port 4000')