// service-worker.js

// Service Workerのインストール
self.addEventListener('install', function(event) {
    console.log('Service Worker Installed');
});

// Service Workerのアクティベーション
self.addEventListener('activate', function(event) {
    console.log('Service Worker Activated');
});
