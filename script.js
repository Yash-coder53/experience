/* =========================================================
   PROFESSIONAL EXPERIENCE LETTER GENERATOR — script.js
   ========================================================= */

const inputIds = [
  "company-name", "company-address", "company-contact", 
  "letter-date", "ref-number",
  "emp-name", "emp-designation", "emp-id", 
  "join-date", "end-date",
  "body-text", "signatory-name", "signatory-title"
];

// Bind events to update live preview
inputIds.forEach(id => {
  document.getElementById(id).addEventListener("input", updatePreview);
});

/* ---------- Format Date to "29th October, 2026" ---------- */
function formatDate(dateString) {
  if (!dateString) return "[Date]";
  const date = new Date(dateString);
  
  const day = date.getDate();
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  // Add "st", "nd", "rd", "th" to the day
  let suffix = "th";
  if (day === 1 || day === 21 || day === 31) suffix = "st";
  else if (day === 2 || day === 22) suffix = "nd";
  else if (day === 3 || day === 23) suffix = "rd";

  return `${day}${suffix} ${month}, ${year}`;
}

/* ---------- Update Preview ---------- */
function updatePreview() {
  // Company Details
  const compName = document.getElementById("company-name").value || "COMPANY NAME";
  document.getElementById("p-company-name").textContent = compName;
  document.getElementById("p-signatory-company").textContent = compName;
  
  document.getElementById("p-company-address").textContent = 
    document.getElementById("company-address").value || "Company Address";
  
  const compContact = document.getElementById("company-contact").value;
  document.getElementById("p-company-contact").textContent = compContact;
  document.getElementById("p-company-contact").style.display = compContact ? "block" : "none";

  // Meta Info
  const dateVal = document.getElementById("letter-date").value;
  document.getElementById("p-date").textContent = dateVal ? `Date: ${formatDate(dateVal)}` : "Date: ";
  
  const refVal = document.getElementById("ref-number").value;
  document.getElementById("p-ref").textContent = refVal ? `Ref: ${refVal}` : "";

  // Employee Info
  document.getElementById("p-emp-name").textContent = 
    document.getElementById("emp-name").value || "[Employee Name]";
  
  const empId = document.getElementById("emp-id").value;
  document.getElementById("p-emp-id").textContent = empId || "[ID]";
  document.getElementById("emp-id-wrapper").style.display = empId ? "inline" : "none";
  
  document.getElementById("p-emp-designation").textContent = 
    document.getElementById("emp-designation").value || "[Designation]";

  // Dates
  const joinDate = document.getElementById("join-date").value;
  document.getElementById("p-join-date").textContent = joinDate ? formatDate(joinDate) : "[Joining Date]";

  const endDate = document.getElementById("end-date").value;
  document.getElementById("p-end-date").textContent = endDate ? formatDate(endDate) : "[Relieving Date]";

  // Custom Body Text
  const bodyText = document.getElementById("body-text").value;
  const bodyPara = document.getElementById("p-body-text");
  if (bodyText.trim() !== "") {
    bodyPara.textContent = bodyText;
    bodyPara.style.display = "block";
  } else {
    bodyPara.style.display = "none";
  }

  // Signatory
  document.getElementById("p-signatory-name").textContent = 
    document.getElementById("signatory-name").value || "[Signatory Name]";
  
  document.getElementById("p-signatory-title").textContent = 
    document.getElementById("signatory-title").value || "[Signatory Title]";
}

/* ---------- PDF Download ---------- */
function downloadPDF() {
  const element = document.getElementById("letter-preview");
  const empName = document.getElementById("emp-name").value.trim().replace(/\s+/g, '_');
  const fileName = empName ? `${empName}_Experience_Letter.pdf` : `Experience_Letter.pdf`;

  const options = {
    margin: 0,
    filename: fileName,
    image: { type: "jpeg", quality: 1.0 },
    html2canvas: { scale: 3, useCORS: true, letterRendering: true },
    jsPDF: { unit: "in", format: "a4", orientation: "portrait" }
  };

  html2pdf().set(options).from(element).save();
}

/* ---------- Initialize ---------- */
window.addEventListener("DOMContentLoaded", () => {
  // Set today's date by default
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("letter-date").value = today;
  
  updatePreview();
});
