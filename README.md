# Webtask Image Filters

Webtask for adding filters to an image.

## Usage

```bash
curl -X POST -H 'Content-Type: application/octet-stream' --data-binary 'path/to/image.jpg' -o output.jpg webtask-endpoint/[FILTER_TYPE]
```

where [FILTER_TYPE] is one of:

* sepia
* greyscale
* invert

## How it works

It receives an image in the body and then applies a filter based on the parameter specified in the url. All filters are applied by reading the pixels first, then changing the colors on each pixel based on different algorithms. For example for greyscale, 'Averaging' is used, which is assigning the average value between the R, G and B values of each pixel to each color component of that pixel.

```
Grey = (R + G + B) / 3
```

After the pixels are transformed, the image is then sent to the standard Node Response Object via streaming.
