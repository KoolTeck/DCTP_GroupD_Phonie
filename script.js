const networkProviders = {
  mtn: [
    "0803",
    "0806",
    "0703",
    "0903",
    "0906",
    "0806",
    "0706",
    "0813",
    "0810",
    "0814",
    "0816",
    "0913",
    "0916",
  ],
  glo: ["0805", "0705", "0905", "0807", "0815", "0811", "0915"],
  airtel: ["0802", "0902", "0701", "0808", "0708", "0812", "0901", "0907"],
  "9mobile": ["0809", "0909", "0817", "0818", "0908"],
};

document.getElementById("phoneNumber").addEventListener("input", function () {
  const phoneNumber = this.value;
  const errorDiv = document.getElementById("error-message");
  const carrierLogo = document.querySelector(".carrierLogo");

  if (!/^\d+$/.test(phoneNumber)) {
    errorDiv.textContent = "Phone number must only contain digits";
    carrierLogo.classList.remove("show");
  } else if (phoneNumber.length > 11 || phoneNumber.length < 11) {
    errorDiv.textContent = " Phone number must  be 11 characters";
    carrierLogo.classList.remove("show");
  } else {
    errorDiv.textContent = "";
    const phoneNumberPrefix = phoneNumber.substring(0, 4);
    // check if number exists in providers list
    const carrier = getProviderName(phoneNumberPrefix);
    let carrierLogoSrc = "";
    if (carrier) {
      // set src for individual logo
      switch (carrier) {
        case "mtn":
          carrierLogoSrc = "./images/mtn-logo.png";
          break;
        case "glo":
          carrierLogoSrc = "./images/glo-logo.png";
          break;
        case "airtel":
          carrierLogoSrc = "./images/airtel-logo.png";
          break;
        case "9mobile":
          carrierLogoSrc = "./images/9mobile-logo.png";
          break;

        default:
          break;
      }
      carrierLogo.setAttribute("src", carrierLogoSrc);
      carrierLogo.classList.add("show");
    } else {
      // show error and reset logo
      errorDiv.textContent = "invalid phone number";
      carrierLogo.classList.remove("show");
    }
  }
});

const getProviderName = (carrierPrefix) => {
  for (const carrier in networkProviders) {
    if (networkProviders[carrier].includes(carrierPrefix)) {
      return carrier;
    }
  }
  return null;
};

/*The names of the network providers are stored
as properties in the "networkProviders" Object, 
the value of these properties are an array of 
the number formats of the network providers.

The number formats are gotten from 
https://smartsmssolutions.com/blog/80-news/1395-nigeria-phone-number-prefix
*/
