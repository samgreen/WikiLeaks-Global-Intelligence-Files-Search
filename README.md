WikiLeaks.org Global Intelligence Files
====================================

Node.js library to search the WikiLeaks GI files. This library uses cheerio to parse results from search.wikileaks.org/gifiles/.

This library is published to NPM as `wikileaks-gi-search`.

Usage
============
	var view = require('./view');

	view.id(1348378, function (email) {
		console.log(email.to);
		console.log(email.from);
		console.log(email.subject);
		console.log(email.date);
	});

Viewing emails is supported by the `view` module. Simply supply an email ID to the `id` function.

	var search = require('./search');

	search.find('CUPCAKE', function (results) {
		console.log(results[0].to);
		console.log(results[0].from);
		console.log(results[0].subject);
		console.log(results[0].date);
	});

Searching is primarily done with the `find` function. Simply supply a search string and an array of results will be returned.

	search.to('military', 'analysts@stratfor.com', function (results) {

	});

You can also filter who the email is from or to. The following filter functions are supported:

 * `to` - Who the email is addressed to
 * `from` - Who sent the email
 * `subject` - The subject of the email
 * `date` - Specific date the email was sent
 * `notFrom` - Filter emails and do not return emails from this address
 * `notTo` - Filter emails and do not return emails to this address
 


