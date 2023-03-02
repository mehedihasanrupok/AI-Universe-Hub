
const loadAiMethod = async() =>{
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const data = await res.json();
    displayAiMethod(data.data.tools);
}

const displayAiMethod = methods =>{
    // console.log(method);
    const aiMethodContainer = document.getElementById('ai-container');
    methods.forEach(method =>{
        const methodDiv = document.createElement('div');
        methodDiv.classList.add('col');
        methodDiv.innerHTML =`
        <div class="card h-100">
        <img src="${method.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        </div>
        <div class="card-footer">
          <small class="text-muted">Last updated 3 mins ago</small>
        </div>
        </div>
        </div>
        `;
        aiMethodContainer.appendChild(methodDiv);
    })
}
loadAiMethod();