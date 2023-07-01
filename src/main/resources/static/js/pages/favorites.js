let userId = document.getElementById("favoritesUserId").value;
let jobListDiv = document.getElementById("favoritesJobList");

let profileId = null;

getFavorites()



function getFavorites() {
    const httpRequest = new XMLHttpRequest();

    httpRequest.open("GET", "/favorite-jobs?userId=" + userId, true);
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                let favorites = JSON.parse(httpRequest.responseText);
                setFavoriteJobs(favorites);
            }
        }
    }
    httpRequest.send();
}

async function setFavoriteJobs(favorites) {
    let result = '';
    for (let i = 0; i < favorites.length; i++) {
        let isBookmarked = await isJobBookmarked(favorites[i].job.id)
        result += `
                <div class="job-box ${isBookmarked ? "bookmark-post" : ""} card mt-3">
                <div class="p-3">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="mt-3 mt-lg-0">
                                <h5 class="fs-16 fw-medium mb-1"><a
                                        href="/job-details/${favorites[i].job.id}"
                                        class="text-dark">${favorites[i].job.title}</a> <small
                                        class="text-muted fw-normal">(Experience: ${getExperience(favorites[i].job.experience)})</small>
                                </h5>
                                <ul class="list-inline mb-0">
                                    <li class="list-inline-item">
                                        <p class="fs-14 mb-0">${favorites[i].job.company.name}</p>
                                    </li>
                                    <li class="list-inline-item">
                                        <p class="fs-14 mb-0"><i
                                                class="mdi mdi-map-marker" style="color: #d73645"></i> ${favorites[i].job.city} </p>
                                    </li>
                                    <li class="list-inline-item">
                                        <p class="fs-14 mb-0"><i
                                                class="uil uil-wallet" style="color: #3b8c70"></i> $${favorites[i].job.offeredSalary} /
                                            month</p>
                                    </li>
                                </ul>
                                <div class="mt-2">
                                    <span class="badge bg-soft-success mt-1">${favorites[i].job.workSchedule}</span>
                                </div>
                            </div>
                        </div><!--end col-->
                    </div><!--end row-->
                    <div class="favorite-icon">
                        ${isBookmarked ? `
                         <a href="javascript:void(0)" onclick="deleteFromFavorites(${favorites[i].id})"><i class="uil uil-heart-alt fs-18"></i></a>
                         ` : `
                         <a href="javascript:void(0)" onclick="addToFavorites(${favorites[i].job.id})"><i class="uil uil-heart-alt fs-18"></i></a>
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
                                    <li class="list-inline-item fs-13"> ${favorites[i].job.keySkills}
                                    </li>
   
                                </ul>
                            </div>
                        </div>
                        <!--end col-->
                        <!--end col-->
                        <div class="col-md-4">
                            <div class="text-md-end">
                                <a href="/job-details/${favorites[i].job.id}"
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

function deleteFromFavorites(favoritesId) {
    const httpRequest = new XMLHttpRequest();

    httpRequest.open("DELETE", "/favorite-jobs/" + favoritesId, true);
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 204) {
                getFavorites();
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
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 201) {
                getFavorites();
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