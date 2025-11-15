var express = require('express');
var http = require('http');
var path = require('Path');
var bodyParser = require('body-parser');
var sql = require("mssql");

var app = express();

/* Подключение к базе данных */
var Connection = require('tedious').Connection;  
var config = {  
	server: 'localhost',
	authentication: {
		type: 'default',
		options: {
			userName: 'Roma', //update me
			password: '123',  //update me
		}
	},
	options: {
		// If you are on Microsoft Azure, you need encryption:
		encrypt: true,
		trustServerCertificate: true,
		port: 59741, //Смотреть в Диспечере конфигураций, TCP/IP, вкладка IP-адреса, поле Динамические TCP порты (их несколько)
		database: 'DevSite'  //Название БД
	}
};  
var connection = new Connection(config);  
connection.on('connect', function(err) {  
	if (err)
	{
		console.log(err);
	}
});

connection.connect();
/* Конец подключения к базе данных */

/* ------ Пре запуск сервера ------ */
const server = http.createServer((req, res) => {
	// Добавьте заголовки для CORS, если запрос от другого домена
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
	
	const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
	
	if (parsedUrl.pathname === '/api/getData') {
		const token = parsedUrl.searchParams.get('token');
		getUser(res, token);
	}
	else if (parsedUrl.pathname === '/api/saveData') {
		//saveData(res);
		let body = '';

		// собираем данные из тела запроса
		req.on('data', chunk => {
		  body += chunk.toString();
		});

		req.on('end', () => {
		  try {
			const data = JSON.parse(body);			
			saveData(res, data);
		  } catch (err) {
			res.writeHead(400, {'Content-Type': 'application/json'});
			res.end(JSON.stringify({ error: 'Некорректный JSON' }));
		  }
		});
	} else {
		res.writeHead(404);
		res.end();
	}
});

/* Запуск сервера */
var port = process.env.PORT || 3000;
server.listen(port, 'localhost', function () {
	console.log('Express server started on port %s at %s', server.address().port, server.address().address);
	console.log("... port %d in %s mode", server.address().port, app.settings.env);
});


function getUser(res, token) {
	var Request = require('tedious').Request;
	
    request = new Request(`select [Id], [UserName], [UserImage], [UserHideImage], [UserTargetAmount], [UserAmount] from [dbo].[User] where [Id] = '${token}';`, function(err) {  
        if (err) console.log(err);
	});
	
	var result = { Id: null, UserName: null, UserImage: null, UserHideImage: null, UserTargetAmount: null, UserAmount: null };
	request.on('row', function(columns) {
		columns.forEach(function(column, index) {
			if(index === 0){
				result.Id = column.value;
			}
			else if(index === 1){
				result.UserName = column.value;
			}
			else if(index === 2){
				result.UserImage = column.value;
			}
			else if(index === 3){
				result.UserHideImage = column.value;
			}
			else if(index === 4){
				result.UserTargetAmount = column.value;
			}
			else if(index === 5){
				result.UserAmount = column.value;
			}
		});
		
	});
	
	request.on("requestCompleted", function (rowCount, more) {
		const data = { NameRequest: 'getUser', Data: result };
		res.writeHead(200);
		res.end(JSON.stringify(data));
	});
	connection.execSql(request);
}

function saveData(res, data) {
	var Request = require('tedious').Request;
	
    request = new Request(`update [dbo].[User] set [UserImage] = '${data.image}' where [Id] = '${data.token}';`, function(err) {  
        if (err) console.log(err);
	});
	
	var result = { Id: null, UserName: null, UserImage: null, UserHideImage: null, UserTargetAmount: null, UserAmount: null };
	request.on('row', function(columns) {
		columns.forEach(function(column, index) {
			if(index === 0){
				result.Id = column.value;
			}
			else if(index === 1){
				result.UserName = column.value;
			}
			else if(index === 2){
				result.UserImage = column.value;
			}
			else if(index === 3){
				result.UserHideImage = column.value;
			}
			else if(index === 4){
				result.UserTargetAmount = column.value;
			}
			else if(index === 5){
				result.UserAmount = column.value;
			}
		});
		
	});
	
	request.on("requestCompleted", function (rowCount, more) {
		const data = { NameRequest: 'saveData', Data: result };
		res.writeHead(200);
		res.end(JSON.stringify(data));
	});
	connection.execSql(request);
}