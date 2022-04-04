
## Overview

- PhotoQuote - service that allows to generate image from text. No backend, all tasks performing in browser. Only HTML Canvas and Konva library. Stack: Node.js, TypeScript , Vite, React, Konva.

## Installation

```bash
# clone the project
git clone https://github.com/mvorotyn/photo-quote-generator-react.git

# open the project directory
cd photo-quote-generator-react

# install dependencies
npm install or yarn install

# start the application
npm run dev or yarn dev

# make a production build
npm run build or yarn build

# deploy to netlify (change siteID in package.json first )
npm run deploy or yarn deploy
```

## Pexels API Setup
Make pexels account and get Pexels API key.

Create file `.env.local` with following content

```
VITE_PEXELS_KEY="<your_api_key>"
```