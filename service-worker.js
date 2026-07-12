// 旧サイトが登録していた Service Worker の後始末用キルスイッチ。
// 旧 SW はキャッシュファーストだったため、このファイルを残して
// 「キャッシュ全削除 → 自身を解除 → ページ再読込」だけを行う。
// (URL を消すと旧 SW の更新チェックが失敗し、古いキャッシュが残り続ける)
self.addEventListener('install', function (e) {
    self.skipWaiting();
});

self.addEventListener('activate', function (e) {
    e.waitUntil(
        caches.keys()
            .then(function (keys) {
                return Promise.all(keys.map(function (key) { return caches.delete(key); }));
            })
            .then(function () { return self.registration.unregister(); })
            .then(function () { return self.clients.matchAll({ type: 'window' }); })
            .then(function (clients) {
                clients.forEach(function (client) { client.navigate(client.url); });
            })
    );
});
