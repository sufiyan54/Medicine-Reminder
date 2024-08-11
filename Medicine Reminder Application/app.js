// app.js

// Event listener for form submission
document.getElementById('reminder-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const medicineName = document.getElementById('medicine-name').value;
    const reminderTime = document.getElementById('reminder-time').value;

    // Calculate time until reminder
    const now = new Date();
    const reminderDateTime = new Date();
    const [hours, minutes] = reminderTime.split(':');
    reminderDateTime.setHours(hours, minutes, 0, 0);

    const timeUntilReminder = reminderDateTime.getTime() - now.getTime();

    // Schedule the notification
    if (timeUntilReminder >= 0) {
        setTimeout(() => {
            showNotification(medicineName);
        }, timeUntilReminder);
    }
});

function showNotification(medicineName) {
    if (Notification.permission === 'granted') {
        const notification = new Notification(`Time to take your medicine: ${medicineName}`, {
            icon: 'medicine-icon.png',
            body: 'Please take your medicine on time.',
        });

        // Play notification sound
        const audio = new Audio('notification-sound.mp3');
        audio.play();
    }
}

// Request permission for notifications
if (Notification.permission !== 'granted') {
    Notification.requestPermission();
}
// Registering service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
    .then(function(registration) {
        console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch(function(error) {
        console.log('Service Worker registration failed:', error);
    });
}
