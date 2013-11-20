var request = require('request');
var query = require('querystring');
var cheerio = require('cheerio');

// https://search.wikileaks.org/gifiles/?
//		q=
//		mfrom=chanel.doree%40gmail.com
//		mto=
//		title=
//		notitle=
//		date=
//		nofrom=
//		noto=
//		count=1000
//		sort=2
//		file=
//		docid=
//		relid=714
function searchFrom(q, from, callback, options) {
	options = options || {};
	options["mfrom"] = from;
	search(q, callback, options);
}

function searchTo(q, to, callback, options) {
	options = options || {};
	options["mto"] = to;
	search(q, callback, options);
}

function searchNotTo(q, notTo, callback, options) {
	options = options || {};
	options["noto"] = notTo;
	search(q, callback, options);
}

function searchNotFrom(q, notFrom, callback, options) {
	options = options || {};
	options["nofrom"] = notFrom;
	search(q, callback, options);	
}

function search(q, callback, options) {
	options = options || {};
	options["q"] = q;
	options["count"] = options.count || 1000;

	var url = "https://search.wikileaks.org/gifiles/?" + query.stringify(options);
	
	request(url, function (error, response, body) {
		var info = parseResponse(error, response, body);
		callback(info);
	});
}

function parseResponse(error, response, body) {
	if (!error) {
		var $ = cheerio.load(body, { ignoreWhitespace: true } );

		var emails = [];
		$('tr.doc').each(function (index, element) {
			var email = parseRow($(this));
			emails.push(email);
		});

		return emails;
	}
}

function parseRow($row) {
	var info = {};
	
	info["id"] = parseInt($row.children('td.links').text());
	info["from"] = $row.children('td.from').text().split('\n');
	info["to"] = $row.children('td.to').text().split('\n');
	info["subject"] = $row.children('td.subject').text();
	info["snippet"] = $row.next().text();

	return info;
}

exports.find = search;

exports.to = searchTo;
exports.from = searchFrom;
exports.notTo = searchNotTo;
exports.notFrom = searchNotFrom;