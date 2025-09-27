const imageInput = document.getElementById('imageInput')
const predictButton = document.getElementById('predictButton')
const imagePreview = document.getElementById('imagePreview')
const predictionList = document.getElementById('predictions-list')

// function to handle image upload
imageInput.addEventListener('change',(event)=>{
    const file = event.target.files[0]
    const fileType = file.type
    if(fileType != 'image/jpg' && fileType != 'image/jpeg'){
        alert('Please upload JPG/JPEG supported formats')
        return
    }
    const reader = new FileReader()
    reader.onload = (e) =>{
        imagePreview.src = e.target.result
        imagePreview.style.display = 'block'
        predictButton.disabled = false
        predictionList.innerHTML = "" //clear previous image results
    }
    reader.readAsDataURL(file)
})

// function to handle image prediction
predictButton.addEventListener('click',()=>{
    const file = imageInput.files[0]
    const formData = new FormData()
    formData.append('file', file)
    predictionList.innerHTML = '<li>Predicting....</li>'
    fetch('/predict', {method:'POST',body:formData})
    .then(response => response.json())
    .then(data =>{
        predictionList.innerHTML = ""
        data.forEach(({label, score})=>{
            const li = document.createElement('li')
            li.textContent = `${label}:${Math.round(score * 100)}%`
            predictionList.appendChild(li)
        })
    })
})
