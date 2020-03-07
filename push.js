var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BALySy2K6VaIAyi8jLd2XNc_Yz40dKfkSMaJPJk6e7EDFLXzfLHzp-lMIIbbp24IbLfs2lx4Ymx_3gTWqoafCTQ",
   "privateKey": "S3AAQE7TlgTAhalbFUuPfsrB1I8ruPYReIGIcZm1rC8"
};

/*{"publicKey":"BALySy2K6VaIAyi8jLd2XNc_Yz40dKfkSMaJPJk6e7EDFLXzfLHzp-lMIIbbp24IbLfs2lx4Ymx_3gTWqoafCTQ","privateKey":"S3AAQE7TlgTAhalbFUuPfsrB1I8ruPYReIGIcZm1rC8"}*/
 
 
webPush.setVapidDetails(
   'mailto:danny.sntoso@gmail.com',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)


var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/cSVY5Wbb2Gw:APA91bFfn_Ux8CK77xZd0hu8MMp73j214WohEJ2-ww6PDXwMcsu49DxR-bRJxYlXSJCt3Xis7RmKa0Sufc_l3SBoRJxqPutpkTWlfNTlnZnhvj520ul5Jn_nWRHRx2cNFdZFpWFz7vAv",
    "keys": {
        "p256dh": "BLhWbewHymdBskdtUR+gLzWxO+ZZkdvOwTXEXc4UxHsYSALGfDuQ/ecLq0f7UtmtHZVi/qCwpI2L3tUc0BFvmYA=",
        "auth": "1xpmi4A3dhtS/cLyCv98Mg=="
    }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '287366891529',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);