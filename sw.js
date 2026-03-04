const CACHE_NAME = 'vmeca-v3.7';
// 오프라인에서 사용할 파일 목록
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './main.js',
  './icon-192.png',
  './manifest.json'
];

// 1. 설치 단계: 파일 캐싱 및 즉시 활성화 대기열 통과
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 2. 활성화 단계: 이전 버전의 쓸모없는 캐시 삭제 및 즉시 제어권 확보
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// 3. 데이터 요청 가로채기: 오프라인일 때 캐시된 파일 제공
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});