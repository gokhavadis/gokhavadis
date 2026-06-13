const CACHE_NAME = 'meteo-gozlem-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon.svg'
];

// Kurulum aşaması: Dosyaları önbelleğe al
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Güncelleme aşaması: Eski önbelleği temizle
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Veri çekme aşaması: Ağdan veya önbellekten getir
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Önbellekte varsa onu döndür, yoksa internetten çek
        return response || fetch(event.request);
      })
  );
});
// Canlı saat fonksiyonu
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('tr-TR');
    document.getElementById('live-clock').innerText = timeString;
}
setInterval(updateClock, 1000);
updateClock();