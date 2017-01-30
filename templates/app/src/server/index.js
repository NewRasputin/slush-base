import express from 'express'
import path from 'path'

import db from './db.js'

const app = express()

const port = process.env.PORT || 5000

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(port, () => {
	console.log('Server listening on port %s', port)
})
