let userId = document.getElementById("applicationsUserId").value;
let jobListDiv = document.getElementById("applicationsJobList");

let profileId = null;

getApplicationsUserProfile();

function getApplicationsUserProfile() {
    const httpRequest = new XMLHttpRequest();

    httpRequest.open("GET", "/user-profiles/user/" + userId, true);
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                let profile = JSON.parse(httpRequest.responseText);
                profileId = profile.id;
                getJobs();
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

    httpRequest.open("GET", "/user-job-applications?userProfileId=" + profileId, true);
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                let userJobApplications = JSON.parse(httpRequest.responseText);
                setAppliedJobs(userJobApplications);
            }
        }
    }
    httpRequest.send();
}

function setAppliedJobs(userJobApplications) {
    let result = '';
    for (let i = 0; i < userJobApplications.length; i++) {
        result += `
                <div class="job-box card">
                                <div class="card-body p-4">
                                    <div class="row">
                                        <div class="col-lg-9">
                                            <div class="mt-3 mt-lg-0">
                                                <h5 class="fs-17 mb-1"><a
                                                        href="/job-details/${userJobApplications[i].job.id}"
                                                        class="text-dark">${userJobApplications[i].job.title}</a>
                                                    <small
                                                            class="text-muted fw-normal">(Experience: ${getExperience(userJobApplications[i].job.experience)})</small></h5>
    
                                                <ul class="list-inline mb-0">
                                                    <li class="list-inline-item">
                                                        <p class="fs-14 mb-0">${userJobApplications[i].job.company.name}</p>
                                                    </li>
                                                    <li class="list-inline-item">
                                                        <p class="fs-14 mb-0"><i class="mdi mdi-map-marker" style="color: #d73645"></i>
                                                            ${userJobApplications[i].job.city}</p>
                                                    </li>
                                                    <li class="list-inline-item">
                                                        <p class="fs-14 mb-0"><i class="uil uil-wallet" style="color: #3b8c70"></i> ${userJobApplications[i].job.offeredSalary} / month</p>
                                                    </li>
                                                </ul>
                                                <div class="mt-2">
                                                    <span class="badge bg-soft-success mt-1">${userJobApplications[i].job.workSchedule}</span>
                                                </div>
                                      
                                            </div>
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