const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let phothosArray = [];
let initialLoad = true;

// Unsplash API
let countImagesToLoad = 5;
const apiKey = 'FK9UZB-Q441G3O9MCpdDTIrNMxolL6W9LclzYE-mZHo';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${countImagesToLoad}&query=caatinga`;

function toggleSobre() {
	const divSobre = document.getElementById('sobre');
	divSobre.classList.toggle('hidden');
}

function creditaAutor(autor) {
	// Verifica se o autor já foi adicionado aos créditos
	if (document.getElementById(autor.id)) return;

	const listaCreditos = document.getElementById('lista_creditos');
	const link = document.createElement('a');
	const listItem = document.createElement('li');

	link.textContent = autor.name;
	link.href = autor.links.html;
	listItem.id = autor.id;

	listItem.appendChild(link);
	listaCreditos.appendChild(listItem);
}

// Checkif all images were loaded
function imageLoaded() {
	imagesLoaded++;
	if (imagesLoaded === totalImages) {
		ready = true;
		loader.hidden = true;
		initialLoad = false;
		
		countImagesToLoad = 30;
		// Since we update the url count to 30, we need to updatethe apiURL as well
		apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${countImagesToLoad}&query=caatinga`;
	}
}

// Helper Function so Set Attributes on DOM Elements
function setAttributes(element, attributes) {
	for (let key in attributes) {
		element.setAttribute(key, attributes[key]);
	}
}

// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
	imagesLoaded = 0;
	totalImages = phothosArray.length;
	// Run function for each object in photosArray
	phothosArray.forEach((foto) => {
		creditaAutor(foto.user)

		// Create <a> to link to Unsplash
		const item = document.createElement('a');
		setAttributes(item, {
			href : foto.links.html,
			target: '_blank'
		});
		// Create <img> for foto
		const img = document.createElement('img');
		setAttributes(img, {
			src : foto.urls.regular,
			alt : foto.alt_description,
			title : foto.alt_description
		});

		// Event Listener, check when each is finished loading
		img.addEventListener('load', imageLoaded);
		// Put <img> inside <a>, then put both inside imageContainer
		item.appendChild(img);
		imageContainer.appendChild(item);
	});
}

// Get photos from Unsplash API
async function getPhotos() {
	try {
		const response = await fetch(apiUrl);
		phothosArray = await response.json();
		displayPhotos();
	}catch (error) {
		// Catch Error Here
		console.log(error);
	}
}

// Check to see if scrolling near of page, Load More Photos
window.addEventListener('scroll', () => {
	if (window.innerHeight + window.scrollY >=  document.body.offsetHeight - 1000 && ready) {
		ready = false;
		getPhotos();
	}
});

// Abre as informações sobre a aplicação
document.getElementById('sobre_link').addEventListener('click', toggleSobre);

// Fecha as informações sobre a aplicação
document.getElementById('fecha_sobre').addEventListener('click', toggleSobre);

// On Load
getPhotos();