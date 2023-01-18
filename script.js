// TODO: Making tiny images clickable so that they become main image
// TODO: Generating clickable rectangle areas on main image
// TODO: Linking clickable rectangle areas on main image to image choice -> trigger random_imglink function

//document.write(`<img class="div1 main-image" src='paintings/img_${Math.floor(Math.random()*311)}.jpg' onclick="toggle()"></img>`)




/**
 * Changes main image in page
 * Makes use of local folder /paintings at the moment!
 */
function change_main_img(img = `paintings/img_${Math.floor(Math.random()*311)}.jpg`) {
    change_random_imgs()
    document.querySelector('.div1').src=`${img}`
}

/**
 * Changes random choice of imgs after main image has been chosen
 * Makes use of local folder /paintings at the moment!
 */
function change_random_imgs() {

    // Get all imgs
    [...document.querySelectorAll('.choices')].forEach((img) => {
        img.src = `paintings/img_${Math.floor(Math.random()*311)}.jpg`
    });
};



/**
 * Searches for images in document
 * Makes them clickable so that once clicked, main image will be changed to clicked image
 */
function make_clickable() {
    [...document.querySelectorAll('.choices')].forEach((img) => {
        img.addEventListener('click', () => {
            change_main_img(img.src); 
            change_random_imgs();
        })
      });
}

/**
 * Generates random choice of images to view from our image folder
 * Makes use of local folder /paintings at the moment!
 */
function add_random_imglink() {
    for (let i = 1; i < 7; i++) {
        var ry=Math.floor(Math.random()*311)

        // Write into DOM
        document.write(`<img class="div${i+1} choices" id="${i+1}" src="paintings/img_${ry}.jpg" style="display: none">`)
    }
    make_clickable();
}


    // for (let i = 1; i < 7; i++) {
    //     var ry=Math.floor(Math.random()*311)

    //     // Write into DOM
    //     document.write(`<img class="div${i+1} choices" id="${i+1}" src="paintings/img_${ry}.jpg" style="display: none">`)
    //}



/**
 * Toggles the visibility of the 6 small images depending on if the main image is clicked
 * Requires that images cointain style attribute {display: block} or {display: none}
 */
function toggle() {

    // Find all img elements that can be toggled
    document.querySelectorAll(".choices").forEach(function checkView(el) {
        
        // Toggle visibility of images depending on their state
        if (el.style.display == 'none') {
            el.style.display = 'block'
        } else {
            el.style.display = 'none'
        }
    })
}




/*************************************************************************************************/
/** LIKE MAIN
 * 
 * When page is fully loaded, make small images clickable
 */
// Generate main image in page
document.write(`<img class="div1 main-image" src='paintings/img_${Math.floor(Math.random()*311)}.jpg' onclick="toggle()"></img>`)

// Add links to random imagess
add_random_imglink();


//make_clickable();
//  window.addEventListener('load', () => {
    
    
//     // Call function to generate images
//     add_main_img();
//     random_imglink();
//     make_clickable();
// });
