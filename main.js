
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


      //chilo <p class="card-text"></p> ;;0.${features.join('<br>')}  1.${method.features[0]}<br>2.${method.features[1]}<br>3.${method.features[2]}

        methodDiv.classList.add('col');
        methodDiv.innerHTML =`
        <div class="card h-100">
        <img src="${method.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Features</h5>
          <p>${method.features.map(feature => `<li type="1" class="text-dark-emphasis">${feature}</li>`).join('')}</p>
        </div>
        <div class="card-footer d-flex justify-content-between">
        <div>
        <small class="fw-bold d-block">${method.name}</small>
        <small class="d-inline fw-normal"><i class="m-1 fa-solid fa-calendar-days"></i>${method.published_in}</small>
        </div>
        <div>
        <button class="d-inline fw-bold bg-info rounded-circle"><i class="fa-solid fa-arrow-right"></i></button>
        </div>
        </div>
        
        </div>
        </div>
        `;
        aiMethodContainer.appendChild(methodDiv);
    });
    //stop loader
    toggleSpinner(false);

}

document.getElementById('btn-show-all').addEventListener('click',function(){
    //start loader
     toggleSpinner(true);
     loadAiMethod(12);
})

const toggleSpinner = isLoading =>{
  const loaderSection = document.getElementById('loader');
  if(isLoading){
    loaderSection.classList.remove('d-none');
  }
  else{
    loaderSection.classList.add('d-none');
  }
}
loadAiMethod();