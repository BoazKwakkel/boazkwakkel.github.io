######################
#
# scrape_link.py
#
# Makes Rijksmuseum API requests to receive links to images under specified search terms
#
# Saves links in a txt file
#
# Rijksmuseum API 
# https://data.rijksmuseum.nl/object-metadata/api/
#

import sys
import requests

def scrape_link(key: str, searchq: str, respp: str, pages: int, outfile: str) -> None:

    # Iterate over list of search terms
    for s in searchq:
        image_urls = []

        # Iterate over x pages and get 100 responses for each
        for i in range(0, pages):
            resp = requests.get(f'https://www.rijksmuseum.nl/api/en/collection?key={key}a&q={s}&ps={respp}&p={i}&imgonly=True')

            # Only parse response if response valid otherwise stop request for given search term
            try:
                full_data = resp.json()

                # Iterate over each item from the API response (should be 100 each time)
                for item in full_data['artObjects']:

                    # Check if item has image and is painting
                    if item['hasImage'] and item['objectNumber'].startswith('SK'):

                        # Add url to list
                        image_urls.append(item['webImage']['url'])
            except:
                break

        # Uncomment to check if program is still running
        #print(f'animal:{s}\nlen:{len(image_urls)}')

        # Write into file
        with open(outfile, 'a+') as f:
            for i in image_urls:
                f.write(f'{i}\n')


if __name__ == '__main__':
    key = 'YBA1oK8'
    searchq = ['animal', 'dog', 'cat', 'cow', 'pig', 'sheep', 'tiger', 'lion', 'zebra', 'giraffe', 'elephant', 'deer', 'boar', 'wolf', 'bear', 'bird', 'lion']
    respp = 100     # How many responses per page
    pages = 10000   # How many pages
    outfile ='sk_resp/new_list.txt'

    try:
        scrape_link(f'{sys.argv[1]}.txt', searchq, sys.argv[2], sys.argv[3],  f'{sys.argv[4]}.txt')
    except:
        scrape_link(key, searchq, respp, pages, outfile)