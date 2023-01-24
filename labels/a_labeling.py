#########
# Convert labels so that nothing is comma separated
#


with open("a_labels.txt", "r+") as f:
    lines = f.readlines()

    new = []
    for line in lines:
        line = "".join(line.split(","))
        new.append(line)

    with open("a_new_labels.txt", "w+") as file:
        file.write("".join(new))
