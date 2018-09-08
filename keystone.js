// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

// Require keystone
var keystone = require('keystone');
var handlebars = require('express-handlebars');

// Check env variables

console.log(process.env.PORT ? 'Done!' : 'Using Default');
console.log(process.env.IP ? 'Done!' : 'Using Default');
console.log(process.env.CLOUDINARY_URL ? 'Done!' : 'None');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation

keystone.init({
	'name': 'pknr',
	'brand': 'pknr',
	'session store': 'mongo',
	'port': process.env.PORT || 3000,
	'host': process.env.IP || 'localhost',
	'sass': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': '.hbs',
	'cloudinary config': process.env.CLOUDINARY_URL,

	'custom engine': handlebars.create({
		layoutsDir: 'templates/views/layouts',
		partialsDir: 'templates/views/partials',
		defaultLayout: 'default',
		helpers: new require('./templates/views/helpers')(),
		extname: '.hbs',
	}).engine,

	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',
});

// Load your project's Models
keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	moment: require('moment'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});

// Load your project's Routes
keystone.set('routes', require('./routes'));

// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
	'Сообщения': 'enquiries',
	'Пользователи': 'users',
	'Видео Баннер': 'Video',
	'О Фонде': 'OFonde',

	'Проекты': 'projects',
	'Руководство': 'managers',
	'Новости': 'news',
});

// Start Keystone to connect to your database and initialise the web server

keystone.start();
