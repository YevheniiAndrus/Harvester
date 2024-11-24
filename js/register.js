// Helper function to save data to localStorage
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}
  
// Helper function to get data from localStorage
function getFromStorage(key) {
  return localStorage.getItem(key);
}

async function makeRecord(userName, userAge){
  try{
    const response = await fetch('https://z0l76y3yr6.execute-api.eu-central-1.amazonaws.com/dev/users',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            UserName: userName,
            UserAge: userAge
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
    saveToStorage('name', name);
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
    saveToStorage('age', age);
  
    // Redirect to a "thank you" or final page (optional)
    window.location.href = 'complete.html';
  });
}
  
if(document.getElementById('complete-registration-button')){
  document.getElementById('complete-registration-button').addEventListener('click', function(){
    userName = getFromStorage('name');
    userAge = getFromStorage('age');

    makeRecord(userName, userAge);
    thank_text = document.getElementById('thankyou-message');
    thank_text.textContent = "Please close this page manually";
    document.getElementById('complete-registration-button').hidden = true;
  });
}