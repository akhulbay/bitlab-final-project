let userId = document.getElementById("companyDetailsUserId").value;
let companyId = document.getElementById("companyDetailsCompanyId").value;

let overviewCompanyImg = document.getElementById("overviewCompanyDetailsImg");
let overviewCompanyName = document.getElementById("overviewCompanyDetailsName");
let overviewCompanyEstablishedDate = document.getElementById("overviewCompanyDetailsEstablishedDate");
let overviewCompanyLinkedinLink = document.getElementById("overviewCompanyDetailsLinkedinLink");
let overviewCompanyWhatsappLink = document.getElementById("overviewCompanyDetailsWhatsappLink");
let overviewCompanyOwnerName = document.getElementById("overviewCompanyDetailsOwnerName");
let overviewCompanyEmployeesNumber = document.getElementById("overviewCompanyDetailsEmployeesNumber");
let overviewCompanyLocation = document.getElementById("overviewCompanyDetailsLocation");
let overviewCompanyWebsite = document.getElementById("overviewCompanyDetailsWebsite");
let overviewCompanyEstablishedDate2 = document.getElementById("overviewCompanyDetailsEstablishedDate2");
let companyContactLink = document.getElementById("companyDetailsContactLink");
let overviewAboutCompany = document.getElementById("overviewDetailsAboutCompany");

getCompany();

function getCompany() {
    const httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", "/companies/" + companyId, true);
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

                overviewCompanyImg.src = URL.createObjectURL(blob);
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

    getCompanyImage();
    topFunction();
}

function setCompanyOpenJobs(jobList) {
    let jobListDiv = document.getElementById("companyDetailsOpenJobList");
    let result = '';
    for (let i = 0; i < jobList.length; i++) {
        result += `
            <div class="job-box card">
                <div class="p-3">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="mt-3 mt-lg-0">
                                <h5 class="fs-16 fw-medium mb-1"><a
                                        href="#"
                                        class="text-dark">${jobList[i].title}</a> <small
                                        class="text-muted fw-normal">(Experience: ${jobList[i].experience})</small>
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
