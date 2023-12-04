const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

let photoArray = [];

// Unsplash Api
const count = 10;
const secretKey = 'erQAmEN4Cm4a_4SA3J3RdVNr7wFn-LTnYUabaYsI7dw'
const aipKey = 'nQOX1XgG7A0EIKZTqYiD0dcU51pVbtxT3V0pgyS2Rlg';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${aipKey}&count=${count}`;

// check to see if images were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

// helper function to set attributes to elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// create elements for links and fotos, add to dom
function displayPhotos() {
    
    imagesLoaded = 0;
    totalImages = photoArray.length;

    photoArray.forEach((photo) => {
        
        const item = document.createElement('a');
      
        setAttributes(item, {
            href: photo.links.html,
            target: "_blank",
        });
        // create image for photo
        const img = document.createElement('img');
        
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // event listener check to see if images is finish loading
        img.addEventListener('load', imageLoaded);
        // put img tag inside a tag and put both inside image container
        item.appendChild(img);
        imageContainer.appendChild(item);
    }); 
}

// get fotos from unsplash api
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photoArray = await response.json();
        displayPhotos();
    } catch(error) {
        // catch errors here
    }
}

// check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }
});

getPhotos();