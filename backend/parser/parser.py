import json

# Open the input text file
with open('input.txt', 'r') as file:
    lines = file.readlines()

# Initialize variables
data = []
course = {}

# Iterate through lines in groups of 3
for i in range(0, len(lines), 3):
    course_code = lines[i].strip()
    course_name = lines[i+1].strip()
    credit_count = lines[i+2].strip()

    # Create a dictionary for each course
    course = {
        'course_code': course_code,
        'course_name': course_name,
        'credit_count': credit_count
    }
    
    data.append(course)

# Write the data to a JSON file
with open('output.json', 'w') as json_file:
    json.dump(data, json_file, indent=4)

print("JSON file created successfully!")