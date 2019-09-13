let staticCacheName = 'v1';

// The install event to install the service worker in the browser
self.addEventListener('install', e=>{
	e.waitUntil(
		caches.open(staticCacheName).then(cache=>{
			return cache.addAll([
				'./',
				'./index.html',
				'./css/styles.css',
				'./css/cssMedia.css',
				'./js/dbhelper.js',
				'./js/main.js',
				'./js/restaurant_info.js',
				'./data/restaurants.json',
				'./img/1.jpg',
				'./img/2.jpg',
				'./img/3.jpg',
				'./img/4.jpg',
				'./img/5.jpg',
				'./img/6.jpg',
				'./img/7.jpg',
				'./img/8.jpg',
				'./img/9.jpg',
				'./img/10.jpg'
			]);
		})
	);
});

// The activate event, to update the service worker and delete the old cache in the service worker 
self.addEventListener('activate', e=>{
	e.waitUntil(
		caches.keys()
		.then(cacheNames=>{
			return Promise.all(
				cacheNames
				.filter(cacheName=>{
					return cacheName.startsWith('v') &&
							cacheName != staticCacheName;
				})
				.map(cacheName=>{
					return caches.delete(cacheName);
				})
			);
		})
	);
})
// The fetch event to request the caches files from the cache api when the network fall down
self.addEventListener('fetch', e=>{
	e.respondWith(
		caches.match(e.request)
		.then(response=>{
			return response || fetch(e.request);
		})
	);
});