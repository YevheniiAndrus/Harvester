// Helper function to save data to localStorage
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}
  
// Helper function to get data from localStorage
function getFromStorage(key) {
  return localStorage.getItem(key);
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
  
    // Collect and display all data (for demonstration)
    const name = getFromStorage('name');
    alert(`Registration Complete! Name: ${name}, Age: ${age}`);
  
    // Redirect to a "thank you" or final page (optional)
    window.location.href = 'complete.html';
  });
}
  
if(document.getElementById('complete-registration-button')){
  document.getElementById('complete-registration-button').addEventListener('click', function(){
    user_name = getFromStorage('name')
    user_age = getFromStorage('age')
    console.log('name: ', user_name, 'age: ', user_age)
  });
}