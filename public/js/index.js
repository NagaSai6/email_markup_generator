const form = document.getElementById('client_form');

form.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  // Retrieve input values
  const inputs = document.querySelectorAll('.form-control');
  const inputValues = Array.from(inputs).map(input => input.value).filter(value => value !== "" && value !== undefined && value !== null);

  if(inputValues.length <1){
    alert('Atleast one VA profile ID needed');
    return;
  }

  // Do something with the input values
 sendDataToBackend(inputValues);


});


function sendDataToBackend(profileIds){
     // Create an XMLHttpRequest object
     console.log(profileIds)
  const xhr = new XMLHttpRequest();

  // Set up the request
  // https://email-template-generator.onrender.com/email-template-generator/form-data
  // http://localhost:3000/email-template-generator/form-data
  xhr.open('POST', 'https://email-template-generator.onrender.com/email-template-generator/form-data', true);
  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 400) {
      // Success response
      console.log('API response:', xhr.responseText);

      let code_holder = document.getElementById('html_code');
      const copyButton = document.getElementById('copyButton');
      code_holder.innerHTML = xhr.responseText;
      code_holder.style.display = 'block';
      copyButton.style.display = 'block';
      copyCode();
    } else {
      // Error response
      console.error('API request failed');
      alert("Failed try again - if persists Report")
    }
  };

  const payload = JSON.stringify(profileIds);
  xhr.send(payload);

}


function copyCode(){
  const copyButton = document.getElementById('copyButton');
const myTextArea = document.getElementById('html_code');

copyButton.addEventListener('click', () => {
  // Select the text in the text area
  myTextArea.select();
  myTextArea.setSelectionRange(0, 99999); // For mobile devices

  navigator.clipboard.writeText(myTextArea.value)
  .then(() => {
    // Update the button text
    copyButton.innerText = 'Copied!';
  })
  .catch((error) => {
    console.error('Failed to copy text: ', error);
  });
 
});
}