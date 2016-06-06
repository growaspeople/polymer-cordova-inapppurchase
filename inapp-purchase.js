"use strict";

Polymer({
  is: "inapp-purchase",
  extends: "button",
  properties: {
    productid: String,
    // Redirect URL after user successfully buy/subscribe the product
    onSuccessUrl: String
  },
  attached: function() {
    var self = this;
    document.addEventListener("deviceready", function() {
      inAppPurchase.getProducts([ self.productid ]).then(function(products) {
        if (!self.productid) {
          console.error("Attribute `productid` is not defined.");
          return Promise.reject("product_id_undefined");
        }

        if (products.length === 0) {
          return Promise.reject("product_empty");
        }

        alert("Product info received: " + JSON.stringify(products));
      }).catch(function (err) {
        if (err.message === "product_id_undefined") {
          console.error(JSON.stringify(err));
          alert("申し訳ありません。アプリに問題が発生しています。");
        }

        if (err.message === "product_empty") {
          console.error(JSON.stringify(err));
          alert("申し訳ありません。ストアの処理に問題が発生しています。");
        }

        alert("ERROR on product receive: " + JSON.stringify(err));
        self.toggleClass("disabled", true);
      });
    });
  },
  listeners: {
    "tap": "subscribe"
  },
  subscribe: function(e) {
    var self = this;

    self.toggleClass("disabled", true);

    inAppPurchase.subscribe(self.productid).then(function(data) {
      alert("Subscription succeed: " + JSON.stringify(data));

      if (self.onSuccessUrl) {
        location.href = self.onSuccessUrl;
      }
    }).catch(function(err) {
      if (err.code === -5 && err.response === -1005) { // Cancelled
        alert("Cancelled");
        self.toggleClass("disabled", false);
      }

      alert("ERROR on subscription: " + JSON.stringify(err));
    });
  }
});