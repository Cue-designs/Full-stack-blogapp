import { z } from 'zod';

// Auth validators
export const signupSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must not exceed 100 characters')
    .trim(),
  email: z.string().email('Invalid email address').toLowerCase(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address').toLowerCase(),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token is required'),
});

// Post validators
export const createPostSchema = z.object({
  title: z
    .string()
    .min(5, 'Title must be at least 5 characters')
    .max(200, 'Title must not exceed 200 characters')
    .trim(),
  body: z
    .string()
    .min(20, 'Body must be at least 20 characters')
    .trim(),
  category: z
    .enum([
      'web-development',
      'html',
      'css',
      'javascript',
      'react',
      'frontend',
      'backend',
      'database',
      'devops',
      'other',
    ])
    .optional()
    .default('other'),
  tags: z.array(z.string().trim()).optional().default([]),
  published: z.boolean().optional().default(true),
  readTime: z.number().min(1).max(120).optional().default(5),
});

export const updatePostSchema = createPostSchema.partial();

export const postIdSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid post ID'),
});

// User validators
export const updateProfileSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must not exceed 100 characters')
    .trim()
    .optional(),
  bio: z
    .string()
    .max(500, 'Bio must not exceed 500 characters')
    .trim()
    .optional(),
  avatar: z.string().url('Invalid avatar URL').optional(),
});

// Query validators
export const paginationSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
});

export const sortSchema = z.object({
  sort: z.enum(['newest', 'oldest', 'popular']).default('newest'),
});

export const filterSchema = z.object({
  category: z.string().optional(),
  search: z.string().optional(),
});
