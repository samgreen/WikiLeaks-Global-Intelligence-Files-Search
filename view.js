var request = require('request');
var query = require('querystring');
var cheerio = require('cheerio');

// https://search.wikileaks.org/gifiles/?
//	viewemailid=1351831
function viewEmail (id, callback) {
	var options = {};
	options['viewemailid'] = id;

	var url = "https://search.wikileaks.org/gifiles/?" + query.stringify(options);
	request(url, function (error, response, body) {
		var info = parseResponse(error, response, body);
		callback(info);
	});
}

function parseResponse (error, response, body) {
	var info = {};
	var $ = cheerio.load(body);

	info["id"] = parseInt($('td').eq(0).text());
	info["date"] = $('td').eq(1).text();
	info["from"] = $('td').eq(2).text();
	info["to"] = $('td').eq(3).text();
	info["subject"] = $('h2').text();
	info["body"] = $('div#doc-description').text();

	return info;
}

exports["id"] = viewEmail;