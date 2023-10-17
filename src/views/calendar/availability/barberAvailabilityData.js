const DATA = [
    {
      "id": 1,
      "name": "Abdual Mueed",
      "userpic": "https://avatars.githubusercontent.com/u/1?v=4",
      "email": "abdual.mueed@example.com",
      "phoneNumber": "+1 123-456-7890",
      "availability": [
        {
          "day": "Sunday",
          "date": "2023-10-01",
          "status": "active",
          "timeSlot": ["09:05 - 13:00 ", "18:00 - 22:00 "],
          "holiday": false
        },
        {
          "day": "Monday",
          "date": "2023-10-02",
          "status": "offline",
          "timeSlot": [],
          "holiday": true
        },
        {
          "day": "Tuesday",
          "date": "2023-10-03",
          "status": "active",
          "timeSlot": ["19:11 - 20:00 ", "21:00 - 22:50 "],
          "holiday": false
        },
        {
          "day": "Wednesday",
          "date": "2023-10-04",
          "status": "offline",
          "timeSlot": [],
          "holiday": true
        }
      ],
      "staticAvailability": [
        {
          "day": "Monday",
          "staticTimeSlot": [],
        },
        {
          "day": "Tuesday",
          "staticTimeSlot": ["09:00  - 13:00 ", "18:00  - 22:00 "],
        },
        {
          "day": "Wednesday",
          "staticTimeSlot": ["09:00  - 13:00 ", "18:00  - 22:00 "],
        },
        {
          "day": "Thursday",
          "staticTimeSlot": [],
        },
        {
          "day": "Friday",
          "staticTimeSlot": ["09:00  - 13:00 ", "18:00  - 22:00 "],
        },
        {
          "day": "Saturday",
          "staticTimeSlot": [],
        },
        {
          "day": "Sunday",
          "staticTimeSlot": ["09:00  - 13:00 ", "18:00  - 22:00 "],
        },
      ],
      "holidays": [
        "2023-10-25",
        "2023-10-28"
      ],
      "price": 50,
      "experienceInYears": 5,
      "area": "Downtown",
      "location": "New York"
    },
    {
      "id": 2,
      "name": "Jane Smith",
      "userpic": "https://avatars.githubusercontent.com/u/3?v=4",
      "email": "jane.smith@example.com",
      "phoneNumber": "+1 987-654-3210",
      "availability": [
        {
          "day": "Tuesday",
          "date": "2023-10-03",
          "status": "active",
          "timeSlot": ["09:00  - 13:00 ", "20:00 - 22:00 ", "21:00 - 23:00 "],
          "holiday": false
        },
        {
          "day": "Wednesday",
          "date": "2023-10-04",
          "status": "active",
          "timeSlot": ["09:00 - 13:00 ", "20:00 - 22:00 ", "21:00 - 23:00 "],
          "holiday": false
        },
        {
          "day": "Thursday",
          "date": "2023-10-05",
          "status": "active",
          "timeSlot": ["09:00 - 13:00 ", "20:00 - 22:00 "],
          "holiday": false
        },
        {
          "day": "Friday",
          "date": "2023-10-06",
          "status": "active",
          "timeSlot": ["09:00 - 13:50 ", "20:40 - 22:00 "],
          "holiday": false
        }
      ],
      "staticAvailability": [
        {
          "day": "Monday",
          "staticTimeSlot": [],
        },
        {
          "day": "Tuesday",
          "staticTimeSlot": ["09:00  - 13:00 ", "18:00  - 22:00 "],
        },
        {
          "day": "Wednesday",
          "staticTimeSlot": ["09:00  - 13:00 ", "18:00  - 22:00 "],
        },
        {
          "day": "Thursday",
          "staticTimeSlot": [],
        },
        {
          "day": "Friday",
          "staticTimeSlot": ["09:00  - 13:00 ", "18:00  - 22:00 "],
        },
        {
          "day": "Saturday",
          "staticTimeSlot": [],
        },
        {
          "day": "Sunday",
          "staticTimeSlot": ["09:00  - 13:00 ", "18:00  - 22:00 "],
        },
      ],
      "holidays": [
        "2023-10-26",
        "2023-10-29"
      ],
      "price": 60,
      "experienceInYears": 7,
      "area": "Suburb",
      "location": "Los Angeles"
    },
    {
      "id": 3,
      "name": "John Doe",
      "userpic": "https://avatars.githubusercontent.com/u/5?v=4",
      "email": "john.doe@example.com",
      "phoneNumber": "+1 555-555-5555",
      "availability": [
        {
          "day": "Monday",
          "date": "2023-10-18",
          "status": "active",
          "timeSlot": ["09:00 - 13:00 ", "20:00 - 22:00 "],
          "holiday": false
        },
        {
          "day": "Tuesday",
          "date": "2023-10-19",
          "status": "offline",
          "timeSlot": [],
          "holiday": true
        },
        {
          "day": "Wednesday",
          "date": "2023-10-20",
          "status": "offline",
          "timeSlot": [],
          "holiday": true
        },
        {
          "day": "Thursday",
          "date": "2023-10-21",
          "status": "offline",
          "timeSlot": [],
          "holiday": true
        },
        {
          "day": "Friday",
          "date": "2023-10-22",
          "status": "offline",
          "timeSlot": [],
          "holiday": true
        },
        {
          "day": "Saturday",
          "date": "2023-10-23",
          "status": "active",
          "timeSlot": ["09:00 - 13:00 ", "20:00 - 22:00 "],
          "holiday": false
        },
        {
          "day": "Sunday",
          "date": "2023-10-24",
          "status": "active",
          "timeSlot": ["09:00 - 13:00 ", "20:00 - 22:00 "],
          "holiday": false
        }
      ],
      "staticAvailability": [
        {
          "day": "Monday",
          "staticTimeSlot": [],
        },
        {
          "day": "Tuesday",
          "staticTimeSlot": ["09:00 - 13:00 ", "18:00 - 22:00 "],
        },
        {
          "day": "Wednesday",
          "staticTimeSlot": ["09:00 - 13:00 ", "18:00 - 22:00 "],
        },
        {
          "day": "Thursday",
          "staticTimeSlot": [],
        },
        {
          "day": "Friday",
          "staticTimeSlot": ["09:00 - 13:00 ", "18:00 - 22:00 "],
        },
        {
          "day": "Saturday",
          "staticTimeSlot": [],
        },
        {
          "day": "Sunday",
          "staticTimeSlot": ["09:00 - 13:00 ", "18:00 - 22:00 "],
        },
      ],
      "holidays": [
        "2023-10-25",
        "2023-10-28"
      ],
      "price": 45,
      "experienceInYears": 4,
      "area": "City Center",
      "location": "Chicago"
    },
    {
      "id": 4,
      "name": "Jane Smith 2",
      "userpic": "https://avatars.githubusercontent.com/u/17?v=4",
      "email": "jane.smith2@example.com",
      "phoneNumber": "+1 123-123-1234",
      "availability": [
        {
          "day": "Wednesday",
          "date": "2023-10-20",
          "status": "active",
          "timeSlot": ["09:00 - 13:00 ", "20:00 - 22:00 "],
          "holiday": false
        },
        {
          "day": "Thursday",
          "date": "2023-10-21",
          "status": "active",
          "timeSlot": ["09:00 - 13:00 ", "20:00 - 22:00 "],
          "holiday": false
        }
      ],
      "staticAvailability": [
        {
          "day": "Monday",
          "staticTimeSlot": [],
        },
        {
          "day": "Tuesday",
          "staticTimeSlot": ["09:00 - 13:00 ", "18:00 - 22:00 "],
        },
        {
          "day": "Wednesday",
          "staticTimeSlot": ["09:00 - 13:00 ", "18:00 - 22:00 "],
        },
        {
          "day": "Thursday",
          "staticTimeSlot": [],
        },
        {
          "day": "Friday",
          "staticTimeSlot": ["09:00 - 13:00 ", "18:00 - 22:00 "],
        },
        {
          "day": "Saturday",
          "staticTimeSlot": [],
        },
        {
          "day": "Sunday",
          "staticTimeSlot": ["09:00 - 13:00 ", "18:00 - 22:00 "],
        },
      ],
      "holidays": [
        "2023-10-26",
        "2023-10-29"
      ],
      "price": 55,
      "experienceInYears": 6,
      "area": "Downtown",
      "location": "San Francisco"
    },
    {
      "id": 5,
      "name": "John Doe 2",
      "userpic": "https://avatars.githubusercontent.com/u/5?v=4",
      "email": "john.doe2@example.com",
      "phoneNumber": "+1 555-123-4567",
      "availability": [
        {
          "day": "Monday",
          "date": "2023-10-18",
          "status": "active",
          "timeSlot": ["09:00 - 13:00 ", "20:00 - 22:00 "],
          "holiday": false
        },
        {
          "day": "Tuesday",
          "date": "2023-10-19",
          "status": "offline",
          "timeSlot": [],
          "holiday": true
        }
      ],
      "staticAvailability": [
        {
          "day": "Monday",
          "staticTimeSlot": [],
        },
        {
          "day": "Tuesday",
          "staticTimeSlot": ["09:00  - 13:00 ", "18:00  - 22:00 "],
        },
        {
          "day": "Wednesday",
          "staticTimeSlot": ["09:00  - 13:00 ", "18:00  - 22:00 "],
        },
        {
          "day": "Thursday",
          "staticTimeSlot": [],
        },
        {
          "day": "Friday",
          "staticTimeSlot": ["09:00  - 13:00 ", "18:00  - 22:00 "],
        },
        {
          "day": "Saturday",
          "staticTimeSlot": [],
        },
        {
          "day": "Sunday",
          "staticTimeSlot": ["09:00  - 13:00 ", "18:00  - 22:00 "],
        },
      ],
      "holidays": [
        "2023-10-25",
        "2023-10-28"
      ],
      "price": 40,
      "experienceInYears": 3,
      "area": "Midtown",
      "location": "Houston"
    },
    {
      "id": 6,
      "name": "Developer Rhino",
      "userpic": "https://avatars.githubusercontent.com/u/20?v=4",
      "email": "developer.rhino@example.com",
      "phoneNumber": "+1 777-777-7777",
      "availability": [
        {
          "day": "Wednesday",
          "date": "2023-10-20",
          "status": "active",
          "timeSlot": ["09:00 - 13:00 ", "20:00 - 22:00 "],
          "holiday": false
        },
        {
          "day": "Thursday",
          "date": "2023-10-21",
          "status": "active",
          "timeSlot": ["09:00 - 13:00 ", "20:00 - 22:00 "],
          "holiday": false
        }
      ],
      "staticAvailability": [
        {
          "day": "Monday",
          "staticTimeSlot": [],
        },
        {
          "day": "Tuesday",
          "staticTimeSlot": ["09:00  - 13:00 ", "18:00  - 22:00 "],
        },
        {
          "day": "Wednesday",
          "staticTimeSlot": ["09:00  - 13:00 ", "18:00  - 22:00 "],
        },
        {
          "day": "Thursday",
          "staticTimeSlot": [],
        },
        {
          "day": "Friday",
          "staticTimeSlot": ["09:00  - 13:00 ", "18:00  - 22:00 "],
        },
        {
          "day": "Saturday",
          "staticTimeSlot": [],
        },
        {
          "day": "Sunday",
          "staticTimeSlot": ["09:00  - 13:00 ", "18:00  - 22:00 "],
        },
      ],
      "holidays": [
        "2023-10-26",
        "2023-10-29"
      ],
      "price": 70,
      "experienceInYears": 8,
      "area": "Tech Hub",
      "location": "Seattle"
    },
    {
      "id": 7,
      "name": "Barber 1",
      "userpic": "https://avatars.githubusercontent.com/u/17?v=4",
      "email": "barber1@example.com",
      "phoneNumber": "+1 111-222-3333",
      "availability": [
        {
          "day": "Monday",
          "date": "2023-10-18",
          "status": "active",
          "timeSlot": ["09:00 - 13:00 ", "20:00 - 22:00 "],
          "holiday": false
        },
        {
          "day": "Tuesday",
          "date": "2023-10-19",
          "status": "offline",
          "timeSlot": [],
          "holiday": true
        }
      ],
      "staticAvailability": [
        {
          "day": "Monday",
          "staticTimeSlot": [],
        },
        {
          "day": "Tuesday",
          "staticTimeSlot": ["09:00  - 13:00 ", "18:00  - 22:00 "],
        },
        {
          "day": "Wednesday",
          "staticTimeSlot": ["09:00  - 13:00 ", "18:00  - 22:00 "],
        },
        {
          "day": "Thursday",
          "staticTimeSlot": [],
        },
        {
          "day": "Friday",
          "staticTimeSlot": ["09:00  - 13:00 ", "18:00  - 22:00 "],
        },
        {
          "day": "Saturday",
          "staticTimeSlot": [],
        },
        {
          "day": "Sunday",
          "staticTimeSlot": ["09:00  - 13:00 ", "18:00  - 22:00 "],
        },
      ],
      "holidays": [
        "2023-10-25",
        "2023-10-28"
      ],
      "price": 55,
      "experienceInYears": 6,
      "area": "Suburb",
      "location": "Miami"
    },
    {
      "id": 8,
      "name": "Professional Barber",
      "userpic": "https://avatars.githubusercontent.com/u/7?v=4",
      "email": "pro.barber@example.com",
      "phoneNumber": "+1 333-444-5555",
      "availability": [
        {
          "day": "Wednesday",
          "date": "2023-10-20",
          "status": "active",
          "timeSlot": ["09:00  - 13:00 ", "20:00 - 22:00 "],
          "holiday": false
        },
        {
          "day": "Thursday",
          "date": "2023-10-21",
          "status": "active",
          "timeSlot": ["09:00  - 13:00 ", "20:00 - 22:00 "],
          "holiday": false
        }
      ],
      "staticAvailability": [
        {
          "day": "Monday",
          "staticTimeSlot": [],
        },
        {
          "day": "Tuesday",
          "staticTimeSlot": ["09:00  - 13:00 ", "18:00  - 22:00 "],
        },
        {
          "day": "Wednesday",
          "staticTimeSlot": ["09:00  - 13:00 ", "18:00  - 22:00 "],
        },
        {
          "day": "Thursday",
          "staticTimeSlot": [],
        },
        {
          "day": "Friday",
          "staticTimeSlot": ["09:00  - 13:00 ", "18:00  - 22:00 "],
        },
        {
          "day": "Saturday",
          "staticTimeSlot": [],
        },
        {
          "day": "Sunday",
          "staticTimeSlot": ["09:00  - 13:00 ", "18:00  - 22:00 "],
        },
      ],
      "holidays": [
        "2023-10-26",
        "2023-10-29"
      ],
      "price": 65,
      "experienceInYears": 7,
      "area": "Downtown",
      "location": "Boston"
    },
    {
      "id": 9,
      "name": "Alex Johnson",
      "userpic": "https://avatars.githubusercontent.com/u/69?v=4",
      "email": "alex.johnson@example.com",
      "phoneNumber": "+1 444-333-2222",
      "availability": [
        {
          "day": "Monday",
          "date": "2023-10-18",
          "status": "active",
          "timeSlot": ["09:00  - 13:00 ", "20:00 - 22:00 "],
          "holiday": false
        },
        {
          "day": "Tuesday",
          "date": "2023-10-19",
          "status": "offline",
          "timeSlot": [],
          "holiday": true
        }
      ],
      "staticAvailability": [
        {
          "day": "Monday",
          "staticTimeSlot": [],
        },
        {
          "day": "Tuesday",
          "staticTimeSlot": ["09:00  - 13:00 ", "18:00  - 22:00 "],
        },
        {
          "day": "Wednesday",
          "staticTimeSlot": ["09:00  - 13:00 ", "18:00  - 22:00 "],
        },
        {
          "day": "Thursday",
          "staticTimeSlot": [],
        },
        {
          "day": "Friday",
          "staticTimeSlot": ["09:00  - 13:00 ", "18:00  - 22:00 "],
        },
        {
          "day": "Saturday",
          "staticTimeSlot": [],
        },
        {
          "day": "Sunday",
          "staticTimeSlot": ["09:00  - 13:00 ", "18:00  - 22:00 "],
        },
      ],
      "holidays": [
        "2023-10-25",
        "2023-10-28"
      ],
      "price": 55,
      "experienceInYears": 6,
      "area": "City Center",
      "location": "Dallas"
    },
    {
      "id": 10,
      "name": "Sarah Adams",
      "userpic": "https://avatars.githubusercontent.com/u/70?v=4",
      "email": "sarah.adams@example.com",
      "phoneNumber": "+1 999-888-7777",
      "availability": [
        {
          "day": "Wednesday",
          "date": "2023-10-20",
          "status": "active",
          "timeSlot": ["09:00  - 13:00 ", "20:00 - 22:00 "],
          "holiday": false
        },
        {
          "day": "Thursday",
          "date": "2023-10-21",
          "status": "active",
          "timeSlot": ["09:00  - 13:00 ", "20:00 - 22:00 "],
          "holiday": false
        }
      ],
      "staticAvailability": [
        {
          "day": "Monday",
          "staticTimeSlot": [],
        },
        {
          "day": "Tuesday",
          "staticTimeSlot": ["09:00  - 13:00 ", "18:00  - 22:00 "],
        },
        {
          "day": "Wednesday",
          "staticTimeSlot": ["09:00  - 13:00 ", "18:00  - 22:00 "],
        },
        {
          "day": "Thursday",
          "staticTimeSlot": [],
        },
        {
          "day": "Friday",
          "staticTimeSlot": ["09:00  - 13:00 ", "18:00  - 22:00 "],
        },
        {
          "day": "Saturday",
          "staticTimeSlot": [],
        },
        {
          "day": "Sunday",
          "staticTimeSlot": ["09:00  - 13:00 ", "18:00  - 22:00 "],
        },
      ],
      "holidays": [
        "2023-10-26",
        "2023-10-29"
      ],
      "price": 60,
      "experienceInYears": 5,
      "area": "Suburb",
      "location": "Phoenix"
    }
  ];
  
  export default DATA;
  