"use strict"

let Authenticator = require( "./authenticator" ),
	AccessRules = require( "./access-rules" )

let application = {}

application.run = ( action ) => {
	let identity = Authenticator.getIdentify( action )
	let model = action.loadModel()
	AccessRules.checkAccess( identity, action )
	action
		.filterInput()
		.execute( identity, model )
		.filterOutput()
		.send();
}

module.exports = application

