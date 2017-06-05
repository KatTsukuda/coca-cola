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
    street_address: 'Atacama Desert',
    city: 'Arica',
    state: 'Chile',
    description: 'The world largest Coca Cola sign, made from Coke bottles placed in the Chilean desert.',
    image_url: 'http://i.imgur.com/ZJR1RFQ.jpg'
    }
]

function signData() {
    db.Sign.create(sign_data, function cocaColaSigns(err, signs) {
        if(err) {return console.log(err);}
        console.log(`Sent ${signs.length} to Coca Cola gallery!`);
    });
}

module.exports = signData;
