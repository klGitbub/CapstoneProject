// require('dotenv').config()
// const {CONNECTION_STRING} = process.env

// const Sequelize = require('sequelize')

// const sequelize = new Sequelize(CONNECTION_STRING, {
//     dialect: 'postgres',
//     dialectOptions: {
//         ssl: {
//             rejectUnauthorized: false
//         }
//     }
// })

// module.exports = {
//     getPlannedTrips: (req, res) => {
//         sequelize.query(`
//         SELECT * FROM PlannedTrips
//         order by PlannedStart ASC;
//         `)
//         .then(dbRes => res.status(200).send(dbRes[0]))
//         .catch(err => console.log(err))
//     },
//     postPlannedTrip: (req, res) => {
//         let {PlannedStart, PlannedEnd, TripName} = req.body;
//         sequelize.query(`
//         INSERT INTO PlannedTrips
//         SET TripName = '${TripName}',
//         PlannedStart = '${PlannedStart}',
//         plannedEnd = '${PlannedEnd}',
//         `)
//         .then(() => res.sendStatus(200))
//         .catch(err => console.log(err))
//     },
//     getPlannedSights: (req, res) => {
//         sequelize.query(`
//         SELECT * FROM PlannedSights
//         ORDER BY PlannedStart ASC;
//         `)
//         .then(dbRes => res.status(200).send(dbRes[0]))
//         .catch(err => console.log(err))
//     },
//     postPlannedSight: (req, res) => {
//         let {PlannedName, SightName, PlannedVisit} = req.body;
//         sequelize.query(`
//         INSERT INTO PlannedSights
//         SET PlannedName = '${PlannedName}',
//         SightName = '${SightName}',
//         PlannedVisit = '${PlannedVisit}',
//         `)
//         .then(() => res.sendStatus(200))
//         .catch(err => console.log(err))
//     }
// }
require('dotenv').config()
const {CONNECTION_STRING} = process.env

const Sequelize = require('sequelize');

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

let nextEmp = 5

module.exports = {
    getPlannedTrips: (req, res) => {
        sequelize.query(`select * from PlannedTrips
                         order by StartDate ASC;`)
            .then(dbRes => res.status(200).send(dbRes[0]))
            .catch(err => console.log(err))
    },

    savePlannedTrip: (req, res) => {
        let {TripName, PlannedStart, PlannedEnd} = req.body
    
        sequelize.query(`INSERT into PlannedTrips 
                        (TripName, PlannedStart, PlannedEnd)
                        values (${TripName}, ${PlannedStart}, ${PlannedEnd});
        `)
            .then(dbRes => {
                res.status(200).send(dbRes[0])
                nextEmp += 2
            })
            .catch(err => console.log(err))
    },
    getAllClients: (req, res) => {

        sequelize.query(`
        SELECT * FROM cc_users AS u
        JOIN cc_clients AS c
        ON u.user_id = c.user_id;
        `)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
    },
    getPendingAppointments: (req, res) => {
        sequelize.query(`
        SELECT * FROM cc_appointments AS a
        WHERE approved = false
        ORDER BY a.date DESC;
        `)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
    },
    getPastAppointments: (req, res) => {
        sequelize.query(`select a.appt_id, a.date, a.service_type, a.approved, a.completed, u.first_name, u.last_name 
        from cc_appointments a
        join cc_emp_appts ea on a.appt_id = ea.appt_id
        join cc_employees e on e.emp_id = ea.emp_id
        join cc_users u on e.user_id = u.user_id
        where a.approved = true and a.completed = true
        order by a.date desc;`)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
    },
    completeAppointment: (req, res) => {
        let {apptId} = req.body
        sequelize.query(`
        UPDATE cc_appointments
        SET completed = true
        where appt_id = ${apptId};
        `)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
    }
}