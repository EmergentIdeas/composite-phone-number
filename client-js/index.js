const labelTextForElement = require('@dankolz/label-text-for-element')
const esc = require('@dankolz/escape-html-attribute-value')


/**
 * Takes an input element and creates a set of three fields for phone
 * number entry. Each new field will cause the original field to be
 * changed when updated. The orignal field will be changed to type
 * "hidden".
 * @param {Element} elm 
 * @returns 
 */
function compositePhoneNumber(elm) {
	if(!elm) {
		return
	}
	
	let label = labelTextForElement(elm)
	if(!label) {
		label = ''
	}
	label = esc(label)
	
	let phoneNumberParts = document.createElement('div')
	phoneNumberParts.classList.add('phone-number-parts')
	
	let requiredText = ''
	if(elm.hasAttribute('required')) {
		requiredText = ' required="required" '
	}
	
	let content =
`
		<span class="area-code-section">
		<span class="left-paren">(</span><input class="phone-area-code" aria-label="${label} area code" type="text" size="3" maxlength="3" pattern="[0-9]{3}" ${requiredText} /><span class="right-paren">)</span> 
		</span>
		<input class="phone-prefix" aria-label="${label} prefix" type="text" size="3" maxlength="3" pattern="[0-9]{3}" ${requiredText} /> 
		<span class="phone-hyphen">-</span>
		<input class="phone-line-number" aria-label="${label} line number" size="4" maxlength="4" type="text" pattern="[0-9]{4}" ${requiredText} /> 
		
`
	phoneNumberParts.innerHTML = content
	
	let currentValue = elm.value
	phoneNumberParts.querySelector('.phone-area-code').value = currentValue.substring(0, 3)
	phoneNumberParts.querySelector('.phone-prefix').value = currentValue.substring(3, 6)
	phoneNumberParts.querySelector('.phone-line-number').value = currentValue.substring(6, 10)
	

	function recordValue() {
		let val = ''
		phoneNumberParts.querySelectorAll('input').forEach(input => {
			val += input.value
		})
		elm.value = val
	}
	function anyFieldChange(evt) {
		setTimeout(recordValue)
	}
	phoneNumberParts.addEventListener('keyup', anyFieldChange)
	phoneNumberParts.addEventListener('change', anyFieldChange)
	
	phoneNumberParts.addEventListener('keyup', evt => {
		if(evt.target.classList.contains('phone-area-code') || evt.target.classList.contains('phone-prefix')) {
			if(evt.target.value.length == 3){
				if(evt.target.classList.contains('phone-area-code')) {
					phoneNumberParts.querySelector('.phone-prefix').focus()
				}
				else {
					phoneNumberParts.querySelector('.phone-line-number').focus()
				}
			}

		}
	})

	let form = elm.closest('form')
	if(form) {
		form.addEventListener('submit', anyFieldChange)
	}
	

	elm.insertAdjacentElement('afterend', phoneNumberParts)
	elm.setAttribute('type', 'hidden')
	

}

module.exports = compositePhoneNumber