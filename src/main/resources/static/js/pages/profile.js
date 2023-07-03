let userId = document.getElementById("userId").value;

let overviewImage = document.getElementById("overviewImg");
let overviewFullName = document.getElementById("overviewFullName");
let overviewCategory = document.getElementById("overviewCategory");

let contactEmail = document.getElementById("contactEmail");
let contactPhone = document.getElementById("contactPhone");
let contactLocation = document.getElementById("contactLocation");
let contactExperienceYears = document.getElementById("contactExperienceYears");

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
let overviewAboutExperience = document.getElementById("overviewAboutExperience");

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
let profileExperienceYears = document.getElementById("profileExperienceYears");
let profileAboutExperience = document.getElementById("profileAboutExperience");

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

const avatarAlert = document.getElementById('avatarAlert')
const appendAvatarAlert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible text-center" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')

    avatarAlert.append(wrapper)
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

getProfileData();

function getProfileData() {
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
                    getNavbarUserData();
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

function saveAvatar() {
    if (hasProfile) {
        if (profileImgInput.value !== '') {
            const profileImageFile = profileImgInput.files[0];
            const httpRequest = new XMLHttpRequest();
            const formData = new FormData();

            formData.append('image', profileImageFile);

            httpRequest.open("PUT", `/user-profiles/${profileId}/avatar`, true);
            httpRequest.responseType = "arraybuffer";
            httpRequest.onreadystatechange = function () {
                if (httpRequest.readyState === XMLHttpRequest.DONE) {
                    if (httpRequest.status === 200) {
                        const imageBytes = new Uint8Array(httpRequest.response);
                        const blob = new Blob([imageBytes], {type: "image/jpeg"});

                        const imageUrl = URL.createObjectURL(blob);
                        overviewImage.src = imageUrl;
                        profileImg.src = imageUrl;
                        getNavbarProfile();
                    } else {
                        let error = httpRequest.responseText;
                        console.log(error);
                    }
                }
            }

            httpRequest.send(formData);
        } else {
            appendAvatarAlert("Please, upload an image", "warning");
        }
    } else {
        appendAvatarAlert("You should fill your profile data first!", "warning");
    }
}

function saveProfile() {
    hasProfile ? updateProfile() : createProfile();
}

function updateProfile() {
    if (profilePhoneNumber.value !== '' && profileAboutUser.value !== '' && profileLanguages.value !== ''
        && facebookLinkInput.value !== '' && telegramLinkInput.value !== '' && linkedinLinkInput.value !== ''
        && githubLinkInput.value !== ''
        && profileSkills.value !== '' && eduInstitution.value !== '' && eduFaculty.value !== '' && eduMajor.value !== ''
        && yearOfAdmission.value !== '' && yearOfGraduation.value !== ''
        && profileExperienceYears.value !== '' && profileAboutExperience.value !== '') {
        const httpRequest = new XMLHttpRequest();

        const requestData = {
            "aboutUser": profileAboutUser.value,
            "phoneNumber": profilePhoneNumber.value,
            "accountType": profileCategory.value,
            "languages": profileLanguages.value,
            "location": profileLocation.value,
            "facebookLink": facebookLinkInput.value,
            "telegramLink": telegramLinkInput.value,
            "linkedinLink": linkedinLinkInput.value,
            "githubLink": githubLinkInput.value,
            "skills": profileSkills.value,
            "degree": eduDegree.value,
            "university": eduInstitution.value,
            "faculty": eduFaculty.value,
            "major": eduMajor.value,
            "yearOfAdmission": yearOfAdmission.value,
            "yearOfGraduation": yearOfGraduation.value,
            "userId": userId,
            "experienceYears": profileExperienceYears.value,
            "aboutExperience": profileAboutExperience.value,
        };

        httpRequest.open("PUT", "/user-profiles/" + profileId, true);
        httpRequest.setRequestHeader('Content-Type', 'application/json');

        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 200) {
                    let newUserProfile = JSON.parse(httpRequest.responseText)
                    setProfileData(newUserProfile);
                    appendProfileAlert('You successfully changed your profile data!', 'success');
                    topFunction();
                } else {
                    let error = httpRequest.responseText;
                    console.log(error);
                }
            }
        }

        httpRequest.send(JSON.stringify(requestData));
    } else {
        appendProfileAlert('Please, fill all the fields!', 'warning')
    }
}

function createProfile() {
    if (profilePhoneNumber.value !== '' && profileAboutUser.value !== '' && profileLanguages.value !== ''
        && facebookLinkInput.value !== '' && telegramLinkInput.value !== '' && linkedinLinkInput.value !== ''
        && githubLinkInput.value !== ''
        && profileSkills.value !== '' && eduInstitution.value !== '' && eduFaculty.value !== '' && eduMajor.value !== ''
        && yearOfAdmission.value !== '' && yearOfGraduation.value !== ''
        && profileExperienceYears.value !== '' && profileAboutExperience.value !== '') {

        const httpRequest = new XMLHttpRequest();

        const requestData = {
            "aboutUser": profileAboutUser.value,
            "phoneNumber": profilePhoneNumber.value,
            "accountType": profileCategory.value,
            "languages": profileLanguages.value,
            "location": profileLocation.value,
            "facebookLink": facebookLinkInput.value,
            "telegramLink": telegramLinkInput.value,
            "linkedinLink": linkedinLinkInput.value,
            "githubLink": githubLinkInput.value,
            "skills": profileSkills.value,
            "degree": eduDegree.value,
            "university": eduInstitution.value,
            "faculty": eduFaculty.value,
            "major": eduMajor.value,
            "yearOfAdmission": yearOfAdmission.value,
            "yearOfGraduation": yearOfGraduation.value,
            "userId": userId,
            "experienceYears": profileExperienceYears.value,
            "aboutExperience": profileAboutExperience.value,
        };

        httpRequest.open("POST", "/user-profiles", true);
        httpRequest.setRequestHeader('Content-Type', 'application/json');

        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 201) {
                    let newUserProfile = JSON.parse(httpRequest.responseText)
                    setProfileData(newUserProfile);
                    appendProfileAlert('You successfully changed your profile data!', 'success');
                    topFunction();
                } else {
                    let error = httpRequest.responseText;
                    console.log(error);
                }
            }
        }

        httpRequest.send(JSON.stringify(requestData));
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
                            appendPasswordAlert('You successfully changed your password!', 'success');
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
    profileExperienceYears.value = newUserProfile.experienceYears
    profileAboutExperience.value = newUserProfile.aboutExperience;

    overviewCategory.innerHTML = getCategory(newUserProfile.accountType);
    contactExperienceYears.innerHTML = newUserProfile.experienceYears + " years";
    contactPhone.innerHTML = newUserProfile.phoneNumber;
    contactLocation.innerHTML = newUserProfile.location;
    overviewAboutUser.innerHTML = newUserProfile.aboutUser;
    overviewDegree.innerHTML = newUserProfile.degree[0];
    overviewMajor.innerHTML = newUserProfile.major;
    overviewUniAndStudyYears.innerHTML = newUserProfile.university + ' (' + newUserProfile.yearOfAdmission
        + ' - ' + newUserProfile.yearOfGraduation + ')';

    overviewSkills.innerHTML = getSkills(newUserProfile.skills);
    overviewLanguages.innerHTML = getLanguages(newUserProfile.languages);
    overviewAboutExperience.innerHTML = newUserProfile.aboutExperience;

    facebookLink.href = newUserProfile.facebookLink;
    linkedinLink.href = newUserProfile.linkedinLink;
    telegramLink.href = `https://web.telegram.org/k/#${newUserProfile.telegramLink}`;
    githubLink.href = `https://github.com/${newUserProfile.githubLink}`

    profileId = newUserProfile.id;
    hasProfile = true;

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

function getCategory(category) {
    console.log(category)
    let result = '';
    switch (category) {
        case 1:
            result = 'Accounting';
            break;
        case 2:
            result = 'IT & Software';
            break;
        case 3:
            result = 'Marketing';
            break;
        case 4:
            result = 'Banking';
            break;
        case 5:
            result = 'Digital and Creative';
            break;
        case 6:
            result = 'Retail';
            break;
        case 7:
            result = 'Management';
            break;
        case 8:
            result = 'Human Resources';
            break;
    }
    return result;
}