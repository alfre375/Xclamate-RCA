const port = 1111;
const appname = 'Xclamate RCA for SSL';
const express = require('express');
const app = express();
const fs = require('fs');

let langFileES = JSON.parse(fs.readFileSync('langfiles/es.json').toString());

function getLanguageJsonFromBrowserLanguage(browserLanguage) {
	switch (browserLanguage) {
		case ('es-419,es'):
			return langFileES;
		default:
			return langFileES;
	}
}

function translateUsingWebLang(textToTranslate, webLang) {
	let file = textToTranslate;
	let langFile = getLanguageJsonFromBrowserLanguage(webLang)['langData'];
	// Put the language specific text into the file variable
	let langKeys = Object.keys(langFile)
	//console.log(langKeys)
	for (i = 0; i < langKeys.length; i++) {
		let param = langKeys[i];
		let val = langFile[param];
		file = file.replace('\\!!' + param + '!!\\', val);
	}
	// Return the file variable
	return file;
}

app.get('/', (req, res) => {
	let lang = req.headers["accept-language"];
	res.status(200).send(translateUsingWebLang(fs.readFileSync('index.html').toString(), lang));
	return;
});

app.get('/downloadPemfile', (req, res) => {
	//setTimeout(() => {
	//	res.download(path.join(__dirname, 'certs/xclamateRCA.pem'), function (err) {
	//		console.log(err);
	//	});
	//}, 500);
	//return;
	res.sendFile(__dirname + '/certs/xclamateRCA.pem').status(200)
});

app.listen(port, () => { console.log(appname) })
