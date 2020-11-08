const express = require('express');
const getWiki = require('./getData');

const app = express();

app.use(express.static('public'));
app.use(express.json());

app.post('/urlinfo', async (req, res) => {
	const urls = req.body;
	let urlData = [];
	for (let i = 0; i < urls.length; i++) {
		const getWikiData = new getWiki(urls[i]);
		const data = await getWikiData.getData();
		urlData.push(data);
	}

	res.send(await urlData);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
