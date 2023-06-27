let userId = document.getElementById("postJobUserId").value;

const postJobAlert = document.getElementById('postJobAlert')
const appendPostJobAlert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible text-center" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')

    postJobAlert.append(wrapper)
}

let jobTitle = document.getElementById("postJobTitle");
let jobDesc = document.getElementById("postJobDescription");
let jobCategory = document.getElementById("postJobCategories");
let jobType = document.getElementById("postJobType");
let jobPosition = document.getElementById("postJobPosition");
let jobOfferedSalary = document.getElementById("postJobOfferedSalary");
let jobQualification = document.getElementById("postJobQualification");
let jobCity = document.getElementById("postJobCity");
let jobExperience = document.getElementById("postJobExperience");
let jobResponsibilities = document.getElementById("postJobResponsibilities");
let jobRequiredSkills = document.getElementById("postJobRequiredSkills");
let jobKeySkills = document.getElementById("postJobKeySkills");

let companyId = null;

getCompany();

function createJob() {
    if (jobTitle.value !== '' && jobDesc.value !== '' && jobCategory.value !== ''
        && jobType.value !== '' && jobPosition.value !== '' && jobOfferedSalary.value !== ''
        && jobQualification.value !== '' && jobCity.value !== '' && jobExperience.value !== ''
        && jobResponsibilities.value !== '' && jobRequiredSkills.value !== '' && jobKeySkills.value !== '') {
        const httpRequest = new XMLHttpRequest();

        httpRequest.open("POST", "/jobs", true);
        httpRequest.setRequestHeader("Content-Type", "application/json");
        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 201) {
                    let result = httpRequest.responseText;
                    clearInputs();
                    appendPostJobAlert('You successfully posted a job!', 'success');
                    topFunction();
                } else {
                    let error = httpRequest.responseText;
                    console.log(error);
                }
            }
        }
        let body = {
            "title": jobTitle.value,
            "offeredSalary": jobOfferedSalary.value,
            "description": jobDesc.value,
            "city": jobCity.value,
            "responsibilities": jobResponsibilities.value,
            "requiredSkills": jobRequiredSkills.value,
            "workSchedule": jobType.value,
            "keySkills": jobKeySkills.value,
            "position": jobPosition.value,
            "category": jobCategory.value,
            "experience": jobExperience.value,
            "qualification": jobQualification.value,
            "companyId": companyId
        }

        body = JSON.stringify(body);
        httpRequest.send(body);
    } else {
        appendPostJobAlert("Please, fill all the fields", "warning")
    }
}

function getCompany() {
    const httpRequest = new XMLHttpRequest();

    httpRequest.open("GET", "/companies/user/" + userId, true);
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                let company = JSON.parse(httpRequest.responseText);
                companyId = company.id;
            } else if (httpRequest.status === 404) {

            } else {
                let error = httpRequest.responseText;
                console.log(error);
            }
        }
    }
    httpRequest.send();
}

function clearInputs() {
    jobTitle.value = ''
    jobDesc.value = ''
    jobCategory.value = ''
    jobType.value = ''
    jobPosition.value = ''
    jobOfferedSalary.value = ''
    jobQualification.value = ''
    jobCity.value = ''
    jobExperience.value = ''
    jobResponsibilities.value = ''
    jobRequiredSkills.value = ''
    jobKeySkills.value = ''
}