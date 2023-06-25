
const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
const appendAlert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible text-center" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')

    alertPlaceholder.append(wrapper)
}

function registerUser() {

    const httpRequest = new XMLHttpRequest();

    let firstName = document.getElementById("firstNameInput").value;
    let lastName = document.getElementById("lastNameInput").value;
    let username = document.getElementById("usernameInput").value;
    let password = document.getElementById("passwordInput").value;
    let repeatPassword = document.getElementById("confirmPasswordInput").value;

    httpRequest.open("POST", "/users/user", true);
    httpRequest.setRequestHeader("Content-Type", "application/json")
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 201) {
                location.href = "/auth/signin/user"
            } else if (httpRequest.status === 409) {
                appendAlert('This email already exists!', 'danger')
            } else {
                let error = httpRequest.statusText;
                console.log(error);
            }
        }
    };

    if (firstName !== '' && lastName !== '' && username !== '' && password !== '' && repeatPassword !== '') {
        if (password === repeatPassword) {
            let body = {
                "firstName": firstName,
                "lastName": lastName,
                "username": username,
                "password": password
            };

            body = JSON.stringify(body);
            httpRequest.send(body);
        } else {
            appendAlert('Passwords are not same!', 'warning')
        }
    }

}