let fragment = document.createElement('div')
fragment.classList.add('second-row', 'events-row','row')

for(const event of events) {
    let card = document.createElement('div')
    card.classList.add('card')
    card.style.width = '18rem'
    if(event.date.substr(0,4) == '2021') {
        card.innerHTML = `<img id="img-1" src="${event.image}" class="card-img-top" alt="card img"/> 
        <h5 class="card-title">${event.name}</h5>
        <div class="card-body">
            <p class="card-text">${event.description}</p>
        </div>
        <div class="bottom">
            <div>price: $${event.price}</div>
            <button type="button" class="btn btn-primary">ver más</button>
        </div>`
        fragment.appendChild(card)
   }
}

console.log(fragment)
let section = document.querySelector('section')
section.appendChild(fragment)