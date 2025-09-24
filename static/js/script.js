const imageInput = document.getElementById('imageInput');
const predictButton = document.getElementById('predictButton');
const imagePreview = document.getElementById('imagePreview');
const predictionList = document.getElementById('prediction-list');

imageInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block';
            predictButton.disabled = false;
            predictionList.innerHTML = ''; // Clear previous results
        };
        reader.readAsDataURL(file);
    } else {
        imagePreview.src = '#';
        imagePreview.style.display = 'none';
        predictButton.disabled = true;
        predictionList.innerHTML = '';
    }
});

predictButton.addEventListener('click', () => {
    const file = imageInput.files[0];
    if (!file) {
        alert('Please select an image first.');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);
    
    // Clear previous results and show a loading message
    predictionList.innerHTML = '<li>Predicting...</li>';

    fetch('/predict', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        predictionList.innerHTML = ''; // Clear loading message
        if (data.error) {
            alert('Error: ' + data.error);
            return;
        }
        data.forEach(result => {
            const li = document.createElement('li');
            li.textContent = `${result.label}: ${Math.round(result.score * 100)}%`;
            predictionList.appendChild(li);
        });
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred during prediction.');
        predictionList.innerHTML = '';
    });
});