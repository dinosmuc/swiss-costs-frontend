const jobOptions = [
    { value: 'Software Engineer', label: 'Software Engineer' },
    { value: 'Data Scientist', label: 'Data Scientist' },
    { value: 'Marketing Manager', label: 'Marketing Manager' },
    { value: 'Sales Manager', label: 'Sales Manager' },
    { value: 'Mechanical Engineer', label: 'Mechanical Engineer' },
    { value: 'Optometrist', label: 'Optometrist' },
    { value: 'Dietitian', label: 'Dietitian' },
    { value: 'Radiologic Technologist', label: 'Radiologic Technologist' },
    { value: 'Dental Hygienist', label: 'Dental Hygienist' },
    { value: 'Medical Laboratory Technician', label: 'Medical Laboratory Technician' },
    { value: 'Logistics Manager', label: 'Logistics Manager' },
    { value: 'Supply Chain Manager', label: 'Supply Chain Manager' },
    { value: 'Web Developer', label: 'Web Developer' },
    { value: 'UX/UI Designer', label: 'UX/UI Designer' },
    { value: 'Interior Designer', label: 'Interior Designer' },
    { value: 'Environmental Scientist', label: 'Environmental Scientist' },
    { value: 'Audiologist', label: 'Audiologist' },
    { value: 'Occupational Therapist', label: 'Occupational Therapist' },
    { value: 'Speech-Language Pathologist', label: 'Speech-Language Pathologist' },
    { value: 'Zoologist', label: 'Zoologist' },
    { value: 'Bakery Chef', label: 'Bakery Chef' },
    { value: 'Butcher', label: 'Butcher' },
    { value: 'Fishmonger', label: 'Fishmonger' },
    { value: 'Public Relations Specialist', label: 'Public Relations Specialist' },
    { value: 'Recruiter', label: 'Recruiter' },
    { value: 'Tour Guide', label: 'Tour Guide' },
    { value: 'Travel Agent', label: 'Travel Agent' },
    { value: 'Taxi Driver', label: 'Taxi Driver' },
    { value: 'Train Conductor', label: 'Train Conductor' },
    { value: 'Economist', label: 'Economist' },
    { value: 'Geologist', label: 'Geologist' },
    { value: 'Petroleum Engineer', label: 'Petroleum Engineer' },
    { value: 'Astronomer', label: 'Astronomer' },
    { value: 'Astrophysicist', label: 'Astrophysicist' },
    { value: 'Meteorologist', label: 'Meteorologist' },
    { value: 'Software Engineer', label: 'Software Engineer' },
    { value: 'Data Scientist', label: 'Data Scientist' },
    { value: 'Marketing Manager', label: 'Marketing Manager' },
    { value: 'Sales Manager', label: 'Sales Manager' },
    { value: 'Mechanical Engineer', label: 'Mechanical Engineer' },
    { value: 'Civil Engineer', label: 'Civil Engineer' },
    { value: 'Financial Analyst', label: 'Financial Analyst' },
    { value: 'Project Manager', label: 'Project Manager' },
    { value: 'Graphic Designer', label: 'Graphic Designer' },
    { value: 'Human Resources Manager', label: 'Human Resources Manager' },
    { value: 'Actor', label: 'Actor' },
    { value: 'Cinematographer', label: 'Cinematographer' },
    { value: 'Pharmaceutical Researcher', label: 'Pharmaceutical Researcher' },
    { value: 'Doctor (General Practitioner)', label: 'Doctor (General Practitioner)' },
    { value: 'Nurse', label: 'Nurse' },
    { value: 'Dentist', label: 'Dentist' },
    { value: 'Architect', label: 'Architect' },
    { value: 'Lawyer', label: 'Lawyer' },
    { value: 'Banker', label: 'Banker' },
    { value: 'IT Manager', label: 'IT Manager' },
    { value: 'Consultant', label: 'Consultant' },
    { value: 'Tax Advisor', label: 'Tax Advisor' },
    { value: 'Pharmacist', label: 'Pharmacist' },
    { value: 'Research Scientist', label: 'Research Scientist' },
    { value: 'Teacher', label: 'Teacher' },
    { value: 'Accountant', label: 'Accountant' },
    { value: 'Chef', label: 'Chef' },
    { value: 'Hotel Manager', label: 'Hotel Manager' },
    { value: 'Real Estate Agent', label: 'Real Estate Agent' },
    { value: 'Policeman', label: 'Policeman' },
    { value: 'Journalist', label: 'Journalist' },
    { value: 'Biotechnologist', label: 'Biotechnologist' },
    { value: 'Journalist', label: 'Journalist' },
    { value: 'Biotechnologist', label: 'Biotechnologist' },
    { value: 'Physiotherapist', label: 'Physiotherapist' },
    { value: 'Veterinarian', label: 'Veterinarian' },
    { value: 'Social Worker', label: 'Social Worker' },
    { value: 'Psychologist', label: 'Psychologist' },
    { value: 'Insurance Agent', label: 'Insurance Agent' },
    { value: 'Electrician', label: 'Electrician' },
    { value: 'Plumber', label: 'Plumber' },
    { value: 'Construction Worker', label: 'Construction Worker' },
    { value: 'Agricultural Engineer', label: 'Agricultural Engineer' },
    { value: 'Waiter/Waitress', label: 'Waiter/Waitress' },
    { value: 'Barista', label: 'Barista' },
    { value: 'Shop Assistant', label: 'Shop Assistant' },
    { value: 'Bus Driver', label: 'Bus Driver' },
    { value: 'Pilot', label: 'Pilot' },
    { value: 'Flight Attendant', label: 'Flight Attendant' },
    { value: 'Postman', label: 'Postman' },
    { value: 'Librarian', label: 'Librarian' },
    { value: 'Pharmacy Assistant', label: 'Pharmacy Assistant' },
    { value: 'Cleaner', label: 'Cleaner' },
    { value: 'Auditor', label: 'Auditor' },
    { value: 'Translator', label: 'Translator' },
    { value: 'Systems Administrator', label: 'Systems Administrator' },
    { value: 'Database Administrator', label: 'Database Administrator' },
    { value: 'Retail Manager', label: 'Retail Manager' },
    { value: 'Surgeon', label: 'Surgeon' },
    { value: 'Pharmacy Technician', label: 'Pharmacy Technician' },
    { value: 'Medn', label: 'Statistician' },
    { value: 'Mathematician', label: 'Mathematician' },
    { value: 'Carpenter', label: 'Carpenter' },
    { value: 'Bricklayer', label: 'Bricklayer' },
    { value: 'Landscaper', label: 'Landscaper' },
    { value: 'Florist', label: 'Florist' },
    { value: 'Gardener', label: 'Gardener' },
    { value: 'Real Estate Developer', label: 'Real Estate Developer' },
    { value: 'Hair Stylist', label: 'Hair Stylist' },
    { value: 'Makeup Artist', label: 'Makeup Artist' },
    { value: 'Fashion Designer', label: 'Fashion Designer' },
    { value: 'Seamstress/Tailor', label: 'Seamstress/Tailor' },
    { value: 'Dancer', label: 'Dancer' },
    { value: 'Actor', label: 'Actor' },
    { value: 'Cinematographer', label: 'Cinematographer' }
];


export default jobOptions;