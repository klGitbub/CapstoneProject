const plannedTrips = document.querySelector('#PlannedTrips')
const actualTrips = document.querySelector('#ActualTrips')
const plannedSights = document.querySelector('#PlannedSights')
const actualSights = document.querySelector('#ActualSights')

document.getElementById("addPlannedSight").disabled = true;

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
        <h4>${trip['trip_name']}}</h4>
        ${nextTrip ? `<h4>${nextTrip['trip_name']}</h4>` : `<span style="display:none"></span>`}
    </div>`

    return tripElem
}

function getPlannedSights() {
    axios.post('http://127.0.0.1:5432/getplannedsights')
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

//getPlannedTrips()
getPlannedSights()
// Get the button element
var addPlannedTrip = document.getElementById("addPlannedTrip");

// Add an event listener to the button to show the dialog box
addPlannedTrip.addEventListener("click", function() {
  // Create the dialog box
  var dialog = document.createElement("div");
  dialog.style.display = "flex";
  dialog.style.flexDirection = "column";
  dialog.style.alignItems = "center";
  dialog.style.backgroundColor = "white";
  dialog.style.padding = "20px";
  dialog.style.border = "1px solid black";
  
  // Add the three fields
  var field1 = document.createElement("input");
  field1.type = "text";
  field1.placeholder = "Trip Name";
  dialog.appendChild(field1);
  
  var field2 = document.createElement("input");
  field2.type = "date";
  field2.placeholder = "Start Date";
  dialog.appendChild(field2);
  
  var field3 = document.createElement("input");
  field3.type = "date";
  field3.placeholder = "End Date";
  dialog.appendChild(field3);
  
  
  
  
  // Add the save button
  var saveBtn = document.createElement("button");
  saveBtn.innerHTML = "Save";
  dialog.appendChild(saveBtn);
  
  // Show the dialog box
  document.body.appendChild(dialog);
  
  // Add an event listener to the save button to call the REST API
  saveBtn.addEventListener("click", function() {
    var data = {
      field1: field1.value,
      field2: field2.value,
      field3: field3.value
    };

    // Call the REST API
    axios.post("http://127.0.0.1:5432/postplannedtrip", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      // Check the response from the API
      if (response.status === 200) {
        alert("Data saved successfully");
        fetchAndLoadPlannedTrips();
      } else {
        alert("Failed to save data");
      }
      dialog.style.display = "none";
    })
    .catch(error => {
      console.error(error);
    });
    // axios.post('http://127.0.0.1:5432/postplannedtrip', (req, res) => {
    //     let {field1, field2, field3} = JSON.parse(req.body.body);
    //     //alert(field1 + field2 + field3);
    //     console.log(JSON.stringify(req.body))
    //     const sql = `INSERT INTO "public.PlannedTrips" ("TripName", "PlannedStart", "PlannedEnd") VALUES ('${field1}', '${field2}', '${field3}')`;
    //     conn.query(sql, [field1, field2, field3], (err, result) => {
    //       if (err) throw err;
    //       res.send({ id: result.insertId });
    //     });
    // });
  });
  function loadPlannedSights(tripName) {
    alert("Fetch and load the planned sights for trip: " + tripName);
    document.getElementById("addPlannedSight").disabled = false;
  }
  function fetchAndLoadPlannedTrips() {
    alert("Fetching records");
    function createTable() {
        // create a table element
        const table = document.createElement("table");
        alert("table created");

        // create the header row
        const headerRow = document.createElement("tr");
        const field1Header = document.createElement("th");
        field1Header.textContent = "Trip Name";
        headerRow.appendChild(field1Header);
        const field2Header = document.createElement("th");
        field2Header.textContent = "Start Date";
        headerRow.appendChild(field2Header);
        const field3Header = document.createElement("th");
        field3Header.textContent = "End Date";
        headerRow.appendChild(field3Header);
        table.appendChild(headerRow);
        return table;
    }
        // loop through the data and create a row for each record
    function showRow(data) {
        const values = JSON.parse(data);
        const TripName = values.TripName;
        const PlannedStart = values.PlannedStart;
        const PlannedEnd = values.PlannedEnd;
        const row = document.createElement("tr");
        const field1Cell = document.createElement("td");
        field1Cell.textContent = TripName;
        row.appendChild(field1Cell);
        const field2Cell = document.createElement("td");
        field2Cell.textContent = PlannedStart;
        row.appendChild(field2Cell);
        const field3Cell = document.createElement("td");
        field3Cell.textContent = PlannedEnd;
        row.appendChild(field3Cell);
        table.appendChild(row);
        row.addEventListener("click", function() {
            loadPlannedSights(TripName);
        })
    };

    // add the table to the page
    const table = createTable();
    axios.get("http://127.0.0.1:5432/getplannedtrips")
        .then(res => {
            for (let i = 0; i < res.data.length; i += 2) {
                const data = JSON.stringify(res.data[i]);
                showRow(data);
            }
        })
        .catch(err => console.log(err))
        document.body.appendChild(table); 
  }
  
});
