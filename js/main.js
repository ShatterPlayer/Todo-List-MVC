const app = new Controller(new Model(), new View())

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker
      .register('/Todo-List-MVC/service-worker.js', {
        scope: '/Todo-List-MVC/',
      })
      .then(
        function (registration) {
          // Registration was successful
          console.log(
            'ServiceWorker registration successful with scope: ',
            registration.scope
          )
        },
        function (err) {
          // registration failed :(
          console.log('ServiceWorker registration failed: ', err)
        }
      )
  })
}
