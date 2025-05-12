interface GSTData {
  name: string;
  surname?: string;
  businessName: string;
  state: string;
  city?: string;
}

// Function to validate GST number format 
export const validateGST = (gstNumber: string): boolean => {
  // GST number format: 22AAAAA0000A1Z5
  const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  return gstRegex.test(gstNumber);
};

// Function to extract state code from GST number
export const getStateFromGST = (gstNumber: string): string => {
  if (!validateGST(gstNumber)) return "";
  
  const stateCode = gstNumber.substring(0, 2);
  const stateMap: { [key: string]: string } = {
    "01": "Jammu & Kashmir",
    "02": "Himachal Pradesh",
    "03": "Punjab",
    "04": "Chandigarh",
    "05": "Uttarakhand",
    "06": "Haryana",
    "07": "Delhi",
    "08": "Rajasthan",
    "09": "Uttar Pradesh",
    "10": "Bihar",
    "11": "Sikkim",
    "12": "Arunachal Pradesh",
    "13": "Nagaland",
    "14": "Manipur",
    "15": "Mizoram",
    "16": "Tripura",
    "17": "Meghalaya",
    "18": "Assam",
    "19": "West Bengal",
    "20": "Jharkhand",
    "21": "Odisha",
    "22": "Chhattisgarh",
    "23": "Madhya Pradesh",
    "24": "Gujarat",
    "26": "Dadra & Nagar Haveli and Daman & Diu",
    "27": "Maharashtra",
    "28": "Andhra Pradesh",
    "29": "Karnataka",
    "30": "Goa",
    "31": "Lakshadweep",
    "32": "Kerala",
    "33": "Tamil Nadu",
    "34": "Puducherry",
    "35": "Andaman & Nicobar Islands",
    "36": "Telangana",
    "37": "Andhra Pradesh (New)",
    "38": "Ladakh",
    "97": "Other Territory",
    "99": "Centre Jurisdiction"
  };
  
  return stateMap[stateCode] || "";
};

// Save GST details to local storage
export const saveGSTDetailsToLocalStorage = (gstNumber: string, details: GSTData) => {
  try {
    // Get existing stored GST details or initialize empty object
    const storedGSTDetails = localStorage.getItem('gstDetails');
    const gstDetailsMap = storedGSTDetails ? JSON.parse(storedGSTDetails) : {};
    
    // Add or update details for this GST number
    gstDetailsMap[gstNumber] = details;
    
    // Save back to localStorage
    localStorage.setItem('gstDetails', JSON.stringify(gstDetailsMap));
    return true;
  } catch (error) {
    console.error("Failed to save GST details to localStorage:", error);
    return false;
  }
};

// Get stored GST details from local storage
export const getStoredGSTDetails = (gstNumber: string): GSTData | null => {
  try {
    const storedGSTDetails = localStorage.getItem('gstDetails');
    if (!storedGSTDetails) return null;
    
    const gstDetailsMap = JSON.parse(storedGSTDetails);
    return gstDetailsMap[gstNumber] || null;
  } catch (error) {
    console.error("Failed to retrieve GST details from localStorage:", error);
    return null;
  }
};

// Generate business name based on GST number pattern - improved deterministic generation
const generateBusinessName = (gstNumber: string): string => {
  // Extract the PAN part of GST (characters 3-12)
  const panPart = gstNumber.substring(2, 12);
  
  // Use first letter of PAN to determine business type
  const businessTypes = {
    'A': ['Agarwal', 'Apex', 'Alpha', 'Ashoka'],
    'B': ['Bharat', 'Bajaj', 'Blue Star', 'Birla'],
    'C': ['Choudhary', 'Crown', 'City', 'Capital'],
    'D': ['Dalmia', 'Divine', 'Diamond', 'Dewan'],
    'E': ['Excel', 'East India', 'Express', 'Eagle'],
    'F': ['Future', 'Falcon', 'First Choice', 'Fortune'],
    'G': ['Godrej', 'Global', 'Galaxy', 'Greenfield'],
    'H': ['Hindustan', 'Horizon', 'Heritage', 'Hightech'],
    'I': ['Indian', 'Infosys', 'Indigo', 'Imperial'],
    'J': ['Jindal', 'Jain', 'Jupiter', 'Jaguar'],
    'K': ['Kumar', 'Kingfisher', 'Kohinoor', 'Kesar'],
    'L': ['Laxmi', 'Lotus', 'Lion', 'Liberty'],
    'M': ['Mahindra', 'Modern', 'Marvel', 'Metro'],
    'N': ['National', 'New Age', 'Noble', 'Narmada'],
    'O': ['Orient', 'Omega', 'Orchid', 'Olympic'],
    'P': ['Patil', 'Premier', 'Pioneer', 'Prime'],
    'Q': ['Quality', 'Quest', 'Quantum', 'Quick'],
    'R': ['Reliance', 'Royal', 'Rajesh', 'Rainbow'],
    'S': ['Singh', 'Sharma', 'Supreme', 'Silver'],
    'T': ['Tata', 'Tristar', 'Tiger', 'Tech'],
    'U': ['United', 'Universal', 'Ultra', 'Union'],
    'V': ['Verma', 'Vision', 'Vimal', 'Victory'],
    'W': ['Western', 'World', 'Wonder', 'White'],
    'X': ['Xenon', 'Xpress', 'Xcel', 'X-Factor'],
    'Y': ['Yadav', 'Young', 'Yellow', 'Yuva'],
    'Z': ['Zenith', 'Zoom', 'Zodiac', 'Zest']
  };
  
  const firstChar = panPart.charAt(0);
  const nameList = businessTypes[firstChar as keyof typeof businessTypes] || ['Enterprise'];
  
  // Make selection more deterministic by using fixed characters from GST
  const nameIndex = Math.min(
    (panPart.charCodeAt(2) + panPart.charCodeAt(4)) % nameList.length,
    nameList.length - 1
  );
  
  const businessName = nameList[nameIndex];
  
  // Get business suffix based on the last character of the PAN
  const suffixes = ['Enterprises', 'Industries', 'Limited', 'Pvt Ltd', 'Trading Co', 'Solutions', 'Corporation'];
  const suffixIndex = Math.min(
    (panPart.charCodeAt(panPart.length - 1) + panPart.charCodeAt(panPart.length - 2)) % suffixes.length,
    suffixes.length - 1
  );
  
  return `${businessName} ${suffixes[suffixIndex]}`;
};

// Generate person name based on GST number - improved deterministic generation
const generatePersonName = (gstNumber: string): {name: string, surname: string} => {
  // Extract the PAN part of GST (characters 3-12)
  const panPart = gstNumber.substring(2, 12);
  
  // First name options
  const firstNames = {
    'A': ['Amit', 'Anil', 'Ajay', 'Arun'],
    'B': ['Baldev', 'Bharat', 'Brijesh', 'Bikram'],
    'C': ['Chetan', 'Chirag', 'Chandan', 'Chinmay'],
    'D': ['Deepak', 'Dinesh', 'Dhruv', 'Dev'],
    'E': ['Ekant', 'Eshaan', 'Eshan', 'Eshwar'],
    'F': ['Farhan', 'Faiz', 'Faisal', 'Fahad'],
    'G': ['Gaurav', 'Govind', 'Girish', 'Ganesh'],
    'H': ['Harish', 'Himanshu', 'Harsh', 'Hitesh'],
    'I': ['Ishaan', 'Imran', 'Inderjeet', 'Irfan'],
    'J': ['Jatin', 'Jai', 'Jayant', 'Jagdish'],
    'K': ['Karan', 'Kunal', 'Kamal', 'Krishan'],
    'L': ['Lalit', 'Lokesh', 'Lakshman', 'Laxman'],
    'M': ['Mohit', 'Manish', 'Manoj', 'Mukesh'],
    'N': ['Nitin', 'Naveen', 'Neeraj', 'Nitesh'],
    'O': ['Om', 'Omkar', 'Onkar', 'Omansh'],
    'P': ['Pradeep', 'Pankaj', 'Prakash', 'Praveen'],
    'Q': ['Qadir', 'Qasim', 'Qureshi', 'Qamar'],
    'R': ['Rahul', 'Raj', 'Rakesh', 'Rajesh'],
    'S': ['Sanjay', 'Suresh', 'Sandeep', 'Sunil'],
    'T': ['Tarun', 'Tushar', 'Trilok', 'Tejinder'],
    'U': ['Umesh', 'Uday', 'Ujjwal', 'Udayan'],
    'V': ['Vijay', 'Vikram', 'Varun', 'Vinod'],
    'W': ['Wasim', 'Waqar', 'Wahid', 'Wali'],
    'X': ['Xavier', 'Xander', 'Xerxes', 'Ximun'],
    'Y': ['Yash', 'Yogesh', 'Yuvraj', 'Yatin'],
    'Z': ['Zubin', 'Zaheer', 'Zeeshan', 'Zubair']
  };
  
  // Surname options
  const lastNames = {
    'A': ['Agarwal', 'Arora', 'Ahuja', 'Anand'],
    'B': ['Bansal', 'Bhatia', 'Bhalla', 'Bajaj'],
    'C': ['Chopra', 'Chadha', 'Chauhan', 'Chawla'],
    'D': ['Dhawan', 'Duggal', 'Dutta', 'Dalal'],
    'E': ['Eshwaran', 'Ezhil', 'Emmanuel', 'Easwaran'],
    'F': ['Fotedar', 'Farooqui', 'Fazal', 'Fernandez'],
    'G': ['Gupta', 'Goel', 'Garg', 'Gandhi'],
    'H': ['Hora', 'Hegde', 'Handa', 'Hans'],
    'I': ['Iyengar', 'Iyer', 'Israni', 'Ibrahim'],
    'J': ['Joshi', 'Jain', 'Johar', 'Juneja'],
    'K': ['Kumar', 'Khanna', 'Kapoor', 'Kaur'],
    'L': ['Luthra', 'Lamba', 'Lal', 'Lakhanpal'],
    'M': ['Mehta', 'Malhotra', 'Malik', 'Mathur'],
    'N': ['Nair', 'Nanda', 'Nagpal', 'Narang'],
    'O': ['Oberoi', 'Oommen', 'Om', 'Ojha'],
    'P': ['Patel', 'Prasad', 'Patil', 'Pandey'],
    'Q': ['Qureshi', 'Quadri', 'Qazi', 'Quresh'],
    'R': ['Rao', 'Reddy', 'Rathore', 'Roy'],
    'S': ['Sharma', 'Singh', 'Shah', 'Saxena'],
    'T': ['Tiwari', 'Tandon', 'Thapar', 'Thakur'],
    'U': ['Upadhyay', 'Uppal', 'Uttamchandani', 'Usgaonkar'],
    'V': ['Verma', 'Vyas', 'Venkatesh', 'Vora'],
    'W': ['Wadhwa', 'Walia', 'Wadekar', 'Wagh'],
    'X': ['Xavier', 'Xalxo', 'Xess', 'Xaxa'],
    'Y': ['Yadav', 'Yogi', 'Yohannan', 'Yagnik'],
    'Z': ['Zaveri', 'Zaidi', 'Zubin', 'Zutshi']
  };
  
  // Make selection more deterministic by using fixed characters from GST
  const firstChar = panPart.charAt(0);
  const firstNameList = firstNames[firstChar as keyof typeof firstNames] || ['Raj'];
  
  const secondChar = panPart.charAt(1);
  const lastNameList = lastNames[secondChar as keyof typeof lastNames] || ['Kumar'];
  
  // Use specific characters to ensure consistent results
  const firstNameIndex = Math.min(
    (panPart.charCodeAt(3) + panPart.charCodeAt(5)) % firstNameList.length,
    firstNameList.length - 1
  );
  
  const lastNameIndex = Math.min(
    (panPart.charCodeAt(4) + panPart.charCodeAt(6)) % lastNameList.length,
    lastNameList.length - 1
  );
  
  return {
    name: firstNameList[firstNameIndex],
    surname: lastNameList[lastNameIndex]
  };
};

// In a real application, this would be an API call to GST Portal
export const fetchGSTDetails = async (gstNumber: string): Promise<GSTData | null> => {
  if (!validateGST(gstNumber)) return null;
  
  // First check if we have stored details for this GST number
  const storedDetails = getStoredGSTDetails(gstNumber);
  if (storedDetails) {
    console.log("Found stored GST details:", storedDetails);
    return storedDetails;
  }
  
  // This is a mock function, in production this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // Only generate mock data if we don't have stored details
      const state = getStateFromGST(gstNumber);
      const randomCities: {[key: string]: string[]} = {
        "Delhi": ["Delhi", "New Delhi"],
        "Maharashtra": ["Mumbai", "Pune", "Nagpur"],
        "Karnataka": ["Bangalore", "Mysore", "Hubli"],
        "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
        "Gujarat": ["Ahmedabad", "Surat", "Vadodara"],
        "Telangana": ["Hyderabad", "Warangal", "Nizamabad"],
        "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur"]
      };
      
      const cities = randomCities[state] || ["Unknown City"];
      const cityIndex = gstNumber.charCodeAt(5) % cities.length;
      const randomCity = cities[cityIndex];
      
      // Generate deterministic business name based on GST number
      const businessName = generateBusinessName(gstNumber);
      
      // Generate deterministic person name based on GST number
      const person = generatePersonName(gstNumber);
      
      const mockData = {
        name: person.name,
        surname: person.surname,
        businessName: businessName,
        state,
        city: randomCity
      };
      
      resolve(mockData);
    }, 800);
  });
};

// Convert number to words for Indian currency
export const numberToWords = (num: number): string => {
  const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  const convertLessThanOneThousand = (n: number): string => {
    if (n === 0) return '';
    
    if (n < 10) return units[n];
    
    if (n < 20) return teens[n - 10];
    
    if (n < 100) {
      return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + units[n % 10] : '');
    }
    
    return units[Math.floor(n / 100)] + ' Hundred' + (n % 100 !== 0 ? ' and ' + convertLessThanOneThousand(n % 100) : '');
  };
  
  if (num === 0) return 'Zero';
  
  // Format for Indian numbering system (lakhs, crores)
  let result = '';
  let crores = Math.floor(num / 10000000);
  num %= 10000000;
  
  let lakhs = Math.floor(num / 100000);
  num %= 100000;
  
  let thousands = Math.floor(num / 1000);
  num %= 1000;
  
  let remainder = num;
  
  if (crores > 0) {
    result += convertLessThanOneThousand(crores) + ' Crore ';
  }
  
  if (lakhs > 0) {
    result += convertLessThanOneThousand(lakhs) + ' Lakh ';
  }
  
  if (thousands > 0) {
    result += convertLessThanOneThousand(thousands) + ' Thousand ';
  }
  
  if (remainder > 0) {
    result += convertLessThanOneThousand(remainder);
  }
  
  return result.trim() + ' Rupees Only';
};

// Format currency in Indian format
export const formatIndianCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2
  }).format(amount);
};
