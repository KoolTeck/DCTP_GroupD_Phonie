document.getElementById("phoneNumber").addEventListener("input", function () {
  const phoneNumber = this.value;
  const errorDiv = document.getElementById("error-message");

  if (/^\d+$/.test(phoneNumber) && phoneNumber.length <= 11) {
    errorDiv.textContent = "";
  } else {
    errorDiv.textContent =
      "Phone number must only contain digits and be 11 characters or less.";
  }
});
