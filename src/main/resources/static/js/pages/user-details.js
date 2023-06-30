let userId = document.getElementById("userDetailsId").value;

let overviewImage = document.getElementById("overviewUserDetailsImg");
let overviewFullName = document.getElementById("overviewUserDetailsFullName");
let overviewCategory = document.getElementById("overviewUserDetailsCategory");

let contactEmail = document.getElementById("contactUserDetailsEmail");
let contactPhone = document.getElementById("contactUserDetailsPhone");
let contactLocation = document.getElementById("contactUserDetailsLocation");
let contactExperienceYears = document.getElementById("contactUserDetailsExperienceYears");

let telegramLink = document.getElementById("userDetailsTelegram");
let linkedinLink = document.getElementById("userDetailsLinkedin");
let githubLink = document.getElementById("userDetailsGithub");
let facebookLink = document.getElementById("userDetailsFacebook");

let overviewAboutUser = document.getElementById("overviewUserDetailsAboutUser");
let overviewDegree = document.getElementById("overviewUserDetailsDegree");
let overviewMajor = document.getElementById("overviewUserDetailsMajor");
let overviewUniAndStudyYears = document.getElementById("overviewUserDetailsUniAndStudyYears");
let overviewSkills = document.getElementById("overviewUserDetailsSkills");
let overviewLanguages = document.getElementById("overviewUserDetailsLanguages");
let overviewAboutExperience = document.getElementById("overviewUserDetailsAboutExperience");

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

function setProfileData(newUserProfile) {
    overviewFullName.innerHTML = `${newUserProfile.user.firstName} ${newUserProfile.user.lastName}`
    overviewCategory.innerHTML = getCategory(newUserProfile.accountType);
    contactExperienceYears.innerHTML = newUserProfile.experienceYears + " years";
    contactPhone.innerHTML = newUserProfile.phoneNumber;
    contactLocation.innerHTML = newUserProfile.location;
    contactEmail.innerHTML = newUserProfile.user.username;
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