import { userCredentials } from "../data/data.js";

// Load stored credentials from localStorage if they exist
if (localStorage.getItem('userCredentials')) {
    const storedCredentials = JSON.parse(localStorage.getItem('userCredentials'));
    // Rebuild the Map from the stored data
    Object.entries(storedCredentials).forEach(([username, password]) => {
        userCredentials.set(username, password);
    });
    console.log("Loaded user credentials from localStorage:", userCredentials);
}

document.querySelector('.login-button').addEventListener('click', () => {
    const usernameField = document.querySelector('.username').value;
    const passwordField = document.querySelector('.password').value;

    // Validate input fields
    if (usernameField === '' || passwordField === '') {
        alert('Please fill in all fields');
        return;
    }

    // Check if the username and password match the stored credentials
    if (userCredentials.has(usernameField) && userCredentials.get(usernameField) === passwordField) {
        localStorage.setItem('loggedInUser', usernameField);
        // Successful login, redirect to index.html
        
        window.location.href = '../html/index.html'; // Redirect to the home page or any page you want
    } else {
        // Invalid credentials
        alert('Incorrect username or password');
    }
});
