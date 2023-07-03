let navbarUserId = document.getElementById("navbarUserId").value;

let navbarUserImage = document.getElementById("navbarUserImage");
let navbarUsersFirstName = document.getElementById("navbarUsersFirstName");

getNavbarProfile();
getNavbarUserData();


function getNavbarUserData() {
    const httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", "/users/" + navbarUserId, true);
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                let user = JSON.parse(httpRequest.responseText);
                navbarUsersFirstName.innerHTML = user.firstName;
            }
        }
    }
    httpRequest.send();
}

function getNavbarProfile() {
    const httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", "/user-profiles/user/" + navbarUserId, true);
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                let profile = JSON.parse(httpRequest.responseText);
                getNavbarProfileImage(profile.id)
            } else {
                let error = httpRequest.responseText;
            }
        }
    }
    httpRequest.send();
}

function getNavbarProfileImage(profileId) {
    const httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", "/user-profiles/" + profileId + "/avatar", true);
    httpRequest.responseType = "arraybuffer";
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                const imageBytes = new Uint8Array(httpRequest.response);
                const blob = new Blob([imageBytes], {type: "image/jpeg"});

                navbarUserImage.src = URL.createObjectURL(blob);
            }
        }
    }
    httpRequest.send();
}
