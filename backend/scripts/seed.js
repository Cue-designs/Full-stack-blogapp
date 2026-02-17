import 'dotenv/config';
import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import User from '../src/models/User.js';
import Post from '../src/models/Post.js';
import { connectDB, logger } from '../src/config/index.js';

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await Post.deleteMany({});
    logger.info('Cleared existing data');

    // Create sample users
    const users = await User.create([
      {
        fullName: 'John Doe',
        email: 'john@example.com',
        password: 'Password123',
        role: 'admin',
        profile: {
          bio: 'Full-stack developer and tech enthusiast',
          avatar: 'https://i.pravatar.cc/150?img=1',
        },
      },
      {
        fullName: 'Jane Smith',
        email: 'jane@example.com',
        password: 'Password123',
        role: 'user',
        profile: {
          bio: 'Frontend developer passionate about React',
          avatar: 'https://i.pravatar.cc/150?img=2',
        },
      },
      {
        fullName: 'Mike Johnson',
        email: 'mike@example.com',
        password: 'Password123',
        role: 'user',
        profile: {
          bio: 'Backend engineer and database expert',
          avatar: 'https://i.pravatar.cc/150?img=3',
        },
      },
    ]);

    logger.info(`Created ${users.length} users`);

    // Create sample posts
    const postData = [
      {
        title: 'Getting Started with Web Development',
        body: 'Web development is an exciting field that combines creativity and logic. This post introduces the basic tools, languages, and mindset required to start your journey as a web developer.',
        author: users[0]._id,
        category: 'web-development',
        tags: ['web', 'development', 'beginner'],
        published: true,
        readTime: 5,
      },
      {
        title: 'Understanding HTML Semantics',
        body: 'Semantic HTML improves accessibility and SEO by giving meaning to web content. Learn how elements like header, article, and section help structure your pages correctly. Semantic HTML is crucial for modern web development.',
        author: users[0]._id,
        category: 'html',
        tags: ['html', 'semantic', 'accessibility'],
        published: true,
        readTime: 6,
      },
      {
        title: 'CSS Flexbox Made Simple',
        body: 'Flexbox is a powerful layout system in CSS. This article explains how flex containers and flex items work together to create responsive layouts. Master flexbox and you\'ll build layouts faster than ever before.',
        author: users[1]._id,
        category: 'css',
        tags: ['css', 'flexbox', 'layout'],
        published: true,
        readTime: 8,
      },
      {
        title: 'Mastering CSS Grid Layout',
        body: 'CSS Grid allows you to design complex layouts with rows and columns. Discover how grid-template-areas and fractions simplify page design. Grid is perfect for creating modern, responsive layouts.',
        author: users[1]._id,
        category: 'css',
        tags: ['css', 'grid', 'layout'],
        published: true,
        readTime: 10,
      },
      {
        title: 'JavaScript Basics for Beginners',
        body: 'JavaScript adds interactivity to websites. This post covers variables, functions, and events to help beginners understand core concepts. JavaScript is the language of the web and essential to learn.',
        author: users[0]._id,
        category: 'javascript',
        tags: ['javascript', 'basics', 'tutorial'],
        published: true,
        readTime: 12,
      },
      {
        title: 'Understanding the DOM',
        body: 'The Document Object Model allows JavaScript to interact with HTML. Learn how to select, modify, and respond to elements dynamically. The DOM is fundamental to interactive web development.',
        author: users[2]._id,
        category: 'javascript',
        tags: ['javascript', 'dom', 'advanced'],
        published: true,
        readTime: 7,
      },
      {
        title: 'Introduction to ES6 Features',
        body: 'ES6 introduced modern JavaScript features like arrow functions, let and const, and template literals that make code cleaner and more readable. ES6+ features are now standard in modern JavaScript development.',
        author: users[0]._id,
        category: 'javascript',
        tags: ['javascript', 'es6', 'modern'],
        published: true,
        readTime: 9,
      },
      {
        title: 'What Is React and Why Use It?',
        body: 'React is a popular JavaScript library for building user interfaces. This article explains components, JSX, and why React improves development speed. React has become the go-to choice for modern web applications.',
        author: users[1]._id,
        category: 'react',
        tags: ['react', 'frontend', 'ui'],
        published: true,
        readTime: 8,
      },
      {
        title: 'Setting Up a React Project with Vite',
        body: 'Vite provides a fast and modern development environment for React. Learn how to set up a project and understand the folder structure. Vite is much faster than Create React App for development.',
        author: users[1]._id,
        category: 'react',
        tags: ['react', 'vite', 'tooling'],
        published: true,
        readTime: 5,
      },
      {
        title: 'Understanding React Components',
        body: 'Components are the building blocks of React applications. This post explains functional components and how to reuse them effectively. Mastering components is key to writing scalable React applications.',
        author: users[0]._id,
        category: 'react',
        tags: ['react', 'components', 'tutorial'],
        published: true,
        readTime: 7,
      },
      {
        title: 'Props vs State in React',
        body: 'Props and state control how React components behave. Learn the difference and when to use each for managing data. Understanding props and state is crucial for React development.',
        author: users[2]._id,
        category: 'react',
        tags: ['react', 'props', 'state'],
        published: true,
        readTime: 6,
      },
      {
        title: 'Handling Events in React',
        body: 'Event handling in React is similar to JavaScript but with JSX syntax. This article shows how to manage clicks, forms, and inputs. Proper event handling makes interactive React apps responsive.',
        author: users[1]._id,
        category: 'react',
        tags: ['react', 'events', 'forms'],
        published: true,
        readTime: 6,
      },
      {
        title: 'React Router for Beginners',
        body: 'React Router enables navigation between pages without reloading. Learn how to use Routes, Route, and Link components. React Router is essential for building multi-page React applications.',
        author: users[0]._id,
        category: 'frontend',
        tags: ['react', 'routing', 'navigation'],
        published: true,
        readTime: 8,
      },
      {
        title: 'Managing Global State with Context API',
        body: 'The Context API helps share state across components. This post explains providers, consumers, and practical use cases. Context API is a powerful alternative to Redux for state management.',
        author: users[2]._id,
        category: 'react',
        tags: ['react', 'context', 'state-management'],
        published: true,
        readTime: 9,
      },
      {
        title: 'Fetching Data in React',
        body: 'Fetching data from APIs is essential for modern apps. Learn how to use fetch and useEffect to load data efficiently. Proper data fetching patterns improve React app performance.',
        author: users[1]._id,
        category: 'react',
        tags: ['react', 'api', 'data-fetching'],
        published: true,
        readTime: 7,
      },
      {
        title: 'Node.js and Express Fundamentals',
        body: 'Node.js allows you to run JavaScript server-side. Express is a minimal yet powerful framework for building REST APIs. Together, they form the backbone of modern full-stack applications.',
        author: users[2]._id,
        category: 'backend',
        tags: ['nodejs', 'express', 'backend'],
        published: true,
        readTime: 10,
      },
      {
        title: 'MongoDB for Beginners',
        body: 'MongoDB is a NoSQL database that stores data in JSON-like documents. Learn the basics of CRUD operations and indexing. MongoDB is perfect for rapid development and scalability.',
        author: users[2]._id,
        category: 'database',
        tags: ['mongodb', 'database', 'nosql'],
        published: true,
        readTime: 8,
      },
      {
        title: 'CRUD Operations Explained',
        body: 'CRUD stands for Create, Read, Update, and Delete. These operations form the backbone of most web applications. Understanding CRUD operations is fundamental to API development.',
        author: users[0]._id,
        category: 'backend',
        tags: ['api', 'crud', 'development'],
        published: true,
        readTime: 6,
      },
      {
        title: 'REST API Best Practices',
        body: 'Learn how to design RESTful APIs that are scalable and maintainable. This guide covers naming conventions, HTTP methods, status codes, and error handling. Well-designed APIs are easier to use and maintain.',
        author: users[2]._id,
        category: 'backend',
        tags: ['api', 'rest', 'best-practices'],
        published: true,
        readTime: 11,
      },
      {
        title: 'Deploying a React Application',
        body: 'Deployment makes your app accessible online. Learn how to deploy React applications using popular hosting platforms. Modern deployment pipelines make continuous deployment seamless.',
        author: users[1]._id,
        category: 'devops',
        tags: ['deployment', 'react', 'devops'],
        published: true,
        readTime: 9,
      },
    ];

    const posts = await Post.create(postData);
    logger.info(`Created ${posts.length} posts`);

    // Add some sample likes and views
    for (let post of posts) {
      post.likes = Math.floor(Math.random() * 100);
      post.views = Math.floor(Math.random() * 500);
      await post.save();
    }

    logger.info('Database seeding completed successfully!');
    logger.info('Sample Accounts:');
    logger.info('1. Admin: john@example.com / Password123');
    logger.info('2. User: jane@example.com / Password123');
    logger.info('3. User: mike@example.com / Password123');

    process.exit(0);
  } catch (error) {
    logger.error(`Error seeding database: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();
