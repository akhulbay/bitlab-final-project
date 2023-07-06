
let userFirstName = document.getElementById("addUserFirstName");
let userLastName = document.getElementById("addUserLastName");
let userEmail = document.getElementById("addUserEmail");
let userRole = document.getElementById("addUserRoles");
let userPassword = document.getElementById("addUserPassword");
let confirmPassword = document.getElementById("addUserConfirmPassword");

const addUserAlert = document.getElementById('addUserAlert')
const appendAddUserAlert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible text-center" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')

    addUserAlert.append(wrapper)
}

function addUser() {
    if (userFirstName.value !== '' && userLastName.value !== '' && userEmail.value !== ''
    && userRole.value !== '' && userPassword.value !== '' && confirmPassword.value !== '') {
        if (userPassword.value === confirmPassword.value) {
            const httpRequest = new XMLHttpRequest();
            httpRequest.open("POST", "/users", true);
            httpRequest.setRequestHeader("Content-Type", "application/json");
            httpRequest.onreadystatechange = function () {
                if (httpRequest.readyState === XMLHttpRequest.DONE) {
                    if (httpRequest.status === 201) {
                        clearInputs();
                        appendAddUserAlert('You successfully created a user!', 'success');
                        topFunction();
                    } else if (httpRequest.status === 409) {
                        appendAddUserAlert('This email already exists!', 'warning');
                    } else {
                        let error = httpRequest.responseText;
                        console.log(error);
                    }
                }
            }
            let body = {
                "firstName": userFirstName.value,
                "lastName": userLastName.value,
                "username": userEmail.value,
                "password": userPassword.value,
                "role": userRole.value
            }
            body = JSON.stringify(body);
            httpRequest.send(body);
        }
    }
}

function clearInputs() {
    userFirstName.value = '';
    userLastName.value = '';
    userEmail.value = '';
    userRole.value = '';
    userPassword.value = '';
    confirmPassword.value = '';
}