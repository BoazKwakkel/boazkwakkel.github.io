import os

# dic = {}
# for i in range(13):
#     dic[i] = []

# for root, dirs, files in os.walk('../labels'):
#     for file in files:
#         lines = file.readlines()
path = '../../labels'

for i in range (13):
    images = set()
    for file in os.listdir(path):
        if file.endswith(".txt"):
            file_path = os.path.join(path, file)
            with open(file_path, 'r') as f:
                lines = f.readlines()
                for j,line in enumerate(lines):
                    text = line
                    words = text.split()
                    #print(words[0] + " " + str(i))
                    if words[0] == str(i):
                        images.add(file.split(".")[0])
                        #print(file.split(".")[0])
    with open('unique_words.txt', 'a') as f:
        print(images)
        f.write(f'{str(i)} {" ".join(images)}\n')