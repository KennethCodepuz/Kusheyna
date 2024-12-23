import { userCredentials } from "../data/data.js";

// Check if there are saved username and passwordz  
if (localStorage.getItem('userCredentials')) {
    const storedCredentials = JSON.parse(localStorage.getItem('userCredentials'));
    // Rebuild the Map from the stored data
    Object.entries(storedCredentials).forEach(([username, password]) => {
        userCredentials.set(username, password);
    });
    console.log("Loaded user credentials from localStorage:", userCredentials);
}

document.querySelector('.register-button').addEventListener('click', () => {
    const usernameValue = document.querySelector('.username').value.trim();
    const passwordValue = document.querySelector('.password').value.trim();
    
    if (usernameValue === '' || passwordValue === '') {
        alert('Please fill in all fields');
        return;
    }

    if (userCredentials.has(usernameValue)) {
        alert('Username already exists. Please choose a different one.');
    }else {
        userCredentials.set(usernameValue, passwordValue);
        console.log(userCredentials);
        // Save the Map data to localStorage
        const credentialsObj = Object.fromEntries(userCredentials);
        localStorage.setItem('userCredentials', JSON.stringify(credentialsObj));
        document.querySelector('.username').value = '';
        document.querySelector('.password').value = '';
    }
    
    alert('Registration Successful!');
});
