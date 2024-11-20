// Add an event listener to the Submit button
document.getElementById('submit-button').addEventListener('click', function() {
    // Get the email input value
    const email = document.getElementById('email-input').value.trim();

    // Validate the email input
    if (!email) {
        alert('Please enter an email address.');
        return;
    }

    // Perform some processing (e.g., log or send the email somewhere)
    console.log(`Email submitted: ${email}`);
    alert(`Thank you! The email "${email}" has been submitted.`);

    // Optionally clear the input field after processing
    document.getElementById('email-input').value = '';
});
