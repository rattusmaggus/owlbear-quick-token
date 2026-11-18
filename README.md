# Quick Token (Owlbear Rodeo extension)

1. Drop an image into the **Character** layer of a scene.
2. Select it -> right-click -> **Make Token**.
3. The image is cropped to a circle (horizontally centered, aligned to the TOP), pick an optional border, name it.
4. **Apply Token** -> the image on the map turns into the token. Your original image in the library is untouched.
   Tick "Also save a copy" to add the token to your Characters library too (Owlbear shows its upload dialog).
5. Right-click a token -> **Revert Token** to restore the original image.

## Adding borders
Drop a transparent PNG (any square size; it's stretched over the whole token) into `/borders`
and add an entry to `borders.json`:
    { "name": "My Frame", "file": "my-frame.png" }

## Install
Host the folder over HTTPS (e.g. GitHub Pages), then Profile -> Add Extension -> URL of manifest.json.
