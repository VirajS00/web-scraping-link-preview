const express = require('express');
const getWiki = require('./getData');

const app = express();
const port = 3000 || process.env.PORT;
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

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
