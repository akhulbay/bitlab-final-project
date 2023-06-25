let userId = document.getElementById("userId").value;

let overviewFullName = document.getElementById("overviewFullName");
let overviewCategory = document.getElementById("overviewCategory");

let contactEmail = document.getElementById("contactEmail");
let contactPhone = document.getElementById("contactPhone");
let contactLocation = document.getElementById("contactLocation");

let overviewAboutUser = document.getElementById("overviewAboutUser");
let overviewDegree = document.getElementById("overviewUsersDegree");
let overviewMajor = document.getElementById("overviewUsersMajor");
let overviewUniAndStudyYears = document.getElementById("overviewUsersUniAndStudyYears");
let overviewSkills = document.getElementById("overviewSkills");
let overviewLanguages = document.getElementById("overviewLanguages");

let personalDataFirstName = document.getElementById("firstName");
let personalDataLastName = document.getElementById("lastName");
let personalDataUsername = document.getElementById("email");

let profileCategory = document.getElementById("profileCategory");
let profilePhoneNumber = document.getElementById("profilePhoneNumber");
let profileAboutUser = document.getElementById("profileAboutUser");
let profileLanguages = document.getElementById("profileLanguages");
let profileLocation = document.getElementById("profileLocation");
let facebookLink = document.getElementById("facebookLink");
let telegramLink = document.getElementById("telegramLink");
let linkedinLink = document.getElementById("linkedinLink");
let githubLink = document.getElementById("githubLink");
let profileSkills = document.getElementById("profileSkills");
let eduDegree = document.getElementById("eduDegree");
let eduInstitution = document.getElementById("eduInstitution");
let eduFaculty = document.getElementById("eduFaculty");
let eduMajor = document.getElementById("eduMajor");
let yearOfAdmission = document.getElementById("yearOfAdmission");
let yearOfGraduation = document.getElementById("yearOfGraduation");

const profileAlert = document.getElementById('profileAlert')
const appendProfileAlert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')

    profileAlert.append(wrapper)
}

const userDataAlert = document.getElementById('userDataAlert')
const appendUserDataAlert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')

    userDataAlert.append(wrapper)
}

const passwordAlert = document.getElementById('passwordAlert')
const appendPasswordAlert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')

    passwordAlert.append(wrapper)
}


let hasProfile = false;
let profileId = null;

init(userId);


function init(userId) {
    getProfileData(userId);
}

function getProfileData(userId) {
    const httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", "/user-profiles/user/" + userId, true);
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState == XMLHttpRequest.DONE) {
            if (httpRequest.status == 200) {
                let profile = JSON.parse(httpRequest.responseText);
                setProfileData(profile);
                setUserData(profile.user);
            } else if (httpRequest.status == 404) {
                getUserData(userId);
            } else {
                let error = httpRequest.responseText;
                console.log(error);
            }
        }
    }
    httpRequest.send();
}

function getUserData(userId) {
    const httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", "/users/" + userId, true);
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState == XMLHttpRequest.DONE) {
            if (httpRequest.status == 200) {
                let user = JSON.parse(httpRequest.responseText);
                setUserData(user)
            }
        }
    }
    httpRequest.send();
}

function updatePersonalData() {
    if (personalDataFirstName.value !== '' && personalDataLastName.value !== '') {
        const httpRequest = new XMLHttpRequest();

        httpRequest.open("PUT", "/users/data/" + userId, true);
        httpRequest.setRequestHeader("Content-Type", "application/json");
        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 200) {
                    let newUser = JSON.parse(httpRequest.responseText);
                    setUserData(newUser);
                    appendUserDataAlert('You successfully changed your personal data!', 'success')
                }
            }
        }
        let body = {
            "firstName": personalDataFirstName.value,
            "lastName": personalDataLastName.value,
            "role": null
        };

        body = JSON.stringify(body);
        httpRequest.send(body);
    } else {
        appendUserDataAlert('Please, fill all the fields!', 'warning')
    }
}

function saveProfile() {
    hasProfile ? updateProfile() : createProfile();
}

function updateProfile() {
    if (profilePhoneNumber.value !== '' && profileAboutUser.value !== '' && profileLanguages.value !== ''
        && facebookLink.value !== '' && telegramLink.value !== '' && linkedinLink.value !== '' && githubLink.value !== ''
        && profileSkills.value !== '' && eduInstitution.value !== '' && eduFaculty.value !== '' && eduMajor.value !== ''
        && yearOfAdmission.value !== '' && yearOfGraduation.value !== '') {
        const httpRequest = new XMLHttpRequest();

        httpRequest.open("PUT", "/user-profiles/" + profileId, true);
        httpRequest.setRequestHeader("Content-Type", "application/json");
        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 200) {
                    let newUserProfile = JSON.parse(httpRequest.responseText)
                    setProfileData(newUserProfile);
                    appendProfileAlert('You successfully changed your profile data!', 'success')
                } else {
                    let error = httpRequest.responseText;
                    console.log(error);
                }
            }
        }
        let body = {
            "aboutUser": profileAboutUser.value,
            "phoneNumber": profilePhoneNumber.value,
            "accountType": profileCategory.value,
            "languages": profileLanguages.value,
            "location": profileLocation.value,
            "facebookLink": facebookLink.value,
            "telegramLink": telegramLink.value,
            "linkedinLink": linkedinLink.value,
            "githubLink": githubLink.value,
            "skills": profileSkills.value,
            "degree": eduDegree.value,
            "university": eduInstitution.value,
            "faculty": eduFaculty.value,
            "major": eduMajor.value,
            "yearOfAdmission": yearOfAdmission.value,
            "yearOfGraduation": yearOfGraduation.value,
            "userId": userId
        }

        body = JSON.stringify(body);
        httpRequest.send(body);
    } else {
        appendProfileAlert('Please, fill all the fields!', 'warning')
    }
}

function createProfile() {
    if (profilePhoneNumber.value !== '' && profileAboutUser.value !== '' && profileLanguages.value !== ''
        && facebookLink.value !== '' && telegramLink.value !== '' && linkedinLink.value !== '' && githubLink.value !== ''
        && profileSkills.value !== '' && eduInstitution.value !== '' && eduFaculty.value !== '' && eduMajor.value !== ''
        && yearOfAdmission.value !== '' && yearOfGraduation.value !== '') {
        const httpRequest = new XMLHttpRequest();

        httpRequest.open("POST", "/user-profiles", true);
        httpRequest.setRequestHeader("Content-Type", "application/json");
        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 201) {
                    let newUserProfile = JSON.parse(httpRequest.responseText)
                    setProfileData(newUserProfile);
                    appendProfileAlert('You successfully changed your profile data!', 'success')
                } else {
                    let error = httpRequest.responseText;
                    console.log(error);
                }
            }
        }
        let body = {
            "aboutUser": profileAboutUser.value,
            "phoneNumber": profilePhoneNumber.value,
            "accountType": profileCategory.value,
            "languages": profileLanguages.value,
            "location": profileLocation.value,
            "facebookLink": facebookLink.value,
            "telegramLink": telegramLink.value,
            "linkedinLink": linkedinLink.value,
            "githubLink": githubLink.value,
            "skills": profileSkills.value,
            "degree": eduDegree.value,
            "university": eduInstitution.value,
            "faculty": eduFaculty.value,
            "major": eduMajor.value,
            "yearOfAdmission": yearOfAdmission.value,
            "yearOfGraduation": yearOfGraduation.value,
            "userId": parseInt(userId)
        }

        body = JSON.stringify(body);
        httpRequest.send(body);
    } else {
        appendProfileAlert('Please, fill all the fields!', 'warning')
    }
}

function updatePassword() {
    let currentPassword = document.getElementById("currentPasswordInput").value;
    let newPassword = document.getElementById("newPasswordInput").value;
    let confirmPassword = document.getElementById("confirmPasswordInput").value;

    if (currentPassword !== '' && newPassword !== '' && confirmPassword !== '') {
        if (newPassword === currentPassword) {
            appendPasswordAlert('The new password and current password should not be the same!', 'warning')
        }
        if (newPassword === confirmPassword) {
            const httpRequest = new XMLHttpRequest();

            httpRequest.open("PUT", "/users/password/"+userId, true);
            httpRequest.setRequestHeader("Content-Type", "application/json");
            httpRequest.onreadystatechange = function () {
                if (httpRequest.readyState === XMLHttpRequest.DONE) {
                    if (httpRequest.status === 200) {
                        appendPasswordAlert('You successfully changed your password!', 'success')
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
            appendPasswordAlert('Passwords are not same!', 'warning')
        }
    } else {
        appendPasswordAlert('Please, fill all the fields!', 'warning')
    }
}

function setProfileData(newUserProfile) {
    profileCategory.value = newUserProfile.accountType
    profilePhoneNumber.value = newUserProfile.phoneNumber
    profileAboutUser.value = newUserProfile.aboutUser
    profileLanguages.value = newUserProfile.languages
    profileLocation.value = newUserProfile.location
    facebookLink.value = newUserProfile.facebookLink
    telegramLink.value = newUserProfile.telegramLink
    linkedinLink.value = newUserProfile.linkedinLink
    githubLink.value = newUserProfile.githubLink
    profileSkills.value = newUserProfile.skills
    eduDegree.value = newUserProfile.degree
    eduInstitution.value = newUserProfile.university
    eduFaculty.value = newUserProfile.faculty
    eduMajor.value = newUserProfile.major
    yearOfAdmission.value = newUserProfile.yearOfAdmission
    yearOfGraduation.value = newUserProfile.yearOfGraduation

    overviewCategory.innerHTML = newUserProfile.accountType;
    contactPhone.innerHTML = newUserProfile.phoneNumber;
    contactLocation.innerHTML = newUserProfile.location;
    overviewAboutUser.innerHTML = newUserProfile.aboutUser;
    overviewDegree.innerHTML = newUserProfile.degree[0];
    overviewMajor.innerHTML = newUserProfile.major;
    overviewUniAndStudyYears.innerHTML = newUserProfile.university + ' (' + newUserProfile.yearOfAdmission + ' - ' + newUserProfile.yearOfGraduation + ')';

    overviewSkills.innerHTML = getSkills(newUserProfile.skills);
    overviewLanguages.innerHTML = getLanguages(newUserProfile.languages);

    profileId = newUserProfile.id;
    hasProfile = true;

    topFunction();
}

function setUserData(user) {
    overviewFullName.innerHTML = `${user.firstName} ${user.lastName}`;
    contactEmail.innerHTML = user.username;

    personalDataFirstName.value = user.firstName;
    personalDataLastName.value = user.lastName;
    personalDataUsername.value = user.username;

    topFunction();
}

function getSkills(skills) {
    let divContent = "";
    let skillsList = skills.split(', ');
    for (let i = 0; i < skillsList.length; i++) {
        divContent += `<span class="badge fs-13 bg-soft-blue mt-2 ms-2">${skillsList[i]}</span>`;
    }
    return divContent;
}

function getLanguages(languages) {
    let divContent = "";
    let languagesList = languages.split(', ');
    for (let i = 0; i < languagesList.length; i++) {
        divContent += `<span class="badge fs-13 bg-soft-success mt-2 ms-2">${languagesList[i]}</span>`;
    }
    return divContent;
}