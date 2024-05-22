function toggleDireccion() {
    var metodo = document.getElementById("metodo").value;
    var direccionField = document.getElementById("direccionField");

    if (metodo === "envio") {
        direccionField.style.display = "block";
    } else {
        direccionField.style.display = "none";
    }
}

function showError(field, message) {
    const errorDiv = document.getElementById(field + "Error");
    errorDiv.textContent = message;
    errorDiv.style.display = "block";
}

function hideErrors() {
    const errors = document.querySelectorAll(".invalid-feedback");
    errors.forEach(error => error.style.display = "none");
}

function validatePaymentForm() {
    hideErrors();
    
    let isValid = true;

    // Validar que el campo de nombre en la tarjeta no esté vacío
    var cardName = document.getElementById("cardName").value;
    if (cardName.trim() === "") {
        showError("cardName", "Por favor ingrese el nombre en la tarjeta.");
        isValid = false;
    }

    // Validar el número de tarjeta utilizando el algoritmo de Luhn
    var cardNumber = document.getElementById("cardNumber").value;
    if (!luhnCheck(cardNumber)) {
        showError("cardNumber", "El número de tarjeta no es válido.");
        isValid = false;
    }

    // Validar la fecha de vencimiento
    var expiryDate = document.getElementById("expiryDate").value;
    var today = new Date();
    var [expiryMonth, expiryYear] = expiryDate.split("/");
    var expiry = new Date("20" + expiryYear, expiryMonth - 1);
    if (expiry < today) {
        showError("expiryDate", "La fecha de vencimiento de la tarjeta ha pasado.");
        isValid = false;
    }

    // Validar el código CVV
    var cvv = document.getElementById("cvv").value;
    if (cvv.length !== 3) {
        showError("cvv", "El código CVV debe tener 3 dígitos.");
        isValid = false;
    }

    return isValid;
}

// Función para verificar el número de tarjeta utilizando el algoritmo de Luhn
function luhnCheck(cardNumber) {
    var sum = 0;
    var doubleUp = false;
    for (var i = cardNumber.length - 1; i >= 0; i--) {
        var digit = parseInt(cardNumber.charAt(i));
        if (doubleUp) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }
        sum += digit;
        doubleUp = !doubleUp;
    }
    return sum % 10 === 0;
}
