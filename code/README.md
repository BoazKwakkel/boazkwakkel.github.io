#### README
This file contains all information about the files in this folder</br>

All code from this folder is written in Python3.10.4</br>
For required packages please refer to requirements.txt</br>
or download requirements.txt into the working directory and run one of the following commands:</br>
> pip install requirements

</br> or </br>

> pip3 install requirements

</br>

#### requirements.txt
* Contains all packages that are required
</br></br>

#### code/sort.py

Usage: 
> python sort.py infile outfile

* Reads lines from a document and creates a list of unique lines from it
* Writes the list of unique lines into a new file
</br></br>

#### code/scrape_link.py
Usage: 
> python scrape_link.py API-key resp-per-page pages output-file

* Makes API Requests from [Rijksmuseum API](https://data.rijksmuseum.nl/object-metadata/api/) to find links to images for a given search term
* Saves image links in the given output file
</br></br>

#### code/scrape_image.py
Usage: 
> python sort.py filename folder

* Requires document containing links to images
* Opens links and downloads the images from the DOM
* Saves the images in a folder