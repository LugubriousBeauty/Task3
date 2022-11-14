fetch('https://amazing-events.herokuapp.com/api/events')
    .then(response => response.json())
    .then(webData => {
        ejecutar(webData.events)
    })

function ejecutar(data) {
    let statics = data.filter(event => event.capacity && event.assistance)
    eventsStatics(statics)
    let upcomingEventsStatics = data.filter(event => event.estimate)
    upcomingEvents(upcomingEventsStatics)
    let pastEventsStatics = data.filter(event => event.assistance)
    pastEvents(pastEventsStatics)
}

function eventsStatics(statics) {
    let eventStatics = document.getElementById('events-statics')
    statics = statics.sort((a, b) => b.assistance - a.assistance)
    let highestAssistance = statics[0];
    let lowestAssistance = statics[statics.length - 1]
    statics = statics.sort((a, b) => b.capacity - a.capacity)
    let largestCapacity = statics[0]
    eventStatics.children[0].innerHTML = highestAssistance.name
    eventStatics.children[1].innerHTML = lowestAssistance.name
    eventStatics.children[2].innerHTML = largestCapacity.name
} 

function upcomingEvents(statics) {
    let categoriesRevenues = []
    let categories = [...new Set(statics.map(event => event.category))]
    console.log(categories)
    for (category of categories) {
        let filteredCategories = statics.filter(event => event.category === category);
        let categoryObj = {
            category,
            revenue: 0,
            percentage: 0
        }
        let totalEvents = 0;
        filteredCategories.forEach(event => {
            categoryObj.revenue += event.estimate * event.price
            categoryObj.percentage += (event.estimate * 100) / event.capacity
            totalEvents++;
        })
        categoryObj.percentage = (categoryObj.percentage/totalEvents).toFixed(2)
        categoriesRevenues.push(categoryObj)
    }
    console.log(categoriesRevenues)
    categoriesRevenues.forEach(category => {
        let table = document.querySelector('table')
        let rowCount = table.rows.length;
        let newRow = table.insertRow(5)
        newRow.insertCell(0).innerHTML = category.category
        newRow.insertCell(1).innerHTML = category.revenue
        newRow.insertCell(2).innerHTML = category.percentage
        console.log(rowCount)
    })
}

function pastEvents(statics) {
    let categoriesRevenues = []
    let categories = [...new Set(statics.map(event => event.category))]
    console.log(categories)
    for (category of categories) {
        let filteredCategories = statics.filter(event => event.category === category);
        let categoryObj = {
            category,
            revenue: 0,
            percentage: 0
        }
        let totalEvents = 0;
        filteredCategories.forEach(event => {
            categoryObj.revenue += event.assistance * event.price
            categoryObj.percentage += (event.assistance * 100) / event.capacity
            totalEvents++;
        })
        categoryObj.percentage = (categoryObj.percentage/totalEvents).toFixed(2)
        categoriesRevenues.push(categoryObj)
    }
    console.log(categoriesRevenues)
    categoriesRevenues.forEach(category => {
        let table = document.querySelector('table')
        let rowCount = table.rows.length;
        let newRow = table.insertRow()
        newRow.insertCell(0).innerHTML = category.category
        newRow.insertCell(1).innerHTML = category.revenue
        newRow.insertCell(2).innerHTML = category.percentage
        console.log(rowCount)
    })
}