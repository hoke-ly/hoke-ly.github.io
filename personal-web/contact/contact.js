const form = document.getElementById('myForm');
const formContainer = document.getElementsByClassName('formContainer')[0];
const successMessage = document.getElementById('successMessage');
const loadingScreen = document.getElementById('loadingScreen');


form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the default form submission
    
    // Show the loading screen
    loadingScreen.classList.remove('hidden');
    formContainer.classList.add('hidden');
    
    


    // Gather the form data
    const formData = new FormData(form);

    // Send the form data using a POST request
    fetch(form.action, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            
            console.log('Form submitted successfully!');
            loadingScreen.innerHTML="<p id='success-message'>Your message has successfully sent to me!<p>";

            setTimeout(() => { 
                loadingScreen.classList.add('hidden');
                formContainer.classList.remove('hidden');
            }, 3000);

            // Get the form fields
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');

            // Clear the form fields
            nameInput.value = '';
            emailInput.value = '';
            messageInput.value = '';

        } else {
            console.error('Error submitting form:', data.error);
            loadingScreen.innerHTML="<p>Error occured!Please try again :(<p>"
        }
    })
    .catch(error => {
        console.error('Error submitting form:', error);
    });
});