var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * News Model
 * ==========
 */
var News = new keystone.List('News', {
	autokey: { path: 'slug', from: 'title', unique: true },
	map: { name: 'title' },
	singular: 'Новости',
	plural: 'Новости',
	defaultSort: '-date',
});

News.add({
	title: { type: String, required: true },
	state: {
		type: Types.Select,
		options: 'draft, published, archived',
		default: 'draft',
	},
	tag: { type: String },
	date: {
		type: Date,
		required: true,
		inputFormat: 'DD-MM-YYYY',
		default: Date.now,
	},
	image: {
		type: Types.CloudinaryImage,
		autoCleanup: true,
		folder: 'news_small',
	},
	imageBig: {
		type: Types.CloudinaryImage,
		autoCleanup: true,
		folder: 'news_big',
	},
	gallery: {
		type: Types.CloudinaryImages,
		autoCleanup: true,
		folder: 'gallery',
	},
	content: {
		description: { type: String, required: true, default: 'НЕТ ОПИСАНИЯ' },
		full: { type: Types.Html, wysiwyg: true, height: 400 },
		author: { type: String, label: 'Автор статьи' },
		authorVideo: { type: String, label: 'Автор видео' },
		authorPhoto: { type: String, label: 'Автор фото' },
	},
	video: {
		youtubeId: { type: String },
	},
});

News.defaultColumns = 'title|15%, date|20%, state|20%';
News.register();
