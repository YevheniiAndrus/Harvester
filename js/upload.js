document.getElementById('upload-button').addEventListener('click', async () => {
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

        statusMessage.textContent = 'File uploaded succesfully! File URL: ${fileUrl}'
        
    } catch (error) {
        console.error(error);
        statusMessage.textContent = "Error: " + error.message;
    }
});