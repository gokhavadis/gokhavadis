const CACHE_NAME = 'meteo-gozlem-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)));
});
    document.getElementById('countdown').innerText = `${days} gün ${hours} saat ${minutes} dk ${seconds} sn`;
}
setInterval(updateCountdown, 1000);
updateCountdown();

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(cacheNames => {
    return Promise.all(cacheNames.map(cache => {
      if (cache !== CACHE_NAME) return caches.delete(cache);
    }));
  }));
});

self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request).then(res => res || fetch(event.request)));
});
<script>
    // 1. Canlı Saat
    function updateClock() {
        const el = document.getElementById('live-clock');
        if (el) el.innerText = new Date().toLocaleTimeString('tr-TR');
    }
    setInterval(updateClock, 1000);

    // 2. Geri Sayım
    function updateCountdown() {
        const targetDate = new Date('2026-06-27T10:00:00').getTime(); // Hedef Tarih
        const now = new Date().getTime();
        const diff = targetDate - now;

        if (diff <= 0) {
            document.getElementById('countdown').innerText = "Sınav Günü Geldi!";
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('countdown').innerText = `${days}g ${hours}s ${minutes}d ${seconds}s`;
    }
    setInterval(updateCountdown, 1000);
    updateCountdown();
</script>
function triggerAlert(message) {
    const toast = document.getElementById('toast-alert');
    const text = document.getElementById('alert-text');
    
    text.innerText = message;
    toast.style.display = 'block'; // Görünür yap
    
    // 5 saniye sonra kendiliğinden kaybolsun
    setTimeout(() => {
        toast.style.display = 'none';
    }, 5000);
}

// ÖRNEK KULLANIM:
// Veri geldiğinde (örneğin rüzgar hızı 50 km/s'yi geçerse)
if (wind_speed > 50) {
    triggerAlert("KRİTİK RÜZGAR HIZI: " + wind_speed + " km/s!");
}
