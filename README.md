# Composite Phone Number widget

Take an html input field like:

```
<label>
	phone number
	<input id="phone" name="phone" type="text" />
</label>
```

And creates equivalent html like:

```
<div class="phone-number-parts">
		(<input class="phone-area-code" aria-label="phone number area code" type="text" size="3" maxlength="3" pattern="[0-9]{3}">) 
		<input class="phone-prefix" aria-label="phone number prefix" type="text" size="3" maxlength="3" pattern="[0-9]{3}"> 
		-
		<input class="phone-line-number" aria-label="phone number line number" size="4" maxlength="4" type="text" pattern="[0-9]{4}"> 
</div>
```


It makes the original field a hidden type, preserves the "requiredness" of the original field,
attempts to extract the label of the original field and use it for the component fields. It also
populates the new sub-fields with the appropriate values from the original field

It creates listeners to update the original field with the composite value of the sub-fields
eery time a sub field changes. It also attempts to move the user from area code to prefix to
line number when they have entered the correct number of digits.

## Install

Install like:

```
npm install @dankolz/composite-phone-number
```

## Usage

Use like:

```
const compositePhoneNumber = require('@dankolz/composite-phone-number')
compositePhoneNumber(document.querySelector('#phone'))
```

Just use the form normally from then.