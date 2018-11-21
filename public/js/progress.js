// ==================================================================
// Global variables
// ==================================================================
var provinces = 1;
var rankings = [
  {
    title: "Farmer",
    image: "./images/castle-1.png"
  },
  {
    title: "Mayor",
    image: "./images/castle-2.png"
  },
  {
    title: "Aristocrat",
    image: "./images/castle-3.png"
  },
  {
    title: "Baron",
    image: "./images/castle-4.png"
  },
  {
    title: "Viscount",
    image: "./images/castle-5.png"
  },
  {
    title: "Earl",
    image: "./images/castle-6.png"
  },
  {
    title: "Marquees",
    image: "./images/castle-7.png"
  },
  {
    title: "Duke",
    image: "./images/castle-8.png"
  },
  {
    title: "King",
    image: "./images/castle-9.png"
  },
  {
    title: "Emperor",
    image: "./images/castle-10.png"
  },
];

console.log(rankings[0].image);
console.log($(".progress-bar").attr("style", "width: 90%"));

// When the user first signs up, they start with 1 province
// I want this to be reflected in the progress bar as 10% width or style="width: 10%" (1 province === 10% progress)
// When a user wins an encounter they gain 1 province
// As soon as this happens, I want the progress bar to increase by 10%
// For example, when a user wins their first encounter after signing up, the progress bar will increase to 20%, and the province count will increase to 2
// When the progress bar reaches 100% (10 provinces), I want the progress bar to reset to 0%, the user title to change, and the image to change


// Function to update progress bar, user title, and castle image
function progressUpdate(provinceCount) {
    if ((provinceCount % 10) === 0) {
        console.log(true);
    }

progressUpdate(provinces)
  // Check to see what the user province count is
  // check to see if they need to advance another level
  // if their province count is divisible by 10
  // create an array with each title name
  // depending on what multiple of 10 you are at, assign the correct title (farmer, mayor, etc)
  // select the corresponding index (minus 1)
  // When province count increases after a user wins a battle
  // Will need a put route to update the user table when player levels up
}

// ========================================================================
// PROGRESS BAR
// ========================================================================

// When province count increases after a user wins a battle
// Increase the progress bar by 10 increments
// add to the get route in html files
// convert number to string and then slice off the first character or grab the last character
// multiply by 10
//

// need variables for title, province count, name,

// modulize function
// place functions in an object
// check to see if they need to advance another level
// if divisible by 10
// then select that index in the titles array -1
// and assign that title

// initial function(province count) {
// if divisible by 10, put request

//

// module.exports = progressUpdate;
