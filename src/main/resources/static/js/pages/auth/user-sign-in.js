function login() {
    const httpRequest = new XMLHttpRequest();

    let username = document.getElementById("usernameInput").value;
    let password = document.getElementById("passwordInput").value;

    const params = "username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password);

    httpRequest.open("POST", "/authorize", true);

    httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                var response = httpRequest.responseText;
                console.log(response);
                // Дополнительные действия после успешной авторизации...
            } else {
                var error = httpRequest.statusText;
                console.log(error);
                // Дополнительные действия в случае ошибки...
            }
        }
    };
    httpRequest.send(params);
}