// Add an event listener to the Submit button
document.getElementById('submit-button').addEventListener('click', function() {
    // Get the email input value
    const email = document.getElementById('email-input').value.trim();

    // Validate the email input
    if (!email) {
        alert('Please enter an email address.');
        return;
    }

    makeRecord(email)

    // Perform some processing (e.g., log or send the email somewhere)
    console.log(`Email submitted: ${email}`);
    alert(`Thank you! The email "${email}" has been submitted.`);

    // Optionally clear the input field after processing
    document.getElementById('email-input').value = '';
});

function makeRecord(userEmail){
    $.ajax({
        method: 'POST',
        url: _config.api.invokeUrl + '/users',
        data: JSON.stringify({
            UserEmail: userEmail
        }),
        contentType: 'application/json',
        success: completeRecord,
        error: function ajaxError(jqXHR, textStatus, errorThrown) {
            console.error('Error making the record: ', textStatus, ', Details: ', errorThrown);
            console.error('Response: ', jqXHR.responseText);
            alert('An error occured when making the record:\n' + jqXHR.responseText);
        }
    })
}

function completeRecord(result){
    console.log('Response recieved from API: ', result)
}