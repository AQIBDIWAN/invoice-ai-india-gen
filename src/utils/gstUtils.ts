
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

// In a real application, this would be an API call to GST Portal
export const fetchGSTDetails = async (gstNumber: string): Promise<GSTData | null> => {
  if (!validateGST(gstNumber)) return null;

  // This is a mock function, in production this would be an API call
  // We're simulating a delay with setTimeout
  return new Promise((resolve) => {
    setTimeout(() => {
      const firstChar = gstNumber.charAt(2).toLowerCase();
      const bizNamePrefix = firstChar === 'a' ? 'Agarwal' : 
                          firstChar === 'b' ? 'Bansal' :
                          firstChar === 'c' ? 'Choudhary' : 'Business';
      
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
      const randomCity = cities[Math.floor(Math.random() * cities.length)];
      
      resolve({
        name: Math.random() > 0.5 ? "Raj" : "Amit",
        surname: Math.random() > 0.5 ? "Kumar" : "Sharma",
        businessName: `${bizNamePrefix} ${Math.random() > 0.5 ? 'Enterprises' : 'Trading Co'}`,
        state,
        city: randomCity
      });
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
