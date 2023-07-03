let userId = document.getElementById("jobListUserId").value;
let jobListDiv = document.getElementById("jobList");

let jobListName = document.getElementById("jobListName");
let jobListLocation = document.getElementById("jobListLocation");
let jobListCategory = document.getElementById("jobListCategory");

let jobListExp = document.getElementsByName("jobListExpRadio");
let jobListWorkSchedule = document.getElementsByName("jobListWorkSchedule");
let jobListPostDate = document.getElementsByName("jobListPostDate");

let jobListPagination = document.getElementById("jobListPagination");

let favoritesId = null;

filterJobs();

function filterJobs(page) {
    if (page === null || page === '' || page === undefined) {
        page = 0;
    }
    let result = `?page=${page}&size=10`;

    if (jobListLocation.value !== 'all') {
        result += `&city=${jobListLocation.value}`;
    }
    if (jobListCategory.value !== 'all') {
        result += `&category=${jobListCategory.value}`;
    }
    if (jobListName.value !== '') {
        result += `&title=${jobListName.value}`;
    }
    if (getRadioPostDate(jobListPostDate) !== 'all') {
        result += `&postDate=${getRadioPostDate(jobListPostDate)}`;
    }
    if (getRadioExperience(jobListExp) !== 'all') {
        result += `&experience=${getRadioExperience(jobListExp)}`;
    }
    if (getWorkSchedule(jobListWorkSchedule) !== 'all') {
        result += `&workSchedule=${getWorkSchedule(jobListWorkSchedule)}`;
    }
    const httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", "/jobs" + result, true);
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                let response = JSON.parse(httpRequest.responseText);
                setJobs(response.data);
                setPagination(response.metadata)
            } else {
                let error = httpRequest.responseText;
                console.log(error);
            }
        }
    }
    httpRequest.send();
}

async function setJobs(jobList) {
    let result = '';
    for (let i = 0; i < jobList.length; i++) {
        let isBookmarked = await isJobBookmarked(jobList[i].id)
        result += `
            <div class="job-box ${isBookmarked ? "bookmark-post" : ""} card mt-3">
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
    if (result.length > 1) {
        jobListDiv.innerHTML = result;
    } else {
        jobListDiv.innerHTML = "<h5 class='text-center mt-3'>No jobs found!</h5>"
    }
}

function isJobBookmarked(jobId) {
    const httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", `/favorite-jobs?jobId=${jobId}&userId=${userId}`, true);
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

function setPagination(page) {
    let result = `
       <li class="page-item active" onclick="filterJobs(0)">
            <a class="page-link" href="javascript:void(0)">${1}</a></li>
    `;
    for (let i = 1; i < page.totalPages; i++) {
        result += `
            <li class="page-item active" onclick="filterJobs(${i})">
            <a class="page-link" href="javascript:void(0)">${i + 1}</a></li>
        `;
    }
    jobListPagination.innerHTML = result;
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

function getRadioExperience(expRadioButtons) {
    let result = '';
    for (let i = 0; i < expRadioButtons.length; i++) {
        if (expRadioButtons[i].checked) {
            result = expRadioButtons[i].value;
            break;
        }
    }
    return result;
}

function getWorkSchedule(workScheduleRadioButtons) {
    let result = '';
    for (let i = 0; i < workScheduleRadioButtons.length; i++) {
        if (workScheduleRadioButtons[i].checked) {
            result = workScheduleRadioButtons[i].value;
            break;
        }
    }
    return result;
}

function getRadioPostDate(postDateRadioButtons) {
    let result = '';
    for (let i = 0; i < postDateRadioButtons.length; i++) {
        if (postDateRadioButtons[i].checked) {
            result = postDateRadioButtons[i].value;
            break;
        }
    }
    return result;
}

function deleteFromFavorites(favoritesId) {
    const httpRequest = new XMLHttpRequest();

    httpRequest.open("DELETE", "/favorite-jobs/" + favoritesId, true);
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 204) {
                filterJobs();
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
                filterJobs();
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