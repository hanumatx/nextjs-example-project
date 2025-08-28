// Predefined bus data for Lucknow with real coordinates and detailed routes
export interface BusStop {
  name: string;
  lat: number;
  lng: number;
  estimatedTime?: string;
}

export interface BusInfo {
  busNumber: string;
  route: string;
  startPoint: string;
  endPoint: string;
  lat: number;
  lng: number;
  lastUpdated: string;
  totalDistance: string;
  estimatedDuration: string;
  fare: string;
  stops: BusStop[];
}

export const busData: BusInfo[] = [
  {
    busNumber: "101",
    route: "Hazratganj - Alambagh",
    startPoint: "Hazratganj",
    endPoint: "Alambagh",
    lat: 26.8467,
    lng: 80.9462,
    lastUpdated: "2 mins ago",
    totalDistance: "12.5 km",
    estimatedDuration: "35 mins",
    fare: "₹15",
    stops: [
      { name: "Hazratganj", lat: 26.8467, lng: 80.9462, estimatedTime: "0 min" },
      { name: "GPO", lat: 26.8455, lng: 80.9455, estimatedTime: "3 min" },
      { name: "Charbagh Railway Station", lat: 26.8235, lng: 80.9220, estimatedTime: "8 min" },
      { name: "Polytechnic", lat: 26.8180, lng: 80.9180, estimatedTime: "12 min" },
      { name: "Nishatganj", lat: 26.8120, lng: 80.9120, estimatedTime: "18 min" },
      { name: "Transport Nagar", lat: 26.8050, lng: 80.9050, estimatedTime: "25 min" },
      { name: "Alambagh Bus Station", lat: 26.7980, lng: 80.8980, estimatedTime: "35 min" }
    ]
  },
  {
    busNumber: "102", 
    route: "Charbagh - Gomti Nagar",
    startPoint: "Charbagh",
    endPoint: "Gomti Nagar",
    lat: 26.8475,
    lng: 80.9450,
    lastUpdated: "1 min ago",
    totalDistance: "18.2 km",
    estimatedDuration: "45 mins",
    fare: "₹20",
    stops: [
      { name: "Charbagh Railway Station", lat: 26.8235, lng: 80.9220, estimatedTime: "0 min" },
      { name: "Hussainganj", lat: 26.8350, lng: 80.9350, estimatedTime: "5 min" },
      { name: "Hazratganj", lat: 26.8467, lng: 80.9462, estimatedTime: "10 min" },
      { name: "Lalbagh", lat: 26.8520, lng: 80.9520, estimatedTime: "15 min" },
      { name: "Mahanagar", lat: 26.8580, lng: 80.9580, estimatedTime: "22 min" },
      { name: "Indira Nagar", lat: 26.8650, lng: 80.9650, estimatedTime: "30 min" },
      { name: "Gomti Nagar", lat: 26.8750, lng: 80.9750, estimatedTime: "45 min" }
    ]
  },
  {
    busNumber: "103",
    route: "Aminabad - Indira Nagar",
    startPoint: "Aminabad",
    endPoint: "Indira Nagar",
    lat: 26.8458,
    lng: 80.9475,
    lastUpdated: "3 mins ago",
    totalDistance: "8.7 km",
    estimatedDuration: "25 mins",
    fare: "₹12",
    stops: [
      { name: "Aminabad", lat: 26.8458, lng: 80.9475, estimatedTime: "0 min" },
      { name: "Chowk", lat: 26.8500, lng: 80.9500, estimatedTime: "4 min" },
      { name: "Nakhas", lat: 26.8550, lng: 80.9550, estimatedTime: "8 min" },
      { name: "Kaiserbagh", lat: 26.8600, lng: 80.9600, estimatedTime: "12 min" },
      { name: "Mahanagar", lat: 26.8620, lng: 80.9620, estimatedTime: "18 min" },
      { name: "Indira Nagar", lat: 26.8650, lng: 80.9650, estimatedTime: "25 min" }
    ]
  },
  {
    busNumber: "104",
    route: "Kaiserbagh - Mahanagar",
    startPoint: "Kaiserbagh",
    endPoint: "Mahanagar",
    lat: 26.8520,
    lng: 80.9420,
    lastUpdated: "5 mins ago",
    totalDistance: "6.3 km",
    estimatedDuration: "18 mins",
    fare: "₹10",
    stops: [
      { name: "Kaiserbagh", lat: 26.8520, lng: 80.9420, estimatedTime: "0 min" },
      { name: "Qila", lat: 26.8540, lng: 80.9440, estimatedTime: "3 min" },
      { name: "Lalbagh", lat: 26.8560, lng: 80.9460, estimatedTime: "7 min" },
      { name: "Vidhan Sabha", lat: 26.8580, lng: 80.9480, estimatedTime: "12 min" },
      { name: "Mahanagar", lat: 26.8600, lng: 80.9500, estimatedTime: "18 min" }
    ]
  },
  {
    busNumber: "105",
    route: "Lucknow University - Chowk",
    startPoint: "Lucknow University",
    endPoint: "Chowk",
    lat: 26.8670,
    lng: 80.9100,
    lastUpdated: "1 min ago",
    totalDistance: "15.8 km",
    estimatedDuration: "40 mins",
    fare: "₹18",
    stops: [
      { name: "Lucknow University", lat: 26.8670, lng: 80.9100, estimatedTime: "0 min" },
      { name: "Hasanganj", lat: 26.8620, lng: 80.9150, estimatedTime: "6 min" },
      { name: "Daliganj", lat: 26.8580, lng: 80.9200, estimatedTime: "12 min" },
      { name: "Thakurganj", lat: 26.8540, lng: 80.9250, estimatedTime: "18 min" },
      { name: "Aminabad", lat: 26.8500, lng: 80.9300, estimatedTime: "25 min" },
      { name: "Nakhas", lat: 26.8480, lng: 80.9350, estimatedTime: "32 min" },
      { name: "Chowk", lat: 26.8460, lng: 80.9400, estimatedTime: "40 min" }
    ]
  },
  {
    busNumber: "106",
    route: "Aliganj - Rajajipuram",
    startPoint: "Aliganj",
    endPoint: "Rajajipuram",
    lat: 26.8850,
    lng: 80.9750,
    lastUpdated: "4 mins ago",
    totalDistance: "22.4 km",
    estimatedDuration: "55 mins",
    fare: "₹25",
    stops: [
      { name: "Aliganj", lat: 26.8850, lng: 80.9750, estimatedTime: "0 min" },
      { name: "Kalyanpur", lat: 26.8800, lng: 80.9700, estimatedTime: "8 min" },
      { name: "Sitapur Road", lat: 26.8750, lng: 80.9650, estimatedTime: "15 min" },
      { name: "Indira Nagar", lat: 26.8700, lng: 80.9600, estimatedTime: "25 min" },
      { name: "Mahanagar", lat: 26.8650, lng: 80.9550, estimatedTime: "35 min" },
      { name: "Lalbagh", lat: 26.8600, lng: 80.9500, estimatedTime: "42 min" },
      { name: "Rajajipuram", lat: 26.8550, lng: 80.9450, estimatedTime: "55 min" }
    ]
  },
  {
    busNumber: "107",
    route: "Jankipuram - Hazratganj",
    startPoint: "Jankipuram",
    endPoint: "Hazratganj",
    lat: 26.9150,
    lng: 80.9350,
    lastUpdated: "2 mins ago",
    totalDistance: "16.7 km",
    estimatedDuration: "42 mins",
    fare: "₹20",
    stops: [
      { name: "Jankipuram", lat: 26.9150, lng: 80.9350, estimatedTime: "0 min" },
      { name: "Kursi Road", lat: 26.9100, lng: 80.9300, estimatedTime: "7 min" },
      { name: "Alambagh", lat: 26.9050, lng: 80.9250, estimatedTime: "15 min" },
      { name: "Transport Nagar", lat: 26.9000, lng: 80.9200, estimatedTime: "22 min" },
      { name: "Charbagh", lat: 26.8950, lng: 80.9150, estimatedTime: "30 min" },
      { name: "Hussainganj", lat: 26.8900, lng: 80.9100, estimatedTime: "36 min" },
      { name: "Hazratganj", lat: 26.8850, lng: 80.9050, estimatedTime: "42 min" }
    ]
  },
  {
    busNumber: "108",
    route: "Telibagh - Gomti Nagar Extension",
    startPoint: "Telibagh",
    endPoint: "Gomti Nagar Extension",
    lat: 26.8200,
    lng: 81.0200,
    lastUpdated: "6 mins ago",
    totalDistance: "28.5 km",
    estimatedDuration: "65 mins",
    fare: "₹30",
    stops: [
      { name: "Telibagh", lat: 26.8200, lng: 81.0200, estimatedTime: "0 min" },
      { name: "Amausi", lat: 26.8250, lng: 81.0150, estimatedTime: "10 min" },
      { name: "Chinhat", lat: 26.8300, lng: 81.0100, estimatedTime: "20 min" },
      { name: "Faizabad Road", lat: 26.8350, lng: 81.0050, estimatedTime: "30 min" },
      { name: "Indira Nagar", lat: 26.8400, lng: 81.0000, estimatedTime: "40 min" },
      { name: "Gomti Nagar", lat: 26.8450, lng: 80.9950, estimatedTime: "50 min" },
      { name: "Gomti Nagar Extension", lat: 26.8500, lng: 80.9900, estimatedTime: "65 min" }
    ]
  },
  {
    busNumber: "109",
    route: "Vikas Nagar - Charbagh",
    startPoint: "Vikas Nagar",
    endPoint: "Charbagh",
    lat: 26.8300,
    lng: 80.9800,
    lastUpdated: "3 mins ago",
    totalDistance: "11.2 km",
    estimatedDuration: "28 mins",
    fare: "₹14",
    stops: [
      { name: "Vikas Nagar", lat: 26.8300, lng: 80.9800, estimatedTime: "0 min" },
      { name: "Gomti Nagar", lat: 26.8320, lng: 80.9750, estimatedTime: "5 min" },
      { name: "Indira Nagar", lat: 26.8340, lng: 80.9700, estimatedTime: "10 min" },
      { name: "Mahanagar", lat: 26.8360, lng: 80.9650, estimatedTime: "15 min" },
      { name: "Lalbagh", lat: 26.8380, lng: 80.9600, estimatedTime: "20 min" },
      { name: "Hazratganj", lat: 26.8400, lng: 80.9550, estimatedTime: "24 min" },
      { name: "Charbagh Railway Station", lat: 26.8420, lng: 80.9500, estimatedTime: "28 min" }
    ]
  },
  {
    busNumber: "110",
    route: "Sadar - Alambagh",
    startPoint: "Sadar",
    endPoint: "Alambagh",
    lat: 26.8400,
    lng: 80.9300,
    lastUpdated: "7 mins ago",
    totalDistance: "9.8 km",
    estimatedDuration: "24 mins",
    fare: "₹12",
    stops: [
      { name: "Sadar", lat: 26.8400, lng: 80.9300, estimatedTime: "0 min" },
      { name: "Cantonment", lat: 26.8380, lng: 80.9280, estimatedTime: "4 min" },
      { name: "Mayfair Cinema", lat: 26.8360, lng: 80.9260, estimatedTime: "8 min" },
      { name: "Charbagh", lat: 26.8340, lng: 80.9240, estimatedTime: "12 min" },
      { name: "Polytechnic", lat: 26.8320, lng: 80.9220, estimatedTime: "16 min" },
      { name: "Transport Nagar", lat: 26.8300, lng: 80.9200, estimatedTime: "20 min" },
      { name: "Alambagh Bus Station", lat: 26.8280, lng: 80.9180, estimatedTime: "24 min" }
    ]
  }
];

export const findBusByNumber = (busNumber: string): BusInfo | undefined => {
  return busData.find(bus => bus.busNumber === busNumber);
};
