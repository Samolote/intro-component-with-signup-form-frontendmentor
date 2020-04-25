const form = document.querySelector('.form');
const formInputs = [...form.elements];
form.setAttribute('novalidate', true);

const getError = (input) => {
	const validity = input.validity;
	const name = input.name;
	if (input.type === 'submit') return;
	if (validity.valid) return null;
	if (validity.valueMissing) return `${name} cannot be empty`;
	if (validity.patternMismatch) {
		if (input.type === 'email') return 'Looks like this is not an email';
		else if (input.type === 'password')
			return 'A valid password has at least 8 characters, one small letter, one big letter, one digit and a special character';
	}
};

const displayError = (input, error) => {
	input.classList.remove('valid-input');
	input.classList.add('invalid-input');
	const id = input.id;
	let message = input.form.querySelector(`.form__error-message#error-${id}`);
	if (!message) {
		message = document.createElement('p');
		message.className = 'form__error-message';
		message.id = `error-${id}`;
		input.parentNode.insertBefore(message, input.nextSibling);
	}
	message.textContent = error;
	input.setAttribute('aria-describedby', `error-${id}`);
};

const removeError = (input) => {
	input.classList.remove('invalid-input');
	input.removeAttribute('aria-describedby');
	input.classList.add('valid-input');
	const id = input.id;
	let message = input.form.querySelector(`.form__error-message#error-${id}`);
	if (!message) return;
	input.parentNode.removeChild(message);
};

const validateInput = (input) => {
	const error = getError(input);
	if (error) {
		displayError(input, error);
	} else {
		removeError(input);
	}
};

const validateForm = (event) => {
	event.preventDefault();
	formInputs.forEach((input) => validateInput(input));
};

form.addEventListener('blur', (event) => validateInput(event.target), true);
form.addEventListener('submit', validateForm);
