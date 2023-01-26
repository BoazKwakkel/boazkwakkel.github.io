// REQUIRED: Database with img ID, location, information about img
 
// TODO: Read data from DB to display information for img
// TODO: Generating clickable rectangle areas on main image
// TODO: Linking clickable rectangle areas on main image to image choice -> trigger random_imglink function

document.addEventListener("DOMContentLoaded", () => {

    // Extends Array functionality
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

    // Define consts
    const [labels, paintings, newlines, undigit] = ['./labels', './paintings', /[\n\r]+/g, /[^\d]*/g];
    const IMG_COUNT = 311;
    const indexes = Array.from({length: IMG_COUNT}, (v, i) => i).shuffle();
    const random = (min = 0, max = IMG_COUNT) => Math.floor(Math.random() * (max - min + 1)) + min;

    //const nextimg = (i) => `paintings/img_${ i || random()}.jpg`;
    const imgpath = (i) => `${paintings}/img_${ i || random()}.jpg`;

    // this elements are often use, retrieve the values only once
    const mainImg = document.querySelector('#i0');
    const choices = [...document.querySelectorAll('.choices')];
    const workmap = document.querySelector("[name=workmap]");

    const links = (async () => await fetch(`${labels}/a_new_labels.txt`)
        .then(response => response.text())
        .then(text => text.split(newlines))
        .then(lines => lines.filter(line => line))
        .then(array => array.map(line => line.split(' ').slice(1).map(str => parseInt(str.replace(undigit, '')) || 0)))
        .then(result => Promise.resolve(result)))();
    const goto = (i) => links.then(link => change_random_imgs(link[i]));

    /**
    * Changes main image in page based on which tiny img has been clicked earlier
    * Makes use of local folder /paintings at the moment!
    */
    function change_main_img(src, sequence = '0') {
        //change_random_imgs()
        mainImg.src = src;
        
        fetch(`${labels}/img_${sequence}.txt`)
            .then((response) => response.text()) // Read through txt file
            .then((text) => text.split(newlines)) // Split lines
            .then((array) => array.map(v => get_coords(v.split(' ').map(c => parseFloat(c) )))) // Split and make coordinates
            .then((array_of_arrays) => create_boxes(array_of_arrays.filter(a => a[0]))) // Create clickable boxes from it
    }
 

    /**
    * Changes random choice of imgs after main image has been chosen
    * Makes use of local folder /paintings at the moment!
    */
    function change_random_imgs(array = indexes) {
        // flips the first images to front - indexes is already randomized
        const images = choices.length;
        array.splice(0, 0, ...array.splice(-images)).filter((v,i) => i < images);
                
        // Get all choices and change their sources. Set an attr to get the index later 
        choices.forEach((img, i) => {
            img.src = imgpath(array[i]);
            img.setAttribute('img-seq', array[i]);
        });
    }; 


    /**
    * Prepares coordinates to become area
    */
    function get_coords(coords) {

        // Multiply output times width and height from given image
        const img = mainImg;
        const [width, height] = [img.offsetWidth, img.offsetHeight];

        const [x1, y1] = [(coords[1] - coords[3] / 2) * width, (coords[2] - coords[4] / 2) * height]; 
        const [x2, y2] = [(coords[1] + coords[3] / 2) * width, (coords[2] + coords[4] / 2) * height]

        const result = [coords[0], Math.round(x1),Math.round(y1),Math.round(x2),Math.round(y2)]; 
        console.log(width, height, result);
        console.log((coords[1] + coords[3]/2) / width, (coords[2] + coords[4]/2) / height);
        return result;
    }


    /**
    * Takes array of arrays
    * Creates clickable area boxes on main image
    */
    function create_boxes(array_of_arrays) {
        // we work here with innerHTML...
        const tag = 'area';
        workmap.innerHTML = array_of_arrays.map(array => 
            `
            <${tag} shape="rect" coords="${array[1]},${array[2]},${array[3] - array[1]},${array[4] - array[2]}" alt="${array[0]}" href="javascript:void(0)"
                  style="left: ${array[1]}px; top: ${array[2]}px; width: ${array[3] - array[1]}px; height: ${array[4] - array[2]}px;"
            />
            `
            // style="left: ${array[1]}px; top: ${array[2]}px; width: ${array[3] - array[1]}px; height: ${array[4] - array[2]}px;"
        ).reduce((s, v) => s + v, '');
        // ... so after building the DOM, we must search the dom to add listeners.
        [...document.querySelectorAll(tag)].forEach(el => {
            el.addEventListener('click', () => goto(parseInt(el.alt)));
            console.log(el);
            //buildborder(workmap, el);
        });

        /*
        //Temporary code - for testing only
        document.querySelector("#draggable-items").innerHTML = array_of_arrays.map(array => array.map(v => Math.round(v))).map(array =>
            `
            <div class="draggable">
                <div class="header" style="top:${array[1]}px; left:${array[2]}px; right:${array[3]}px; bottom:${array[4]}px;">
                    ${array[0]} ${array[1]} ${array[2]} ${array[3]} ${array[4]}
                </div>
                <span></span>
            </div>
            `
        ).reduce((s, v) => s + v, '');

        [...document.querySelectorAll("div.draggable")].forEach(el => dragElement(el));
        //`<div style="position:absolute; top:${array[1]}px; left:${array[2]}px; width:${array[3]}px; height:${array[4]}px;" alt="${array[0]}" href="${array[0]}"></div>`
        */
    }


    /**
    * Run only once: Searches for images in document
    * Makes them clickable so that once clicked, main image will be changed to clicked image
    * Makes them hides on error and shows on load
    * Like __init__ function
    */
    function make_clickable() {
        // make the 6 imgs to chose from clickable
        choices.forEach((img) => {
            // When clicked, change clicked img to main img and display new img source to chose from
            img.addEventListener('click', () => {
                change_main_img(img.src, parseInt(img.getAttribute('img-seq')));
                change_random_imgs();
            });
            img.addEventListener('error', () => img.style.visibility='hidden');
            img.addEventListener('load', () => img.style.visibility='visible');
        });
        // make the main imgs toggable
        mainImg.addEventListener('click', () => {
            change_random_imgs();
            //choices.forEach(function checkView(el) {el.classList.toggle('hide')});
        });
        mainImg.addEventListener('error', () => mainImg.style.visibility='hidden');
        mainImg.addEventListener('load', () => mainImg.style.visibility='visible');

        document.getElementById("change-main-img").addEventListener('click', () => {
            const chosen = random()
            change_main_img(imgpath(indexes[chosen]), indexes[chosen]);
        });
    }


 
    /**
    * Generates random choice of images to view from our image folder
    * Makes use of local folder /paintings at the moment!
    */
    function add_random_imglink() {
        // TODO: Make this choice dependent on data from DB and main img
        // Setup the images: Add click interaction to images
        make_clickable();

        // set the first image and choices randomly
        change_main_img(imgpath(indexes[0]), indexes[0]);
        change_random_imgs();  
        // links.then(console.log); 
    }
    add_random_imglink();

}); 

function buildborder(map, area, coordinates){
    const coords = [String(coordinates || area.coords).split(",").map(v => parseInt(v))];
    const style = area.style;
    style.left = coords[0] + "px";
    style.top = coords[1] + "px";
    style.width = coords[2] - coords[0] + "px";
    style.height = coords[3] - coords[1] + "px";
    area.betty = 'ist schön';
    console.log(area, coords);
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
//document.addEventListener("DOMContentLoaded", add_random_imglink);
