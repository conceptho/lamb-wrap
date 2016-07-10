"use strict";

let ParamsFilter = require( "./params-filter" ),
	Response = require( "./response" )

let Action = function( config ) {
	this.response = false
	this.context = config.context
	this.event = config.event
	this.operation = config.operation
	this.body = config.body
	this.schema = config.schema
	this.execute = () => {
		this.response = new Response( this.body( this.event, this.context ), this )
		return this
	}
	this.filterInput = () => ParamsFilter.filterInput( this )
	this.filterOutput = () => ParamsFilter.filterOutput( this )
	this.loadModel = () => ModelLoader.load( this.event, this.context )
}

module.exports = Action