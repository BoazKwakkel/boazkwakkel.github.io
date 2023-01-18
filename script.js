// TODO: Making tiny images clickable so that they become main image
// TODO: Generating clickable rectangle areas on main image
// TODO: Linking clickable rectangle areas on main image to image choice -> trigger random_imglink function


/**
 * Generate main image in page
 * Makes use of local folder /paintings at the moment!
 */
function add_main_img(img = `paintings/img_${Math.floor(Math.random()*311)}`) {
    document.write(`<img class="div1 main-image" src='${img}' onclick="toggle()"></img>`)
}


/**
 * Generates random choice of images to view from our image folder
 * Makes use of local folder /paintings at the moment!
 */
function random_imglink() {
    for (let i = 1; i < 7; i++) {
        var ry=Math.floor(Math.random()*311)

        // Write into DOM
        document.write(`<img class="div${i+1} choices" id="${i+1}" src="paintings/img_${ry}.jpg" style="display: none">`)
    }
}




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


function make_clickable() {
    [...document.querySelectorAll('.choices')].forEach((img) => {
        img.addEventListener('click', () => add_main_img(img.src))
        // {
        //   document.querySelector('.div1').src = img.src;
        // });
      });
}

/*************************************************************************************************/
/** LIKE MAIN
 * 
 * When page is fully loaded, make small images clickable
 */
 window.addEventListener('DOMContentLoaded', (event) => {
    
    
    // Call function to generate images
    add_main_img();
    random_imglink()
    make_clickable();
});
