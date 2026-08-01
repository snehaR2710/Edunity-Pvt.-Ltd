// mockData.js
//
// Yeh file hamare "fake backend" ka data-source hai.
// Har object ka shape (field names) bilkul waisa hi hai jaisa
// server/src/models/user.model.js aur course.model.js mein tha —
// isliye Redux slices aur Pages ko koi farak nahi padega jab hum
// axiosInstance ko is data se mock karte hain.

export const mockUsers = [
  {
    _id: "mock-user-admin-001",
    fullName: "sneha sharma",
    email: "admin@edunity.com",
    password: "not-used-in-mock",
    avatar: {
      public_id: "mock-admin-avatar",
      secure_url: "https://i.pravatar.cc/150?img=47",
    },
    role: "ADMIN",
    subscription: { id: "", status: "" },
    createdAt: "2025-01-10T10:00:00.000Z",
  },
  {
    _id: "mock-user-002",
    fullName: "rahul verma",
    email: "student@edunity.com",
    password: "not-used-in-mock",
    avatar: {
      public_id: "mock-user-avatar",
      secure_url: "https://i.pravatar.cc/150?img=12",
    },
    role: "USER",
    subscription: { id: "sub_mock_123", status: "active" },
    createdAt: "2025-02-15T10:00:00.000Z",
  },
];

const SAMPLE_VIDEO =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

export const mockCourses = [
  {
    _id: "mock-course-001",
    title: "Complete Web Development Bootcamp",
    description:
      "HTML, CSS, JavaScript, React aur Node.js seekhein zero se leke deployment tak.",
    category: "Web Development",
    createdBy: "sneha sharma",
    thumbnail: {
      public_id: "mock-thumb-1",
      secure_url: "https://picsum.photos/seed/webdev/400/250",
    },
    numberOfLectures: 3,
    lectures: [
      {
        title: "Introduction to HTML",
        description: "HTML ke basic tags aur document structure samjhein.",
        lecture: { public_id: "mock-lecture-1-1", secure_url: SAMPLE_VIDEO },
      },
      {
        title: "CSS Fundamentals",
        description: "Styling, Flexbox aur Grid ka istemal.",
        lecture: { public_id: "mock-lecture-1-2", secure_url: SAMPLE_VIDEO },
      },
      {
        title: "JavaScript Basics",
        description: "Variables, functions, aur DOM manipulation.",
        lecture: { public_id: "mock-lecture-1-3", secure_url: SAMPLE_VIDEO },
      },
    ],
    createdAt: "2025-03-01T10:00:00.000Z",
  },
  {
    _id: "mock-course-002",
    title: "React & Redux Mastery",
    description:
      "Modern React, Hooks, aur Redux Toolkit ke saath scalable apps banayein.",
    category: "Frontend Development",
    createdBy: "sneha sharma",
    thumbnail: {
      public_id: "mock-thumb-2",
      secure_url: "https://picsum.photos/seed/react/400/250",
    },
    numberOfLectures: 2,
    lectures: [
      {
        title: "React Components & Props",
        description: "Functional components aur props ka flow.",
        lecture: { public_id: "mock-lecture-2-1", secure_url: SAMPLE_VIDEO },
      },
      {
        title: "Redux Toolkit Setup",
        description: "Store, slices aur async thunks ka setup.",
        lecture: { public_id: "mock-lecture-2-2", secure_url: SAMPLE_VIDEO },
      },
    ],
    createdAt: "2025-03-10T10:00:00.000Z",
  },
  {
    _id: "mock-course-003",
    title: "Node.js & Express Backend Development",
    description:
      "REST APIs, authentication, aur MongoDB ke saath backend banayein.",
    category: "Backend Development",
    createdBy: "sneha sharma",
    thumbnail: {
      public_id: "mock-thumb-3",
      secure_url: "https://picsum.photos/seed/nodejs/400/250",
    },
    numberOfLectures: 2,
    lectures: [
      {
        title: "Setting up an Express Server",
        description: "Routes, middleware aur basic server setup.",
        lecture: { public_id: "mock-lecture-3-1", secure_url: SAMPLE_VIDEO },
      },
      {
        title: "MongoDB with Mongoose",
        description: "Schemas, models aur queries likhna.",
        lecture: { public_id: "mock-lecture-3-2", secure_url: SAMPLE_VIDEO },
      },
    ],
    createdAt: "2025-03-20T10:00:00.000Z",
  },
];

export const mockStats = {
  allUsersCount: 248,
  subscribedUsersCount: 96,
  monthlySalesRecord: [12, 18, 9, 25, 30, 22, 40, 35, 28, 45, 50, 60],
};