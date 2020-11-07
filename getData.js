const cheerio = require('cheerio');
const fetch = require('node-fetch');

module.exports = class getWiki {
	constructor(url) {
		this.url = url;
	}
	async getHtml() {
		const req = await fetch(this.url);
		const htmlData = await req.text();
		return htmlData;
	}
	async getData() {
		const html = await this.getHtml();
		const $ = cheerio.load(html);
		const title = $('#firstHeading').text();
		const shortDesc = $('.shortdescription').text();
		const icon = 'icons/wikipedia.ico';
		let img = $('.thumbimage')[0];
		let image;
		if (img === undefined) {
			image = undefined;
		} else {
			image = 'https:' + img.attribs.src;
		}
		return { title, shortDesc, image, icon, url: this.url };
	}
};
