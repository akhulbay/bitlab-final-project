let jobListDiv = document.getElementById("jobList");

let jobListName = document.getElementById("jobListName");
let jobListLocation = document.getElementById("jobListLocation");
let jobListCategory = document.getElementById("jobListCategory");

let jobListExp = document.getElementsByName("jobListExpRadio");
let jobListWorkSchedule = document.getElementsByName("jobListWorkSchedule");
let jobListPostDate = document.getElementsByName("jobListPostDate");


getJobs();

function getJobs() {
    const httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", "/jobs", true);
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                let jobList = JSON.parse(httpRequest.responseText);
                setJobs(jobList);
            }
        }
    }
    httpRequest.send();
}

function filterJobs() {
    let result = `?city=${jobListLocation.value}&category=${jobListCategory.value}&experience=${getRadioExperience(jobListExp)}&workSchedule=${getWorkSchedule(jobListWorkSchedule)}`;
    if (jobListName.value !== '') {
        result += `&title=${jobListName.value}`;
    }
    if (getRadioPostDate(jobListPostDate) !== 'all') {
        result += `&postDate=${getRadioPostDate(jobListPostDate)}`
    }
    console.log(result)
    const httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", "/jobs" + result, true);
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                let jobList = JSON.parse(httpRequest.responseText);
                setJobs(jobList);
                console.log(jobList);
            } else {
                let error = httpRequest.responseText;
                console.log(error);
            }
        }
    }
    httpRequest.send();
}

function setJobs(jobList) {
    let result = '';
    for (let i = 0; i < jobList.length; i++) {
        result += `
            <div class="job-box card mt-3">
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
    if (result.length > 1) {
        jobListDiv.innerHTML = result;
    } else {
        jobListDiv.innerHTML = "<h5 class='text-center mt-3'>No jobs found!</h5>"
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