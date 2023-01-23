// REQUIRED: Database with img ID, location, information about img
 
// TODO: Read data from DB to display information for img
// TODO: Generating clickable rectangle areas on main image
// TODO: Linking clickable rectangle areas on main image to image choice -> trigger random_imglink function
 
const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const nextimg = (i) => `paintings/img_${ i || random(0, 311)}.jpg`;
if (!Array.prototype.shuffle) {
    Object.defineProperty(Array.prototype, 'shuffle', {
        value: function() {
            for (let i = this.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [this[i], this[j]] = [this[j], this[i]];
            }
            return this;
        }
    });
}
const indexes = Array.from({length:311}, (v, i) => i).shuffle();
const imgpath = (i) => `paintings/img_${ i }.jpg`;
//Array(23).fill().map((v, i, a, c) => (c = random(0, a.length - 1), [a[i], a[c]] = [a[c], a[i]]))
 
 
/**
* Changes main image in page based on which tiny img has been clicked earlier
* Makes use of local folder /paintings at the moment!
*/
function change_main_img(src, sequence = '0') {
    //change_random_imgs()
    document.querySelector('#i0').src = src;
    
    const areas = document.querySelector('[name=workmap]');


    //const origin = 'https://api.github.com/repos/BoazKwakkel/boazkwakkel.github.io/contents/labels'
    const origin = './labels'

    // TODO: Fix issue that it looks for img_i0.txt
    fetch(`${origin}/img_${sequence}.txt`, {
        method: 'GET',
        //mode: 'cors',
        headers : {
            Host: 'boazkwakkel.github.io',
            'Access-Control-Allow-Origin': 'file:///Users/yvette/Coding/Q42/boazkwakkel.github.io/index.html'
    }})
        .then((response) => response.text())
        .then((data) => console.log(data.split('\n')));
    
}
 
/**
* Changes random choice of imgs after main image has been chosen
* Makes use of local folder /paintings at the moment!
*/
function change_random_imgs() {
               
    const images = [...document.querySelectorAll('.choices')];
    //flips the first images to front
    indexes.splice(0, 0, ...indexes.splice(-images.length)).filter((v,i) => i < images.length);
               
    // Get all imgs and change to new random choice
    images.forEach((img, i) => {
        img.src = imgpath(indexes[i]);
        img.setAttribute('img-sequence', indexes[i]);
    });
}; 


/**
* Searches for images in document
* Makes them clickable so that once clicked, main image will be changed to clicked image
*/
function make_clickable() {
 
    // Search for 6 imgs to chose from
    [...document.querySelectorAll('.choices')].forEach((img) => {
 
        // When clicked, change clicked img to main img and display new img choice to chose from
        img.addEventListener('click', () => {
            change_main_img(img.src, img.getAttribute('img-sequence'));
            change_random_imgs();
        })
    });
}
 
/**
* Generates random choice of images to view from our image folder
* Makes use of local folder /paintings at the moment!
*/
function add_random_imglink() {
    // TODO: Make this choice dependent on data from DB and main img


    // Add click interaction to images
    make_clickable();
   
    // set the first and random the next images
    change_main_img(imgpath(0));//indexes[0]));
    change_random_imgs();   
}


function get_coords() {
    var coords = [0.947864, 0.797727, 0.100084, 0.159091]

    // Multiply output times width and height from given image
    const img = document.querySelector(".img0");
    const width = img.width;
    const height = img.height;
    console.log([width * coords[0], height * coords[1], width * coords[2], height * coords[3]])
}

function create_box() {

}

 
/**
* Toggles the visibility of the 6 small images depending on if the main image is clicked
* Requires that images cointain style attribute {display: block} or {display: none}
*/
function toggle() {
 
    // Find all img elements that can be toggled
    [...document.querySelectorAll(".choices")].forEach(function checkView(el) {
                               el.classList.toggle('hide');
    })
}
 
 
 
 
/*************************************************************************************************/
/** LIKE MAIN
*
 * When page is fully loaded, make small images clickable
*/
 
// Generate main image in page
//document.write(`<img class="div1 main-image" src='paintings/img_${Math.floor(Math.random()*311)}.jpg' onclick="toggle()"></img>`)
 
// Change to src from internet
// document.write('<img class="div1 main-image" src="https://lh3.ggpht.com/czrFlLp1GVWctRoejlSg75vMgBENE_s4uNYe34yJbGkQkNAIEpElJFlLZUZ4C_MEZo-ZaWBro-ygFIg8qt4JP8ojUMk=s0" onclick="toggle()">')
 
// Add links to random images
//add_random_imglink();
document.addEventListener("DOMContentLoaded", add_random_imglink);