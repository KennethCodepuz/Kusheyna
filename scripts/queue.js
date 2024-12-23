// Function to render the queue
function displayQueue() {
    const orderList = document.getElementById('orderList');
    orderList.innerHTML = ''; // Clear the list before re-rendering

    // Retrieve the queue from localStorage
    const storedQueue = localStorage.getItem('orderQueue');
    const orderQueue = storedQueue ? JSON.parse(storedQueue) : [];

    // Handle empty queue scenario
    if (orderQueue.length === 0) {
        orderList.innerHTML = '<li>No orders in the queue.</li>';
        return;
    }

    // Render each order
    orderQueue.forEach((order, index) => {
        const orderItem = document.createElement('li');
        orderItem.classList.add('order-item');
        orderItem.innerHTML = `
            <strong>Order #${index + 1}</strong>
            <p><strong>Product:</strong> ${order.product}</p>
            <p><strong>Name:</strong> ${order.firstname} ${order.lastname}</p>
            <p><strong>Address:</strong> ${order.address}</p>
            <p><strong>Phone:</strong> ${order.phone}</p>
            <p><strong>Email:</strong> ${order.email}</p>
            <p><strong>Message:</strong> ${order.message}</p>
            <button class="received-btn" data-index="${index}">Order Received</button>
        `;
        orderList.appendChild(orderItem);
    });

    // Attach event listeners to "Order Received" buttons
    document.querySelectorAll('.received-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const orderIndex = event.target.dataset.index;
            removeOrder(orderIndex); // Call removeOrder with the clicked order's index
        });
    });
}

// Function to remove a specific order from the queue
function removeOrder(index) {
    const storedQueue = localStorage.getItem('orderQueue');
    const orderQueue = storedQueue ? JSON.parse(storedQueue) : [];

    if (orderQueue.length === 0) {
        alert('⚠️ No orders in the queue to process.');
        return;
    }

    // Remove the order at the specified index
    orderQueue.splice(index, 1);

    // Save the updated queue back to localStorage
    localStorage.setItem('orderQueue', JSON.stringify(orderQueue));

    alert('✅ Order processed and removed!');
    displayQueue(); // Refresh the queue display
}

// Function to dequeue the first order
function dequeueOrder() {
    const storedQueue = localStorage.getItem('orderQueue');
    const orderQueue = storedQueue ? JSON.parse(storedQueue) : [];

    if (orderQueue.length === 0) {
        alert('⚠️ No orders in the queue to process.');
        return;
    }

    // Dequeue the first order
    orderQueue.shift();

    // Save the updated queue back to localStorage
    localStorage.setItem('orderQueue', JSON.stringify(orderQueue));

    alert('✅ Order processed!');
    displayQueue(); // Refresh the queue display
}

// Function to refresh the queue display
function refreshQueue() {
    displayQueue(); // Simply re-render the queue from localStorage
}

// Function to clear all orders from the queue
function clearQueue() {
    localStorage.removeItem('orderQueue');
    alert('🗑️ All orders have been cleared from the queue.');
    displayQueue(); // Refresh the queue display after clearing
}

// Set up event listeners for the buttons
document.getElementById('dequeueBtn').addEventListener('click', dequeueOrder);
document.getElementById('refreshQueueBtn').addEventListener('click', refreshQueue);
document.getElementById('clearQueueBtn').addEventListener('click', clearQueue);

// Initialize the queue display on page load
document.addEventListener('DOMContentLoaded', displayQueue);
