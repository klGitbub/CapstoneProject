require('dotenv').config()
const {CONNECTION_STRING} = process.env

const Sequelize = require('sequelize')

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

module.exports = {
    getPlannedTrips: (req, res) => {
        sequelize.query(`
        SELECT * FROM cc_PlannedTrips
        ON ID = '${ID}'
        order by PlannedStart ASC;
        `)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
    },
    updatePlannedTrips: (req, res) => {
        let {PlannedStart, PlannedEnd, TripName} = req.body;
        sequelize.query(`
        UPDATE PlannedTrips
        SET TripName = '${TripName}',
        PlannedStart = '${PlannedStart}',
        plannedEnd = '${PlannedEnd}',
        `)
        .then(() => res.sendStatus(200))
        .catch(err => console.log(err))
    },
    getPlannedSights: (req, res) => {
        sequelize.query(`
        SELECT * FROM PlannedSights
        WHERE id = '${ID}'
        ORDER BY PlannedStart ASC;
        `)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
    },
    updatePlannedSights: (req, res) => {
        let {PlannedName, SightName, PlannedVisit} = req.body;
        sequelize.query(`
        UPDATE PlannedSights
        SET PlannedName = '${PlannedName}',
        SightName = '${SightName}',
        PlannedVisit = '${PlannedVisit}',
        `)
        .then(() => res.sendStatus(200))
        .catch(err => console.log(err))
    }
}