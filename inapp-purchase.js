"use strict";

document.addEventListener("WebComponentsReady", function() {
  Polymer({
    is: "inapp-purchase",
    extends: "button",
    properties: {
      productid: String,
      subscription: {
          type: Boolean,
          value: false
      },

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

          // DEBUG: alert("Product info received: " + JSON.stringify(products));
        }).catch(function (err) {
          if (err.message === "product_id_undefined") {
            console.error(JSON.stringify(err));
            alert("申し訳ありません。アプリに問題が発生しています。");
          }

          if (err.message === "product_empty") {
            console.error(JSON.stringify(err));
            alert("申し訳ありません。ストアの処理に問題が発生しています。");
          }

          alert("申し訳ありません。不明なエラーが発生しました。" /* DEBUG: + JSON.stringify(err) */ );
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

      (self.subscription ? inAppPurchase.subscribe(self.productid) : inAppPurchase.buy(self.productid)).then(function(result) {
        self.fire("paid", { result: result });

        if (self.onSuccessUrl) {
          location.href = self.onSuccessUrl;
        }
      }).catch(function(err) {
        if (err.code === -5 && err.response === -1005) { // Cancelled
          alert("キャンセルされました。");
          self.toggleClass("disabled", false);
        }

        // DEBUG: alert("ERROR on subscription: " + JSON.stringify(err));
      });
    }
  });
});
