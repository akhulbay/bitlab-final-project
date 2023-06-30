let userId = document.getElementById("manageJobsUserId").value;
let jobListDiv = document.getElementById("manageJobList");

let companyId = null;
let deleteJobId = null;
let filterInput = document.getElementById("manageJobsOrderBy");

getCompany();

function getCompany() {
    const httpRequest = new XMLHttpRequest();

    httpRequest.open("GET", "/companies/user/" + userId, true);
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                let company = JSON.parse(httpRequest.responseText);
                companyId = company.id;
                getJobs();
            } else if (httpRequest.status === 404) {
                jobListDiv.innerHTML = `<h6>No jobs found! :(</h6>`
            } else {
                let error = httpRequest.responseText;
                console.log(error);
            }
        }
    }
    httpRequest.send();
}

function getJobs() {
    const httpRequest = new XMLHttpRequest();

    let filter = filterInput.value;
    if (filter === 'df') {
        httpRequest.open("GET", "/jobs?companyId=" + companyId, true);
    } else {
        httpRequest.open("GET", `/jobs?sortOrder=${filter}&companyId=${companyId}`, true);
    }
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                let jobList = JSON.parse(httpRequest.responseText);
                setCompanyJobs(jobList);
            }
        }
    }
    httpRequest.send();
}

function preDelete(jobId) {
    deleteJobId = jobId;
}

function deleteJob() {
    const httpRequest = new XMLHttpRequest();

    httpRequest.open("DELETE", "/jobs/" + deleteJobId, true);
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 204) {
                getJobs()
            } else {
                let error = httpRequest.responseText;
                console.log(error);
            }
        }
    }
    httpRequest.send();
}

function setCompanyJobs(jobList) {
    let result = '';
    for (let i = 0; i < jobList.length; i++) {
        result += `
                <div class="job-box card">
                                <div class="card-body p-4">
                                    <div class="row">
                                        <div class="col-lg-9">
                                            <div class="mt-3 mt-lg-0">
                                                <h5 class="fs-17 mb-1"><a
                                                        href="/job-details/${jobList[i].id}"
                                                        class="text-dark">${jobList[i].title}</a>
                                                    <small
                                                            class="text-muted fw-normal">(Experience: ${getExperience(jobList[i].experience)})</small></h5>
    
                                                <ul class="list-inline mb-0">
                                                    <li class="list-inline-item">
                                                        <p class="fs-14 mb-0">${jobList[i].company.name}</p>
                                                    </li>
                                                    <li class="list-inline-item">
                                                        <p class="fs-14 mb-0"><i class="mdi mdi-map-marker" style="color: #d73645"></i>
                                                            ${jobList[i].city}</p>
                                                    </li>
                                                    <li class="list-inline-item">
                                                        <p class="fs-14 mb-0"><i class="uil uil-wallet" style="color: #3b8c70"></i> ${jobList[i].offeredSalary} / month</p>
                                                    </li>
                                                </ul>
                                                <div class="mt-2">
                                                    <span class="badge bg-soft-success mt-1">${jobList[i].workSchedule}</span>
                                                </div>
                                                <div class="mt-2">
                                                    <a href="/candidates/${jobList[i].id}" class="fs-15 fw-medium"><i class="mdi mdi-account"></i> See all cadidates</a>
                                                </div>
                                            </div>
                                        </div><!--end col-->
                                        <div class="col-lg-3 align-self-center">
                                            <ul class="list-inline mt-3 mb-0">
                                                <li class="list-inline-item" data-bs-toggle="tooltip"
                                                    data-bs-placement="top" title="Edit">
                                                    <a href="/edit-job/${jobList[i].id}"
                                                       class="avatar-sm bg-soft-success d-inline-block text-center rounded-circle fs-18">
                                                        <i class="uil uil-edit"></i>
                                                    </a>
                                                </li>
                                                <li class="list-inline-item" data-bs-toggle="tooltip"
                                                    data-bs-placement="top" title="Delete">
                                                    <a href="javascript:void(0)" data-bs-toggle="modal"
                                                       data-bs-target="#deleteModal"
                                                       class="avatar-sm bg-soft-danger d-inline-block text-center rounded-circle fs-18" onclick="preDelete(${jobList[i].id})">
                                                        <i class="uil uil-trash-alt"></i>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div><!--end col-->
                                    </div><!--end row-->
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