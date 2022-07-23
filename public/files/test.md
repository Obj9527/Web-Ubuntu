# Web Ubuntu

A website simulating Ubuntu's GUI, base on Vue + TailCSS, keep adding new features~

you can access https://obj9527.github.io/ to use it

## Overview

[![gXGJU0.png](https://z3.ax1x.com/2021/05/23/gXGJU0.png)](https://imgtu.com/i/gXGJU0)

ddd
```js
/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}
```

## Why write this
When I saw the big guy's project, I was shocked and want to find another OS write by Vue, but I hate to find a log of icons and images and my favorite OS is Ubuntu, so I do it

## plan
I write it in a week, This is a very crude product, I will keep on doing it,here is the plans blow:
1. file system
2. powerful terminal
3. clock component

## Packages

This website uses these sources:
```
    "@tailwindcss/postcss7-compat": "^2.0.2",
    "autoprefixer": "^9",
    "core-js": "^3.6.5",
    "emailjs-com": "^2.6.4",
    "postcss": "^7",
    "tailwindcss": "npm:@tailwindcss/postcss7-compat@^2.0.2",
    "vue": "^2.6.11",
    "vue-aplayer": "^1.6.1",
    "vue-router": "^3.2.0",
    "vuex": "^3.4.0"
```

Music player is basic on
```
vue-aplayer
```
This project is inspired by:
- [https://github.com/vivek9patel/vivek9patel.github.io](https://github.com/vivek9patel/vivek9patel.github.io)
- [https://github.com/GoodManWEN/GoodManWEN.github.io](https://github.com/GoodManWEN/GoodManWEN.github.io)

## Browsers support