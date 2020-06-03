# Soft Ripple

A small Javascript library to create soft ripple interaction

Check the demos: [here](https://codepen.io/dev_loop/full/KKVKqrq)

## Installation

You can install softripple-js in your project via npm

```
npm install --save softripple-js
```

Or load the ES module directly

```html
<script src="https://unpkg.com/softripple-js/dist/softripple.min.js"></script>
```

## Usage

It's pretty easy to use. Just import the package an declare SoftRipple with the element you want the ripple effect to take place.

```javascript
const rippleEffect = new SoftRipple(el);
```

Also you can add effect to multiple elements at once.

```javascript
const el1 = document.getElementById("el1");
const el2 = document.getElementById("el2");
const rippleEffect = new SoftRipple([el1, el2]);
```

You can also pass in options as the second argument which needs to be an object.

```javascript
const rippleEffect = new SoftRipple(el, { options });
```

## Configuring

To customize the ripple effect you can use the following properties, and then pass them as an object as the second argument of the constructor.

#### rippleColor

A String representing the color of the ripple. Defaults to the background color of the element.

#### transitionDuration

Duration of the transition in seconds. Default is `0.8s`.
minimum is `0.4` seconds and max is `2` seconds.

#### rippleWidth

Width of the ripple. Defaults to `4`.
minimum is `2` and max is `8`.

#### rippleMaxSize

Maximum size of the ripple. Defaults to `100`.
minimum is `50` and max is `200`.

#### randomSize

Boolean property to set random size of the ripples. Default value is `false`.

#### randomColor

Boolean property to set random color of the ripples. Default value is `false`.
