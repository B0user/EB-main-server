const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  image_url: { type: String },
  image_description: { type: String }
});

const EventSchema = new Schema({
  event_name: { type: String },
  event_description: { type: String },
  event_date: { type: Date },
  comment: String
});

const ClubSchema = new Schema({
  club_name: { type: String },
  club_description: { type: String },
  comment: String
});

const StudentLifeSchema = new Schema({
  clubs: [ClubSchema],
  events: [EventSchema],
  comment: String
});

const FacilitySchema = new Schema({
  facility_name: { type: String },
  facility_description: { type: String },
  comment: String
});

const ScholarshipSchema = new Schema({
  scholarship_name: { type: String },
  scholarship_amount: { type: Number },
  eligibility_criteria: { type: String },
  comment: String
});

const AdmissionInfoSchema = new Schema({
  admission_criteria: { type: String },
  application_deadline: { type: Date },
  application_fee: { type: Number },
  scholarships: [ScholarshipSchema],
  comment: String
});

const CourseSchema = new Schema({
  course_name: { type: String },
  course_duration: { type: String },
  course_description: { type: String },
  comment: String
});

const DepartmentSchema = new Schema({
  department_name: { type: String },
  courses: [CourseSchema],
  comment: String
});

const FacultySchema = new Schema({
  faculty_name: { type: String },
  departments: [DepartmentSchema],
  comment: String
});

const GeneralInfoSchema = new Schema({
  established_year: { type: Number },
  type: { type: String, enum: ['Public', 'Private'] },
  student_population: { type: Number },
  campus_size: { type: String },
  ranking: {
    world_rank: { type: Number },
    national_rank: { type: Number }
  },
  comment: String
});

const ContactInfoSchema = new Schema({
  phone: { type: String },
  email: { type: String },
  website: { type: String }
});

const LocationSchema = new Schema({
  country: { type: String },
  city: { type: String },
  address: { type: String },
  latitude: { type: Number },
  longitude: { type: Number }
});

const MainInfoSchema = new Schema({
  name: { type: String },
  languages: { type: [String] },
  grants: { type: String, enum: ['Да', 'Нет'] }, 
  tuition_fee: { type: [Number] }, 
  dual_degree_program: { type: String, enum: ['Да', 'Нет'] }, 
  dual_major_program: { type: String, enum: ['Да', 'Нет'] }, 
  living_cost: { type: [Number] }, 
  application_deadline: { type: Date },
  qs_ranking: { type: String },
  ielts: { type: String }
})

const UniversitySchema = new Schema({
  main: MainInfoSchema,
  location: String,
  contact_info: String,
  general_info: String,
  faculties: String,
  admission_info: String,
  facilities: String,
  student_life: String,
  images: [ImageSchema],
});

module.exports = mongoose.model('University', UniversitySchema);