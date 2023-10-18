/**
 * The method in this format implement an api to check for the validity of a phone number and display its logo
 * Test string for local Number:
 * mtn: 07068414723
 * glo: 07058414723
 * airtel: 07082243474
 * 9mobile: 09096841472
 *
 * Test string for foreign Number
 * country code: +1  phone number: 4158586273
 *               +44               07044480579
 *               +375              234030461
 * more numbers?
 * check https://www.bestrandoms.com/random-cm-phone-number
 */

document
  .getElementById("phoneNumber")
  .addEventListener("input", async function () {
    let phoneNumber = this.value.trim();
    const errorDiv = document.getElementById("error-message");
    const carrierLogo = document.querySelector(".carrierLogo");
    const countryCode = document.getElementById("country-code");

    if (!/^\d+$/.test(phoneNumber)) {
      errorDiv.textContent = "Phone number must only contain digits";
      errorDiv.style.color = "red";
      carrierLogo.classList.remove("show");
    } else if (phoneNumber.length > 11) {
      errorDiv.textContent = " Phone number must  be 11 characters or less";
      errorDiv.style.color = "red";
      carrierLogo.classList.remove("show");
    } else {
      errorDiv.textContent = "";
      phoneNumber = countryCode.value.trim() + phoneNumber;
      // check if number exists in providers list
      let carrier = await getProviderName(phoneNumber);
      const foreignCarrierName = carrier; // saves the initial carriername before slicing
      let carrierLogoSrc = "";
      if (carrier) {
        carrier = carrier.substring(0, 3).toLowerCase();
        // set src for individual logo
        switch (carrier) {
          case "mtn":
            carrierLogoSrc = "./images/mtn-logo.png";
            break;
          case "glo":
            carrierLogoSrc = "./images/glo-logo.png";
            break;
          case "air":
            carrierLogoSrc = "./images/airtel-logo.png";
            break;
          case "9mo":
            carrierLogoSrc = "./images/9mobile-logo.png";
            break;

          case "nil":
            carrierLogoSrc = "./images/phone-logo.png";
            errorDiv.innerHTML =
              "That's a valid number 😎 without carrier name";
            errorDiv.style.color = "green";
            break;
          default:
            carrierLogoSrc = "./images/phone-logo.png";
            errorDiv.innerHTML = `That's probably a foreign number 😎 <b>Name: ${foreignCarrierName}</b>`;
            errorDiv.style.color = "green";
            break;
        }
        carrierLogo.setAttribute("src", carrierLogoSrc);
        carrierLogo.classList.add("show");
      } else {
        // show error and reset logo
        errorDiv.textContent = "invalid phone number";
        errorDiv.style.color = "red";
        carrierLogo.classList.remove("show");
      }
    }
  });

async function getProviderName(phoneNumber) {
  try {
    // changed the api url due to http vs https loading issue during the deployment
    // const url = `http://apilayer.net/api/validate?access_key=745040474db1ea46aee5a3044c2578ed&number=${phoneNumber}&format=1`;
    //new url
    const url = `https://api.veriphone.io/v2/verify?phone=${phoneNumber}&key=5C83828603CB44CB9A77F3F0C2EB88F9`;
    const resp = await fetch(url);
    const carrierData = await resp.json();
    if (carrierData.phone_valid) {
      if (!carrierData.carrier) {
        return "nill";
      }
      return carrierData.carrier;
    }
  } catch (error) {
    console.error(error);
  }

  return null;
}
