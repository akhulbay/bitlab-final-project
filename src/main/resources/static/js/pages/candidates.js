let jobId = document.getElementById("candidatesJobId").value;
let candidatesListDiv = document.getElementById("candidatesList");

getAllCandidates();

function getAllCandidates() {
    const httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", `/user-job-applications?userId=&jobId=${jobId}`, true);
    httpRequest.onreadystatechange = async () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                let candidatesList = JSON.parse(httpRequest.responseText);
                candidatesListDiv.innerHTML = await setAllCandidates(candidatesList)
            } else {
                let error = httpRequest.responseText;
                console.log(error)
            }
        }
    }
    httpRequest.send();
}

async function getCandidateProfile(userId) {
    const httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", "/user-profiles/user/" + userId, true);
    httpRequest.send();

    return new Promise((resolve, reject) => {
        httpRequest.onreadystatechange = () => {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 200) {
                    const result = JSON.parse(httpRequest.responseText);
                    resolve(result);
                } else {
                    const error = httpRequest.responseText;
                    reject(error);
                }
            }
        };
    });
}

async function getProfileImage(candidateProfileId) {
    const httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", "/user-profiles/" + candidateProfileId + "/avatar", true);
    httpRequest.responseType = "arraybuffer";
    httpRequest.send();

    return new Promise((resolve, reject) => {
        httpRequest.onreadystatechange = () => {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 200) {
                    const imageBytes = new Uint8Array(httpRequest.response);
                    const blob = new Blob([imageBytes], {type: "image/jpeg"});

                    resolve(URL.createObjectURL(blob));
                } else {
                    let error = httpRequest.responseText;
                    console.log(error)
                    reject(error)
                }
            }
        }
    })
}

async function setAllCandidates(candidatesList) {
    let result = '';
    for (let i = 0; i < candidatesList.length; i++) {
        let profile = await getCandidateProfile(candidatesList[i].user.id)
        let imageUrl = profile !== null ? await getProfileImage(profile.id) : "/images/user/img-01.jpg";
        result += `
        <div class="col-lg-12">
                            <div class="bookmark-post card mt-4">
                                <div class="card-body">
                                    <div class="d-flex mb-4">
                                        <div class="flex-shrink-0 position-relative">
                                            <img src="${imageUrl}" alt="" class="avatar-md rounded" id="candidate">
                                        </div>
                                        <div class="ms-3">
                                            <a href="/candidate-details/${candidatesList[i].user.id}"
                                               class="primary-link"><h5 class="fs-17">${candidatesList[i].user.firstName} ${candidatesList[i].user.lastName}</h5></a>
                                            <span class="badge bg-soft-info fs-13">${profile.accountType}</span>
                                        </div>
                                    </div>
                                    <div class="border rounded mb-4">
                                        <div class="row g-0">
                                            <div class="col-lg-6">
                                                <div class="border-end px-3 py-2">
                                                    <p class="text-muted mb-0">Exp. : ${profile.experienceYears} Years</p>
                                                </div>
                                            </div><!--end col-->
                                            <div class="col-lg-6">
                                                <div class="px-3 py-2">
                                                    <p class="text-muted mb-0">${profile.degree}</p>
                                                </div>
                                            </div><!--end col-->
                                        </div><!--end row-->
                                    </div>
                                    <p class="text-muted">${candidatesList[i].coverLetter}</p>
                                    <div class="mt-3">
<!--                                        <a href="#hireNow" data-bs-toggle="modal"-->
<!--                                           class="btn btn-primary btn-hover w-100 mt-2"><i-->
<!--                                                class="mdi mdi-account-check"></i> Hire Now</a>-->
                                        <a href="/candidate-details/${candidatesList[i].user.id}"
                                           class="btn btn-soft-primary btn-hover w-100 mt-2"><i class="mdi mdi-eye"></i>
                                            View Profile</a>
                                    </div>
                                </div>
                            </div> <!--end card-->
                        </div><!--end col-->
        `;
    }
    if (result.length === 0) {
        result = '<h6>No candidates for this job!</h6>'
    }
    return new Promise((resolve, reject) => {
        resolve(result);
    });
}
