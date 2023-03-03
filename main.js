
const loadAiMethod = async(dataLimit) =>{
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const data = await res.json();
    displayAiMethod(data.data.tools,dataLimit);
}

const displayAiMethod = (methods,dataLimit) =>{
    // console.log(method);
    const aiMethodContainer = document.getElementById('ai-container');
    aiMethodContainer.textContent='';

    //show-all button clicked
    const showAll = document.getElementById('show-all');
    if(dataLimit == 12){
      showAll.classList.add('d-none');
    }
    else{
      methods = methods.slice(0,6);
    }
    
    //Display AI Methods
    methods.forEach(method =>{
        const methodDiv = document.createElement('div');
        methodDiv.classList.add('col');
        methodDiv.innerHTML =`
        <div class="card h-100">
        <img src="${method.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Features</h5>
          <p class="card-text">1.${method.features[0]}<br>2.${method.features[1]}<br>3.${method.features[2]}</p>
        </div>
        <div class="card-footer">
          <small class="fw-bold d-block">${method.name}</small>
          <small class="fw-normal">${method.published_in}</small>
        </div>
        </div>
        </div>
        `;
        aiMethodContainer.appendChild(methodDiv);
    })
}

document.getElementById('btn-show-all').addEventListener('click',function(){
     loadAiMethod(12);
})
loadAiMethod();