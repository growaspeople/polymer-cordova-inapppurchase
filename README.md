# polymer-cordova-inapppurchase

In-App purchase button component for Apache Cordova / Adobe PhoneGap.
This component is based on [cordova-plugin-inapppurchase](https://github.com/AlexDisler/cordova-plugin-inapppurchase).
Works for Android and iOS.

## Install

```shell
$ bower install polymer-cordova-inapppurchase
```

## Usage

```html
<html>
  <head>
    <title>Test</title>
  </head>
  <body>
    <button is="inapp-purchase" productid="product_id">Buy</button>
    <button is="inapp-purchase" productid="subscription_id" subscription="true">Subscribe</button>
  </body>
</html>
```
