let userId = document.getElementById("userId").value;

let overviewEmployerFullName = document.getElementById("overviewEmployerFullName");
let overviewEmployerEmail = document.getElementById("overviewEmployerEmail");

let firstNameInput = document.getElementById("firstNameInput");
let lastNameInput = document.getElementById("lastNameInput");
let emailInput = document.getElementById("employerEmailInput");

const employerDataAlert = document.getElementById('employerDataAlert')
const appendEmployerDataAlert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible text-center" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')

    employerDataAlert.append(wrapper)
}

const employerPasswordAlert = document.getElementById('employerPasswordAlert')
const appendEmployerPasswordAlert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible text-center" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')

    employerPasswordAlert.append(wrapper)
}

getUserData();

function getUserData() {
    const httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", "/users/" + userId, true);
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                let user = JSON.parse(httpRequest.responseText);
                setUserData(user)
            }
        }
    }
    httpRequest.send();
}

function updatePersonalData() {
    if (firstNameInput.value !== '' && lastNameInput.value !== '') {
        const httpRequest = new XMLHttpRequest();

        httpRequest.open("PUT", "/users/data/" + userId, true);
        httpRequest.setRequestHeader("Content-Type", "application/json");
        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 200) {
                    let newUser = JSON.parse(httpRequest.responseText);
                    setUserData(newUser);
                    appendEmployerDataAlert('You successfully changed your personal data!', 'success')
                }
            }
        }
        let body = {
            "firstName": firstNameInput.value,
            "lastName": lastNameInput.value,
            "role": null
        };

        body = JSON.stringify(body);
        httpRequest.send(body);
    } else {
        appendEmployerDataAlert('Please, fill all the fields!', 'warning')
    }
}

function updatePassword() {
    let currentPassword = document.getElementById("employerCurrentPasswordInput").value;
    let newPassword = document.getElementById("employerNewPasswordInput").value;
    let confirmPassword = document.getElementById("employerConfirmPasswordInput").value;

    if (currentPassword !== '' && newPassword !== '' && confirmPassword !== '') {
        if (newPassword !== currentPassword) {
            if (newPassword === confirmPassword) {
                const httpRequest = new XMLHttpRequest();

                httpRequest.open("PUT", "/users/password/" + userId, true);
                httpRequest.setRequestHeader("Content-Type", "application/json");
                httpRequest.onreadystatechange = function () {
                    if (httpRequest.readyState === XMLHttpRequest.DONE) {
                        if (httpRequest.status === 200) {
                            appendEmployerPasswordAlert('You successfully changed your password!', 'success')
                        } else {
                            let error = httpRequest.responseText;
                            console.log(error);
                        }
                    }
                }

                let body = {
                    "currentPassword": currentPassword,
                    "newPassword": newPassword
                }

                body = JSON.stringify(body);
                httpRequest.send(body)
            } else {
                appendEmployerPasswordAlert('Passwords are not same!', 'warning')
            }
        } else {
            appendEmployerPasswordAlert('The new password and current password should not be the same!', 'warning')
        }
    } else {
        appendEmployerPasswordAlert('Please, fill all the fields!', 'warning')
    }
}

function setUserData(user) {
    overviewEmployerFullName.innerHTML = `${user.firstName} ${user.lastName}`;
    overviewEmployerEmail.innerHTML = user.username;

    firstNameInput.value = user.firstName;
    lastNameInput.value = user.lastName;
    emailInput.value = user.username;

    topFunction();
}