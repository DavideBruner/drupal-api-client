# drupal-api-client
> A tiny, universal client for the Drupal.org API written in Typescript.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

A node.js module, which provides an object oriented wrapper for the [Drupal.org API](https://www.drupal.org/drupalorg/docs/apis/rest-and-other-apis).

## Features 
- Tiny < 2KB size gzip
- Works in Node.js and in Browser
- Built-in Typescript support

## Installation 🔧
```bash
npm install -S drupal-api-client
or 

yarn add drupal-api-client
```

## Usage ✨

###  Create the Drupal API client
```js
// With ES5
var DrupalApi = require('drupal-api-client');

// With ES6
import DrupalApi from 'drupal-api-client';

// Initialize
var client = new DrupalApi();

client.getNodes().then((data) => {
    console.log(data)
})
```

## Documentation

Can't find what you need in the readme? For more information and some available filtering options check out the official documentation: https://www.drupal.org/drupalorg/docs/apis/rest-and-other-apis

[version-image]: https://img.shields.io/npm/v/drupal-api-client
[version-url]: https://npmjs.org/package/drupal-api-client

[license-image]: https://img.shields.io/npm/l/drupal-api-client
[license-url]: hhttps://github.com/DavideBruner/drupal-api-client/tree/main/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/drupal-api-client
[size-url]: https://github.com/DavideBruner/drupal-api-client/tree/main/dist/index.js

[download-image]: https://img.shields.io/npm/dm/drupal-api-client
[download-url]: https://www.npmjs.com/package/drupal-api-client