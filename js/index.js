let data
fetch('https://amazing-events.herokuapp.com/api/events')
    .then(response => response.json())
    .then(webData => {
        data = webData
        ejecutar(data)
    })

function ejecutar(data) {
    let filtradasTexto = data.events
    let filtradasCategoria = []
    renderizarCartas(data.events)
    createCheckboxes(data)
    inputEventListener(filtradasTexto, filtradasCategoria, data)
    checkboxEventListener(filtradasCategoria, filtradasTexto, data)
}


let fragment = document.createElement('div')
fragment.classList.add('second-row', 'row')



function renderizarCartas(array) {
    fragment.innerHTML = ''
    if(!array.length) {
        fragment.innerHTML = `<h3 style="text-align: center; align-self: center">No hay eventos que coincidan con el criterio de búsqueda</h3>`
    } else {
        array.forEach(event => {
            let card = document.createElement('div')
            card.classList.add('card')
            card.setAttribute('id', event._id)
            card.style.width = '18rem'
            card.innerHTML = `<img id="img-1" src="${event.image}" class="card-img-top" alt="card img"/> 
            <h5 class="card-title">${event.name}</h5>
            <div class="card-body">
                <p class="card-text">${event.description}</p>
            </div>
            <div class="bottom">
                <div>price: $${event.price}</div>
                <a href="./details.html?id=${event._id}" type="button" class="btn btn-primary" >more details</a>
            </div>`
            fragment.appendChild(card)
        })
    }
}


console.log(fragment)
let section = document.querySelector('section')
section.appendChild(fragment)

let checksContainer = document.querySelector('.checks')


let count = 1;
function createCheckboxes(data) {
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
}




function filtrarTexto(array, texto) {
    cartasFiltradas = array.filter(event => (event.name).toLowerCase().includes(texto.toLowerCase()) || (event.description).toLowerCase().includes(texto.toLowerCase()))
    console.log(cartasFiltradas)
    return cartasFiltradas
}

function filtrarCategoria(array, texto) {
    cartasFiltradas = array.filter(event => (event.category).toLowerCase().includes(texto.toLowerCase()))
    console.log(cartasFiltradas)
    return cartasFiltradas
} 

function filtrarTodo(filtradasTexto, filtradasCategoria) {
    let filtradas;
    if(!filtradasTexto.length && !filtradasCategoria.length) {
        filtradas = []
    } else if(!filtradasCategoria.length) {
        filtradas = filtradasTexto
    } else if (!filtradasTexto.length) {
        filtradas = filtradasCategoria
    } else {
        filtradas = filtradasCategoria.filter(evento => filtradasTexto.includes(evento))
    }
    renderizarCartas(filtradas)
}


function limpiarFiltro(array, texto) {
    let eliminarFiltro = array.filter(event => (event.category).toLowerCase() !== texto.toLowerCase())
    return eliminarFiltro;
}




function inputEventListener(filtradasTexto, filtradasCategoria, data) {
    const input = document.querySelector('.form-control');  
    input.addEventListener('keyup', (e) => {
    let texto = e.target.value
    filtradasTexto = filtrarTexto(data.events, texto)
    filtrarTodo(filtradasTexto, filtradasCategoria)
    })
}

function checkboxEventListener(filtradasCategoria, filtradasTexto, data) {
    const checks = document.querySelectorAll(".form-check")
    console.log([checks])
    checks.forEach(check => {
    check.addEventListener('change', () => {
        if(check.children[0].checked) {
            let texto = check.children[1].textContent
            filtradasCategoria = filtradasCategoria.concat(filtrarCategoria(data.events, texto))
        } else {
            let texto = check.children[1].textContent
            filtradasCategoria = limpiarFiltro(filtradasCategoria, texto)
        }
        filtrarTodo(filtradasTexto, filtradasCategoria)
    })
})  
}









