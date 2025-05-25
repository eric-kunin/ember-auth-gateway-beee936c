
export const mainGenders = [
  { value: 'male', label: 'גבר' },
  { value: 'female', label: 'אישה' },
  { value: 'both', label: 'גבר ואישה' },
  { value: 'other', label: 'אחר' }
];

export const extraGenders = [
  { value: 'non-binary', label: 'נון-בינארי' },
  { value: 'transgender', label: 'טרנסג\'נדר' },
  { value: 'genderfluid', label: 'ג\'נדר פלואיד' },
  { value: 'agender', label: 'א-ג\'נדר' },
  { value: 'demigender', label: 'דמי-ג\'נדר' },
  { value: 'questioning', label: 'בחיפוש' }
];

export const relationshipTypes = [
  { value: 'serious', label: 'קשר רציני' },
  { value: 'casual', label: 'קשר נינוח' },
  { value: 'friendship', label: 'חברות' },
  { value: 'marriage', label: 'נישואין' },
  { value: 'dating', label: 'דייטים' },
  { value: 'hookup', label: 'מפגש חד פעמי' }
];

export const regions = [
  { value: 'center', label: 'מרכז' },
  { value: 'north', label: 'צפון' },
  { value: 'south', label: 'דרום' },
  { value: 'jerusalem', label: 'ירושלים' },
  { value: 'westbank', label: 'יהודה ושומרון' }
];

export const popularCities = [
  { value: 'tel-aviv', label: 'תל אביב' },
  { value: 'jerusalem', label: 'ירושלים' },
  { value: 'haifa', label: 'חיפה' },
  { value: 'rishon', label: 'ראשון לציון' },
  { value: 'petah-tikva', label: 'פתח תקווה' },
  { value: 'ashdod', label: 'אשדוד' },
  { value: 'netanya', label: 'נתניה' },
  { value: 'beer-sheva', label: 'באר שבע' },
  { value: 'holon', label: 'חולון' },
  { value: 'herzliya', label: 'הרצליה' },
  { value: 'rehovot', label: 'רחובות' },
  { value: 'ashkelon', label: 'אשקלון' }
];

export const citiesByRegion = {
  center: [
    { value: 'tel-aviv', label: 'תל אביב' },
    { value: 'petah-tikva', label: 'פתח תקווה' },
    { value: 'rishon', label: 'ראשון לציון' },
    { value: 'holon', label: 'חולון' },
    { value: 'bat-yam', label: 'בת ים' },
    { value: 'ramat-gan', label: 'רמת גן' },
    { value: 'givatayim', label: 'גבעתיים' },
    { value: 'herzliya', label: 'הרצליה' },
    { value: 'kfar-saba', label: 'כפר סבא' },
    { value: 'raanana', label: 'רעננה' },
    { value: 'hod-hasharon', label: 'הוד השרון' },
    { value: 'rehovot', label: 'רחובות' }
  ],
  north: [
    { value: 'haifa', label: 'חיפה' },
    { value: 'nazareth', label: 'נצרת' },
    { value: 'acre', label: 'עכו' },
    { value: 'tiberias', label: 'טבריה' },
    { value: 'safed', label: 'צפת' },
    { value: 'nahariya', label: 'נהריה' },
    { value: 'carmiel', label: 'כרמיאל' },
    { value: 'kiryat-shmona', label: 'קריית שמונה' },
    { value: 'afula', label: 'עפולה' },
    { value: 'netanya', label: 'נתניה' }
  ],
  south: [
    { value: 'beer-sheva', label: 'באר שבע' },
    { value: 'ashdod', label: 'אשדוד' },
    { value: 'ashkelon', label: 'אשקלון' },
    { value: 'eilat', label: 'אילת' },
    { value: 'dimona', label: 'דימונה' },
    { value: 'arad', label: 'ערד' },
    { value: 'netivot', label: 'נתיבות' },
    { value: 'ofakim', label: 'אופקים' },
    { value: 'sderot', label: 'שדרות' }
  ],
  jerusalem: [
    { value: 'jerusalem', label: 'ירושלים' },
    { value: 'beit-shemesh', label: 'בית שמש' },
    { value: 'maale-adumim', label: 'מעלה אדומים' },
    { value: 'mevaseret', label: 'מבשרת ציון' }
  ],
  westbank: [
    { value: 'ariel', label: 'אריאל' },
    { value: 'maale-adumim', label: 'מעלה אדומים' },
    { value: 'beitar-illit', label: 'ביתר עילית' },
    { value: 'modi-in-illit', label: 'מודיעין עילית' },
    { value: 'efrat', label: 'אפרת' },
    { value: 'gush-etzion', label: 'גוש עציון' }
  ]
};
