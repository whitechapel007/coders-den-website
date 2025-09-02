import { BlogPost } from '@/types'

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'JavaScript ES6+ Features Every Developer Should Know',
    slug: 'javascript-es6-features-guide',
    excerpt: 'Master modern JavaScript with this comprehensive guide to ES6+ features including arrow functions, destructuring, async/await, and more.',
    content: `# JavaScript ES6+ Features Every Developer Should Know

JavaScript has evolved significantly since ES6 (ES2015) was released. In this comprehensive guide, we'll explore the most important features that every modern JavaScript developer should master.

## Arrow Functions

Arrow functions provide a more concise syntax for writing functions:

\`\`\`javascript
// Traditional function
function add(a, b) {
  return a + b;
}

// Arrow function
const add = (a, b) => a + b;
\`\`\`

## Destructuring Assignment

Extract values from arrays and objects easily:

\`\`\`javascript
// Array destructuring
const [first, second] = [1, 2, 3];

// Object destructuring
const { name, age } = { name: 'John', age: 30, city: 'NYC' };
\`\`\`

## Template Literals

Create strings with embedded expressions:

\`\`\`javascript
const name = 'World';
const greeting = \`Hello, \${name}!\`;
\`\`\`

## Async/Await

Handle asynchronous operations more elegantly:

\`\`\`javascript
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}
\`\`\`

These features make JavaScript code more readable, maintainable, and powerful. Start incorporating them into your projects today!`,
    author: {
      name: 'Mike Wilson',
      avatar: '/avatars/mike-wilson.jpg'
    },
    publishDate: '2024-02-15',
    lastModified: '2024-02-15',
    tags: ['JavaScript', 'ES6', 'Modern JS', 'Tutorial'],
    category: 'tutorial',
    readTime: 8,
    featured: true,
    image: '/blog/javascript-es6.jpg'
  },
  {
    id: '2',
    title: 'Python Data Analysis with Pandas: A Beginner\'s Guide',
    slug: 'python-pandas-data-analysis-guide',
    excerpt: 'Learn how to analyze data effectively using Python and Pandas. This beginner-friendly guide covers data loading, cleaning, and basic analysis.',
    content: `# Python Data Analysis with Pandas: A Beginner's Guide

Pandas is one of the most powerful libraries for data analysis in Python. In this guide, we'll learn the fundamentals of data analysis using Pandas.

## Installing Pandas

\`\`\`bash
pip install pandas numpy matplotlib
\`\`\`

## Loading Data

\`\`\`python
import pandas as pd

# Load CSV file
df = pd.read_csv('data.csv')

# Display first 5 rows
print(df.head())
\`\`\`

## Basic Data Exploration

\`\`\`python
# Get basic info about the dataset
print(df.info())
print(df.describe())

# Check for missing values
print(df.isnull().sum())
\`\`\`

## Data Cleaning

\`\`\`python
# Remove rows with missing values
df_clean = df.dropna()

# Fill missing values
df_filled = df.fillna(df.mean())

# Remove duplicates
df_unique = df.drop_duplicates()
\`\`\`

## Basic Analysis

\`\`\`python
# Group by and aggregate
grouped = df.groupby('category').agg({
    'sales': 'sum',
    'quantity': 'mean'
})

# Filter data
high_sales = df[df['sales'] > 1000]
\`\`\`

This is just the beginning of what you can do with Pandas. Practice with real datasets to master these concepts!`,
    author: {
      name: 'Jane Smith',
      avatar: '/avatars/jane-smith.jpg'
    },
    publishDate: '2024-02-10',
    lastModified: '2024-02-10',
    tags: ['Python', 'Pandas', 'Data Analysis', 'Tutorial'],
    category: 'tutorial',
    readTime: 12,
    featured: true,
    image: '/blog/python-pandas.jpg'
  },
  {
    id: '3',
    title: 'How to Land Your First Developer Job in 2024',
    slug: 'land-first-developer-job-2024',
    excerpt: 'A comprehensive guide to breaking into the tech industry, from building your portfolio to acing technical interviews.',
    content: `# How to Land Your First Developer Job in 2024

Breaking into the tech industry can seem daunting, but with the right strategy and preparation, you can land your first developer job. Here's a comprehensive roadmap.

## 1. Build a Strong Foundation

Focus on mastering the fundamentals:
- Choose one programming language and become proficient
- Understand data structures and algorithms
- Learn version control (Git)
- Practice problem-solving regularly

## 2. Create an Impressive Portfolio

Your portfolio should showcase:
- 3-5 well-documented projects
- Clean, readable code
- Live demos when possible
- Variety in project types

## 3. Build Your Online Presence

- Create a professional GitHub profile
- Write technical blog posts
- Contribute to open source projects
- Network on LinkedIn and Twitter

## 4. Prepare for Technical Interviews

- Practice coding problems on LeetCode/HackerRank
- Understand system design basics
- Prepare for behavioral questions
- Mock interview with peers

## 5. Apply Strategically

- Tailor your resume for each position
- Apply to companies of all sizes
- Use your network for referrals
- Follow up professionally

Remember, persistence is key. Every rejection is a learning opportunity that brings you closer to success!`,
    author: {
      name: 'John Doe',
      avatar: '/avatars/john-doe.jpg'
    },
    publishDate: '2024-02-05',
    lastModified: '2024-02-05',
    tags: ['Career', 'Job Search', 'Interview Tips', 'Portfolio'],
    category: 'career',
    readTime: 10,
    featured: true,
    image: '/blog/first-developer-job.jpg'
  },
  {
    id: '4',
    title: 'React Hooks: useState and useEffect Explained',
    slug: 'react-hooks-usestate-useeffect-explained',
    excerpt: 'Master the two most important React hooks with practical examples and best practices for modern React development.',
    content: `# React Hooks: useState and useEffect Explained

React Hooks revolutionized how we write React components. Let's dive deep into the two most essential hooks: useState and useEffect.

## useState Hook

The useState hook lets you add state to functional components:

\`\`\`jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
\`\`\`

## useEffect Hook

useEffect lets you perform side effects in functional components:

\`\`\`jsx
import React, { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]); // Dependency array

  if (!user) return <div>Loading...</div>;

  return <div>Hello, {user.name}!</div>;
}
\`\`\`

## Best Practices

1. **Always include dependencies**: Don't forget the dependency array
2. **Clean up effects**: Return cleanup functions when needed
3. **Separate concerns**: Use multiple useEffect hooks for different concerns

These hooks form the foundation of modern React development. Master them, and you'll be well on your way to React proficiency!`,
    author: {
      name: 'Mike Wilson',
      avatar: '/avatars/mike-wilson.jpg'
    },
    publishDate: '2024-01-30',
    lastModified: '2024-01-30',
    tags: ['React', 'Hooks', 'JavaScript', 'Frontend'],
    category: 'tutorial',
    readTime: 6,
    featured: false,
    image: '/blog/react-hooks.jpg'
  },
  {
    id: '5',
    title: 'Building RESTful APIs with Node.js and Express',
    slug: 'building-restful-apis-nodejs-express',
    excerpt: 'Learn how to create robust RESTful APIs using Node.js and Express, including routing, middleware, and error handling.',
    content: `# Building RESTful APIs with Node.js and Express

Creating RESTful APIs is a fundamental skill for backend developers. In this tutorial, we'll build a complete API using Node.js and Express.

## Setting Up the Project

\`\`\`bash
mkdir my-api
cd my-api
npm init -y
npm install express cors helmet morgan
npm install -D nodemon
\`\`\`

## Basic Express Server

\`\`\`javascript
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// Routes
app.get('/api/users', (req, res) => {
  res.json({ message: 'Get all users' });
});

app.post('/api/users', (req, res) => {
  res.json({ message: 'Create user', data: req.body });
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
\`\`\`

## Error Handling

\`\`\`javascript
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});
\`\`\`

This foundation will help you build scalable and maintainable APIs. Remember to follow REST conventions and implement proper error handling!`,
    author: {
      name: 'John Doe',
      avatar: '/avatars/john-doe.jpg'
    },
    publishDate: '2024-01-25',
    lastModified: '2024-01-25',
    tags: ['Node.js', 'Express', 'API', 'Backend'],
    category: 'tutorial',
    readTime: 15,
    featured: false,
    image: '/blog/nodejs-express-api.jpg'
  },
  {
    id: '6',
    title: 'Coders Den Community Update: February 2024',
    slug: 'coders-den-community-update-february-2024',
    excerpt: 'Exciting updates from our community including new features, upcoming events, and member spotlights.',
    content: `# Coders Den Community Update: February 2024

We're excited to share what's been happening in our amazing community this month!

## New Features

- **Enhanced Quiz System**: Our skills assessment now includes more advanced questions
- **Mentorship Matching**: Improved algorithm for pairing mentors with mentees
- **Event Calendar**: Better visibility into upcoming workshops and events

## Community Growth

- 🎉 We've reached 1,200+ active members!
- 📈 50+ new members joined this month
- 💼 15 members landed new jobs
- 🏆 3 successful hackathon projects completed

## Upcoming Events

- **March 5**: Advanced React Patterns Workshop
- **March 12**: Python Data Science Bootcamp
- **March 19**: Mock Interview Marathon
- **March 26**: Monthly Networking Mixer

## Member Spotlight

This month we're highlighting Sarah Chen, who recently landed her first developer role after completing our JavaScript track. Her dedication and active participation in community events made her journey inspiring for all of us!

## Thank You

A huge thank you to all our mentors, active members, and everyone who makes this community special. Together, we're building something amazing!

Stay tuned for more updates next month!`,
    author: {
      name: 'Coders Den Team',
      avatar: '/avatars/coders-den-team.jpg'
    },
    publishDate: '2024-02-01',
    lastModified: '2024-02-01',
    tags: ['Community', 'Updates', 'News'],
    category: 'news',
    readTime: 3,
    featured: false,
    image: '/blog/community-update-feb-2024.jpg'
  }
]

export const blogCategories = [
  { value: 'all', label: 'All Posts', count: blogPosts.length },
  { value: 'tutorial', label: 'Tutorials', count: blogPosts.filter(p => p.category === 'tutorial').length },
  { value: 'career', label: 'Career', count: blogPosts.filter(p => p.category === 'career').length },
  { value: 'news', label: 'News', count: blogPosts.filter(p => p.category === 'news').length },
  { value: 'technology', label: 'Technology', count: blogPosts.filter(p => p.category === 'technology').length },
  { value: 'community', label: 'Community', count: blogPosts.filter(p => p.category === 'community').length }
]

export const popularTags = [
  'JavaScript', 'Python', 'React', 'Node.js', 'Career', 'Tutorial', 
  'Data Science', 'Frontend', 'Backend', 'API', 'Hooks', 'ES6'
]
