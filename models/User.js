const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
	profile_name:{
		type:String,		
	},
	first_name:{
		type:String
	},
	last_name:{
		type:String
	},
	email:{
		type:String
	},
	password:{
		type:String
	},
	user_info:{
		type:Object
	},
	skills:{
		type:Array
	},
	languages:{
		type:Array
	},
	about:{
		type:String
	},
	experience:{
		type:Array
	},
	projects:{
		type:Array
	},
	educations:{
		type:Array
	},
	created_at:{
		type:Date,
		default:Date.new
	}
})

module.exports = User = mongoose.model('User', userSchema)