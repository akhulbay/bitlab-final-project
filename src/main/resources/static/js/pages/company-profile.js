let userId = document.getElementById("companyProfileUserId").value;

let overviewCompanyImg = document.getElementById("overviewCompanyImg");
let overviewCompanyName = document.getElementById("overviewCompanyName");
let overviewCompanyEstablishedDate = document.getElementById("overviewCompanyEstablishedDate");
let overviewCompanyLinkedinLink = document.getElementById("overviewCompanyLinkedinLink");
let overviewCompanyWhatsappLink = document.getElementById("overviewCompanyWhatsappLink");
let overviewCompanyOwnerName = document.getElementById("overviewCompanyOwnerName");
let overviewCompanyEmployeesNumber = document.getElementById("overviewCompanyEmployeesNumber");
let overviewCompanyLocation = document.getElementById("overviewCompanyLocation");
let overviewCompanyWebsite = document.getElementById("overviewCompanyWebsite");
let overviewCompanyEstablishedDate2 = document.getElementById("overviewCompanyEstablishedDate2");
let companyContactLink = document.getElementById("companyContactLink");
let overviewAboutCompany = document.getElementById("overviewAboutCompany");

let companyImg = document.getElementById("companyImg");
let companyImgInput = document.getElementById("companyImgInput");
let companyNameInput = document.getElementById("companyNameInput");
let ownerNameInput = document.getElementById("ownerNameInput");
let establishedDateInput = document.getElementById("establishedDateInput");
let companyDescriptionInput = document.getElementById("companyDescriptionInput");
let employeesNumberInput = document.getElementById("employeesNumberInput");
let companyLocationInput = document.getElementById("companyLocationInput");
let companyWebsiteInput = document.getElementById("companyWebsiteInput");
let companyLinkedinInput = document.getElementById("companyLinkedinInput");
let companyWhatsappInput = document.getElementById("companyWhatsappInput");

const companyAlert = document.getElementById('companyAlert')
const appendCompanyAlert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible text-center" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')

    companyAlert.append(wrapper)
}


let hasCompanyProfile = false;
let companyId = null;

getCompany();

function getCompany() {
    const httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", "/companies/user/" + userId, true);
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                let company = JSON.parse(httpRequest.responseText);
                setCompanyData(company);
                getCompanyOpenJobs();
            } else if (httpRequest.status === 404) {

            } else {
                let error = httpRequest.responseText;
                console.log(error);
            }
        }
    }
    httpRequest.send();
}

function getCompanyImage() {
    const httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", "/companies/" + companyId + "/avatar", true);
    httpRequest.responseType = "arraybuffer";
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                const imageBytes = new Uint8Array(httpRequest.response);
                const blob = new Blob([imageBytes], {type: "image/jpeg"});

                const imageUrl = URL.createObjectURL(blob);
                overviewCompanyImg.src = imageUrl;
                companyImg.src = imageUrl;
            }
        }
    }
    httpRequest.send();
}

function getCompanyOpenJobs() {
    const httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", "/jobs?companyId=" + companyId, true);
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                let jobList = JSON.parse(httpRequest.responseText);
                setCompanyOpenJobs(jobList);
            }
        }
    }
    httpRequest.send();
}

function saveCompany() {
    hasCompanyProfile ? updateCompany() : createCompany();
}

function updateCompany() {
    if (companyImgInput.value !== '' && companyNameInput.value !== '' && ownerNameInput.value !== ''
        && establishedDateInput.value !== '' && companyDescriptionInput.value !== '' && employeesNumberInput.value !== ''
        && companyLocationInput.value !== '' && companyWebsiteInput.value !== '' && companyLinkedinInput.value !== ''
        && companyWhatsappInput.value !== '') {

        const companyImageFile = companyImgInput.files[0];
        const httpRequest = new XMLHttpRequest();
        const formData = new FormData();

        formData.append('image', companyImageFile);
        formData.append('name', companyNameInput.value)
        formData.append('aboutCompany', companyDescriptionInput.value)
        formData.append('location', companyLocationInput.value)
        formData.append('website', companyWebsiteInput.value)
        formData.append('establishDate', establishedDateInput.value)
        formData.append('employeesNumber', employeesNumberInput.value)
        formData.append('whatsappLink', companyWebsiteInput.value)
        formData.append('linkedinLink', companyLinkedinInput.value)
        formData.append('ownerName', ownerNameInput.value)
        formData.append('userId', userId)

        httpRequest.open("PUT", "/companies/" + companyId, true);
        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 200) {
                    let company = JSON.parse(httpRequest.responseText)
                    setCompanyData(company);
                    appendCompanyAlert('You successfully changed your profile data!', 'success')
                } else {
                    let error = httpRequest.responseText;
                    console.log(error);
                }
            }
        }

        httpRequest.send(formData);
    } else {
        appendCompanyAlert("Please, fill all the fields!", "warning");
    }
}

function createCompany() {
    if (companyImgInput.value !== '' && companyNameInput.value !== '' && ownerNameInput.value !== ''
        && establishedDateInput.value !== '' && companyDescriptionInput.value !== '' && employeesNumberInput.value !== ''
        && companyLocationInput.value !== '' && companyWebsiteInput.value !== '' && companyLinkedinInput.value !== ''
        && companyWhatsappInput.value !== '') {

        const companyImageFile = companyImgInput.files[0];
        const httpRequest = new XMLHttpRequest();
        const formData = new FormData();

        formData.append('image', companyImageFile);
        formData.append('name', companyNameInput.value)
        formData.append('aboutCompany', companyDescriptionInput.value)
        formData.append('location', companyLocationInput.value)
        formData.append('website', companyWebsiteInput.value)
        formData.append('establishDate', establishedDateInput.value)
        formData.append('employeesNumber', employeesNumberInput.value)
        formData.append('whatsappLink', companyWebsiteInput.value)
        formData.append('linkedinLink', companyLinkedinInput.value)
        formData.append('ownerName', ownerNameInput.value)
        formData.append('userId', userId)

        httpRequest.open("POST", "/companies", true);
        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 201) {
                    let company = JSON.parse(httpRequest.responseText)
                    setCompanyData(company);
                    appendCompanyAlert('You successfully changed your profile data!', 'success')
                } else {
                    let error = httpRequest.responseText;
                    console.log(error);
                }
            }
        }

        httpRequest.send(formData);
    } else {
        appendCompanyAlert("Please, fill all the fields!", "warning");
    }
}

function setCompanyData(company) {

    overviewCompanyName.innerHTML = company.name
    overviewCompanyEstablishedDate.innerHTML = company.establishDate
    overviewCompanyLinkedinLink.href = company.linkedinLink
    overviewCompanyWhatsappLink.href = company.whatsappLink
    overviewCompanyOwnerName.innerHTML = company.ownerName
    overviewCompanyEmployeesNumber.innerHTML = company.employeesNumber
    overviewCompanyLocation.innerHTML = company.location
    overviewCompanyWebsite.innerHTML = company.website
    overviewCompanyWebsite.href = company.website
    overviewCompanyEstablishedDate2.innerHTML = company.establishDate
    companyContactLink.href = company.whatsappLink
    overviewAboutCompany.innerHTML = company.aboutCompany

    companyNameInput.value = company.name
    ownerNameInput.value = company.ownerName
    establishedDateInput.value = company.establishDate
    companyDescriptionInput.value = company.aboutCompany
    employeesNumberInput.value = company.employeesNumber
    companyLocationInput.value = company.location
    companyWebsiteInput.value = company.website
    companyLinkedinInput.value = company.linkedinLink
    companyWhatsappInput.value = company.whatsappLink

    hasCompanyProfile = true;
    companyId = company.id;

    getCompanyImage();
    topFunction();
}

function setCompanyOpenJobs(jobList) {
    let jobListDiv = document.getElementById("companyOpenJobList");
    let result = '';
    for (let i = 0; i < jobList.length; i++) {
        result += `
            <div class="job-box card">
                <div class="p-3">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="mt-3 mt-lg-0">
                                <h5 class="fs-16 fw-medium mb-1"><a
                                        href="/job-details/${jobList[i].id}"
                                        class="text-dark">${jobList[i].title}</a> <small
                                        class="text-muted fw-normal">(Experience: ${getExperience(jobList[i].experience)})</small>
                                </h5>
                                <ul class="list-inline mb-0">
                                    <li class="list-inline-item">
                                        <p class="fs-14 mb-0">${jobList[i].company.name}</p>
                                    </li>
                                    <li class="list-inline-item">
                                        <p class="fs-14 mb-0"><i
                                                class="mdi mdi-map-marker" style="color: #d73645"></i> ${jobList[i].city} </p>
                                    </li>
                                    <li class="list-inline-item">
                                        <p class="fs-14 mb-0"><i
                                                class="uil uil-wallet" style="color: #3b8c70"></i> $${jobList[i].offeredSalary} /
                                            month</p>
                                    </li>
                                </ul>
                                <div class="mt-2">
                                    <span class="badge bg-soft-success mt-1">${jobList[i].workSchedule}</span>
                                </div>
                            </div>
                        </div><!--end col-->
                    </div><!--end row-->
                    <div class="favorite-icon">
                        <a href="javascript:void(0)"><i class="uil uil-heart-alt fs-18"></i></a>
                    </div>
                </div>
                <div class="p-3 bg-light">
                    <div class="row justify-content-between">
                        <div class="col-md-8">
                            <div>
                                <ul class="list-inline mb-0">
                                    <li class="list-inline-item fw-medium"><i
                                            class="uil uil-tag"></i> Keyskills :
                                    </li>
                                    <li class="list-inline-item fs-13"> ${jobList[i].keySkills}
                                    </li>
   
                                </ul>
                            </div>
                        </div>
                        <!--end col-->
                        <!--end col-->
                        <div class="col-md-4">
                            <div class="text-md-end">
                                <a href="/job-details/${jobList[i].id}"
                                   class="primary-link">Apply Now <i
                                        class="mdi mdi-chevron-double-right"></i></a>
                            </div>
                        </div>
                        <!--end col-->
                    </div>
                    <!--end row-->
                </div>
            </div><!--end job-box-->
        `
    }
    if (result === '') {
        jobListDiv.innerHTML = `<h6>No jobs found! :(</h6>`
    } else {
        jobListDiv.innerHTML = result;
    }
}

function getExperience(experience) {
    let result = '';
    switch (experience) {
        case "0":
            result = 'No experience';
            break;
        case "1-3":
            result = 'from 1 to 3 years';
            break;
        case "3-6":
            result = 'from 3 to 6 years';
            break;
    }
    return result;
}
