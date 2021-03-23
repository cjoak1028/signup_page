const form = document.getElementById("form");
const formElements = document.querySelectorAll('.input-container');

// As per the HTML5 Specification
const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const validators = {
    required: element => element.value.length > 0,
    validEmail: element => emailRegExp.test(element.value)
}

function markElementInvalid(element, validatorName) {
    element.classList.add("invalid");
    element.setAttribute("aria-invalid", true);
    const feedbackMessage = element.parentNode.querySelector(`[data-validation-message=${validatorName}]`);
    feedbackMessage.classList.add("message-visible");
    feedbackMessage.setAttribute('aria-hidden', false);
}

function resetValidation(element) {
    element.classList.remove("invalid");
    element.setAttribute("aria-invalid", false);
    element.parentNode.querySelectorAll("[data-validation-message]").forEach(e => {
        e.classList.remove("message-visible");
        e.classList.remove("invalid");
        e.setAttribute("aria-hidden", true);
    })
}

// NOTE: data-* attributes allow us to store extra information on standard, semantic HTML elements
function validateElement(element) {
    resetValidation(element);
    const rules = element.dataset.validate.split(" ");
    rules.forEach(rule => {
        if(validators[rule](element)) {
            return;
        } else {
            markElementInvalid(element, rule);
        }
    })
}

form.addEventListener("submit", event => {
    let formIsValid = true;
    form.classList.remove("invalid");
    
    formElements.forEach(formElement => {
        const inputElement = formElement.childNodes[1];
        if (!inputElement.dataset) return;
        if (!inputElement.dataset.validate) return;
        validateElement(inputElement);
    })

    formIsValid = form.querySelectorAll(".invalid").length === 0;

    if (formIsValid === false) {
        form.classList.add("invalid");
        event.preventDefault();
    } 
})

