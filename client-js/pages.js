window.require = require

let tri = require('tripartite')


const labelTextForElement = require('@dankolz/label-text-for-element')
const compositePhoneNumber = require('./index')

function createMsgEl() {
	let el = document.createElement('div')
	document.querySelector('.page').appendChild(el)
	return el
}

// load templates like
//require('../views/test1.tri')

// and use like:
/*
let d = document.createElement('div')
d.innerHTML = tri.getTemplate('views/test1')({
	key1: 'value'
	, key2: 'value'
})
document.body.append(d)
*/


createMsgEl().innerHTML = 'label for first field: ' + labelTextForElement(document.querySelector('#three'))
createMsgEl().innerHTML = 'label for second field: ' + labelTextForElement(document.querySelector('#five'))
createMsgEl().innerHTML = 'label for third field: ' + labelTextForElement(document.querySelector('#six'))


compositePhoneNumber(document.querySelector('#three'))
compositePhoneNumber(document.querySelector('#five'))
compositePhoneNumber(document.querySelector('#six'))
compositePhoneNumber(document.querySelector('#seven'))
compositePhoneNumber(document.querySelector('#eight'))



