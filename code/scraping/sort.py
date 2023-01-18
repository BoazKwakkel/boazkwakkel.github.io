######################
#
# sort.py
#
# Reads links from txt file and removes duplicates
#

import sys

def make_unique(infile, outfile):
    with open(infile) as f:
        all = set(f.readlines())


    # Write list of unique links into new file    
    with open(outfile, 'w+') as f:
        for a in all:
            f.write(a)

if __name__ == '__main__':
    try:
        make_unique(f'{sys.argv[1]}.txt', f'{sys.argv[2]}.txt')
    except:
        make_unique('sk_resp/total_extra.txt', 'sk_resp/unique_extra.txt')