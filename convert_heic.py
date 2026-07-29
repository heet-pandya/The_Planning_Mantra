import os
try:
    from PIL import Image
    import pillow_heif

    pillow_heif.register_heif_opener()

    file_path = "assets/IMG_9850.HEIC"
    if os.path.exists(file_path):
        img = Image.open(file_path)
        new_path = "assets/IMG_9850.jpg"
        img.save(new_path, "JPEG")
        print(f"Successfully converted {file_path} to {new_path}")
    else:
        print(f"File not found: {file_path}")
except ImportError as e:
    print(f"Error importing required modules: {e}")
except Exception as e:
    print(f"An error occurred: {e}")
