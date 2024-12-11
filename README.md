# Public Inquiry Form System

## Overview
A comprehensive web application for managing public inquiries and complaints for the judicial system. This project demonstrates modern Angular development practices, including responsive design, form management, and component architecture.

## 🚀 Features
- Multi-step form with dynamic validation
- Responsive design supporting all screen sizes
- RTL support
- File upload system with validation
- Dynamic form fields based on inquiry type
- Comprehensive validation system
- Internationalization (i18n) support

## 🛠 Technologies Used
- Angular 16
- Angular Material
- TypeScript
- SCSS
- Bootstrap
- NGX-Translate

## 📋 Prerequisites
- Node.js (v14.x or higher)
- npm (v6.x or higher)
- Angular CLI (v16.x)

## 🔧 Installation

1. Clone the repository:
```bash
git clone https://github.com/ataraFrieman/public-inquiries
cd public-inquiries
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
ng serve
```

4. Navigate to `http://localhost:4200/`

## 📁 Project Structure
```
src/
├── app/
│   ├── core/                 # Core functionality
│   │   ├── guards/
│   │   ├── models/
│   │   └── services/
│   ├── features/            # Feature modules
│   │   └── public-inquiry/
│   │       ├── components/
│   │       └── services/
│   └── shared/             # Shared components
│       ├── components/
│       ├── directives/
│       └── pipes/
├── assets/
│   ├── i18n/              # Translation files
│   └── styles/
└── environments/
```

## 🎯 Features in Detail

### Form Steps
1. **Inquiry Type Selection**
   - Court-related inquiry
   - General complaint

2. **Personal Information**
   - Validated input fields
   - Israeli ID validation
   - Phone number validation
   - Email validation

3. **Complaint Details**
   - Dynamic fields based on inquiry type
   - Rich text description
   - Case number validation for court-related inquiries

4. **File Attachments**
   - Multiple file upload support
   - File type validation
   - Size restrictions
   - Progress indication

### Generic Components
- Input fields with built-in validation
- File upload component
- Section headers
- Error messages
- Text areas with character count

## 🎨 Design Features
- Responsive design using Grid and Flexbox
- Material Design implementation
- RTL support
- Mobile-first approach
- Consistent spacing and typography
- Accessibility considerations

## 🔒 Validation System
- Custom validators for Israeli ID and phone numbers
- Dynamic validation rules
- Cross-field validation
- File type and size validation
- Form completion validation

## 🌐 Internationalization
- Full Hebrew support
- Translation system using NGX-Translate
- RTL layout support
- Easy addition of new languages

## 👨‍💻 Development Practices
- Strict TypeScript configuration
- Component-based architecture
- Reactive Forms implementation
- Lazy loading
- Change Detection strategy optimization
- Comprehensive error handling

## 🧪 Testing
Run tests with:
```bash
ng test
```

## 📝 Code Style
This project follows the [Angular Style Guide](https://angular.io/guide/styleguide) and uses:
- ESLint for code linting
- Prettier for code formatting
- Strict TypeScript checks

## 🛣️ Future Improvements
- Add form state persistence
- Implement draft saving
- Add summary view before submission
- Enhance accessibility features
- Add unit tests coverage
- Add E2E tests

## 👥 Author
Atara Frieman

