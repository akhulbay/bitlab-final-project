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
