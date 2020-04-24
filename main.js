const form = document.querySelector('.form');
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
	input.classList.add('invalid-input');
	const id = input.id;
	let message = input.form.querySelector(`.form__error-message#error-${id}`);
	if (!id) return;
	if (!message) {
		message = document.createElement('p');
		message.className = 'form__error-message';
		message.id = `error-${id}`;
		input.parentNode.insertBefore(message, input.nextSibling);
	}
	message.textContent = error;
	input.setAttribute('aria-describedby', `error-${id}`);
};

const removeError = (input, error) => {
	input.classList.remove('invalid-input');
	input.removeAttribute('aria-describedby');
	const id = input.id;
	let message = input.form.querySelector(`.form__error-message#error-${id}`);
	if (!id || !message) return;
	input.parentNode.removeChild(message);
};

const validateInput = (input) => {
	const error = getError(input);
	if (error) {
		displayError(input, error);
	} else {
		removeError(input, error);
	}
};

const validateForm = (event) => {
	event.preventDefault();
	const inputs = [...form.elements];
	inputs.forEach((input) => validateInput(input));
};

form.addEventListener('submit', validateForm);
