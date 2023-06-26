let userId = document.getElementById("userId").value;

let overviewImage = document.getElementById("overviewImg");
let overviewFullName = document.getElementById("overviewFullName");
let overviewCategory = document.getElementById("overviewCategory");

let contactEmail = document.getElementById("contactEmail");
let contactPhone = document.getElementById("contactPhone");
let contactLocation = document.getElementById("contactLocation");

let telegramLink = document.getElementById("userTelegram");
let linkedinLink = document.getElementById("userLinkedin");
let githubLink = document.getElementById("userGithub");
let facebookLink = document.getElementById("userFacebook");

let overviewAboutUser = document.getElementById("overviewAboutUser");
let overviewDegree = document.getElementById("overviewUsersDegree");
let overviewMajor = document.getElementById("overviewUsersMajor");
let overviewUniAndStudyYears = document.getElementById("overviewUsersUniAndStudyYears");
let overviewSkills = document.getElementById("overviewSkills");
let overviewLanguages = document.getElementById("overviewLanguages");

let personalDataFirstName = document.getElementById("firstName");
let personalDataLastName = document.getElementById("lastName");
let personalDataUsername = document.getElementById("email");

let profileImgInput = document.getElementById("profileImgFile");
let profileImg = document.getElementById("profileImg");
let profileCategory = document.getElementById("profileCategory");
let profilePhoneNumber = document.getElementById("profilePhoneNumber");
let profileAboutUser = document.getElementById("profileAboutUser");
let profileLanguages = document.getElementById("profileLanguages");
let profileLocation = document.getElementById("profileLocation");
let facebookLinkInput = document.getElementById("facebookLink");
let telegramLinkInput = document.getElementById("telegramLink");
let linkedinLinkInput = document.getElementById("linkedinLink");
let githubLinkInput = document.getElementById("githubLink");
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
        `<div class="alert alert-${type} alert-dismissible text-center" role="alert">`,
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
        `<div class="alert alert-${type} alert-dismissible text-center" role="alert">`,
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
        `<div class="alert alert-${type} alert-dismissible text-center" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')

    passwordAlert.append(wrapper)
}


let hasProfile = false;
let profileId = null;

pageInit(userId);


function pageInit(userId) {
    getProfileData(userId);
}

function getProfileData(userId) {
    const httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", "/user-profiles/user/" + userId, true);
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                let profile = JSON.parse(httpRequest.responseText);
                setProfileData(profile);
                setUserData(profile.user);
            } else if (httpRequest.status === 404) {
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
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                let user = JSON.parse(httpRequest.responseText);
                setUserData(user)
            }
        }
    }
    httpRequest.send();
}

function getProfileImage() {
    const httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", "/user-profiles/" + profileId + "/avatar", true);
    httpRequest.responseType = "arraybuffer";
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                const imageBytes = new Uint8Array(httpRequest.response);
                const blob = new Blob([imageBytes], {type: "image/jpeg"});

                const imageUrl = URL.createObjectURL(blob);
                overviewImage.src = imageUrl;
                profileImg.src = imageUrl;
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
        && facebookLinkInput.value !== '' && telegramLinkInput.value !== '' && linkedinLinkInput.value !== '' && githubLinkInput.value !== ''
        && profileSkills.value !== '' && eduInstitution.value !== '' && eduFaculty.value !== '' && eduMajor.value !== ''
        && yearOfAdmission.value !== '' && yearOfGraduation.value !== '' && profileImgInput.value !== '') {

        const profileImageFile = profileImgInput.files[0];
        const httpRequest = new XMLHttpRequest();
        const formData = new FormData();

        formData.append('image', profileImageFile);
        formData.append('aboutUser', profileAboutUser.value);
        formData.append('phoneNumber', profilePhoneNumber.value);
        formData.append('accountType', profileCategory.value);
        formData.append('languages', profileLanguages.value);
        formData.append('location', profileLocation.value);
        formData.append('facebookLink', facebookLinkInput.value);
        formData.append('telegramLink', telegramLinkInput.value);
        formData.append('linkedinLink', linkedinLinkInput.value);
        formData.append('githubLink', githubLinkInput.value);
        formData.append('skills', profileSkills.value);
        formData.append('degree', eduDegree.value);
        formData.append('university', eduInstitution.value);
        formData.append('faculty', eduFaculty.value);
        formData.append('major', eduMajor.value);
        formData.append('yearOfAdmission', yearOfAdmission.value);
        formData.append('yearOfGraduation', yearOfGraduation.value);
        formData.append('userId', userId);

        httpRequest.open("PUT", "/user-profiles/" + profileId, true);
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

        httpRequest.send(formData);
    } else {
        appendProfileAlert('Please, fill all the fields!', 'warning')
    }
}

function createProfile() {
    if (profilePhoneNumber.value !== '' && profileAboutUser.value !== '' && profileLanguages.value !== ''
        && facebookLinkInput.value !== '' && telegramLinkInput.value !== '' && linkedinLinkInput.value !== '' && githubLinkInput.value !== ''
        && profileSkills.value !== '' && eduInstitution.value !== '' && eduFaculty.value !== '' && eduMajor.value !== ''
        && yearOfAdmission.value !== '' && yearOfGraduation.value !== '' && profileImgInput.value !== '') {

        const profileImageFile = profileImgInput.files[0];
        const httpRequest = new XMLHttpRequest();
        const formData = new FormData();

        formData.append('image', profileImageFile);
        formData.append('aboutUser', profileAboutUser.value);
        formData.append('phoneNumber', profilePhoneNumber.value);
        formData.append('accountType', profileCategory.value);
        formData.append('languages', profileLanguages.value);
        formData.append('location', profileLocation.value);
        formData.append('facebookLink', facebookLinkInput.value);
        formData.append('telegramLink', telegramLinkInput.value);
        formData.append('linkedinLink', linkedinLinkInput.value);
        formData.append('githubLink', githubLinkInput.value);
        formData.append('skills', profileSkills.value);
        formData.append('degree', eduDegree.value);
        formData.append('university', eduInstitution.value);
        formData.append('faculty', eduFaculty.value);
        formData.append('major', eduMajor.value);
        formData.append('yearOfAdmission', yearOfAdmission.value);
        formData.append('yearOfGraduation', yearOfGraduation.value);
        formData.append('userId', userId);

        httpRequest.open("POST", "/user-profiles", true);
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

        httpRequest.send(formData);
    } else {
        appendProfileAlert('Please, fill all the fields!', 'warning')
    }
}

function updatePassword() {
    let currentPassword = document.getElementById("currentPasswordInput").value;
    let newPassword = document.getElementById("newPasswordInput").value;
    let confirmPassword = document.getElementById("confirmPasswordInput").value;

    if (currentPassword !== '' && newPassword !== '' && confirmPassword !== '') {
        if (newPassword !== currentPassword) {
            if (newPassword === confirmPassword) {
                const httpRequest = new XMLHttpRequest();

                httpRequest.open("PUT", "/users/password/" + userId, true);
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
            appendPasswordAlert('The new password and current password should not be the same!', 'warning')
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
    facebookLinkInput.value = newUserProfile.facebookLink
    telegramLinkInput.value = newUserProfile.telegramLink
    linkedinLinkInput.value = newUserProfile.linkedinLink
    githubLinkInput.value = newUserProfile.githubLink
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
    overviewUniAndStudyYears.innerHTML = newUserProfile.university + ' (' + newUserProfile.yearOfAdmission
        + ' - ' + newUserProfile.yearOfGraduation + ')';

    overviewSkills.innerHTML = getSkills(newUserProfile.skills);
    overviewLanguages.innerHTML = getLanguages(newUserProfile.languages);

    facebookLink.href = newUserProfile.facebookLink;
    linkedinLink.href = newUserProfile.linkedinLink;
    telegramLink.href = `https://web.telegram.org/k/#${newUserProfile.telegramLink}`;
    githubLink.href = `https://github.com/${newUserProfile.githubLink}`

    profileId = newUserProfile.id;
    hasProfile = true;

    topFunction();
    getProfileImage();
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