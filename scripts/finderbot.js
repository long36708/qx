/******************************

 脚本功能：FindAir
 下载地址：https://apps.apple.com/us/app/find-air-%E6%9F%A5%E6%89%BE%E6%88%91%E7%9A%84%E8%AE%BE%E5%A4%87/id1507917112?l=zh-Hans-CN
 软件版本：1.1.4
 脚本作者：LongMo💞
 更新时间：2024-9-22
 使用声明：此脚本仅供学习与交流，请勿转载与贩卖！⚠️⚠️⚠️
 https://airpurchase.airapps.co:43002/v1/firstrunV2
 *******************************


 [rewrite_local]

 ^https?:\/\/api\.revenuecat\.com\/.+\/(receipts$|subscribers\/?(.*?)*$) url script-response-body https://raw.githubusercontent.com/long36708/qx/refs/heads/main/scripts/finderbot.js

 ^https?:\/\/api\.revenuecat\.com\/.+\/(receipts$|subscribers\/?(.*?)*$) url script-request-header https://raw.githubusercontent.com/long36708/qx/refs/heads/main/scripts/finderbot.js

 ^https?:\/\/airpurchase.airapps\.co\/.+\/v1/(firstrunV2|validate-receipt) url script-response-body https://raw.githubusercontent.com/long36708/qx/refs/heads/main/scripts/finderbot.js
 [mitm]

 hostname = api.revenuecat.com, airpurchase.airapps.co

 *******************************/
const longmo = {};
const longmo666 = JSON.parse(typeof $response != "undefined" && $response.body || null);

const name = "Pro";
const appid = "co.airapps.finderbot.year";

var url = $request.url;

const validateUrl = '/validate-receipt'
const firstrunV2Url='/firstrunV2'

if (url.indexOf(validateUrl) != -1) {

}else if(url.indexOf(firstrunV2Url) != -1){
    longmo666.subscriptionStatus = 0;
    longmo666.expirationDate= 99999999999
}else if (typeof $response == "undefined") {
    delete $request.headers["x-revenuecat-etag"];
    delete $request.headers["X-RevenueCat-ETag"];

    longmo.headers = $request.headers;
} else if (longmo666 && longmo666.subscriber) {
    data = {
        "expires_date": "9999-09-09T09:09:09Z",
        "original_purchase_date": "2023-02-23T02:33:33Z",
        "purchase_date": "2023-02-23T02:33:33Z",
        "ownership_type": "PURCHASED",
        "store": "app_store"
    };

    longmo666.subscriber.subscriptions[(appid)] = data
    longmo666.subscriber.entitlements[(name)] = JSON.parse(JSON.stringify(data));
    longmo666.subscriber.entitlements[(name)].product_identifier = (appid);
    longmo.body = JSON.stringify(py997);
}
console.log(JSON.stringify(longmo))
$done(longmo);
