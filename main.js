
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
          <p>${method.features.map(feature => `<li type="1" class="text-dark-emphasis">${feature}</li>`).join('')}</p>
        </div>
        <div class="card-footer d-flex justify-content-between">
        <div>
        <small class="fw-bold d-block">${method.name}</small>
        <small class="d-inline fw-normal"><i class="m-1 fa-solid fa-calendar-days"></i>${method.published_in}</small>
        </div>
        <div>
        <button onclick="loadDetails('${method.id}')" class="d-inline fw-bold bg-info rounded-circle" data-bs-toggle="modal" data-bs-target="#methodDetailModal"><i class="fa-solid fa-arrow-right"></i></button>
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

//Show All Button
document.getElementById('btn-show-all').addEventListener('click',function(){
    //start loader
     toggleSpinner(true);
     loadAiMethod(12);
})

//Spinner Function
const toggleSpinner = isLoading =>{
  const loaderSection = document.getElementById('loader');
  if(isLoading){
    loaderSection.classList.remove('d-none');
  }
  else{
    loaderSection.classList.add('d-none');
  }
}

//For Details of Each Method
const loadDetails =async (id) =>{
  const url= `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayMethodDetails(data.data);
}

const displayMethodDetails = method =>{
  const feature_names = [];
  for (let feature in method.features) {
      feature_names.push(method.features[feature].feature_name);
  }
  const modalTitle = document.getElementById('methodDetailModalLabel');
  modalTitle.innerText = method.tool_name;

  const methodDetails = document.getElementById('method-details');
  methodDetails.innerHTML = `
    <div class="col">
        <div class="card h-100 bg-danger bg-opacity-10 border-danger">
            <div class="card-body">
                <h5 class="card-title fw-bold">${method.description}</h5>
                <div class="row row-cols-1 row-cols-md-3 g-2 mt-2">
                    <div class="col">
                        <div class="card h-100 bg-white border-0 rounded-4">
                            <div class="card-body px-0">
                                <p class="fw-semibold text-success text-center">
                                    <small>
                                        ${method.pricing ? method.pricing[0].price : 'Free Cost'} <br> 
                                        ${method.pricing ? method.pricing[0].plan : 'Basic'}
                                    </small>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card h-100 bg-white border-0 rounded-4">
                            <div class="card-body px-0">
                                <p class="fw-semibold text-warning text-center">
                                    <small>
                                        ${method.pricing ? method.pricing[1].price : 'Free Cost'} <br> 
                                        ${method.pricing ? method.pricing[1].plan : 'Pro'}
                                    </small>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card h-100 bg-white border-0 rounded-4">
                            <div class="card-body px-0">
                                <p class="fw-semibold text-danger text-center">
                                <small>
                                    ${method.pricing ? method.pricing[2].price : 'Free Cost'} <br> 
                                    ${method.pricing ? method.pricing[2].plan : 'Enterprise'}
                                </small>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-between mt-3">
                    <div>
                        <h5 class="card-title fw-bold">Features</h5>
                        <p>${feature_names.map(feature => `<li class="text-dark-emphasis"><small>${feature}</small></li>`).join('')}</p>
                    </div>
                    <div>
                        <h5 class="card-title fw-bold">Integrations</h5>
                        <p>${method.integrations ? method.integrations.map(integration => `<li class="text-dark-emphasis">
                        <small>${integration}</small></li>`).join('') : `<small class="text-dark-emphasis">No data Found</small>`}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col">
        <div class="card h-100">
            <img src="${method.image_link[0]}" class="m-3 rounded-3 position-relative" alt="...">       
            <button type="button" class="btn btn-danger btn-sm position-absolute top-0 end-0 m-4">${method.accuracy.score * 100}&percnt; accuracy</button>
            <div class="card-body h-25">
                <h5 class="card-title text-center fw-bold">
                    ${method.input_output_examples ? method.input_output_examples[0].input : 'Can you give any example?'}
                </h5>
                <p class="card-text text-center fw-light">
                    ${method.input_output_examples ? method.input_output_examples[0].output : 'No! Not Yet! Take a break!!!'}
                </p>
            </div>
        </div>
    </div>
    `;
}

//sort dates
document.getElementById('sort-button').addEventListener('click',function(){
   

})

loadAiMethod();

// <button type="button" class="btn btn-danger btn-sm">${method.accuracy.score * 100}&percnt; accuracy</button>

