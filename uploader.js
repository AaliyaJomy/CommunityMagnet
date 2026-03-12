import { db } from './firebase-config.js';
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// 1. Paste the big 50-business JSON list here
const businesses = [
  { "id": "clubhouse-01", "name": "Clubhouse Shop", "type": "Thrift", "rating": 4.8, "price": "$", "accessible": true, "wifi": false, "petFriendly": false, "deal": "20% Off first visit", "address": "4245 Forest Park Ave", "phone": "(314) 533-4116" },
  { "id": "hsu-01", "name": "Hsu's Hunan Yu", "type": "Restaurant", "rating": 4.5, "price": "$$", "accessible": true, "wifi": false, "petFriendly": false, "deal": "BOGO Appetizer", "address": "11539 Gravois Rd", "phone": "(314) 843-1256" },
  { "id": "aya-01", "name": "Aya Sofia", "type": "Restaurant", "rating": 4.7, "price": "$$$", "accessible": true, "wifi": false, "petFriendly": true, "deal": "10% Off Date Night", "address": "6671 Chippewa St", "phone": "(314) 645-9919" },
  { "id": "blue-01", "name": "Blueprint Coffee", "type": "Coffee", "rating": 4.9, "price": "$$", "accessible": true, "wifi": true, "petFriendly": true, "deal": "Free Pastry w/ Beans", "address": "6225 Delmar Blvd", "phone": "(314) 266-6808" },
  { "id": "sump-01", "name": "Sump Coffee", "type": "Coffee", "rating": 4.8, "price": "$$", "accessible": true, "wifi": false, "petFriendly": true, "deal": "none", "address": "3700 S Jefferson Ave", "phone": "(917) 412-5670" },
  { "id": "fiddle-01", "name": "Fiddlehead Fern", "type": "Coffee", "rating": 4.8, "price": "$$", "accessible": true, "wifi": true, "petFriendly": true, "deal": "$1 Off Seasonal Latte", "address": "4066 Russell Blvd", "phone": "(314) 300-8111" },
  { "id": "song-01", "name": "Songbird", "type": "Restaurant", "rating": 4.7, "price": "$$", "accessible": true, "wifi": false, "petFriendly": false, "deal": "none", "address": "4476 Chouteau Ave", "phone": "(314) 781-4344" },
  { "id": "rooster-01", "name": "Rooster", "type": "Restaurant", "rating": 4.6, "price": "$$", "accessible": true, "wifi": true, "petFriendly": false, "deal": "BOGO Crepes (Mon)", "address": "1104 Locust St", "phone": "(314) 241-8118" },
  { "id": "espresso-01", "name": "Espresso Yourself", "type": "Coffee", "rating": 4.7, "price": "$", "accessible": true, "wifi": true, "petFriendly": false, "deal": "none", "address": "5391 Devonshire Ave", "phone": "(314) 335-7560" },
  { "id": "blues-01", "name": "Blues City Deli", "type": "Restaurant", "rating": 4.9, "price": "$", "accessible": true, "wifi": false, "petFriendly": true, "deal": "none", "address": "2438 McNair Ave", "phone": "(314) 773-8225" },
  { "id": "balkan-01", "name": "Balkan Treat Box", "type": "Restaurant", "rating": 4.9, "price": "$$", "accessible": true, "wifi": false, "petFriendly": false, "deal": "Free Drink w/ App", "address": "8103 Big Bend Blvd", "phone": "(314) 733-5020" },
  { "id": "sidney-01", "name": "Sidney Street Cafe", "type": "Restaurant", "rating": 4.8, "price": "$$$$", "accessible": true, "wifi": false, "petFriendly": false, "deal": "none", "address": "2000 Sidney St", "phone": "(314) 771-5777" },
  { "id": "polite-01", "name": "Polite Society", "type": "Restaurant", "rating": 4.7, "price": "$$$", "accessible": true, "wifi": false, "petFriendly": false, "deal": "none", "address": "1923 Park Ave", "phone": "(314) 325-2395" },
  { "id": "fountain-01", "name": "Fountain on Locust", "type": "Restaurant", "rating": 4.7, "price": "$$", "accessible": true, "wifi": false, "petFriendly": false, "deal": "$2 Off Sundaes", "address": "3037 Locust St", "phone": "(314) 535-7077" },
  { "id": "loafers-01", "name": "Union Loafers", "type": "Bakery", "rating": 4.8, "price": "$$", "accessible": true, "wifi": false, "petFriendly": false, "deal": "none", "address": "1629 Tower Grove", "phone": "(314) 833-6111" },
  { "id": "gus-01", "name": "Gus' Pretzels", "type": "Bakery", "rating": 4.7, "price": "$", "accessible": true, "wifi": false, "petFriendly": true, "deal": "none", "address": "1820 Arsenal St", "phone": "(314) 772-3691" },
  { "id": "planter-01", "name": "Planter's House", "type": "Restaurant", "rating": 4.8, "price": "$$$", "accessible": true, "wifi": false, "petFriendly": false, "deal": "15% Off Happy Hour", "address": "1000 Mississippi Ave", "phone": "(314) 696-2603" },
  { "id": "stlstyle-01", "name": "STL Style", "type": "Retail", "rating": 4.9, "price": "$$", "accessible": true, "wifi": false, "petFriendly": true, "deal": "none", "address": "3159 Cherokee St", "phone": "(314) 898-0001" },
  { "id": "vinyl-01", "name": "Vintage Vinyl", "type": "Retail", "rating": 4.9, "price": "$$", "accessible": true, "wifi": false, "petFriendly": true, "deal": "10% Off Used Vinyl", "address": "6610 Delmar Blvd", "phone": "(314) 721-4096" },
  { "id": "civil-01", "name": "Civil Alchemy", "type": "Retail", "rating": 4.8, "price": "$$$", "accessible": true, "wifi": false, "petFriendly": true, "deal": "none", "address": "8154 Big Bend Blvd", "phone": "(314) 801-7577" },
  { "id": "urban-01", "name": "Urban Matter", "type": "Retail", "rating": 4.7, "price": "$$$", "accessible": true, "wifi": false, "petFriendly": true, "deal": "none", "address": "3179 S Grand Blvd", "phone": "(314) 456-6556" },
  { "id": "arch-01", "name": "Arch Apparel", "type": "Retail", "rating": 4.8, "price": "$$", "accessible": true, "wifi": false, "petFriendly": false, "deal": "none", "address": "2335 S Hanley Rd", "phone": "(314) 601-3377" },
  { "id": "herbaria-01", "name": "Herbaria", "type": "Retail", "rating": 4.9, "price": "$$", "accessible": true, "wifi": false, "petFriendly": false, "deal": "Free Soap Sample", "address": "2016 Marconi Ave", "phone": "(314) 601-3909" },
  { "id": "mobake-01", "name": "Missouri Baking Co", "type": "Bakery", "rating": 4.9, "price": "$", "accessible": true, "wifi": false, "petFriendly": false, "deal": "none", "address": "2027 Edwards St", "phone": "(314) 773-6566" },
  { "id": "sugar-01", "name": "Sugarwitch", "type": "Bakery", "rating": 4.8, "price": "$$", "accessible": true, "wifi": false, "petFriendly": true, "deal": "none", "address": "7726 Virginia Ave", "phone": "(314) 802-7104" },
  { "id": "ted-01", "name": "Ted Drewes", "type": "Dessert", "rating": 4.9, "price": "$", "accessible": true, "wifi": false, "petFriendly": true, "deal": "none", "address": "6726 Chippewa St", "phone": "(314) 481-2652" },
  { "id": "clem-01", "name": "Clementine's", "type": "Dessert", "rating": 4.8, "price": "$$", "accessible": true, "wifi": false, "petFriendly": true, "deal": "none", "address": "1637 S 18th St", "phone": "(314) 858-6100" },
  { "id": "left-01", "name": "Left Bank Books", "type": "Retail", "rating": 4.9, "price": "$$", "accessible": true, "wifi": true, "petFriendly": true, "deal": "none", "address": "399 N Euclid Ave", "phone": "(314) 367-6731" },
  { "id": "bogart-01", "name": "Bogart's Smokehouse", "type": "Restaurant", "rating": 4.8, "price": "$$", "accessible": true, "wifi": false, "petFriendly": false, "deal": "none", "address": "1627 S 9th St", "phone": "(314) 621-3107" },
  { "id": "lona-01", "name": "Lona's Lil Eats", "type": "Restaurant", "rating": 4.7, "price": "$$", "accessible": true, "wifi": false, "petFriendly": true, "deal": "none", "address": "2199 California Ave", "phone": "(314) 925-8938" },
  { "id": "stacked-01", "name": "Stacked STL", "type": "Restaurant", "rating": 4.6, "price": "$$", "accessible": true, "wifi": true, "petFriendly": true, "deal": "none", "address": "7637 Ivory Ave", "phone": "(314) 544-4900" },
  { "id": "broad-01", "name": "Broadway Oyster Bar", "type": "Restaurant", "rating": 4.8, "price": "$$", "accessible": true, "wifi": false, "petFriendly": false, "deal": "none", "address": "736 S Broadway", "phone": "(314) 621-8811" },
  { "id": "normal-01", "name": "The Normal Brand", "type": "Retail", "rating": 4.7, "price": "$$$", "accessible": true, "wifi": false, "petFriendly": false, "deal": "none", "address": "13 The Blvd", "phone": "(314) 899-9051" },
  { "id": "momod-01", "name": "MoModern", "type": "Retail", "rating": 4.8, "price": "$$$", "accessible": true, "wifi": false, "petFriendly": false, "deal": "none", "address": "100 Cherokee St", "phone": "(314) 546-1365" },
  { "id": "asasin-01", "name": "Assassin Vintage", "type": "Thrift", "rating": 4.7, "price": "$$", "accessible": false, "wifi": false, "petFriendly": true, "deal": "none", "address": "3156 Cherokee St", "phone": "(314) 630-1040" },
  { "id": "prov-01", "name": "Provisions STL", "type": "Retail", "rating": 4.8, "price": "$$$", "accessible": true, "wifi": false, "petFriendly": true, "deal": "none", "address": "228 N Euclid Ave", "phone": "(314) 833-5400" },
  { "id": "pais-01", "name": "Paisley Boutique", "type": "Retail", "rating": 4.7, "price": "$$", "accessible": true, "wifi": false, "petFriendly": false, "deal": "none", "address": "233 W Lockwood", "phone": "(314) 473-1250" },
  { "id": "wax-01", "name": "Dead Wax Records", "type": "Retail", "rating": 4.8, "price": "$$", "accessible": true, "wifi": false, "petFriendly": true, "deal": "none", "address": "1973 Cherokee St", "phone": "(314) 405-8025" },
  { "id": "butter-01", "name": "Butter Love Skin", "type": "Retail", "rating": 4.9, "price": "$$", "accessible": true, "wifi": false, "petFriendly": false, "deal": "none", "address": "3106 Cherokee St", "phone": "(314) 732-0056" },
  { "id": "olive-01", "name": "Olive + Oak", "type": "Restaurant", "rating": 4.9, "price": "$$$", "accessible": true, "wifi": false, "petFriendly": false, "deal": "none", "address": "216 W Lockwood", "phone": "(314) 736-1370" },
  { "id": "telva-01", "name": "Telva at the Ridge", "type": "Cafe", "rating": 4.8, "price": "$$", "accessible": true, "wifi": true, "petFriendly": true, "deal": "none", "address": "60 Webster Ridge", "phone": "(314) 395-3595" },
  { "id": "comet-01", "name": "Comet Coffee", "type": "Coffee", "rating": 4.8, "price": "$", "accessible": true, "wifi": true, "petFriendly": false, "deal": "none", "address": "5708 Oakland Ave", "phone": "(314) 932-7770" },
  { "id": "pint-01", "name": "Pint Size Bakery", "type": "Bakery", "rating": 4.9, "price": "$", "accessible": true, "wifi": false, "petFriendly": false, "deal": "none", "address": "3133 Watson Rd", "phone": "(314) 644-4422" },
  { "id": "kitchen-01", "name": "Kitchen House", "type": "Cafe", "rating": 4.7, "price": "$$", "accessible": true, "wifi": true, "petFriendly": true, "deal": "none", "address": "3149 Shenandoah", "phone": "(314) 732-0009" },
  { "id": "city-01", "name": "City Coffee House", "type": "Coffee", "rating": 4.6, "price": "$", "accessible": true, "wifi": true, "petFriendly": false, "deal": "none", "address": "36 N Brentwood", "phone": "(314) 727-8043" },
  { "id": "bowood-01", "name": "Bowood by Niche", "type": "Restaurant", "rating": 4.8, "price": "$$$", "accessible": true, "wifi": false, "petFriendly": true, "deal": "none", "address": "4605 Olive St", "phone": "(314) 454-6868" },
  { "id": "mission-01", "name": "Mission Taco", "type": "Restaurant", "rating": 4.7, "price": "$$", "accessible": true, "wifi": false, "petFriendly": true, "deal": "none", "address": "6235 Delmar Blvd", "phone": "(314) 932-5430" },
  { "id": "avalon-01", "name": "Avalon Exchange", "type": "Thrift", "rating": 4.5, "price": "$$", "accessible": true, "wifi": false, "petFriendly": false, "deal": "none", "address": "6392 Delmar Blvd", "phone": "(314) 725-2760" },
  { "id": "ruth-01", "name": "Ruth's Vintage", "type": "Thrift", "rating": 4.6, "price": "$$", "accessible": true, "wifi": false, "petFriendly": true, "deal": "none", "address": "2001 Cherokee St", "phone": "(314) 772-1557" },
  { "id": "lucas-01", "name": "Lucas Park Grille", "type": "Restaurant", "rating": 4.5, "price": "$$$", "accessible": true, "wifi": false, "petFriendly": false, "deal": "none", "address": "1234 Washington Ave", "phone": "(314) 241-7770" }
];

// 2. The function to upload
async function uploadData() {
    console.log("Starting upload...");
    
    for (const biz of businesses) {
        try {
            // This creates a document in the "businesses" collection using the "id" we gave it
            await setDoc(doc(db, "businesses", biz.id), biz);
            console.log(`Successfully uploaded: ${biz.name}`);
        } catch (error) {
            console.error(`Error uploading ${biz.name}: `, error);
        }
    }
    
    alert("All 50 businesses have been added to your database!");
}

// Execute the upload
uploadData();