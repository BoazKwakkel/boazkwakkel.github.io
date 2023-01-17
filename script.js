// Generates random choice of images to view from our image folder
function random_imglink() {

    for (let i = 1; i < 7; i++) {
      var ry=Math.floor(Math.random()*311)

      // Write into DOM
      document.write(`<img class="div${i+1} choices"src="paintings/img_${ry}.jpg" style="display: none">`)
    }
  }

  var checker = function checkView(el) {
    if (el.style.display == 'none') {
      el.style.display = 'block'
    } else {
      el.style.display = 'none'
    }
  }


  // Call function
  random_imglink()

  // Toggle view for images function
  function toggle() {
    // Find all img elements that can be toggled and toggle them
    document.querySelectorAll(".choices").forEach(checker)
  }