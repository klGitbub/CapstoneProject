const plannedTrips = document.querySelector('#PlannedTrips')
const actualTrips = document.querySelector('#ActualTrips')
const plannedSights = document.querySelector('#PlannedSights')
const actualSights = document.querySelector('#ActualSights')

function createDisplayDate(date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const reqDate = new Date(date)
    const reqDateDisplay = reqDate.toLocaleDateString('en-US', options)
    const reqTime = reqDate.toLocaleTimeString('en-US')
    const timeDisplay = reqTime.slice(0, -6)
    const timeOfDay = reqTime.slice(-2)
    return `${reqDateDisplay} ${timeDisplay} ${timeOfDay}`
}

function makePlannedTrip(trip) {
    const dateDisplayText = createDisplayDate(trip.date)

    const tripElem = 
    `<div class="card" id="trip-${trip['trip_id']}">
        <h2>${dateDisplayText}</h2>
        <h3>${trip['trip-name']}</h3>
        <p>${trip.PlannedStart}</p>
        <p>${trip.PlannedEnd}</p>
    </div>`

    return tripElem
}

function createPlannedTrip(trip, nextTrip) {
    const dateDisplayText = createDisplayDate(trip.date)

    const tripElem = 
    `<div class="card" id="trip-${trip['trip_id']}">
        <h2>${dateDisplayText}</h2>
        <h3>${trip['trip_id']}</h3>
        <h4>${appt['trip_name']}}</h4>
        ${nextTrip ? `<h4>${nextTrip['trip_name']}</h4>` : `<span style="display:none"></span>`}
    </div>`

    return tripElem
}

function getPlannedSights() {
    axios.get('postgresql://klGitbub:v2_3yuUN_Tn3M4FyY3MXaAuDbYqpfn93@db.bit.io:5432/klGitbub/CapstoneProject')
    .then(res => {
        for (let i = 0; i < res.data.length; i += 2) {
            const trip = res.data[i]
            const tripElem = makeSiteToVisit(trip)
            plannedSights.innerHTML += tripElem    
        }
    })
    .catch(err => console.log(err))
}

function createPlannedSight(sight, nextSight) {
    const dateDisplayText = createDisplayDate(sight.date)

    const sightElem = 
    `<div class="card" id="sight-${trip['sight_id']}">
        <h2>${dateDisplayText}</h2>
        <h3>${sight['sight_id']}</h3>
        <h4>${sight['sight_name']}}</h4>
        ${nextTrip ? `<h4>${nextTrip['trip_name']}</h4>` : `<span style="display:none"></span>`}
    </div>`

    return sightElem
}

getPlannedSights()
getPlannedSights()
