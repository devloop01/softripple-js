# Soft Ripple

A small Javascript library to create soft ripple interaction

Check the demos: here

## Installation

You can install softripple-js in your project via npm

```
npm install --save softripple-js
```

Or load the ES module directly

```html
<script src="https://unpkg.com/soft-ripple-js/dist/softripple.min.js"></script>
```

## Usage

It's pretty easy to use. Just import the package an declare the SoftRipple class with the element that should have the ripple effect.

```javascript
const rippleEffect = new SoftRipple(el);
```

you can also pass in an array of elements instead of passing a single element.

```javascript
const el1 = document.querySelector("#el1");
const el2 = document.querySelector("#el2");
const rippleEffect = new SoftRipple([el1, el2]);
```

## Configuring

To customize the ripple effect you can use the following properties, and then pass in them as an object as the second argument of the constructor.

#### rippleColor

A String representing the color of the ripple. Defaults to the background color of the element.

#### transitionDuration

Duration of the transition in seconds. Default is `0.8s`.
minimum is `0.4` seconds and max is `2` seconds.

#### rippleWidth,

Width of the ripple. Defaults to `4`.
minimum is `2` and max is `8`.

#### rippleMaxSize,

Maximum size of the ripple. Defaults to `100`.
minimum is `50` and max is `200`.

#### randomSize

Boolean property to set random size of the ripples. Default value is `false`.
