function displayQueue() {
    const queueContainer = document.getElementById('queueContainer');
    const storedQueue = localStorage.getItem('orderQueue');
    const orderQueue = storedQueue ? JSON.parse(storedQueue) : [];

    if (orderQueue.length === 0) {
        queueContainer.innerHTML = '<p class="empty-message">No orders in the queue.</p>';
        return;
    }

    orderQueue.forEach((order, index) => {
        const orderDiv = document.createElement('div');
        orderDiv.classList.add('order-item');
        orderDiv.innerHTML = `
            <h3>Order #${index + 1}</h3>
            <img src="${order.image}" alt="${order.product}">
            <p><strong>Product:</strong> ${order.product}</p>
            <p><strong>Name:</strong> ${order.firstname} ${order.lastname}</p>
            <p><strong>Address:</strong> ${order.address}</p>
            <p><strong>Phone:</strong> ${order.phone}</p>
            <p><strong>Email:</strong> ${order.email}</p>
            <p><strong>Message:</strong> ${order.message}</p>
        `;
        queueContainer.appendChild(orderDiv);
    });
}

// Call the display function on load
displayQueue();