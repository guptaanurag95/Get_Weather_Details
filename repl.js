var http = require('http');
var buffer = '';

process.stdin.on('data', function(chunk) {
  buffer += chunk.toString('utf8');
});

function cal(str)
{
	var str2 = '/data/2.5/weather?q='+str;
	str2 = str2.slice(0,-1);
	var options = {
		  hostname: 'api.openweathermap.org',
		  port: 80,
	          path: str2,
		  method: 'POST'
	};

	var req = http.request(options, function(res) {
		res.setEncoding('utf8');
		res.on('data', function (chunk) {
			var str3 = JSON.parse(chunk);
			if(str3.message=='Error: Not found city')
				console.log("City Not found!!");				
			else
			{
				process.stdout.write("Co-ordinates : ");			
				console.log(str3.coord);
				process.stdout.write("Weather : ");			
				console.log(str3.weather);
				process.stdout.write("Main : ");			
				console.log(str3.main);
				process.stdout.write("Wind : ");			
				console.log(str3.wind);	
			}
			console.log("");
			process.stdout.write("Enter the city name : ");
		});
	});

	req.on('error', function(e) {
		console.log('problem with request: ' + e.message);
		console.log("");
		process.stdout.write("Enter the city name : ");
	});

	req.write('data\n');
	req.end();
};




console.log("");
process.stdout.write("Enter the city name : ");
console.log("");

require('repl').start({
    prompt: "",
    input: process.stdin,
    output: process.stdout,
    'eval': function (cmd, context, filename, callback) {
	cal(buffer);
	buffer = '';
	callback(null, true);
    }
});
