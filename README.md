<div align="center">
  
# 🌟 H2T English 🌟

<p align="center">
  <a href="https://reactjs.org/"><img src="https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React"></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.1.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"></a>
  <a href="https://mui.com/"><img src="https://img.shields.io/badge/MUI-6.4.7-007FFF?style=for-the-badge&logo=mui&logoColor=white" alt="Material UI"></a>
</p>

<p align="center">
  <em>A modern, interactive platform for learning English through structured routes, engaging lessons, and comprehensive assessments</em>
</p>

</div>

H2T English is a comprehensive English learning platform designed to help students master all aspects of the English language through structured routes, interactive lessons, and diverse assessment tools.

<div align="center">
  <img src="public/image.jpg" alt="H2T English Banner" height="400px" width="50%" style="border-radius: 10px; margin: 20px 0; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); object-fit: cover;">
</div>

## 📖 Table of Contents

- [🌟 H2T English 🌟](#-h2t-english-)
  - [📖 Table of Contents](#-table-of-contents)
  - [🚀 Features](#-features)
    - [🗺️ Interactive Learning Routes](#️-interactive-learning-routes)
    - [📚 Comprehensive Lesson Types](#-comprehensive-lesson-types)
    - [📊 Testing and Assessment](#-testing-and-assessment)
    - [⚙️ Powerful Tools](#️-powerful-tools)
  - [💻 Technology Stack](#-technology-stack)
    - [Core Technologies](#core-technologies)
    - [Additional Libraries](#additional-libraries)
  - [📂 Project Structure](#-project-structure)
  - [🏁 Getting Started](#-getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [🏛️ Architecture](#️-architecture)
    - [🧩 Component Organization](#-component-organization)
    - [📊 State Management](#-state-management)
    - [🛣️ Routing](#️-routing)
      - [👨‍🎓 Student/Public Routes](#-studentpublic-routes)
      - [👩‍🏫 Teacher Routes](#-teacher-routes)
      - [👨‍💼 Admin Routes](#-admin-routes)
  - [👥 User Roles](#-user-roles)
  - [🧪 Testing](#-testing)
  - [🚢 Deployment](#-deployment)
  - [🤝 Contributing](#-contributing)
  - [📄 License](#-license)
  - [🙏 Acknowledgments](#-acknowledgments)
  - [👨‍🎓 Team and Requirements](#-team-and-requirements)

## 🚀 Features

### 🗺️ Interactive Learning Routes

- **Structured Pathways**: Carefully designed learning sequences that build skills progressively
- **Topic-Based Organization**: Content organized by themes and difficulty levels
- **Adaptive Learning**: Personalized recommendations based on performance
- **Progress Tracking**: Visual indicators of completion and achievement
- **Skill Integration**: Routes that combine multiple language skills for holistic learning

### 📚 Comprehensive Lesson Types

- 📝 **Vocabulary**: Interactive word-building exercises with contextual learning
- 🔤 **Grammar**: Clear explanations with practice activities at various levels
- 📖 **Reading**: Diverse texts with comprehension activities and discussion prompts
- 🎧 **Listening**: Audio content with exercises to develop auditory comprehension
- 🗣️ **Speaking**: Pronunciation guides and conversational practice opportunities
- ✍️ **Writing**: Guided composition tasks with feedback mechanisms

### 📊 Testing and Assessment

- 🔄 **Mixed Format Tests**: Comprehensive evaluations combining multiple question types
- 🎯 **Skill-Specific Assessments**: Focused evaluations for individual language skills
- 🏆 **Competition Tests**: Timed challenges with leaderboards for motivation
- 📝 **TOEIC Practice Exams**: Standardized test preparation with detailed feedback

### ⚙️ Powerful Tools

- 📊 **User Dashboard**: Intuitive interface for tracking progress and performance
- 👩‍🏫 **Teacher Tools**: Comprehensive content creation and management system
- 👨‍💼 **Admin Management**: Robust user administration capabilities
- 🌓 **Dark Mode Support**: Eye-friendly interface option for comfortable learning

## 💻 Technology Stack

### Core Technologies

<div align="center">
  <img src="https://img.shields.io/badge/React-19.0.0-61DAFB?style=flat-square&logo=react&logoColor=white" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5.1.0-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Material_UI-6.4.7-007FFF?style=flat-square&logo=mui&logoColor=white" alt="Material UI">
  <img src="https://img.shields.io/badge/Redux_Toolkit-Latest-764ABC?style=flat-square&logo=redux&logoColor=white" alt="Redux Toolkit">
  <img src="https://img.shields.io/badge/React_Router-7.0.2-CA4245?style=flat-square&logo=react-router&logoColor=white" alt="React Router">
</div>

### Additional Libraries

| 🔌 Data & API                                                                                                                        | 🎨 UI & Styling                                                                                                                   | 🔧 Development                                                                                                                       |
| ------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| <ul><li>📡 **Axios**: HTTP client</li><li>📄 **Mammoth.js**: Document handling</li><li>🔐 **OAuth Google**: Authentication</li></ul> | <ul><li>💄 **Emotion**: CSS-in-JS</li><li>🔣 **Material Icons**: Icon library</li><li>🖌️ **Lucide React**: Modern icons</li></ul> | <ul><li>📅 **date-fns**: Date utilities</li><li>🧪 **React Scripts**: Testing</li><li>📦 **Create React App**: Build tools</li></ul> |

## 📂 Project Structure

<div align="center">
  <img src="https://cdn-icons-png.flaticon.com/512/6295/6295417.png" width="100" alt="Project Structure">
</div>

The project follows a feature-based organization:

```
src/
├── components/         # Reusable UI components
├── features/           # Feature modules (auth, lesson, test, etc.)
│   ├── auth/           # Authentication features
│   ├── home/           # Homepage components
│   ├── lesson/         # Lesson features
│   ├── listLesson/     # Lesson listing functionality
│   ├── listTest/       # Test listing functionality
│   ├── test/           # Test features
│   ├── route/          # Learning routes
│   ├── profile/        # User profile
│   ├── historyTest/    # Test history
│   ├── teacher/        # Teacher administration tools
│   └── admin/          # Admin management tools
├── hooks/              # Custom React hooks
├── interfaces/         # TypeScript interfaces
├── layouts/            # Page layouts
├── redux/              # Redux store setup and slices
├── routes/             # Application routes
├── services/           # API services
├── theme/              # Theme configuration
└── utils/              # Utility functions
```

## 🏁 Getting Started

<div align="center">
  <img src="https://cdn-icons-png.flaticon.com/512/1535/1535032.png" width="80" alt="Getting Started">
</div>

### Prerequisites

- 📦 **Node.js** (version 16 or higher)
- 📦 **npm** or **yarn** package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/h2t-english.git
cd h2t-english
```

2. Install dependencies:

```bash
# Using npm
npm install

# OR using yarn
yarn install
```

3. Running the App:

```bash
# Using npm
npm start

# OR using yarn
yarn start
```

The application will be available at http://localhost:3000

| 🔍 Development Mode                                | 🔧 Build Mode                                         |
| -------------------------------------------------- | ----------------------------------------------------- |
| Features hot-reloading and detailed error messages | Run `npm run build` for production-ready optimization |

## 🏛️ Architecture

<div align="center">
  <img src="https://cdn-icons-png.flaticon.com/512/1089/1089923.png" width="80" alt="Architecture">
</div>

### 🧩 Component Organization

| 🔄 Shared Components                            | 🧪 Feature Components                             | 📐 Layout Components                       |
| ----------------------------------------------- | ------------------------------------------------- | ------------------------------------------ |
| Reusable UI elements in `/components` directory | Specialized components within feature directories | Page structure and organization components |

### 📊 State Management

| 🌎 Global State                                                                              | 🏠 Local State                                                                     | 🎨 Theme State                                                                                         |
| -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Redux Toolkit for application-wide state management                                          | React's useState/useReducer for component-specific state                           | Custom theme hooks for light/dark mode preferences                                                     |
| <ul><li>User authentication</li><li>Learning progress</li><li>Application settings</li></ul> | <ul><li>Form inputs</li><li>UI interactions</li><li>Component visibility</li></ul> | <ul><li>Color scheme preferences</li><li>Accessibility settings</li><li>Visual customization</li></ul> |

### 🛣️ Routing

<div align="center">
  <img src="https://cdn-icons-png.flaticon.com/512/5741/5741333.png" width="80" alt="Routing">
  <h3>Application Routing Structure</h3>
</div>

All application routes are centralized in `src/routes/AppRoutes.tsx`, which provides:

- Centralized route configuration
- Protected route guards based on authentication status and user roles
- Nested route support with layout components
- Lazy loading for improved performance

#### 👨‍🎓 Student/Public Routes

| Route                   | Path     | Description                                                 |
| ----------------------- | -------- | ----------------------------------------------------------- |
| **Home**                | /        | Landing page with featured content and learning suggestions |
| **Learning Content**    | /lessons | Browse and access all available lesson materials            |
| **Tests & Assessments** | /tests   | Access various test types and assessment tools              |
| **Learning Routes**     | /routes  | View and select structured learning pathways                |
| **User Profile**        | /profile | Personal information and learning statistics                |
| **Test History**        | /history | Record of completed tests with performance metrics          |

#### 👩‍🏫 Teacher Routes

| Route                    | Path               | Description                                |
| ------------------------ | ------------------ | ------------------------------------------ |
| **Content Management**   | /teacher/content   | Create and manage lesson materials         |
| **Route Administration** | /teacher/routes    | Design and configure learning pathways     |
| **Test Creation**        | /teacher/tests     | Develop various assessment types           |
| **Student Progress**     | /teacher/students  | Monitor student performance and activities |
| **Analytics Dashboard**  | /teacher/analytics | View statistics and learning patterns      |

#### 👨‍💼 Admin Routes

| Route                    | Path           | Description                              |
| ------------------------ | -------------- | ---------------------------------------- |
| **User Management**      | /admin/users   | Create, edit, and manage user accounts   |
| **System Configuration** | /admin/config  | Platform settings and customization      |
| **Content Oversight**    | /admin/content | Review and approve educational content   |
| **Administrative Tools** | /admin/tools   | Special functions for system maintenance |
| **Role Management**      | /admin/roles   | Define and assign user permission levels |

- **Authentication Guards**: Prevent access to protected routes for unauthenticated users
- **Role-Based Authorization**: Restrict access based on user role (student, teacher, admin)
- **Intelligent Redirection**: Redirect to appropriate login or access denied pages
- **Persistent Sessions**: Maintain user sessions with secure token storage

## 👥 User Roles

<div align="center">
  <img src="https://cdn-icons-png.flaticon.com/512/3126/3126589.png" width="80" alt="User Roles">
</div>

| 👨‍🎓 Student                                                                                                                 | 👩‍🏫 Teacher                                                                                                     | 👨‍🏫 Teacher Advance                                                                                                                      | 👨‍💼 Admin                                                                                                                 |
| -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| <ul><li>Access to lessons</li><li>Take tests</li><li>Track personal progress</li><li>Participate in competitions</li></ul> | <ul><li>Create content</li><li>Manage lessons</li><li>Review student work</li><li>Create assessments</li></ul> | <ul><li>All Teacher permissions</li><li>Create learning routes</li><li>Advanced content editing</li><li>Special test creation</li></ul> | <ul><li>User management</li><li>System administration</li><li>Content oversight</li><li>Access to all features</li></ul> |

## 🧪 Testing

```bash
npm test
# or
yarn test
```

## 🚢 Deployment

```bash
npm run build
# or
yarn build
```

## 🤝 Contributing

Contributions make the open source community an amazing place to learn, inspire, and create. Any contributions to this project are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Material UI](https://mui.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- All other libraries used in this project

## 👨‍🎓 Team

<div align="center">
  <img src="https://cdn-icons-png.flaticon.com/512/3898/3898082.png" width="100" alt="Team">
  
  <h3>Developed by three students from K21 cohort at Ho Chi Minh City University of Technology and Education (HCMUTE)</h3>

  <table>
    <tr>
      <td align="center">
        <img src="https://avatars.githubusercontent.com/u/97101001?s=400&u=c2e995d2acff0cb120417bf042d6c1205bd4bbb4&v=4" width="100" alt="Developer Avatar">
        <br>
        <b>Nguyễn Trung Hậu</b>
        <br>
        <a href="https://github.com/TrungHauad02">GitHub</a>
      </td>
      <td align="center">
        <img src="https://avatars.githubusercontent.com/u/95125368" width="100" alt="Developer Avatar">
        <br>
        <b>Thái Thanh Hưng</b>
        <br>
        <a href="https://github.com/username2">GitHub</a>
      </td>
      <td align="center">
        <img src="https://avatars.githubusercontent.com/u/96189553" width="100" alt="Developer Avatar">
        <br>
        <b>Cáp Lê Hữu Tân</b>
        <br>
        <a href="https://github.com/username3">GitHub</a>
      </td>
    </tr>
  </table>
</div>

<div align="center">
  <hr>
  
  <p>
    <a href="#"><img src="https://img.shields.io/badge/H2T_English-Website-teal?style=for-the-badge" alt="Website"></a>
    <a href="mailto:contact@h2tenglish.com"><img src="https://img.shields.io/badge/Email-Contact-red?style=for-the-badge&logo=gmail" alt="Contact"></a>
    <a href="#"><img src="https://img.shields.io/badge/Report-Issues-yellow?style=for-the-badge&logo=github" alt="Issues"></a>
  </p>
  
  <p>© 2025 H2T English. All Rights Reserved.</p>
  
  <p>
    <img src="https://img.shields.io/badge/Made_with_❤️_in-Vietnam-red?style=flat-square&logo=vietnam" alt="Made in Vietnam">
  </p>
</div>
