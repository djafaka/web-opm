/*	
 * Web OPM: online case tool for Object-Process Methodology
 * Copyright © 2012 Israel Institute of Technology - Technion
 * The code is licensed under GNU General Public License, v2
 * 
 * Context: set of functions for work w/ SVG canvas
 * 
 * Author: Sergey N. Bolshchikov  
 * */

var svg = document.getElementsByTagName('svg')[0];
var svgNS = svg.getAttribute('xmlns');
var xlinkNS = svg.getAttribute('xmlns:xlink');

var activeSVGDiagram = document.getElementById('sd');
var activeSVGElement = null;

var currentX = 0;
var currentY = 0;
var currentMatrix = 0;
var objId = 0; 
var prcId = 0;
var lnkId = 0;


var addObject = function() {
	try {
		if (activeSVGElement !== null) { deselect(); }
		objId++;
		
		//Create instance of UIObject class (GUI)
		var obj = new UIObject(objId);
		obj.draw();
		activeUIDiagram.addElement(obj);
		
		//Create instance of OPMObject class (Client-side Logic)
		var opmobj = new OPMObject();
		opmobj.id = 'obj' + objId;
		opmobj.name = 'Object ' + objId;
		activeOPMDiagram.addElement(opmobj);
		opmobj.addDiagram(activeOPMDiagram);
	}
	catch(e) {
		alert(e.message);
	}
}

var addProcess = function() {
	try {
		if (activeSVGElement !== null) { deselect(); }
		prcId++;
		var prc = new UIProcess(prcId);
		prc.draw();
		activeUIDiagram.addElement(prc);
	}
	catch(e) {
		alert(e.message);
	}
}

var addState = function() {
	try {
		//Check
		if (activeSVGElement === null) {
			var msg = "Please, click on the relevant object first";
			var err = new Error(msg);
			if (!err.message) {
				err.message = msg;
			}
			throw err;
		}
		else {
			var type = activeSVGElement.getAttributeNS(null, 'id').slice(0,3);
			if (type == 'prc') {
				var msg = "Process cannot have a state";
				var err = new Error(msg);
				if (!err.message) {
					err.message = msg;
				}
				throw err;
			}
			
			//Execute this if error are caught
			var stt = new UIState(activeUIElement);
			activeUIElement.addState(stt);
			stt.draw();
		}			
	}
	catch(e) {
		alert(e.message);
	}
}


/*Source and Destination are determined according to 
 * events of the mouse on elements*/
var src = null;
var dest = null;

//Flag that the link is on/off and its type
var linkOn = {
		status: false,
		type: null,
		off: function() {
			this.status = false;
			this.type = null;
			}
}; 			
var turnLinkOn = function(type) {
	if(activeSVGElement) { deselect(); }
	linkOn.status = true;
	linkOn.type = type;
}
var addLink = function(src, dest) {
	try {
		lnkId++;
		var lnk = new UILink(linkOn.type + lnkId);		
		if (lnk.check(src, dest) === true) {
			lnk.draw(src, dest)
			activeUIDiagram.addElement(lnk);
		}
		else {
			delete lnk;
			var msg = lnk.check(src, dest);
			var err = new Error(msg);
			if (!err.message) {
				err.message = msg;
			}
			throw err
		}
		linkOn.off();
	}
	catch(e) {
		alert(e.message);
	}
}

var diagramZoom = function(scale) {
	deselect();
	var diagramWidth = activeSVGDiagram.getBBox().width + 2;
	var diagramHeight = activeSVGDiagram.getBBox().height + 2;
	var scaleMatrix = activeSVGDiagram.getAttributeNS(null, 'transform').slice(7, -1).split(' ');
	for (var i = 0; i < scaleMatrix.length; i++) { scaleMatrix[i] = parseFloat(scaleMatrix[i]); }
	for (var i = 0; i < scaleMatrix.length; i++) { scaleMatrix[i] *= scale; }
	scaleMatrix[4] += (1 - scale) * diagramWidth/2;
	scaleMatrix[5] += (1 - scale) * diagramHeight/2;
	var newMatrix = "matrix(" + scaleMatrix.join(' ') + ")";
	activeSVGDiagram.setAttributeNS(null, 'transform', newMatrix);
}