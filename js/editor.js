/*	
 * Web OPM: online case tool for Object-Process Methodology
 * Copyright © 2012 Israel Institute of Technology - Technion
 * The code is licensed under GNU General Public License, v2
 * 
 * File context description:
 * Bindings of initial events for interactive GUI,
 * Initial class instantiation
 *
 * Author: Sergey N. Bolshchikov
 * */

//OPM classes initiation
var currentUser = new User('sergey@bolshchikov.net', null);						//User class instantiation
var partyOrder = new PartyOrder();												//Main DS
var activeOPMModel = new OPMModel(currentUser.id);
activeOPMModel.share(currentUser.id);
currentUser.addModel(activeOPMModel.id);
var activeOPMDiagram = new OPMDiagram(activeOPMModel.id);


//UI classes instantiation
var activeUIDiagram = new UIDiagram(activeOPMDiagram.id);
activeUIDiagram.draw();
//UIDiagramList.addDiagram(activeUIDiagram);
var activeUIElement = null;

var activeSVGDiagram = document.getElementById(activeOPMDiagram.id);
var activeSVGElement = null;

$(document).ready(function(){
	$('.dropdown-toggle').dropdown();
	$('.drag').draggable({
		containment: "#container-model"
	});
	$('.resize').resizable({
		ghost: true
	});
	$(".btn-slide").click(function() {
		$("#opl-panel").slideToggle("slow");
	});
});

function rename() {
	//Rename Model
	$('#model-rename').modal('show');
}

	