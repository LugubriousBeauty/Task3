const id = parseInt(new URLSearchParams(location.search).get('id'))
/* <div class="row g-0">
          <div class="col-md-4">
            <img src="..." class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            </div>
          </div>
</div> */

/*  */
let dataCard = data.events.find(event => event._id === id)
let container = document.querySelector('.card')
let card = document.createElement('div')
card.classList.add('row', 'g-0')
card.innerHTML = 
`<div class="det-img col-md-4">
    <img src="${dataCard.image}" class="img-fluid rounded-start" alt="...">
</div>
<div class="col-md-8">
    <div class="card-body">
        <h5 class="card-title">${dataCard.name}</h5>
        <p class="card-text">date: ${dataCard.date}</p>
        <p class="card-text" style="font-weight: bold">${dataCard.description}</p>
        <p class="card-text">category: ${dataCard.category}</p>
        <p class="card-text">place: ${dataCard.place}</p>
        <p class="card-text">capacity: ${dataCard.capacity}</p>
        <p class="card-text">assistance: ${dataCard.assistance}</p>
        <p class="card-text">price: ${dataCard.price}</p>
    </div>
</div>`
container.appendChild(card)