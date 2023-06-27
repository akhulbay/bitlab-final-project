let jobId = document.getElementById("editJobId").value;
let companyId = null;

const editJobAlert = document.getElementById('editJobAlert')
const appendEditJobAlert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible text-center" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')

    editJobAlert.append(wrapper)
}

getJob();

let jobTitle = document.getElementById("editJobTitle");
let jobDesc = document.getElementById("editJobDescription");
let jobCategory = document.getElementById("editJobCategories");
let jobType = document.getElementById("editJobType");
let jobPosition = document.getElementById("editJobPosition");
let jobOfferedSalary = document.getElementById("editJobOfferedSalary");
let jobQualification = document.getElementById("editJobQualification");
let jobCity = document.getElementById("editJobCity");
let jobExperience = document.getElementById("editJobExperience");
let jobResponsibilities = document.getElementById("editJobResponsibilities");
let jobRequiredSkills = document.getElementById("editJobRequiredSkills");
let jobKeySkills = document.getElementById("editJobKeySkills");

function getJob() {
    const httpRequest = new XMLHttpRequest();

    httpRequest.open("GET", "/jobs/" + jobId, true);
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                let job = JSON.parse(httpRequest.responseText);
                companyId = job.company.id;
                setInputs(job);
            } else {
                let error = httpRequest.responseText;
                console.log(error);
            }
        }
    }
    httpRequest.send();
}

function updateJob() {
    if (jobTitle.value !== '' && jobDesc.value !== '' && jobCategory.value !== ''
        && jobType.value !== '' && jobPosition.value !== '' && jobOfferedSalary.value !== ''
        && jobQualification.value !== '' && jobCity.value !== '' && jobExperience.value !== ''
        && jobResponsibilities.value !== '' && jobRequiredSkills.value !== '' && jobKeySkills.value !== '') {
        const httpRequest = new XMLHttpRequest();

        httpRequest.open("PUT", "/jobs/" + jobId, true);
        httpRequest.setRequestHeader("Content-Type", "application/json");
        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 200) {
                    let job = JSON.parse(httpRequest.responseText);
                    setInputs(job);
                    appendEditJobAlert('You successfully updated a job!', 'success');
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
        appendEditJobAlert("Please, fill all the fields", "warning")
    }
}

function setInputs(job) {
    jobTitle.value = job.title
    jobDesc.value = job.description
    jobCategory.value = job.category
    jobType.value = job.workSchedule
    jobPosition.value = job.position
    jobOfferedSalary.value = job.offeredSalary
    jobQualification.value = job.qualification
    jobCity.value = job.city
    jobExperience.value = job.experience
    jobResponsibilities.value = job.responsibilities
    jobRequiredSkills.value = job.requiredSkills
    jobKeySkills.value = job.keySkills
}