import express from 'express';
import { z } from 'zod';
import { authMiddleware, authOptional } from '../middleware/auth.js';
import { validateBody, validateQuery, validateParams } from '../middleware/validate.js';
import {
  createPostSchema,
  updatePostSchema,
  paginationSchema,
  sortSchema,
  filterSchema,
  postIdSchema,
} from '../validators/index.js';
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  getMyPosts,
  addComment,
  likePost,
  getPostsByCategory,
} from '../controllers/postController.js';

const router = express.Router();

/**
 * Public Routes
 */

// Get all posts with pagination, filtering, and sorting
router.get(
  '/',
  validateQuery(paginationSchema.merge(sortSchema).merge(filterSchema)),
  getAllPosts
);

// Get single post by ID (with optional auth for view tracking)
router.get(
  '/:id',
  validateParams(postIdSchema),
  authOptional,
  getPostById
);

// Get posts by category - must come after :id to avoid conflicts
router.get(
  '/category/:category',
  validateParams(z.object({ category: z.string().min(1, 'Category is required') })),
  validateQuery(paginationSchema),
  getPostsByCategory
);

/**
 * Protected Routes - Requires Authentication
 */

// Create new post
router.post(
  '/',
  authMiddleware,
  validateBody(createPostSchema),
  createPost
);

// Get user's own posts
router.get(
  '/user/my-posts',
  authMiddleware,
  validateQuery(paginationSchema),
  getMyPosts
);

// Update post
router.put(
  '/:id',
  authMiddleware,
  validateParams(postIdSchema),
  validateBody(updatePostSchema),
  updatePost
);

// Delete post
router.delete(
  '/:id',
  authMiddleware,
  validateParams(postIdSchema),
  deletePost
);

// Add comment to post
router.post(
  '/:id/comments',
  authMiddleware,
  addComment
);

// Like post
router.post(
  '/:id/like',
  authMiddleware,
  likePost
);

export default router;
