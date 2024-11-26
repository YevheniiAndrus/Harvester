import { User } from "./user";

userToRegister = new User();

async function makeUserRecord(){
  try{
    userName = userToRegister.userName();
    userAge = userToRegister.userAge();
    userUrl = userToRegister.userUrl();

    console.log("Make record for user: ", 
      userName,
      userAge,
      userUrl);

    const response = await fetch('https://z0l76y3yr6.execute-api.eu-central-1.amazonaws.com/dev/users',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            UserName: userName,
            UserAge: userAge,
            UserUrl: userUrl
        })
    });

    if(!response.ok){
        const errorData = await response.text();
        console.log("Error recieved: ", errorData);
        throw new Error('Error making the record: ${errorData}');
    }

    const data = await response.text();
    console.log("Response recieved: ", data)
}
catch(error){
    console.error('Error making the record: ', error);
    alert('An error ocurred when making the record:\n${error.message}');
}
}
  
// Step 1: Handle the "Next" button click on step 1
if (document.getElementById('next-name-button')) {
  document.getElementById('next-name-button').addEventListener('click', function () {
    console.log('Click on the next button')
    const name = document.getElementById('name').value;
    if (name.trim() === '') {
      alert('Please enter your name.');
      return;
    }
    userToRegister.addUserName(name);
    // Redirect to step 2
    window.location.href = 'age.html';
  });
}
  
// Step 2: Handle the "Finish" button click on step 2
if (document.getElementById('next-age-button')) {
  document.getElementById('next-age-button').addEventListener('click', function () {
    const age = document.getElementById('age').value;
    if (age.trim() === '' || isNaN(age) || age <= 0) {
      alert('Please enter a valid age.');
      return;
    }
    userToRegister.addUserAge(age);
  
    // Redirect to a "thank you" or final page (optional)
    window.location.href = 'photo.html';
  });
}

// Step 3: Handle uploading photo to S3 bucket
if(document.getElementById('upload-photo-button')){
  document.getElementById('upload-photo-button').addEventListener('click', async () => {
    const fileInput = document.getElementById('file-input');
    const statusMessage = document.getElementById('status-message');

    if (!fileInput.files[0]) {
        statusMessage.textContent = "Please select a file.";
        return;
    }

    const file = fileInput.files[0];
    const fileName = encodeURIComponent(file.name);

    try {
        // Fetch a pre-signed URL from your backend
        const response = await fetch('https://vfqzakeujd.execute-api.eu-central-1.amazonaws.com/dev', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fileName,
                fileType: file.type
            })
        })

        if (!response.ok) throw new Error("Failed to get pre-signed URL.");

        const {uploadUrl, fileUrl} = await response.json();

        const uploadResponse = await fetch(uploadUrl, {
            method: 'PUT',
            headers: {'Content-Type': file.type},
            body: file
        });

        if (!uploadResponse.ok) throw new Error("File upload failed.");

        userToRegister.addUrl(uploadUrl)
        statusMessage.textContent = 'File uploaded succesfully! File URL: ${fileUrl}'

        window.location.href = 'complete.html';
        
    } catch (error) {
        console.error(error);
        statusMessage.textContent = "Error: " + error.message;
    }
});
}
  
if(document.getElementById('complete-registration-button')){
  document.getElementById('complete-registration-button').addEventListener('click', function(){

    makeUserRecord();
    thank_text = document.getElementById('thankyou-message');
    thank_text.textContent = "Please close this page manually";
    document.getElementById('complete-registration-button').hidden = true;
  });
}