[![devDependency Status](https://david-dm.org/bitprice/app/dev-status.svg)](https://david-dm.org/bitprice/app#info=devDependencies) [![Stories in Ready](https://badge.waffle.io/bitprice/app.png?label=ready&title=Ready)](https://waffle.io/bitprice/app)

BitPrice App
============

### The real-time BitPrice.

> **Bitcoin is an innovative payment network and a new kind of money.**
>
> Bitcoin protects consumers from identity theft, makes banking more efficient and accessible, reduces transaction costs, and eliminates the risk of payment fraud.
>
> The Bitcoin network is supported by thousands of companies and millions of users worldwide. Its scarcity is guaranteed by some simple math built into the globally-shared bitcoin software; no more than 21 trillion bits — the primary currency unit — can exist at one time.

[BitPrice.io](http://bitprice.io) uses the [BBB](https://bitpay.com/bitcoin-exchange-rates) to calculate the bit price in real time.

Feedback is appreciated! Message me [@bitjson](https://twitter.com/bitjson). Pull requests welcome.

Developing
----------

You need [Sass](http://sass-lang.com/install). Install and run the watch/reload task:

```sh
$ npm install -g gulp
$ npm install
$ gulp serve
```

### Build & Optimize

```sh
$ gulp
```

Build and optimize the app, ready for deployment. This includes linting as well as image, script, stylesheet and HTML optimization and minification.

### Serve Production Build

```sh
$ gulp serve:dist
```

Serve the optimized and minified version of the app for local testing.

### Performance Insights

```sh
$ gulp pagespeed
```

Runs [bitprice.io](http://bitprice.io) against the [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/) API to stay on top of where we can improve.

### Deploy to gh-pages

```sh
$ gulp deploy
```

This builds for production, then deploys the dist folder to gh-pages.
