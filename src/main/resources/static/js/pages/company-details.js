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

let favoritesId = null;

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
                let response = JSON.parse(httpRequest.responseText);
                setCompanyOpenJobs(response.data);
            }
        }
    }
    httpRequest.send();
}


function setCompanyData(company) {

    overviewCompanyName.innerHTML = company.name
    overviewCompanyEstablishedDate.innerHTML = getStyledEstablishedDate(company.establishDate)
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

async function setCompanyOpenJobs(jobList) {
    let jobListDiv = document.getElementById("companyDetailsOpenJobList");
    let result = '';
    for (let i = 0; i < jobList.length; i++) {
        let isBookmarked = await isJobBookmarked(jobList[i].id)
        result += `
            <div class="job-box ${isBookmarked ? "bookmark-post" : ""} card">
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
                        ${isBookmarked ? `
                         <a href="javascript:void(0)" onclick="deleteFromFavorites(${favoritesId})"><i class="uil uil-heart-alt fs-18"></i></a>
                         ` : `
                         <a href="javascript:void(0)" onclick="addToFavorites(${jobList[i].id})"><i class="uil uil-heart-alt fs-18"></i></a>
                         `}
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

function isJobBookmarked(jobId) {
    const httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", `/favorite-jobs?jobId=${jobId}`, true);
    httpRequest.send();

    return new Promise((resolve, reject) => {
        httpRequest.onreadystatechange = () => {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 200) {
                    let response = JSON.parse(httpRequest.responseText);
                    if (response.length > 0) {
                        resolve(true);
                        favoritesId = response[0].id;
                    } else {
                        resolve(false);
                    }
                } else {
                    let error = httpRequest.responseText;
                    console.log(error)
                    reject(error)
                }
            }
        }
    })
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

// to get established date in format like "Since July 2010"
function getStyledEstablishedDate(date) {
    let result = "since "
    let month = date.substring(5, 7);
    let year = date.substring(0, 4);
    switch (month) {
        case "01":
            result += "January";
            break;
        case "02":
            result += "February";
            break;
        case "03":
            result += "March";
            break;
        case "04":
            result += "April";
            break;
        case "05":
            result += "May";
            break
        case "06":
            result += "June";
            break;
        case "07":
            result += "July";
            break;
        case "08":
            result += "August";
            break;
        case "09":
            result += "September";
            break;
        case "10":
            result += "October";
            break;
        case "11":
            result += "November";
            break;
        case "12":
            result += "December";
            break;
    }
    result += ` ${year}`;
    return result;
}

function deleteFromFavorites(favoritesId) {
    const httpRequest = new XMLHttpRequest();

    httpRequest.open("DELETE", "/favorite-jobs/" + favoritesId, true);
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 204) {
                getCompanyOpenJobs();
            } else {
                let error = httpRequest.responseText;
                console.log(error);
            }
        }
    }
    httpRequest.send();
}

function addToFavorites(jobId) {
    const httpRequest = new XMLHttpRequest();

    httpRequest.open("POST", "/favorite-jobs", true);
    httpRequest.setRequestHeader("Content-Type", "application/json");
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 201) {
                getCompanyOpenJobs();
            } else {
                let error = httpRequest.responseText;
                console.log(error);
            }
        }
    }
    let body = {
        "jobId": jobId,
        "userId": userId
    }
    body = JSON.stringify(body)
    httpRequest.send(body);
}