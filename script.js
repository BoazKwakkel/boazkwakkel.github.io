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
        .then((response) => response.text()) // Read through txt file
        .then((data) => data.split(/[\n\r]+/g)) // Split lines
        .then((array) => array.map(v => get_coords(v.split(' ').map(c => parseFloat(c) )))) // Split and make coordinates
        .then((array_of_arrays) => create_box(array_of_arrays)) // Create clickable boxes from it
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
    change_main_img(indexes[0]);
    change_random_imgs();   
}


/**
* Prepares coordinates to become area
*/
function get_coords(coords) {

    // Multiply output times width and height from given image
    const img = document.querySelector("#i0");
    const width = img.offsetWidth;
    const height = img.offsetHeight; 
    console.log(width, height, coords);
    return [coords[0], width * coords[1], height * coords[2], width * coords[3], height * coords[4]]
}


/**
* Takes array of arrays
* Creates clickable area boxes on main image
*/
function create_box(array_of_arrays) {
    // console.log(array_of_arrays)
    const workmap = document.querySelector("[name=workmap]")

    workmap.innerHTML = array_of_arrays.filter(a => a[0]).map(array => 
        `<area shape="rect" coords="${array[1]},${array[2]},${array[3]},${array[4]}" alt="${array[0]}" href="${array[0]}">`
    ).reduce((s, v) => s + v, '');
    // Array(14)
    // 0: (5) [11, 378.197736, 319.0908, 39.933516000000004, 63.6364]
    // 1: (5) [4, 17.2097877, 278.2576, 31.412073000000003, 56.818000000000005]
    // 2: (5) [4, 273.60228, 341.5908, 54.637065, 35.909079999999996]
    // 3: (5) [4, 377.863773, 320.1516, 39.2650713, 67.57560000000001]
    // 4: (5) [4, 266.501277, 274.46959999999996, 57.477546, 22.57576]
    // 5: (5) [4, 183.794163, 197.0456, 91.562919, 205.90920000000003]
    // 6: (5) [4, 190.310232, 326.6668, 116.95966800000001, 51.212]
    // 7: (5) [4, 218.79843300000002, 230.90920000000003, 26.5665771, 41.5152]
    // 8: (5) [4, 35.0879403, 184.0908, 67.836783, 189.394]
    // 9: (5) [4, 360.653706, 279.54560000000004, 73.01620199999999, 73.0304]
    // 10: (5) [4, 93.233532, 278.86359999999996, 170.761227, 218.03040000000001]
    // 11: (5) [4, 359.56802700000003, 345.9848, 76.85937, 50.151599999999995]
    // 12: (5) [4, 298.999428, 253.40919999999997, 93.400713, 104.0908]
    // 13: (5) [NaN, NaN, NaN, NaN, NaN]
    // length: 14[[Prototype]]: Array(0)


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
