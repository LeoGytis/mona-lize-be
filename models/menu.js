import mongoose from 'mongoose';
import baseSchemaOptions from './baseSchema.js';

const menuSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		description: {
			type: String,
			required: true,
			trim: true,
		},
		price: {
			type: Number,
			required: true,
			min: 0,
		},
		image: {
			data: String, // Store base64 string
			contentType: String,
		},
	},
	baseSchemaOptions
);

// Add virtual property for id
menuSchema.virtual('id').get(function () {
	return this._id.toHexString();
});

const Menu = mongoose.model('Menu', menuSchema);

export default Menu;
