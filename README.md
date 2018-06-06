# Webtask Image Filters

Webtask for adding filters to an image. It has been migrated to TypeScript from [this original repo](https://github.com/micopc/webtask-image-filters)

## Installation

Clone the repository and install the dependencies with:

```bash
npm install
```

Be sure to have TypeScript installed in your system.

```bash
npm install -g typescript
```

## Development and Deployment

Run in watch mode to automatically compile when developing

```bash
npm run watch
```

When ready to deploy

```bash
npm run build
```

And deploy to webtask. You will need a webtask account to deploy

```bash
npm run deploy
```

## Usage

```bash
curl -X POST -H 'Content-Type: application/octet-stream' --data-binary 'path/to/image.jpg' -o output.jpg webtask-endpoint/[FILTER_TYPE]
```

where [FILTER_TYPE] is one of:

- sepia
- greyscale
- invert

## How it works

It receives an image in the body and then applies a filter based on the parameter specified in the url. All filters are applied by reading the pixels first, then changing the colors on each pixel based on different algorithms. For example for greyscale, 'Averaging' is used, which is assigning the average value between the R, G and B values of each pixel to each color component of that pixel.

```
Grey = (R + G + B) / 3
```

After the pixels are transformed, the image is then sent to the standard Node Response Object via streaming.
