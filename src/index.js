//Seeting Airtable API for Opopop case study
const Airtable = require('airtable');

//Add your airtable API Key
const base = new Airtable({apiKey: 'ENV['AIRTABLE_API_KEY']'}).base('appHYgUO41B1zoeP2');

const current_user = 'david@opopop.co';
let user_packages = [];
const package_number = document.getElementsByClassName('package-number');

// Display the user package number

const displaypackageNumber = () => {

for(let i = 0; i < package_number.length; i++) {
  package_number[i].innerHTML = `${user_packages[i]}`;}
}

// Use the airtable API to retrieves the packages number

base('Commandes')
.select({ view: 'Commandes'})
.firstPage((err, records) => {
  if (err) { console.error(err); return; }
  records.forEach((record) => {
      // Retrieve all the packages numbers only for 'david@opopop.co' and that are not 'undefined'
      if (record.get('Utilisateur') === current_user
        && record.get('Colis') != undefined) {
        user_packages.push(record.get('Colis'));
      // Call the displaypackageNumber function 
        return displaypackageNumber();
      }
   })
})

// End of case study