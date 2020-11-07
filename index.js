const express = require('express');
const getWiki = require('./getData');

const app = express();
const port = 3000;
app.use(express.static('public'));

app.get('/urlinfo', async (req, res) => {
	const getWikiData = new getWiki('https://en.wikipedia.org/wiki/Number');
	const data = await getWikiData.getData();
	res.send(data);
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
