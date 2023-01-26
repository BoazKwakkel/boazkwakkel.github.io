########
#
# Renames all files within a directory so that they have continuously enumerated names
#

import os

def create_translation(translation_file, file_format):
    '''
    Creates translation file in txt format accordingly:
    old_img.{file_format} new_img.{file_format}
    old_img.{file_format} new_img.{file_format}
    '''

    cnt = 0
    res = []
    for root, dirs, files in os.walk('./'):
        if root != './old':
            for file in files:
                if file.endswith(file_format) and not file.startswith('head'):
                    res.append(f'{file} img_{cnt}.{file_format}')
                    cnt += 1

    with open(translation_file, "w+") as f:
        f.write("\n".join(res))



def rename(dir, translation_file):
    '''Walks through give directory with provided translation file and renames all files accordingly'''
    with open(translation_file, 'r') as f:
        translations = dict(line.strip().split(' ') for line in f)

    for root, dirs, files in os.walk(dir):
        if root != './old':
            for file in files:
                if file in translations:
                    old_path = os.path.join(root, file)
                    new_path = os.path.join(root, translations[file])
                    os.rename(old_path, new_path)


if __name__ == '__main__':
    create_translation('a_new_labels.txt', 'jpg')
    rename('./', 'a_new_labels.txt')