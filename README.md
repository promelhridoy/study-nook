# 📖 StudyNook – Library Study Room Booking Platform (Client)

**StudyNook** is a modern, responsive, and recruiter-friendly single-page application (SPA) built with React. It serves as a centralized platform where students and library users can browse, search, and book private library study rooms. The interface focuses on intuitive navigation, dynamic user dashboards, and responsive layout consistency across mobile, tablet, and desktop views.

🌐 **[Live Demo Application]()

---

## 🚀 Key Client-Side Features

* **🌐 Secure Route Persistence:** Implemented custom route guards where private routes (`/add-room`, `/my-listings`, `/my-bookings`) keep logged-in users authenticated upon browser reloads instead of throwing errors or unexpected redirects.

* **🔍 Live Filtering & Search Engine:** Features a dedicated "All Rooms" exploration module containing real-time keyword search and dynamic amenity-checkbox matrices that communicate flawlessly with backend endpoints.

* **⏱️ Real-Time Cost Calculator Modal:** Built an interactive booking form inside the room details layer that immediately auto-computes usage costs based on hourly rates as users adjust their preferred start and end-time slots.

* **🌗 Tailored Theme Switcher:** Uses an active Dark/Light mode selector integrated seamlessly into the main layout configuration that persists the user's preference using `localStorage`.

* **✨ Micro-Interactions & Clean UI:** Enhanced visual feedback using **Framer Motion** for card hover transitions, layout shifting, and responsive menus, supplemented with professional non-alert toast popups (**React Hot Toast / Sonner**).

---

## 🛠️ Built With

* **Core Framework:** React.js (Vite)
* **Routing Architecture:** React Router DOM v6
* **Styling Framework:** Tailwind CSS & DaisyUI
* **Animations:** Framer Motion
* **Iconography:** React Icons (utilizing the rebranded **X** logo instead of the legacy Twitter asset)
* **Toasts & Notifications:** React Hot Toast / Sonner (No browser-default alert boxes used)

---

## 📂 Key Architecture & Component Flow

The platform handles route management under two main operational structures:

* **Public Layout (Unauthenticated):** Access to Home (`/`), All Rooms (`/rooms`), Login (`/login`), and Register (`/register`) portals. Password fields enforce criteria checks (min 6 characters, uppercase, and lowercase) before form submissions.
* **Private Layout (Authenticated):** Grants authorized users visibility into protected endpoints:
  * `/add-room` — Includes descriptive parameters, capacity pickers, and specific amenity toggles.
  * `/my-listings` — Displays room cards created by the active owner with quick-access Edit and Delete modals.
  * `/my-bookings` — A clean tracking list displaying active status tags (`confirmed`/`cancelled`) and time-sensitive cancellation triggers.

---

## ⚙️ Local Development Setup

Follow these steps to configure and run the client application locally:

