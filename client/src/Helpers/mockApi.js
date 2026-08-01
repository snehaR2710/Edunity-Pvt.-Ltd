// mockApi.js
//
// Ye file "fake backend" ka brain hai. Har real API endpoint
// (jo pehle Render server pe jaata tha) ke liye, ye function
// URL + method dekh kar sahi mock response deta hai — bilkul
// waisi hi shape mein jaisi real backend deta tha, taaki
// Redux Slices ko koi farak na pade.
//
// currentUser aur mockCourses ko "in-memory" (let variables mein)
// rakha hai — matlab jab tak page refresh nahi hota, login/course-
// create jaisi cheezein session ke andar yaad rehti hain. Refresh
// karne par wapas mockData.js waali original list pe reset ho
// jayega (kyunki koi real database nahi hai).

import { mockUsers, mockCourses, mockStats } from "../mockData/mockData";

// Session ke andar current logged-in user track karne ke liye
let currentUser = null;

// mockCourses ko copy karke rakha hai taaki naya course/lecture add
// karne par original mockData.js file na badle — sirf is session
// ki memory mein change ho
let coursesDB = mockCourses.map((c) => ({ ...c, lectures: [...c.lectures] }));

// Real axios jaisa hi ek "delay" — taaki loading spinners/toasts
// asli network jaisa feel den
const DELAY_MS = 600;

// Success response ko axios ke response object jaisa banata hai
// (axios hamesha { data: ... } wapas karta hai)
function ok(data) {
  // Real backend har response mein "success: true" bhejta tha
  // (e.g. userLogin controller). Login.jsx jaisi jagah is field
  // pe hi redirect/flow decide hota hai, isliye default se add
  // kar rahe hain — koi bhi individual call ise override kar
  // sakti hai agar zaroorat pade.
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: { success: true, ...data } }), DELAY_MS);
  });
}

// Error response ko axios ke error object jaisa banata hai, taaki
// har jagah likha hua `error?.response?.data?.message` sahi se kaam kare
function fail(message, status = 400) {
  return new Promise((_, reject) => {
    setTimeout(
      () => reject({ response: { status, data: { message } } }),
      DELAY_MS
    );
  });
}

// FormData se ek field nikalne ka helper (course create / lecture add
// dono FormData bhejte hain, JSON nahi)
function fd(data, key) {
  return data instanceof FormData ? data.get(key) : data?.[key];
}

// ---------------------------------------------------------------
// MAIN ROUTER
// method: "get" | "post" | "put" | "delete"
// url: jaisa Slice ne bheja (e.g. "/api/v1/courses/123")
// body: axios ka doosra argument (POST/PUT ke liye data)
// ---------------------------------------------------------------
export function mockRequest(method, url, body) {
  const [path, queryString] = url.split("?");
  const query = new URLSearchParams(queryString || "");

  // ---------- AUTH ----------
  if (path === "/api/v1/users/register" && method === "get") {
    // (kabhi galti se GET na ho jaye is wajah se method check zaroori hai)
  }

  if (path === "/api/v1/users/register" && method === "post") {
    const newUser = {
      _id: "mock-user-" + Date.now(),
      fullName: body?.fullName || "new user",
      email: body?.email || "",
      role: "USER",
      subscription: { id: "", status: "" },
      avatar: { public_id: "", secure_url: "https://i.pravatar.cc/150?img=8" },
    };
    mockUsers.push(newUser); // agli baar login karne par mil jaye
    return ok({ message: "Account created successfully! Please login." });
  }

  if (path === "/api/v1/users/login" && method === "post") {
    const email = body?.email?.toLowerCase() || "";
    // Demo ke liye: koi bhi email/password chalega.
    // Email match kiya toh wahi user, warna default USER account.
    const found =
      mockUsers.find((u) => u.email.toLowerCase() === email) ||
      (email.includes("admin") ? mockUsers[0] : mockUsers[1]);
    currentUser = found;
    return ok({ message: "Logged in successfully", user: currentUser });
  }

  if (path === "/api/v1/users/logout" && method === "post") {
    currentUser = null;
    return ok({ message: "Logged out successfully" });
  }

  if (path.startsWith("/api/v1/users/update/") && method === "put") {
    if (!currentUser) return fail("Please login to continue", 401);
    currentUser.fullName = fd(body, "fullName") || currentUser.fullName;
    return ok({ message: "Profile updated successfully", user: currentUser });
  }

  if (path === "/api/v1/users/getuser" && method === "get") {
    if (!currentUser) return fail("Unauthorized, please login", 401);
    return ok({ user: currentUser });
  }

  if (path === "/api/v1/users/change-password" && method === "post") {
    return ok({ message: "Password changed successfully" });
  }

  if (path === "/api/v1/users/forgotpassword" && method === "post") {
    return ok({ message: "Reset email sent (demo mode, no real email)" });
  }

  if (path.startsWith("/api/v1/users/reset/") && method === "post") {
    return ok({ message: "Password reset successfully" });
  }

  // ---------- COURSES ----------
  if (path === "/api/v1/courses" && method === "get") {
    return ok({ courses: coursesDB });
  }

  if (path === "/api/v1/courses" && method === "post") {
    const newCourse = {
      _id: "mock-course-" + Date.now(),
      title: fd(body, "title") || "Untitled Course",
      description: fd(body, "description") || "",
      category: fd(body, "category") || "General",
      createdBy: fd(body, "createdBy") || "admin",
      thumbnail: {
        public_id: "mock-thumb-new",
        secure_url: `https://picsum.photos/seed/${Date.now()}/400/250`,
      },
      numberOfLectures: 0,
      lectures: [],
    };
    coursesDB = [...coursesDB, newCourse];
    return ok({ message: "Course created successfully", course: newCourse });
  }

  // "/api/v1/courses" wale exact match ke baad hi ye check hoga,
  // isliye /api/v1/courses/<id> yahan tak pahunchega
  if (path.startsWith("/api/v1/courses/") && method === "get") {
    const id = path.split("/").pop();
    const course = coursesDB.find((c) => c._id === id);
    if (!course) return fail("Course not found", 404);
    return ok({ lectures: course.lectures });
  }

  if (path.startsWith("/api/v1/courses/") && method === "post") {
    const id = path.split("/").pop();
    const course = coursesDB.find((c) => c._id === id);
    if (!course) return fail("Course not found", 404);

    const file = fd(body, "lecture");
    // Agar user ne real video file upload ki hai, browser mein hi
    // usko chalane ke liye ek local blob URL bana dete hain —
    // Cloudinary ki zaroorat nahi padti demo ke liye
    const videoUrl =
      file instanceof File ? URL.createObjectURL(file) : undefined;

    course.lectures.push({
      title: fd(body, "title") || "Untitled Lecture",
      description: fd(body, "discription") || "",
      lecture: {
        public_id: "mock-lecture-" + Date.now(),
        secure_url:
          videoUrl ||
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      },
    });
    course.numberOfLectures = course.lectures.length;
    return ok({ message: "Lecture added successfully", course });
  }

  if (path === "/api/v1/courses" && method === "delete") {
    const courseId = query.get("courseId");
    const lectureId = query.get("lectureId");
    const course = coursesDB.find((c) => c._id === courseId);
    if (course) {
      course.lectures = course.lectures.filter(
        (_, index) => String(index) !== lectureId
      );
      course.numberOfLectures = course.lectures.length;
    }
    return ok({ message: "Lecture deleted successfully" });
  }

  // ---------- PAYMENTS ----------
  if (path === "/api/v1/payments/razopay-key" && method === "get") {
    return ok({ key: "mock_rzp_key_demo" });
  }

  if (path === "/api/v1/payments/subscribe" && method === "get") {
    if (currentUser) {
      currentUser.subscription = { id: "sub_mock_demo", status: "created" };
    }
    return ok({ subscription_id: "sub_mock_demo" });
  }

  if (path === "/api/v1/payments/verify" && method === "post") {
    if (currentUser) currentUser.subscription.status = "active";
    return ok({ success: true, message: "Payment verified successfully (demo)" });
  }

  if (path === "/api/v1/payments" && method === "get") {
    return ok({
      message: "Payment records fetched",
      allPayments: {},
      finalMonths: {},
      monthlySalesRecord: mockStats.monthlySalesRecord,
    });
  }

  if (path === "/api/v1/payments/unsubscribe" && method === "post") {
    if (currentUser) currentUser.subscription.status = "cancelled";
    return ok({ message: "Subscription cancelled successfully" });
  }

  // ---------- FALLBACK (admin stats jaisa abhi-tak-adhoora route) ----------
  return ok({ ...mockStats });
}