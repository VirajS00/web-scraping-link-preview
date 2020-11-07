const container = document.querySelector('.link-preview-container');

const getUrlData = async () => {
	const req = await fetch('/urlinfo');
	const data = await req.json();
	const { url, image, icon, title, shortDesc } = data;

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

	container.appendChild(link);
	console.log(data);
};

getUrlData();
