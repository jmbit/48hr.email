const express = require('express')

const router = new express.Router()
const randomWord = require('random-word')
const {check, validationResult} = require('express-validator/check')
const config = require('../../../application/config')

router.get('/', (req, res, _next) => {
	res.render('login', {
		title: '48hr.email | Your temporary Inbox',
		username: randomWord(),
		domains: config.email.domains
	})
})

router.get('/random', (req, res, _next) => {
	res.redirect(`/${randomWord()}@${config.email.domains[Math.floor(Math.random() * config.email.domains.length)]}`)
})

router.post(
	'/',
	[
		check('username').isLength({min: 1}),
		check('domain').isIn(config.email.domains)
	],
	(req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.render('login', {
				title: 'Login',
				username: req.body.username,
				domain: req.body.domain,
				userInputError: true
			})
		}

		res.redirect(`/${req.body.username}@${req.body.domain}`)
	}
)

module.exports = router