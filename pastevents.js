let fragment = document.createElement('div')
fragment.classList.add('second-row', 'events-row','row')

renderizarCartas(data.events)

function renderizarCartas(array) {
    fragment.innerHTML = ''
    if(!array.length) {
        fragment.innerHTML =`<h3 style="text-align: center">No hay eventos que coincidan con el criterio de búsqueda</h3>`
    } else {
        array.forEach(event => {
            if(event.date < data.currentDate) {
                let card = document.createElement('div')
                card.classList.add('card')
                card.style.width = '18rem'
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
            } else {
                return;
            }
        })
    }
}

console.log(fragment)
let section = document.querySelector('section')
section.appendChild(fragment)

let checksContainer = document.querySelector('.checks')


let count = 1;
data.events.forEach(event => {
    if((Array.from(checksContainer.children)).find(c => c.outerText === event.category)) {
        return;
    }
    let check = document.createElement('div')
    check.classList.add('form-check', 'form-check-inline')
    check.innerHTML = `<input class="form-check-input" type="checkbox" id="checkbox${count}" value="id${event._id}">
                       <label class="form-check-label" for="checkbox${count}">${event.category}</label>`
    checksContainer.appendChild(check)
    count++;
})

function filtrarTexto(array, texto) {
    if(texto.length) {
        cartasFiltradas = array.filter(event => (event.name).toLowerCase().includes(texto.toLowerCase()) || (event.description).toLowerCase().includes(texto.toLowerCase()))
        console.log(cartasFiltradas)
        return cartasFiltradas
    } 
    return array
}

function filtrarCategoria(array, texto) {
    cartasFiltradas = array.filter(event => (event.category).toLowerCase().includes(texto.toLowerCase()))
    console.log(cartasFiltradas)
    return cartasFiltradas
} 


function limpiarFiltro(array, texto) {
    eliminarFiltro = array.filter(event => (event.category).toLowerCase() !== texto.toLowerCase())
    return eliminarFiltro;
}

let filtradasPorCat = [];
let noFiltradas = data.events.filter(event => event.date < data.currentDate)

const formulario = document.querySelector('.index-form');  

formulario.addEventListener('submit', e => {
    e.preventDefault()
    let texto = e.target[0].value;
    let filtradasTexto;
    if(filtradasPorCat.length) {
        filtradasTexto = filtrarTexto(filtradasPorCat, texto)
    } else {
        filtradasTexto = filtrarTexto(noFiltradas, texto)
    }
    renderizarCartas(filtradasTexto)
})

const checks = document.querySelectorAll(".form-check")
console.log([checks])
checks.forEach(check => {
    check.addEventListener('change', () => {
        if(check.children[0].checked) {
            let texto = check.children[1].textContent
            filtradasPorCat = filtradasPorCat.concat(filtrarCategoria(noFiltradas, texto))
            renderizarCartas(filtradasPorCat)
        } else {
            let texto = check.children[1].textContent
            filtradasPorCat = limpiarFiltro(filtradasPorCat, texto)
            if(!filtradasPorCat.length) {
                renderizarCartas(data.events)
            } else {
                renderizarCartas(filtradasPorCat)
            }
        }
    })
}) 