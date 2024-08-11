// service-worker.js

self.addEventListener('push', function(event) {
    const data = event.data.json();

    const options = {
        body: data.body,
        icon: 'medicine-icon.png',
        vibrate: [200, 100, 200],
        sound: 'notification-sound.mp3'
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});
