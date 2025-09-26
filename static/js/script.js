const imageInput = document.getElementById('imageInput');
const predictButton = document.getElementById('predictButton');
const imagePreview = document.getElementById('imagePreview');
const predictionList = document.getElementById('predictions-list');

// helper function to reset UI
const resetUI = () =>{
    imagePreview.src = '#';
    imagePreview.style.display = 'none';
    predictButton.disabled = true;
    predictionList.innerHTML = '';
}
// 1 handle image input
imageInput.addEventListener('change',(event)=>{
    const file = event.target.files[0];
    if(!file){
        resetUI();
        return;
    }
    const reader = new FileReader();
    reader.onload = (e)=>{
        imagePreview.src = reader.target.result;
        imagePreview.style.display = 'block';
        predictButton.disabled = false;
        predictionList.innerHTML = ''; //clear previous results
    }
    reader.readAsDataURL(file);
})

// 2 handle predictions
predictButton.addEventListener('click',()=>{
    const file = imageInput.files[0];
    const formData = new FormData();
    formData.append('file',file)
    predictionList.innerHTML = '<li>Predicting..</li>'
    fetch('/predict',{method:'POST',body:formData})
    .then(response => response.json())
    .then(data=>{
        predictionList.innerHTML = ""
        if(!Array.isArray(data) || data.error){
            throw new Error('Bad data')
        }
        data.forEach(({label,score})=>{
            const li = document.createElement('li')
            li.textContent = `${label}: ${Math.round(score * 100)}%`
            predictionList.appendChild(li)

        })

    })
    .catch(error=>{
        console.error('Prediction error:',error)
        alert("Error in prediction. please try again later")
        predictionList.innerHTML = ''
    })
})

