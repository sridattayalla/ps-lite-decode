import re

filename = "example.txt"

# Read the contents of the file
with open(filename, 'r') as file:
    file_contents = file.read()
    lines = file_contents.splitlines()

decode_matches = re.findall(r":: Decode (.*?) ", file_contents)
chain_matches = re.findall(r":: ChainDecode (.*?) ", file_contents)

decodes = []

for each in decode_matches:
    if each not in chain_matches:
        decodes.append("instance chainDecode"+each + " :: ChainDecode " + each +" where chainDecode = wrapDecode")

import_matches = re.findall(r"import .*", file_contents)
chain_import = re.findall(r"import Chain.*", file_contents)
decodearr_import = re.findall(r"import Main.Dec.*", file_contents)

print(lines)

lines = lines[:len(import_matches)] + ([] if len(chain_import) > 0 else ["import Chain"]) + ([] if len(decodearr_import) > 0 else ["import Main.DecodeError"]) + [""] + lines[len(import_matches):]

# Write the modified contents back to the file
with open(filename, 'w') as file:
    file.write("\n".join(lines) + "\n\n" + "\n".join(decodes))
