function submitForm() {
  const firstName = document.getElementById("first_Name").value;
  const lastName = document.getElementById("last_Name").value;
  const email = document.getElementById("email").value;
  const phoneNumber = document.getElementById("phone_Number").value;
  const resume = document.getElementById("resume").files[0];
  const coverLetter = document.getElementById("coverLetter").value;

  // Phone number validation
  const phoneRegex = /^03\d{2}-\d{7}$/;
  if (!phoneRegex.test(phoneNumber)) {

    event.preventDefault(); // Prevent form submission
    const phoneError = document.getElementById("phone_error");
    phoneError.style.display = "block";
    phoneFeild = document.getElementById("phone_Number");
    phoneFeild.scrollIntoView({ behavior: "smooth", block: "center" });
    phoneFeild.focus(); // Focus the unfilled field
    return;
  }
  else {
    const phoneError = document.getElementById("phone_error");
    phoneError.style.display = "none";
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {

    event.preventDefault(); // Prevent form submission
    const emailError = document.getElementById("email_error");
    emailError.style.display = "block";
    emailFeild = document.getElementById("email");
    emailFeild.scrollIntoView({ behavior: "smooth", block: "center" });
    emailFeild.focus(); // Focus the unfilled field
    return;
  }
  else {
    const emailError = document.getElementById("email_error");
    emailError.style.display = "none";
  }
  let lastUnfilledField = null;

  // Get all required input, textarea, and select elements
  const requiredFields = document.querySelectorAll("input[required], textarea[required], select[required]");

  requiredFields.forEach(field => {
    if (field.className === 'form-check-input') {
      if (!field.checked) {
        // Highlight the field with light 
        field.style.backgroundColor = "#ffcccc"; // Light red color for checkbox
        field.style.opacity = "0.5";
        lastUnfilledField = field;
      }
      else {
        // Reset background if filled
        field.style.backgroundColor = "";
        field.style.opacity = "1";
      }
    }
    else {
      if (!field.value.trim()) {
        // Highlight the field with light 
        field.style.border = "3px solid #ffcccc"; // Light red border
        // Set the last unfilled field
        lastUnfilledField = field;
      } else {
        // Reset background if filled
        field.style.border = "";
      }
    }

  });

  if (lastUnfilledField) {
    event.preventDefault(); // Prevent form submission
    // Scroll to the last unfilled field
    lastUnfilledField.scrollIntoView({ behavior: "smooth", block: "center" });
    lastUnfilledField.focus(); // Focus the unfilled field
    const toast = document.getElementById("toast");
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 2000);
    return;
  }

  // Check if all fields are filled

  // Simulating form submission by logging to console
  console.log("Form Data:");
  console.log("First Name:", firstName);
  console.log("Last Name:", lastName);
  console.log("Email:", email);
  console.log("Phone Number:", phoneNumber);
  console.log("Resume:", resume.name);
  console.log("Cover Letter:", coverLetter);

  // Storing data in table
  addRowToTable(firstName, lastName, email, phoneNumber, resume.name, coverLetter);

  // Clearing the form
  document.getElementById("applicationForm").reset();
}

function addRowToTable(firstName, lastName, email, phoneNumber, resume, coverLetter) {
  const tableBody = document.getElementById("dataTableBody");

  const row = document.createElement("tr");
  row.innerHTML = `
    <td data-label="Name">${firstName} ${lastName}</td>
    <td data-label="Email">${email}</td>
    <td data-label="Phone Number">${phoneNumber}</td>
    <td data-label="Resume">${resume}</td>
    <td data-label="Cover Letter">${coverLetter}</td>
  `;
  tableBody.appendChild(row);
}

function displayTable() {

  const btn = document.getElementById("btnDisplayTable");
  const table = document.getElementById("dataTable");
  if (tableopen === false) {
    btn.textContent = "Hide Table";
    table.style.display = "table";
    tableopen = true;
  }
  else {
    btn.textContent = "Display Table";
    table.style.display = "none";
    tableopen = false;
  }

}

// Dropdown for Graduation Year
document.addEventListener("DOMContentLoaded", function () {
  const emailError = document.getElementById("email_error");
  emailError.style.display = "none";
  const phoneError = document.getElementById("phone_error");
  phoneError.style.display = "none";
  const currentYear = new Date().getFullYear();
  const graduationSelect = document.getElementById("graduationYear");
  for (let year = currentYear; year >= currentYear - 25; year--) {
    const option = document.createElement("option");
    option.value = year;
    option.text = year;
    graduationSelect.appendChild(option);
  }
});
document.addEventListener("DOMContentLoaded", function () {
  // Get all required input and textarea elements
  const requiredFields = document.querySelectorAll("input[required], textarea[required], select[required]");
  // Loop through each required field
  requiredFields.forEach(field => {
    // Find the corresponding label using the 'for' attribute in the label
    const label = document.querySelector(`label[for=${field.id}]`);

    if (label) {
      // Create the red asterisk element
      const asterisk = document.createElement("span");
      asterisk.style.color = "red";
      asterisk.textContent = " *";
      // Append the asterisk to the label
      label.appendChild(asterisk);
    }
  });
});

var tableopen = false;

// Show uploaded file name for Resume
const resumeInput = document.getElementById("resume");
const resumeLabel = document.querySelector("label[for='resume']");
resumeInput.addEventListener("change", function () {
  const fileName = resumeInput.files[0]?.name || "No file chosen";
  resumeLabel.textContent = `Uploaded: ${fileName}`;
});
