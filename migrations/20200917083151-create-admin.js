module.exports = {
	async up(db, client) {
		await db
			.collection('users')
			.insertOne({ name: 'Hello world' }, { $set: { blacklisted: true } })
	},

	async down(db, client) {
		await db.collection('users').deleteOne({ name: 'Hello world' })
	}
}
