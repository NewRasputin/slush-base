import mongoose from 'mongoose'

const uri = process.env.MONGO_UR || 'mongodb://localhost/<%= name %>'

mongoose.Promise = global.Promise
mongoose.connect(uri)

const db = mongoose.connection

db.on('error', (err) => {
	console.error(err)
})
db.once('open', () => {
	console.log('Connected to database at %s', uri)
})

export default db
