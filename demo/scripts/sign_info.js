"use strict";

module.exports = function(ctx) {
  const fs = ctx.requireCordovaModule("fs"),
    path = ctx.requireCordovaModule("path"),

    releaseSigningFile = path.join(ctx.opts.projectRoot, "platforms/android/release-signing.properties"),
    content = "storeFile=" + process.env["HOME"] + "/.credentials/android/inapp-purchase.keystore\nstoreType=jks\nkeyAlias=inAppPurchase";

  return new Promise(function(resolve, reject) {
    fs.writeFile(releaseSigningFile, content , function (err) {
        if (err) {
          reject(err);
          return;
        }

        resolve();
    });
  })
};
