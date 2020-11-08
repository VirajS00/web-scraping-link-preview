const cheerio = require('cheerio');
const fetch = require('node-fetch');

module.exports = class getWiki {
	constructor(url) {
		this.url = url;
	}
	async getHtml() {
		try {
			const req = await fetch(this.url);
			const htmlData = await req.text();
			return htmlData;
		} catch {
			return 'error returning data';
		}
	}
	async getData() {
		const regexWiki = /^https?\:\/\/([\w\.]+)wikipedia.org\/wiki\/([\w]+\_?)+/;
		const amazonRegex = /^https:\/\/www\.amazon\.(com|in)\/.+/gim;
		try {
			const html = await this.getHtml();
			const $ = cheerio.load(html);
			if (regexWiki.test(this.url)) {
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
			} else if (amazonRegex.test(this.url)) {
				const title = $('#productTitle').text().trim();
				const image = $('.a-dynamic-image:first-child').attr('src');
				const icon = 'icons/amazon_logo_1_0.png';
				return { title, image, icon, url: this.url };
			}
		} catch {
			return { error: 'error returning values' };
		}
	}
};
