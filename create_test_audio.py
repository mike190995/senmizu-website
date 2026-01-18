import os

file_path = r'c:\Users\mike1\Documents\Senmizu\public\Blog\post4\episode4.mp3'
output_path = r'c:\Users\mike1\Documents\Senmizu\public\Blog\post4\test_small.mp3'

# Read first 10MB
with open(file_path, 'rb') as f_in:
    data = f_in.read(10 * 1024 * 1024)
    with open(output_path, 'wb') as f_out:
        f_out.write(data)

print(f"Created {output_path} with size {len(data)} bytes")
