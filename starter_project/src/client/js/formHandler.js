const serverURL = 'http://localhost:8000/api'

// Add listener
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('urlForm').addEventListener('submit', handleSubmit);
});

// Export the handleSubmit function
export async function handleSubmit(event) {
    event.preventDefault();

    // Get the URL from the input field
    const formText = document.getElementById('name').value;

    // Check if the URL is valid
    if(!validateUrl(formText)) {
        console.error('Invalid url: ', formText);
        alert("Please enter a valid url then try again");
        return;
    }
    
    // If the URL is valid, send it to the server using the serverURL constant above
    enableSubmitButton(false);
    await sendToServer(formText);
    enableSubmitButton(true);
}

// Function to send data to the server
export async function sendToServer(url) {
    if(!url || url.trim() === "") {
        console.error("The text variable is null or empty.");
        return;
    }

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ 'url': url})
    };
    // console.log('requestOptions', requestOptions);

    // disable submit button


    try {
        // Send rquest
        const response = await fetch(serverURL, requestOptions);
        // console.log(response);

        // check response
        if(!response.ok) {
            // throw new Error(`Ressponse status: ${response.statusText}`);
        }

        // response ok. update view
        updateView(await response.json());

    } catch(e) {
        console.error('Failed to process the request.! ', e);
        alert('Failed to process the request!', e);
    }
}


// Function to validate input form value
export function validateUrl(url) {
    try {
        new URL(url);
        return true;
    }
    catch(e) {
        return false;
        
    }
}

// Function to upldate View
export function updateView(data) {
    console.log(data);
    document.getElementById('outModel').innerHTML = `Model: ${data.model}`;
    document.getElementById('outSubjectivity').innerHTML = `Subjectivity: ${data.subjectivity}`;
    document.getElementById('outAgreement').innerHTML = `Agreement: ${data.agreement}`;
    // Use more details data for future function...
    // outConcept.innerHTML = `Concept: ${data.concept}`;
    // outDetails.innerHTML = `Details response: ${JSON.stringify(data)}`;
}

export function enableSubmitButton(enable) {
    const submitButton = document.getElementById('submitButton');
    if(enable) {
        submitButton.disabled = false;
        submitButton.classList.remove('disabled');
        submitButton.textContent = 'Submit';
    } else {
        submitButton.disabled = true;
        submitButton.classList.add('disabled');
        submitButton.textContent = 'Processing...';
    }
}