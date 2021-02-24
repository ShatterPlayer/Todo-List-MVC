// serviceworke.rs

const CACHE_VERSION = 'v1.0.2'
const CACHE_NAME = `${registration.scope}!${CACHE_VERSION}`

self.addEventListener('activate', function (event) {
  event.waitUntil(cleanup())
})

self.addEventListener('fetch', function (event) {
  console.log('The service worker is fetching an asset')
  if (event.request.url.startsWith('http')) {
    event.respondWith(fromCacheIfExists(event.request))
    event.waitUntil(update(event.request))
  }
})

function fromCacheIfExists(request) {
  return caches
    .open(CACHE_NAME)
    .then(function (cache) {
      return cache.match(request)
    })
    .then(function (matching) {
      return matching || fetch(request)
    })
}

function update(request) {
  return caches.open(CACHE_NAME).then(function (cache) {
    return fetch(request)
      .then(function (response) {
        return cache.put(request, response)
      })
      .catch(function () {
        console.log(
          'Cache was not updated due to problem with Internet connection'
        )
      })
  })
}

function cleanup() {
  caches.keys().then(function (cachesNames) {
    const cachesToDelete = cachesNames.filter(function (cacheName) {
      return (
        cacheName.startsWith(registration.scope) && cacheName !== CACHE_NAME
      )
    })

    return Promise.all(
      cachesToDelete.map(function (cacheToDelete) {
        return caches.delete(cacheToDelete)
      })
    )
  })
}
