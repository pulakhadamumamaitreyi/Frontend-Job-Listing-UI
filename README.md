# Frontend Job Listing UI

A responsive job board application built with React and Tailwind CSS that allows users to search, filter, and browse job postings.

## 🚀 Features
- **Live Search**: Filter jobs by title with real-time keyword highlighting.
- **Dynamic Filters**: Filter by Location and Job Type (Internship/Full-time).
- **Auto-Sorting**: Listings are automatically sorted alphabetically by title.
- **Mobile Responsive**: Optimized layout for all screen sizes.

## 🛠️ Setup Instructions
1. **Clone the repository**:
   `git clone <your-repo-url>`
2. **Install dependencies**:
   `npm install`
3. **Run locally**:
   `npm start`
   The app will be available at [http://localhost:3000](http://localhost:3000).

## 💡 Technical Decisions
- **useMemo**: Used to optimize the filtering logic, preventing expensive re-calculations on every render.
- **Regex Highlighting**: Implemented a custom component to split and highlight search terms safely without using `dangerouslySetInnerHTML`.
- **Tailwind CSS**: Chosen for rapid, responsive UI development.
