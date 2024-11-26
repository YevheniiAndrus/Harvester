// Function to populate the container with account rectangles
async function populateAccounts() {
    console.log('Reading accounts from DB')
    const container = document.getElementById('accountsContainer');
    container.innerHTML = ''; // Clear any existing content

    try{
        const response = await fetch('https://z0l76y3yr6.execute-api.eu-central-1.amazonaws.com/dev/users', {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json'
            },
        })

        if(!response.ok){
            const errorData = await response.text();
            console.log("Error while reading DB: ", errorData)
            throw new Error('Error reading DB: ${errorData}');
        }

        const data = await response.json();
        console.log(data)

        data.forEach(account => {
            const accountDiv = document.createElement('div');
            accountDiv.className = 'account';

            userPhotoUrl = getPresignedUrl(account.UserPhoto.PhotoName, 
                                           account.UserPhoto.PhotoType);

            console.log("Got user photo URL: ", userPhotoUrl);
    
            accountDiv.innerHTML = `
                <div class="account-photo">
                    <img src="${userPhotoUrl}" alt="${account.UserName}'s photo" />
                </div>
                <div class="account-name">${account.UserName}</div>
                <div class="account-age">${account.UserAge} years old</div>
            `;

            container.appendChild(accountDiv);
        });
    }
    catch(error){
        console.error('Error reading DB: ', error);
        alert('An error occured while reading DB');
    }
}

async function getPresignedUrl(fileName, fileType){
    console.log("Getting presigned url for ", fileName, "with type ", fileType)
    // Fetch a pre-signed URL from your backend
    const response = await fetch('https://vfqzakeujd.execute-api.eu-central-1.amazonaws.com/dev', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fileName,
            fileType: fileType
        })
    })

    const {uploadUrl, fileUrl} = await response.json();
    return uploadUrl;
}

// Call the function to populate the container
populateAccounts();