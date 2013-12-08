# event

Event binding component with support for legacy browsers.

Has a cross-browser consistent API by ensuring that:

- event handler receives the target element as it's `this` context
- event handler receives event as it's 1st argument
- `event` object has `.target` assigned
- `event` object has `.preventDefault()` method
- `event` object has `.stopPropagation()` method

## Installation

```
$ component install darsain/event
```

## Example

```js
var evt = require('event');
var el = document.querySelector('body');

evt.bind(el, 'click', callback);
```

## API

### .bind(el, type, callback, [capture])

Bind to `el`'s event `type` with `callback`, returns the `callback` passed.

### .unbind(el, type, callback, [capture])

Unbind `el`'s event `type` `callback`, returns the `callback` passed.

## License

MIT