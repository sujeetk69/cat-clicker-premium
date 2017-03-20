import os, sys
path = './'
filetype = ''
fixed_name_part = ''
if len(sys.argv) == 4:
	path = sys.argv[1]
	filetype = sys.argv[2]
	if not filetype.startswith('.'):
		filetype = '.' + filetype
	fixed_name_part = sys.argv[3]
else:
	print('Not enough parameters')
	print('try like: python rename.py ./ .jpg cat')
	sys.exit(0)
files = os.listdir(path)
number_of_files = len(files)
index_width = '01'
if number_of_files > 9:
	index_width = '02'
if number_of_files > 99:
	index_width = '03'
#print (files)
count = 1
for file in files:
	if file.endswith(filetype):
		newfile = fixed_name_part + format(count, index_width) + filetype
		os.rename(file, newfile)
		print (file +' renamed to ' + newfile)
		count += 1
