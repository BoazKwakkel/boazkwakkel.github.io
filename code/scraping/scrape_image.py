######################
#
# scrape_image.py
#
# Scrapes images from txt file containing only image urls by opening them with a selenium webdriver
#
# Requires selenium and google chrome
#
# Saves the images in a folder
#

from selenium import webdriver
from selenium.webdriver.common.by import By
import urllib
import sys

def scrape_image(filename: str, folder: str) -> None:

    img = 0    # Image counter for naming scraped images
    with open(filename, 'r+') as image_lines:
        images = image_lines.readlines()
        
        # Start driver that will open links
        driver = webdriver.Chrome()

        # Iterate over image urls
        for i_url in images:

            # Open link in browser
            driver.get(i_url)
            imgResult = driver.find_element(By.TAG_NAME, "img")
            src = imgResult.get_attribute('src')

            # Download and save image
            urllib.request.urlretrieve(str(src),f"{folder}/img_{img}.jpg".format(img))
            img += 1

        # Close browser once scraping is done 
        driver.close()
 
if __name__ == '__main__':

    filename = 'SK_resp/new_list.txt'   # Rename accordingly from where textfile with links is located
    folder = 'paintings'                # Important: This folder needs to exist beforehand

    try: 
        scrape_image(f'{sys.argv[1]}.txt', f'{sys.argv[2]}')
    except:
        scrape_image(filename, folder)