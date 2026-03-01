const CACHE_NAME = 'vmeca-v2';
// 오프라인에서 사용할 파일 목록
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './main.js',
  './icon-192.png',
  './manifest.json'
];

// 1. 설치 단계: 파일 캐싱
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 2. 데이터 요청 가로채기: 오프라인일 때 캐시된 파일 제공
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});