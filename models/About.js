const mongoose = require('mongoose')

const Schema = mongoose.Schema

const aboutSchema = new Schema({
	about:{
		type:String
	},
	created_at:{
		type:Date,
		default:Date.new
	}
})

module.exports = About = mongoose.model('About', aboutSchema)