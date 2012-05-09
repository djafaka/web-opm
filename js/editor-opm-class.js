/*	
 * 	Web OPM: online case tool for Object-Process Methodology
 * 	Copyright © 2012 Israel Institute of Technology - Technion
 * 	The code is licensed under GNU General Public License, v2
 * 
 * 	File context description:
 * 	File contains classes description used for OPM
 * 
 *   Authors: Rochai Ben-Mordechai & Sameer Makladeh (The Horses)
 * */

//START OF OPMModel CLASS//
function OPMModel( modelIDVal , creatorIDVal , creationDate ) {
  
  if ( ( typeof modelIDVal !== string ) && ( typeof creatorIDVal !== string ) ){
    throw "invalid input type. check modelIDVal and creatorIDVal"; //Throw exception if data type is incorrect
  }
  
  this.modelId = modelIdVal;
  this.creatorId = creatorIDVal;
  this.name = 'Model Name'; //default value
  this.type = null;
  this.participants = {};
  this.sd = null;
  this.lastUpdateDate = null;
  this.creationDate = creationDate;
  
  //TODO: call JSON function for updating new details on new model in DB
}

//return the modelID of specific ID
OPMModel.prototype.getId = function(){ 
  return this.modelId;
}
 
//share model with additional users
OPMModel.prototype.share = function( newUser ){ 
  this.participants[ newUser.Id ] = newUser;
  //TODO: add call to JSON function to send to server
  return;
}

//returns a list of users with permissions to edit this Model
OPMModel.prototype.getParticipants = function(){
  if ( this.participants === null ){
    return "no participating users";
  }
  return this.participants;
}

//removes a specific user from the participants list
OPMModel.prototype.unShare = function( p ){
  var x = this.participants.indexOf( p );
  if ( x === -1 ){
    throw "cannot find collaborator ID. please try again.";
  }
  var temp = participants[ ( participants.length() ) - 1 ]; // Swap-n-Pop the userID from the participant list
  participants[ ( participants.length() ) - 1 ] = participants [ x ];
  participants[ x ] = temp;
  var garbage = participants.pop();
  delete garbage;
}
 
//returns the Model's name
OPMModel.prototype.getName = function(){
	return this.name;	  
}
 
//sets the Model's name in the GUI and the DB
OPMModel.prototype.setName = function( name ){
	this.name = name;
  //TODO: add JSON function for setting new model Name in DB
}
 
//returns Model's Type
OPMModel.prototype.getType = function(){
	return this.type;
}
	
//sets Model's Type in the GUI and DB
OPMModel.prototype.setType = function( type ){
	this.type = type;
  //TODO: add JSON function for setting model Type in DB
}
OPMModel.prototype.print = function (){
 // need procedure for printing a model 
}

OPMMOdel.prototype.save = function (){
  // need procedure for saving a model to DB
}

OPMModel.prototype.load = function (){
  //need procedure from loading a model from DB
}

//remove model from user's model list including all siblings in the GUI and DB
OPMModel.prototype.destructor = function(){
    //need procedure for deleting Model from database, including all children.
  var answer = confirm ("You are about to Completely remove\n all Model diagrams. Are you sure you wish to continue?")
  if (answer){
    try {
      if (anything_wrong === true){
        throw "unable to delete model, please try again";
      }
      delete this; //TODO: is this expression true??
    }
  }
  else{
    return;
  }
}
//END OF OPMModel CLASS//

//START OF OPMDiagram CLASS//
function OPMDiagram(){
	
  this.predecessor = {};
  this.successors = {};
  this.elements = {};
	this.diagramName = 'Diagram Name';//default value
	this.OPL = null;
  this.number = {}; //need a default definition here.
}
 
OPMDiagram.prototype.addElement = function( element ){
  this.elements[ element.ID ] = element;
  return;
}
 
OPMDiagram.prototype.getElements = function(){
	return this.elements;
 }
	
OPMDiagram.prototype.print = function(){
		//need implementation of print procedure.
 }
	
 OPMDiagram.prototype.renumber = function( number ){
	 try{
		 if(typeof number !== int){
			throw "invalid input type, please insert a number.";
		 }
	 }
	this.number = number;
 }
	
 OPMDiagram.prototype.getOPL = function(){
		if (this.OPL === null){
			return "Empty";
		}
		return this.OPL;
	}
	
OPMDiagram.prototype.writeOPL = function( text ){
	 this.OPL = this.OPL+text;
 }
	
OPMDiagram.prototype.destructor = function(){
	 //need procedure for deleting Model from database, including all children.
	  try {
	    if (anything_wrong === true){
	    throw "unable to delete model, please try again";
	    }
	  }	
 }

//END OF OPMDiagram CLASS//

//START OF OPMElement CLASS//
function OPMElement() {
  this.elementID;
}

OPMElement.prototype.getID = function(){
  return this.elementID;
}
//END OF OPMElement CLASS//

//START OF OPMEntity CLASS//
OPMEntity.prototype = new OPMElement(); //inheriting from OPMElement
function OPMEntity() {
  this.name = null;
  this.inLinks = {};
  this.outLinks = {};
  this.description = null;
}

OPMEntity.prototype.getName = function(){
  return this.name;
}

OPMEntity.prototype.setName = function( name ){
  this.name = name;
  return;
}

OPMEntity.prototype.getDescription = function(){
  return this.description;
}

OPMEntity.prototype.setDescription = function( description ){
  this.description = description;
  return;
}
//END OF OPMEntity CLASS//

//START OF OPMThing CLASS//
OPMThing.prototype = new OPMEntity(); // inhereting from OPMEntity 
function OPMThing(){
  this.essence = null;
  this.affiliation = null;
  this.scope = null;
  this.unfoldDiag {};
  this.inzoomDiag = {};
}

OPMThing.prototype.getEssence = function(){
  return this.essence;
}

OPMThing.prototype.setEssence = function( ess ){
  this.Essence = ess;
  return;
    //TODO: send data through JSON to DB and server
}

OPMThing.prototype.getAffiliation = function(){
  return this.affiliation;
}

OPMThing.prototype.setAffiliation = function( affil ){
  this.affiliation = affil;
  return;
  //TODO: send data through JSON to DB and server
}

OPMThing.prototype.getScope = function(){
  return this.scope;
}

OPMThing.prototype.setScope = function( scope ){
  this.scope = scope;
  return;
  //TODO: send data through JSON to DB and server
}

OPMThing.prototype.unfold = function(){
  
}

OPMThing.prototype.inzoom = function(){

}
//END OF OPMThing CLASS//

//START OF OPMObject CLASS//
OPMObject.prototype = new OPMThing();
function OPMObject() {
  this.states = {};
  this.initValue = null;
  this.obejctType = null;
}

OPMObject.prototype.getName = function(){
  return.this.name;
}

OPMObject.prototype.getDescription = function(){
  return.this.description;
}

OPMObject.prototype.setDescription = function( description ){
  this.description = description;
  return;
}

OPMObject.prototype.addState = function( state){
  this.states[ state.ID ] = state; //not too sure how to reference or add another object here..
}

OPMObject.prototype.removeState = function(state){
  var x = this.states.indexOf( state );
  if ( x === -1 ){
    throw "cannot find state ID. please try again.";
  }
  var temp = states[ ( states.length() ) - 1 ]; // Swap-n-Pop the state ID from the state list
  states[ ( states.length() ) - 1 ] = states [ x ];
  states[ x ] = temp;
  var garbage = states.pop();
  delete garbage;
}

OPMObject.prototype.destructor = function(){
//needs the procedure of deletion
}
//END OF OPMObject CLASS//


//START OF OPMProcess CLASS//
OPMProcess.prototype = new OPMThing();
function OPMProcess() {
  this.name = null;
  this.minActivationTime = null;
  this.maxActivationTime = null;
  this.inProcedualLinksRelationMatrix = null;
  this.things = {};
}

OPMProcess.prototype.getName = function(){
  return.this.name;
}

OPMProcess.prototype.setName = function (name){
  this.name = name;
  return;
}

OPMProcess.prototype.getDescription = function(){
  return.this.description;
}

OPMProcess.prototype.setDescription = function (desc){
  this.description = desc;
  return;
}

OPMProcess.prototype.getMinActivationTime = function(){
  return.this.minActivationTime;
}

OPMProcess.prototype.setMinActivationTime = function( minTime ){
    if ( typeof( minTime ) !== float ){ //or should it be float?
      throw "invalid input, please enter a number.";
    }
    this.minActivationTime = minTime;
    return;
}

OPMProcess.prototype.getMaxActivationTime = function(){
  return.this.maxActivationTime;
}

OPMProcess.prototype.setMaxActivationTime = function(maxTime){
  if (typeof(maxTime) !== float){ //or should it be float?
      throw "invalid input, please enter a number.";
    }
    this.maxActivationTime = maxTime;
    return;
}

OPMProcess.prototype.getInProcedualLinksRelationMatrix = function(){
  return.this.inProcedualLinksRelationMatrix;
}

//not too sure about the implimentation of this function, check the class diagram.
OPMProcess.prototype.setInProcedualLinksRelationMatrix = function(matrix){
  this.inProcedualLinksRelationMatrix = matrix;
  return;
}

OPMProcess.prototype.destructor = function(){
  //need destructor procedure
}   
//END OF OPMProcess CLASS//

//START OF OPMState CLASS//

//END OF OPMState CLASS//

//START OF OPMLink CLASS//
function OPMLink() {}
//END OF OPMLink CLASS//

//START OF OPMProcedural_Link CLASS//
function OPMProcedural_Link() {
	
	var source;
	var destination;
	var description;
	var originType;
	
	
	function getDest() {}
	
	function setDest() {}
	
	function getSource() {}
	
	function setSource() {}
	
	function getOriginType(){
		return this.originType;
	}
	
	function setOriginType(bool){
		this.originType = bool;
	}
	
	function destructor() {
		//need procedure for deleting Model from database, including all children.
	    try {
	      if (anything_wrong === true){
	      throw "unable to delete model, please try again";
	      }
	    }	
	}
}
//END OF OPMProcedural_Link CLASS//

// OPM Structural Link Class
function OPMStructural_Link() {
	
	var source;
	var destination;
	var participationConst;
	var participationVal;
	var cardinality;
	var tag;
	
	function getTag(){
		if (this.tag===null){
			return "Empty";
		}
		retun this.tag;
	}
	
	function setTag(text){
		this.tag=text;
	}
	
	function getParticipationConst(){
		if (this.participationConst===null){
			return "Empty";
		}
		return this.participationConst;
	}
	
	function setParticipationConst(){}
	
	function getParticipationVal(){
		if (this.participationVal===null){
			return "Empty";
		}
		return this.participationVal;
	}
	
	function setParticipationVal(){}
	
	function getCardinality(){
		return this.cardinality;
	}
	
	function setCardinality(){}
	
	function getDestination(){}
	
	function setDestination(){}
	
	function getSource(){}
	
	function setSource(){}
	
	function destructor() {
		//need procedure for deleting Model from database, including all children.
	    try {
	      if (anything_wrong === true){
	      throw "unable to delete model, please try again";
	      }
	    }	
	
	}
	
}


</script>