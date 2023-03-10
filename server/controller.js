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
        //res.status(200).send("getPlannedTrips");
        //*
        sequelize.query(`select * from "public.PlannedTrips"
                         order by "PlannedStart" ASC;`)
            .then(dbRes => res.status(200).send(dbRes[0]))
            .catch(err => console.log(err))
        //*/
    },

    postPlannedTrip: (req, res) => {
        let {field1, field2, field3} = JSON.parse(req.body.body);
        //console.log(`req.body=${JSON.stringify(req.body)}`);
        //res.status(200).send("postPlannedTrip");
        //*
        //console.log(`TripName=${field1}, PlannedStart=${field2}, PlannedEnd=${field3}`);
        sequelize.query(`INSERT into "public.PlannedTrips"("TripName", "PlannedStart", "PlannedEnd")
                        values ('${field1}', '${field2}', '${field3}');
        `)
            .then(dbRes => {
                res.status(200).send(dbRes[0])
                nextEmp += 2
            })
            .catch(err => console.log(err))
        //*/
    },
}