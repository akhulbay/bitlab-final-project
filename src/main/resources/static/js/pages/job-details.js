let userId = document.getElementById("jobDetailsUserId").value;
let jobId = document.getElementById("jobDetailsJobId").value;

let title = document.getElementById("jobDetailsTitle");
let appliedUsersCount = document.getElementById("jobDetailsAppliedUsersCount");
let experience = document.getElementById("jobDetailsExperience");
let employeeType = document.getElementById("jobDetailsEmployeeType");
let position = document.getElementById("jobDetailsPosition");
let offeredSalary = document.getElementById("jobDetailsOfferedSalary");
let desc = document.getElementById("jobDetailsDesc");
let responsibilitiesList = document.getElementById("jobDetailsResponsibilitiesList");
let skillsList = document.getElementById("jobDetailsSkillsList");
let keySkillsList = document.getElementById("jobDetailsKeySkillsList");

let overviewTitle = document.getElementById("jobDetailsOverviewTitle");
let overviewExperience = document.getElementById("jobDetailsOverviewExperience");
let overviewCity = document.getElementById("jobDetailsOverviewCity");
let overviewOfferedSalary = document.getElementById("jobDetailsOverviewOfferedSalary");
let overviewQualification = document.getElementById("jobDetailsOverviewQualification");
let overviewCategory = document.getElementById("jobDetailsOverviewCategory");
let overviewCreatedAt = document.getElementById("jobDetailsOverviewCreatedAt");

let companyImg = document.getElementById("jobDetailsCompanyImg");
let companyName = document.getElementById("jobDetailsCompanyName");
let companyWebsite = document.getElementById("jobDetailsCompanyWebsite");
let companyLocation = document.getElementById("jobDetailsCompanyLocation");
let companyDetailsLink = document.getElementById("jobDetailsCompanyDetailsLink");

let jobDetailsApplyButton = document.getElementById("jobDetailsApplyButton");
let jobDetailsCoverLetter = document.getElementById("jobDetailsCoverLetter");

let userProfile = null;

const applyAlert = document.getElementById('userDetailsApplyAlert')
const appendApplyAlert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible text-center" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')

    applyAlert.append(wrapper)
}

let doesUserApplied = false;

getJob();
getUserProfile();
getApplicationsCount();

function getJob() {
    const httpRequest = new XMLHttpRequest();

    httpRequest.open("GET", "/jobs/" + jobId, true);
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                let job = JSON.parse(httpRequest.responseText);
                setJobData(job);
                setCompanyData(job.company);
                getCompanyImage(job.company.id)
            }
        }
    }
    httpRequest.send();
}

function getUserProfile() {
    const httpRequest = new XMLHttpRequest();

    httpRequest.open("GET", "/user-profiles/user/" + userId, true);
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                userProfile = JSON.parse(httpRequest.responseText);
                checkIfUserApplied();
            }
        }
    }
    httpRequest.send();
}

function checkIfUserApplied() {
    const httpRequest = new XMLHttpRequest();

    httpRequest.open("GET", `/user-job-applications?userProfileId=${userProfile.id}&jobId=${jobId}`, true);
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                let resultList = JSON.parse(httpRequest.responseText);
                if (resultList.length === 1) {
                    doesUserApplied = true;
                    setUserApplied();
                    appendApplyAlert("You already applied for this job!", "warning")
                    jobDetailsCoverLetter.value = resultList[0].coverLetter;
                }
            }
        }
    }
    httpRequest.send();
}

function getCompanyImage(companyId) {
    const httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", "/companies/" + companyId + "/avatar", true);
    httpRequest.responseType = "arraybuffer";
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                const imageBytes = new Uint8Array(httpRequest.response);
                const blob = new Blob([imageBytes], {type: "image/jpeg"});

                companyImg.src = URL.createObjectURL(blob);
            }
        }
    }
    httpRequest.send();
}

function getApplicationsCount() {
    const httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", "/user-job-applications/count/" + jobId, true);
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                setApplicationCount(httpRequest.response)
            }
        }
    }
    httpRequest.send();
}

function applyForJob() {
    if (!doesUserApplied) {
        let coverLetter = jobDetailsCoverLetter.value;
        const httpRequest = new XMLHttpRequest();
        httpRequest.open("POST", "/user-job-applications", true);
        httpRequest.setRequestHeader("Content-Type", "application/json");
        httpRequest.onreadystatechange = () => {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 201) {
                    setUserApplied();
                    appendApplyAlert("You successfully applied for this job!", "success");
                    getApplicationsCount();
                } else {
                    appendApplyAlert("Something went wrong, please try later!", "warning")
                }
            }
        }
        let body = {
            "userProfileId": userProfile.id,
            "jobId": jobId,
            "coverLetter": coverLetter
        }
        body = JSON.stringify(body);
        httpRequest.send(body);
    } else {
        appendApplyAlert("You cannot apply 2nd time!", "danger")
    }
}

function setJobData(job) {
    title.innerHTML = job.title;
    experience.innerHTML = job.experience;
    employeeType.innerHTML = getEmployeeType(job.workSchedule);
    position.innerHTML = job.position;
    offeredSalary.innerHTML = " $" + job.offeredSalary + "/ month";
    desc.innerHTML = job.description;
    responsibilitiesList.innerHTML = getResponsibilities(job.responsibilities)
    skillsList.innerHTML = getSkills(job.requiredSkills)
    keySkillsList.innerHTML = getKeySkills(job.keySkills)

    overviewTitle.innerHTML = job.title;
    overviewExperience.innerHTML = job.experience;
    overviewCity.innerHTML = job.city;
    overviewOfferedSalary.innerHTML = " $" + job.offeredSalary;
    overviewQualification.innerHTML = job.qualification + " Degree";
    overviewCategory.innerHTML = job.category;
    overviewCreatedAt.innerHTML = job.createdAt;
}

function setCompanyData(company) {
    companyName.innerHTML = company.name;
    companyWebsite.innerHTML = company.website;
    companyLocation.innerHTML = company.location;
    companyDetailsLink.href = "/company-details/" + company.id;
}

function setApplicationCount(number) {
    let result;
    switch (number) {
        case '0':
            result = 'Be the first to respond'
            break;
        case '1':
            result = '1 person already applied'
            break;
        default:
            result = `${number} people already applied`
    }
    appliedUsersCount.innerHTML = result;
}

function getEmployeeType(employeeType) {
    let result;
    switch (employeeType) {
        case "FULL_TIME":
            result = "Full Time"
            break;
        case "PART_TIME":
            result = "Part Time"
            break;
        case "INTERNSHIP":
            result = "Internship"
            break;
        case "FREELANCE":
            result = "Freelance"
            break;
        default:
            result = "Not defined";
    }
    return result;
}

function getResponsibilities(responsibilities) {
    let result = '';
    let respList = responsibilities.split('; ');
    for (let i = 0; i < respList.length; i++) {
        result += `
            <li><i class="uil uil-circle"></i> ${respList[i]}</li>
        `
    }
    return result;
}

function getSkills(skills) {
    let result = '';
    let skillsList = skills.split('; ');
    for (let i = 0; i < skillsList.length; i++) {
        result += `
            <li><i class="uil uil-circle"></i> ${skillsList[i]}</li>
        `
    }
    return result;
}

function getKeySkills(keySkills) {
    let result = '';
    let keySkillsList = keySkills.split(', ');
    for (let i = 0; i < keySkillsList.length; i++) {
        result += `
            <span class="badge bg-primary">${keySkillsList[i]}</span>
        `
    }
    return result;
}

function setUserApplied() {
    jobDetailsApplyButton.innerHTML = `
                    You already applied <i class="uil uil-check"></i>
                `;
}



















