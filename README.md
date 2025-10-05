# 💰 Personal Expense Tracker

A modern, responsive web application for tracking personal expenses with budget management features. Built with vanilla HTML, CSS, and JavaScript, utilizing localStorage for data persistence.

## 🚀 How to Run

1. Clone or download this repository
2. Open `index.html` in any modern web browser (Chrome, Firefox, Safari, Edge)
3. No build process or server required - runs entirely in the browser!

**Alternative**: Simply double-click the `index.html` file to open it in your default browser.

## ✨ Key Features Implemented

### Core Features
1. **Add Expense Form** ✅
   - Input fields for amount, category, date, and description
   - Real-time form validation
   - Prevents future dates
   - Requires positive amounts
   - 6 predefined categories: Food, Transport, Entertainment, Bills, Shopping, Other

2. **Expense List Display** ✅
   - Clean, organized card-based layout
   - Shows date, category, amount, and description
   - Delete button for each expense
   - Sorted by date (newest first)
   - Empty state message when no expenses exist

3. **Filtering System** ✅
   - Filter by category dropdown
   - Date range filtering (from-to dates)
   - Clear filters button
   - Real-time filter application
   - Works with combined filters

4. **Statistics Dashboard** ✅
   - Total amount spent across all expenses
   - Number of transactions
   - Budget status indicator
   - Real-time updates

5. **Category Breakdown** ✅
   - Visual bar chart representation
   - Spending by category with percentages
   - Sorted by highest spending
   - Shows amount and percentage for each category

### Bonus Feature: Budget Warning System 🎯

I implemented a **Monthly Budget Tracker** with intelligent warnings:

- **Set Monthly Budget**: Input field to set your monthly spending limit
- **Budget Status Display**:
  - Shows remaining budget in real-time
  - Color-coded status (green, orange, red)
  - Calculates only current month expenses
- **Smart Alerts**:
  - **80% Warning**: Orange alert when you've used 80% of budget
  - **Over Budget Alert**: Red alert when budget is exceeded
  - Alerts appear at the top of the page with smooth animations
- **Persistent Storage**: Budget settings saved in localStorage

## 📚 Cursor Usage Documentation

### Interesting Prompts Used with Cursor

1. **Initial Structure**
   ```
   "Create a responsive HTML structure for an expense tracker with sections for:
   statistics dashboard, add expense form with fields (amount, category, date, description),
   filters section, expense list, and category breakdown. Include proper semantic HTML."
   ```
   - **Result**: Generated the complete HTML skeleton with proper semantic structure
   - **Modification**: Added budget section and adjusted grid layout for better mobile responsiveness

2. **LocalStorage Integration**
   ```
   "Write JavaScript functions to manage expenses using localStorage with the following
   operations: save expense array, retrieve expenses, add new expense with validation
   (positive amount, no future dates), and delete expense by ID"
   ```
   - **Result**: Created robust localStorage functions with proper JSON serialization
   - **Modification**: Added timestamp field and improved error handling with user notifications

3. **Dynamic Filtering**
   ```
   "Implement a filtering system that allows users to filter expenses by category AND date
   range simultaneously, with a clear filters function that resets everything"
   ```
   - **Result**: Generated filter functions with multiple criteria support
   - **Modification**: Added real-time filter application using event listeners instead of button clicks

4. **Visual Category Breakdown**
   ```
   "Create a category spending breakdown with visual bar charts showing percentage of total
   spending for each category, sorted by highest spending first"
   ```
   - **Result**: Generated percentage calculations and basic bar chart HTML
   - **Modification**: Enhanced styling with gradient bars and improved responsive layout

5. **Budget Warning System**
   ```
   "Implement a monthly budget feature that tracks only current month expenses, shows
   remaining budget, and displays color-coded warnings when 80% used or over budget"
   ```
   - **Result**: Created budget calculation logic and basic warning system
   - **Modification**: Added animated alerts, improved color scheme, and monthly calculation filter

### How Cursor Helped Solve Challenges

1. **Challenge**: Date validation to prevent future dates
   - **Cursor Solution**: Suggested using `setAttribute('max', today)` on date input
   - **Learning**: HTML5 date inputs have built-in max/min attributes for validation

2. **Challenge**: Calculating monthly spending for budget feature
   - **Cursor Solution**: Provided filter logic using `getMonth()` and `getFullYear()`
   - **Modification**: Added to separate function for reusability

3. **Challenge**: Creating smooth notification animations
   - **Cursor Solution**: Generated CSS keyframe animations and timeout logic
   - **Enhancement**: Added slide-in/slide-out animations and auto-dismiss

4. **Challenge**: Responsive grid layout for expense items
   - **Cursor Solution**: Suggested CSS Grid with `grid-template-columns: auto 1fr auto auto`
   - **Learning**: Discovered how Grid's auto and fr units work together for flexible layouts

## 🎯 Challenges Faced and Solutions

### 1. Data Persistence Across Sessions
- **Challenge**: Ensuring expenses and budget settings persist after browser refresh
- **Solution**: Used localStorage with JSON serialization/deserialization
- **Learning**: Implemented try-catch blocks for localStorage access (handles private browsing mode)

### 2. Filter Combination Logic
- **Challenge**: Making category and date range filters work together seamlessly
- **Solution**: Applied filters sequentially by chaining array filter methods
- **Code Quality**: Created reusable `applyFilters()` function called on any filter change

### 3. Responsive Design
- **Challenge**: Making the app usable on mobile devices
- **Solution**: Used CSS Grid with `auto-fit` and media queries
- **Testing**: Added breakpoints at 768px and 480px for tablet and mobile

### 4. Budget Calculation Accuracy
- **Challenge**: Calculating only current month expenses for budget tracking
- **Solution**: Filter expenses by matching month and year before summing
- **Edge Case**: Handles month transitions correctly

### 5. User Experience
- **Challenge**: Providing feedback for user actions
- **Solution**: Implemented notification system with success/error messages
- **Enhancement**: Added confirmation dialogs for destructive actions (delete)

## 🛠️ Technical Implementation

### Technologies Used
- **HTML5**: Semantic structure with form validation
- **CSS3**: Grid, Flexbox, animations, gradients, media queries
- **JavaScript (ES6+)**: Arrow functions, template literals, array methods
- **LocalStorage API**: Data persistence

### Code Organization
- **Modular Functions**: Separate functions for each feature
- **Event-Driven**: Event listeners for form submission and filter changes
- **DRY Principle**: Reusable functions like `getExpenses()`, `saveExpenses()`
- **Clear Naming**: Descriptive variable and function names

### Data Structure
```javascript
{
  id: "1696789234567",           // Timestamp-based unique ID
  amount: 450.50,                // Number (validated positive)
  category: "Food",              // String (predefined categories)
  date: "2025-10-05",           // ISO date string
  description: "Lunch at cafe", // String (optional)
  timestamp: "2025-10-05T14:30:00.000Z" // ISO timestamp
}
```

## 📱 Features Breakdown

| Feature | Status | Details |
|---------|--------|---------|
| Add Expense | ✅ Complete | Form with validation, prevents future dates |
| View Expenses | ✅ Complete | Sorted list with all details |
| Delete Expense | ✅ Complete | With confirmation dialog |
| Filter by Category | ✅ Complete | Dropdown filter |
| Filter by Date Range | ✅ Complete | From-to date inputs |
| Clear Filters | ✅ Complete | Reset all filters button |
| Total Spending | ✅ Complete | Real-time calculation |
| Transaction Count | ✅ Complete | Auto-updating counter |
| Category Breakdown | ✅ Complete | Visual bars with percentages |
| Budget Tracker | ✅ Bonus | Monthly budget with warnings |
| Responsive Design | ✅ Complete | Mobile, tablet, desktop |
| Data Persistence | ✅ Complete | localStorage |
| Notifications | ✅ Extra | Success/error messages |

## 🎨 Design Decisions

1. **Color Scheme**: Purple gradient theme for modern, professional look
2. **Card-Based Layout**: Clean separation of sections with white cards
3. **Visual Hierarchy**: Larger text for amounts, clear categorization
4. **Micro-interactions**: Hover effects, smooth transitions, animations
5. **Accessibility**: High contrast colors, clear labels, semantic HTML

## ⏱️ Time Spent

- **Planning & Setup**: 10 minutes
- **HTML Structure**: 5 minutes
- **CSS Styling**: 5 minutes
- **Core JavaScript**: 15 minutes
- **Filtering & Statistics**: 5 minutes
- **Budget Bonus Feature**: 8 minutes
- **Testing & Bug Fixes**: 5 minutes
- **Documentation**: 10 minutes

**Total Time**: ~1 hour 10 minutes

## 🚀 Future Enhancements

If I had more time, I would add:

1. **Export to CSV**: Download expense data as spreadsheet
2. **Charts**: Line graphs showing spending trends over time
3. **Edit Functionality**: Modify existing expenses
4. **Search**: Text search through descriptions
5. **Categories Customization**: Add/remove custom categories
6. **Multiple Budgets**: Different budgets for different categories
7. **Recurring Expenses**: Mark and auto-add recurring expenses
8. **Dark Mode**: Theme toggle for better nighttime viewing
9. **IndexedDB**: For better performance with large datasets
10. **PWA Features**: Offline support and installability

## 📸 Screenshots

Screenshots are available in the `/screenshots` folder:
- `dashboard-view.png` - Main dashboard with statistics
- `expense-list.png` - Expense list with filters
- `mobile-view.png` - Responsive mobile layout

## 🧪 Testing Checklist

- [x] Add expense with all fields
- [x] Add expense with only required fields
- [x] Validate positive amount requirement
- [x] Validate future date prevention
- [x] Delete expense with confirmation
- [x] Filter by single category
- [x] Filter by date range
- [x] Filter by category AND date range
- [x] Clear all filters
- [x] Set monthly budget
- [x] Budget warning at 80%
- [x] Budget alert when exceeded
- [x] Data persists after refresh
- [x] Responsive on mobile (< 480px)
- [x] Responsive on tablet (< 768px)
- [x] Category breakdown calculations
- [x] Statistics real-time updates

## 📄 License

This project is open source and available for educational purposes.

## 👤 Author

Created as part of the Agrim Intelligence Services AI-Powered Development Assignment.

---

**Note**: This application runs entirely in the browser and does not send any data to external servers. All data is stored locally in your browser's localStorage.
