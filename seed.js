var db = require('./models');

/* hard-coded data start*/
var sign_data = [
    {
    street_address: '123 Main St.',
    city: 'Oakville',
    state: 'Indiana',
    description: 'This porcelain sign was made in 1933. It measures 25.5" x 23" and shows signs of age, yet is still a sought-after collectors item.',
    image_url: 'http://i.imgur.com/EsIdLMg.jpg'
    },
    {
    street_address: '456 Grand Ave.',
    city: 'Sevierville',
    state: 'Tennessee',
    description: 'This 1939 Coca-Cola sign remains in the wooden frame in which it was originally shipped. It measures 71.5”x35.75” and has some dents and surface rust, but is still a nice piece for a collector.',
    image_url: 'http://i.imgur.com/0Stf9OI.jpg'
    },
    {
    street_address: '758 School St.',
    city: 'Missoula',
    state: 'Montana',
    description: 'This Coca-Cola sign is printed on cardboard and measures 20” x 36”. It was shrink wrapped onto an acid-free backing board. Printed during the war in 1944, it features two young woman pointing to the area on the globe where their men are serving.',
    image_url: 'http://i.imgur.com/xexBxdM.jpg'
    },
    {
    street_address: '3215 W Addison St.',
    city: 'Chicago',
    state: 'Illinois',
    description: 'After WWII, signs had to be made more inexpensively. One option used by Coca-Cola were cardboard signs. This Coca-Cola sign was made in 1948 by Edwards & Deutsch Lith Co. in Chicago and measures 27”x16”.',
    image_url: 'http://i.imgur.com/4pDT2T4.jpg'
    },
    {
    street_address: '2 W Main St.',
    city: 'Cartersville',
    state: 'Georgia',
    description: 'The first wall sign advertising Coca-Cola was painted on Young Brothers Pharmacy in Cartersville, Ga., in 1894, and is still there today.',
    image_url: 'http://i.imgur.com/ruKA64V.jpg'
    },
    {
    street_address: 'Downtown',
    city: 'Laurens',
    state: 'South Carolina',
    description: 'Old Coca-Cola sign painted on a building.',
    image_url: 'http://i.imgur.com/BDS3CmQ.jpg',
    },
    {
    street_address: '',
    city: 'Batesville',
    state: 'Arkansas',
    description: 'There were at least two versions of Coke signs painted on the side of the building',
    image_url: 'http://i.imgur.com/twkJYOl.jpg',
    },
    {
    street_address: 'SOHO',
    city: 'New York',
    state: 'New York',
    description: 'Old sign in SOHO',
    image_url: 'http://i.imgur.com/NErkilH.jpg',
    },
    {
    street_address: '',
    city: 'Galveston',
    state: 'Texas',
    description: '',
    image_url: 'http://i.imgur.com/QHAT34B.jpg',
    },
    {
    street_address: '',
    city: 'Sydney',
    state: 'Austraila',
    description: 'A double decker bus passes the original Coca-Cola sign at the top of Kings Cross in 1961',
    image_url: 'http://i.imgur.com/4CUjdsj.jpg',
    },
    {
    street_address: '',
    city: 'Paris',
    state: 'France',
    description: 'Vintage sign from Paris',
    image_url: 'http://i.imgur.com/wGXd5Vq.jpg',
    },
    {
    street_address: '',
    city: 'Atlanta',
    state: 'Georgia',
    description: 'Thanks to the efforts of Atlanta-based Rabbi Tobias Gerren in the 1930s, Jews keeping kosher for Passover can still drink a Coke',
    image_url: 'http://i.imgur.com/nmDV5CM.jpg',
    },
    {
    street_address: 'French Quarter',
    city: 'New Orleans',
    state: 'Louisiana',
    description: 'Vintage sign outside Royal Pharmacy',
    image_url: 'http://i.imgur.com/2KamFNx.jpg',
    },
    {
    street_address: '601 Tompkins Ave',
    city: 'San Francisco',
    state: 'California',
    description: 'A vintage 15 by 7 foot Coca-Cola sign, probably installed in the 1930s, in an aged commercial neighborhood in Bernal Heights has set off a fight over preservation, obesity and the power of the government.',
    image_url: 'http://i.imgur.com/F8YuXw0.jpg'
    },
    {
    street_address: '701 Bryant St',
    city: 'San Francisco',
    state: 'California',
    description: "Standing 112 feet above Bryant Street atop a three-story buildingthe billboard has been a landmark for drivers going to and from the Bay Bridge since 1937 -- the year after the bridge opened.",
    image_url: 'http://i.imgur.com/5aWZ0SM.jpg'
    },
    {
    street_address: 'Atacama Desert',
    city: 'Arica',
    state: 'Chile',
    description: 'The world largest Coca Cola sign, made from Coke bottles placed in the Chilean desert.',
    image_url: 'http://i.imgur.com/ZJR1RFQ.jpg'
    },
];

function signData() {
    db.Sign.create(sign_data, function cocaColaSigns(err, signs) {
        if(err) {return console.log(err);}
        console.log(`Sent ${signs.length} to Coca Cola gallery!`);
    });
}

module.exports = signData;
