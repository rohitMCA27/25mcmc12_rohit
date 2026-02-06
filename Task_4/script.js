// Form & Inputs
const form = document.getElementById("regForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const dobInput = document.getElementById("dob");
const phoneInput = document.getElementById("phone");

// Error Spans
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const dobError = document.getElementById("dobError");
const phoneError = document.getElementById("phoneError");
const passwordStrength = document.getElementById("passwordStrength");

// name
function validateName() {
    const regex = /^[A-Za-z ]+$/;
    if (!regex.test(nameInput.value.trim())) {
        nameError.textContent = "Only alphabets allowed";
        return false;
    }
    nameError.textContent = "";
    return true;
}

// emaill
function validateEmail() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(emailInput.value.trim())) {
        emailError.textContent = "Invalid email format";
        return false;
    }
    emailError.textContent = "";
    return true;
}

// passwd
function validatePassword() {
    const value = passwordInput.value;
    let strength = 0;

    if (value.length >= 8) strength++;
    if (/[A-Z]/.test(value)) strength++;
    if (/[a-z]/.test(value)) strength++;
    if (/[0-9]/.test(value)) strength++;
    if (/[\W]/.test(value)) strength++;

    const score = Math.min(strength, 5);

    if (score <= 2) {
        passwordStrength.textContent = "Weak Password";
    } else if (score <= 4) {
        passwordStrength.textContent = "Medium Password";
    } else {
        passwordStrength.textContent = "Strong Password";
    }

    if (score < 5) {
        passwordError.textContent =
            "Password must be 8+ chars with upper, lower, number & special char";
        return false;
    }

    passwordError.textContent = "";
    return true;
}

// dob
function validateDOB() {
    if (!dobInput.value) {
        dobError.textContent = "Date of birth required";
        return false;
    }

    const dob = new Date(dobInput.value);
    const today = new Date();

    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
    }

    if (age < 18) {
        dobError.textContent = "You must be at least 18 years old";
        return false;
    }

    dobError.textContent = "";
    return true;
}
// phn
function validatePhone() {
    const regex = /^[0-9]{10}$/;
    if (!regex.test(phoneInput.value.trim())) {
        phoneError.textContent = "Phone number must be exactly 10 digits";
        return false;
    }
    phoneError.textContent = "";
    return true;
}


nameInput.addEventListener("input", validateName);
emailInput.addEventListener("input", validateEmail);
passwordInput.addEventListener("input", validatePassword);
dobInput.addEventListener("change", validateDOB);
phoneInput.addEventListener("input", validatePhone);

// handle sbmit
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const isValid =
        validateName() &&
        validateEmail() &&
        validatePassword() &&
        validateDOB() &&
        validatePhone();

    if (isValid) {
        alert("Registration Successful!");
        form.reset();
        passwordStrength.textContent = "";
    }
});
