// TODO: Making tiny images clickable so that they become main image
// TODO: Generating clickable rectangle areas on main image
// TODO: Linking clickable rectangle areas on main image to image choice -> trigger random_imglink function


/**
 * Generates random choice of images to view from our image folder
 * Makes use of local folder /paintings at the moment!
 */
function random_imglink() {

    for (let i = 1; i < 7; i++) {
        var ry=Math.floor(Math.random()*311)

        // Write into DOM
        document.write(`<img class="div${i+1} choices"src="paintings/img_${ry}.jpg" style="display: none">`)
    }
}

// Call function to generate images
random_imglink()


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
