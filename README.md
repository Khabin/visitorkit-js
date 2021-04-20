# Visitorkit-JS

### Install SDK

The Visitorkit JavaScript Library is a set of methods attached to a global `visitorkit` object intended to be used by websites wishing to send data to Visitorkit projects. [https://visitorkit.com/docs/](https://visitorkit.com/docs/)

```sh
npm install --save visitorkit
```

```javascript
import VK from "visitorkit";
VK.init("SITE-ID");
```

To disable auto pageview tracking.

```javascript
VK.init("SITE-ID", false);
```

### Events

#### Track conversions

```js
VK.conversion("Sign-Up");
```

#### Track events

```js
VK.event("Started Video");
```

#### Track Pageviews

```js
VK.pageview();
```
