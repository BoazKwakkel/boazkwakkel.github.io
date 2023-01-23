import os

folder_path = '/Users/yvette/Coding/Q42/boazkwakkel.github.io/labels'

# Get a list of all files in the folder
files = os.listdir(folder_path)

# Iterate through the list of files
for file in files:
    # Get the file's current name and path
    current_path = os.path.join(folder_path, file)
    current_name = os.path.basename(current_path)
    new_name = current_name.strip("img_i")

    # Create the new file name and path
    new_name = current_name.replace(current_name, f"img_{new_name}")
    new_path = os.path.join(folder_path, new_name)

    # Rename the file
    os.rename(current_path, new_path)