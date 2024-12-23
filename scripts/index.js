    // References to modal elements
    const modal = document.getElementById('modal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const buyNowButtons = document.querySelectorAll('.buy-now');
    const modalImage = modal.querySelector('.modal-image');
    const modalProductName = document.getElementById('modalProductName');

    // References to login elements
    const loginButton = document.getElementById('loginButton');

    // Queue Class Definition
    class Queue {
        constructor() {
            this.items = [];
            this.loadFromLocalStorage();
        }

        enqueue(item) {
            this.items.push(item);
            this.saveToLocalStorage();
            console.log(`✅ Order added. Queue size: ${this.size()}`);
        }

        dequeue() {
            if (this.isEmpty()) {
                console.warn('⚠️ Queue is empty!');
                return null;
            }
            const removedItem = this.items.shift();
            this.saveToLocalStorage();
            return removedItem;
        }

        peek() {
            return this.isEmpty() ? null : this.items[0];
        }

        isEmpty() {
            return this.items.length === 0;
        }

        size() {
            return this.items.length;
        }

        getAll() {
            return [...this.items];
        }

        saveToLocalStorage() {
            localStorage.setItem('orderQueue', JSON.stringify(this.items));
        }

        loadFromLocalStorage() {
            const storedQueue = localStorage.getItem('orderQueue');
            if (storedQueue) {
                this.items = JSON.parse(storedQueue);
            }
        }
    }

    // Initialize the order queue
    const orderQueue = new Queue();

    // ✅ **Login Dropdown Logic**
    function handleLoginButton() {
        const loggedInUser = localStorage.getItem('loggedInUser'); // Get the logged-in username

        if (loggedInUser) {
            // If user is logged in, change button to show username and add dropdown menu
            loginButton.innerHTML = `<span class="username-display">${loggedInUser} ▼</span>`;
            loginButton.classList.add('logged-in');

            // Create a dropdown menu for logout
            const dropdownMenu = document.createElement('div');
            dropdownMenu.classList.add('dropdown-menu');
            dropdownMenu.innerHTML = `
                <ul>
                    <li id="logoutOption">Logout</li>
                </ul>
            `;
            loginButton.appendChild(dropdownMenu);

            // Toggle dropdown visibility
            loginButton.addEventListener('click', (event) => {
                dropdownMenu.classList.toggle('visible');
                event.stopPropagation(); // Prevent event bubbling
            });

            // Logout functionality
            document.getElementById('logoutOption').addEventListener('click', () => {
                localStorage.removeItem('loggedInUser'); // Clear user session
                alert('You have been logged out.');
                window.location.reload(); // Refresh the page
            });

            // Close dropdown when clicking outside
            window.addEventListener('click', () => {
                dropdownMenu.classList.remove('visible');
            });
        } else {
            // If no user is logged in, ensure button behaves normally
            loginButton.innerHTML = `<a class="login-link" href="../html/login.html">Log in</a>`;
            loginButton.classList.remove('logged-in');
        }
    }

    // Run login button handler on page load
    handleLoginButton();

    // ✅ **Modal Logic**
    function openModal(event) {
        const button = event.target.closest('.buy-now');
        if (!button) return;

        const imageSrc = button.getAttribute('data-image');
        const productName = button.getAttribute('data-name');

        if (!imageSrc || !productName) {
            console.error('⚠️ Missing product data (image or name).');
            return;
        }

        modalImage.src = imageSrc;
        modalProductName.textContent = productName;

        modal.style.display = 'flex';
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    buyNowButtons.forEach(button => {
        button.addEventListener('click', openModal);
    });

    closeModalBtn.addEventListener('click', closeModal);

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });

    // ✅ **Modal Form Submission Logic**
    const modalForm = document.getElementById('modalForm');

    modalForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = {
            firstname: document.getElementById('firstname').value.trim(),
            lastname: document.getElementById('lastname').value.trim(),
            address: document.getElementById('address').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            email: document.getElementById('email').value.trim(),
            message: document.getElementById('message').value.trim(),
            product: modalProductName.textContent,
            image: modalImage.src
        };

        if (!formData.firstname || !formData.lastname || !formData.address || !formData.phone || !formData.email) {
            alert('⚠️ Please fill in all required fields.');
            return;
        }

        orderQueue.enqueue(formData);
        console.log('✅ Order added to the queue:', formData);

        alert('🎉 Your order has been successfully added to the queue!');
        closeModal();
        modalForm.reset();
    });
