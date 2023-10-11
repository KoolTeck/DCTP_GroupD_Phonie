document.getElementById("phoneNumber").addEventListener("input", function () {
  const phoneNumber = this.value;
  const errorDiv = document.getElementById("error-message");

  if (!/^\d+$/.test(phoneNumber)) {
    errorDiv.textContent = "Phone number must only contain digits";
  } else if (phoneNumber.length > 11) {
    errorDiv.textContent = " Phone number must  be 11 characters or less.";
  } else {
    errorDiv.textContent = "";
  }
});
