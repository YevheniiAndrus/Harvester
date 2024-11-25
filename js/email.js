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

document.getElementById('show-emails-button').addEventListener('click', async function(){
    console.log('Client to make request show all the emails')

    try{
        const response = await fetch('https://z0l76y3yr6.execute-api.eu-central-1.amazonaws.com/dev/users', {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json'
            },
        })

        if(!response.ok){
            const errorData = await response.text();
            throw new Error('Error reading DB: ${errorData}');
        }

        const data = await response.json();
        console.log(data)

        const resultsContainer = document.getElementById('results-container');
        resultsContainer.innerHTML = '';

        data.forEach(element => {
            const emailElement = document.createElement('div');
            emailElement.textContent = element.UserEmail;
            resultsContainer.appendChild(emailElement);
        });
    }
    catch(error){
        console.error('Error reading DB: ', error);
        alert('An error occured while reading DB');
    }
});

async function makeRecord(userEmail){
    console.log('Writing user email - ', userEmail)

    try{
        const response = await fetch('https://z0l76y3yr6.execute-api.eu-central-1.amazonaws.com/dev/users',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                UserEmail: userEmail
            })
        });

        if(!response.ok){
            const errorData = await response.text();
            throw new Error('Error making the record: ${errorData}');
        }

        const data = await response.text();
        completeRecord(data);
    }
    catch(error){
        console.error('Error making the record: ', error);
        alert('An error ocurred when making the record:\n${error.message}');
    }
}

function completeRecord(result){
    console.log('Response recieved from API: ', result)
}