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

/*The names of the network providers are stored
as properties in the "networkProviders" Object, 
the value of these properties are an array of 
the number formats of the network providers.

The number formats are gotten from 
https://smartsmssolutions.com/blog/80-news/1395-nigeria-phone-number-prefix
*/


const networkProviders = {
  mtn: [0803, 0806, 0703, 0903, 0906, 0806, 0706, 0813, 0810, 0814, 0816, 0913, 0916],
  glo: [0805, 0705, 0905, 0807, 0815, 0811, 0915],
  airtel: [0802, 0902, 0701, 0808, 0708, 0812, 0901, 0907],
  etisalat: [0809, 0909, 0817, 0818, 0908,]
}

/*to take the first 4 digits*/

const newNumber = phoneNumber.substring (0,5)

function checkNumber(newnumber) {
    for (n in networkProviders) {
        if (n == newnumber) {
           getObjectKey()
        } else {
            prompt("network provider not found")
            return null
        } }
   }
    

function getObjectKey(networkProviders, newnumber) {
    return Object.keys(networkProviders).find(key => networkProviders[key] === value);
}
