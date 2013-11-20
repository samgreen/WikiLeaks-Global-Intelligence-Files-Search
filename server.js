var express = require('express');
var app = express();

var search = require('./search');
var view = require('./view');

function searchHandler (method, optionsKey) {
	return function (req, res) {
		var options = {};
		options[optionsKey] = req.param(method);

		search.find(req.param('q'), function (results) {
			respondWithJSON(res, results);
		}, options);
	};
}

function viewHandler (filterKey) {
	return function (req, res) {
		view["id"](req.param('id'), function (info) {
			respondWithJSON(res, info, filterKey);
		});
	};
}

function respondWithJSON (res, info, filterKey) {
	if (filterKey) {
		var response = {};
		response[filterKey] = info[filterKey];
		res.json(response);
	} else {
		res.json(info);	
	}
}

app.get('/search/:q/subject/:subject', searchHandler('subject', 'mtitle'));
app.get('/search/:q/to/:to', searchHandler('to', 'mto'));
app.get('/search/:q/from/:from', searchHandler('from', 'mfrom'));
app.get('/search/:q/date/:date', searchHandler('date', 'date'));
app.get('/search/:q/attachment/:attachment', searchHandler('attachment', 'file'));
app.get('/search/:q', searchHandler('find'));

app.get('/emails/:id/to', viewHandler('to'));
app.get('/emails/:id/from', viewHandler('from'));
app.get('/emails/:id/subject', viewHandler('subject'));
app.get('/emails/:id/body', viewHandler('body'));
app.get('/emails/:id/date', viewHandler('date'));
app.get('/emails/:id/attachments', viewHandler('attachments'));
app.get('/emails/:id', viewHandler());

app.listen(process.env.PORT || 3000);