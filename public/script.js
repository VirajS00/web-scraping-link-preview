const container = document.querySelector('.link-preview-container');
const button = document.getElementById('submitButton');
const ta = document.getElementById('text');

const getURLs = (input) => {
	const regex = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
	let urls = input.split(regex);
	let op = [];
	urls.forEach((line) => {
		if (regex.test(line)) {
			op.push(line);
		}
	});
	return op;
};

button.addEventListener('click', () => {
	let urls = getURLs(ta.value);
	getUrlData(urls);
});

const getUrlData = async (link_url) => {
	container.innerHTML = '';
	const loader = document.createElement('div');
	loader.classList.add('loader');

	container.appendChild(loader);

	let url_obj = link_url;
	const req = await fetch('/urlinfo', {
		method: 'post',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(url_obj)
	});

	const data = await req.json();
	console.log(data);

	data.forEach((url_link) => {
		const { url, image, icon, title, shortDesc } = url_link;

		const preview = document.createElement('div');
		preview.classList.add('link-preview');

		const link = document.createElement('a');
		link.classList.add('link');
		link.href = url;
		link.target = '_blank';

		const img = document.createElement('img');
		img.classList.add('url_img');
		img.src = image;

		const info = document.createElement('div');
		info.classList.add('info');

		const webIcon = document.createElement('img');
		webIcon.classList.add('webIcon');
		webIcon.src = icon;

		const link_title = document.createElement('h3');
		link_title.classList.add('url-title');
		link_title.textContent = title;

		const desc = document.createElement('p');
		desc.classList.add('url-desc');
		desc.textContent = shortDesc;

		info.appendChild(webIcon);
		info.appendChild(link_title);
		info.appendChild(desc);

		preview.appendChild(img);
		preview.appendChild(info);

		link.appendChild(preview);

		container.innerHTML = '';
		container.appendChild(link);
	});
};
