import Post from '../models/Post.js';
import User from '../models/User.js';
import { sendSuccess, sendPaginatedSuccess, sendError } from '../utils/responseUtils.js';
import { logger } from '../config/index.js';
import { AppError, asyncHandler } from '../middleware/errorHandler.js';

/**
 * Get all posts with pagination, filtering, and searching
 */
export const getAllPosts = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, category, search, sort = 'newest' } = req.validated;

  // Build filter
  const filter = { published: true };

  if (category) {
    filter.category = category;
  }

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { body: { $regex: search, $options: 'i' } },
      { tags: { $in: [new RegExp(search, 'i')] } },
    ];
  }

  // Build sort
  let sortObj = {};
  switch (sort) {
  case 'oldest':
    sortObj = { createdAt: 1 };
    break;
  case 'popular':
    sortObj = { likes: -1, views: -1 };
    break;
  case 'newest':
  default:
    sortObj = { createdAt: -1 };
  }

  // Execute query with pagination
  const total = await Post.countDocuments(filter);
  const posts = await Post.find(filter)
    .populate('author', 'fullName profile.avatar email')
    .sort(sortObj)
    .limit(limit)
    .skip((page - 1) * limit)
    .lean();

  logger.info(`Retrieved ${posts.length} posts (page ${page})`);

  return sendPaginatedSuccess(
    res,
    posts,
    { page, limit, total },
    200,
    'Posts retrieved successfully'
  );
});

/**
 * Get single post by ID
 */
export const getPostById = asyncHandler(async (req, res) => {
  const { id } = req.validated;

  const post = await Post.findByIdAndUpdate(
    id,
    { $inc: { views: 1 } }, // Increment view count
    { new: true }
  ).populate('author', 'fullName profile.avatar email');

  if (!post) {
    throw new AppError('Post not found', 404);
  }

  // Make it public even if unpublished for authenticated author
  if (!post.published && (!req.user || req.user.userId !== post.author._id.toString())) {
    throw new AppError('Post not found', 404);
  }

  logger.info(`Post viewed: ${post._id}`);

  return sendSuccess(res, 200, 'Post retrieved successfully', post);
});

/**
 * Create new post (authenticated users)
 */
export const createPost = asyncHandler(async (req, res) => {
  const { title, body, category, tags, published, readTime } = req.validated;

  const post = new Post({
    title,
    body,
    author: req.user.userId,
    category,
    tags: tags || [],
    published: published !== undefined ? published : true,
    readTime: readTime || 5,
  });

  await post.save();

  // Populate author data
  await post.populate('author', 'fullName profile.avatar email');

  logger.info(`New post created by ${req.user.email}: ${post._id}`);

  return sendSuccess(res, 201, 'Post created successfully', post);
});

/**
 * Update post (author or admin only)
 */
export const updatePost = asyncHandler(async (req, res) => {
  const { id } = req.validated;
  const { title, body, category, tags, published, readTime } = req.validated;

  // Get post
  const post = await Post.findById(id);

  if (!post) {
    throw new AppError('Post not found', 404);
  }

  // Check authorization
  if (post.author.toString() !== req.user.userId && req.user.role !== 'admin') {
    logger.warn(`Unauthorized update attempt by user: ${req.user.email}`);
    throw new AppError('You do not have permission to update this post', 403);
  }

  // Update fields
  if (title !== undefined) post.title = title;
  if (body !== undefined) post.body = body;
  if (category !== undefined) post.category = category;
  if (tags !== undefined) post.tags = tags;
  if (published !== undefined) post.published = published;
  if (readTime !== undefined) post.readTime = readTime;

  await post.save();

  await post.populate('author', 'fullName profile.avatar email');

  logger.info(`Post updated by ${req.user.email}: ${post._id}`);

  return sendSuccess(res, 200, 'Post updated successfully', post);
});

/**
 * Delete post (author or admin only)
 */
export const deletePost = asyncHandler(async (req, res) => {
  const { id } = req.validated;

  const post = await Post.findById(id);

  if (!post) {
    throw new AppError('Post not found', 404);
  }

  // Check authorization
  if (post.author.toString() !== req.user.userId && req.user.role !== 'admin') {
    logger.warn(`Unauthorized delete attempt by user: ${req.user.email}`);
    throw new AppError('You do not have permission to delete this post', 403);
  }

  await Post.findByIdAndDelete(id);

  logger.info(`Post deleted by ${req.user.email}: ${id}`);

  return sendSuccess(res, 200, 'Post deleted successfully');
});

/**
 * Get user's own posts
 */
export const getMyPosts = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.validated;

  const total = await Post.countDocuments({ author: req.user.userId });
  const posts = await Post.find({ author: req.user.userId })
    .populate('author', 'fullName profile.avatar email')
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip((page - 1) * limit)
    .lean();

  logger.info(`Retrieved ${posts.length} posts for user: ${req.user.email}`);

  return sendPaginatedSuccess(
    res,
    posts,
    { page, limit, total },
    200,
    'Your posts retrieved successfully'
  );
});

/**
 * Add comment to post
 */
export const addComment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  if (!content || !content.trim()) {
    throw new AppError('Comment content is required', 422);
  }

  const post = await Post.findByIdAndUpdate(
    id,
    {
      $push: {
        comments: {
          author: req.user.userId,
          content: content.trim(),
        },
      },
    },
    { new: true }
  ).populate('author', 'fullName profile.avatar email');

  if (!post) {
    throw new AppError('Post not found', 404);
  }

  logger.info(`Comment added to post ${id} by ${req.user.email}`);

  return sendSuccess(res, 201, 'Comment added successfully', post);
});

/**
 * Like a post
 */
export const likePost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const post = await Post.findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true });

  if (!post) {
    throw new AppError('Post not found', 404);
  }

  logger.info(`Post liked: ${id}`);

  return sendSuccess(res, 200, 'Post liked successfully', { likes: post.likes });
});

/**
 * Get posts by category
 */
export const getPostsByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;
  const { page = 1, limit = 10 } = req.validated;

  const validCategories = [
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
  ];

  if (!validCategories.includes(category)) {
    throw new AppError('Invalid category', 400);
  }

  const total = await Post.countDocuments({ category, published: true });
  const posts = await Post.find({ category, published: true })
    .populate('author', 'fullName profile.avatar email')
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip((page - 1) * limit)
    .lean();

  return sendPaginatedSuccess(
    res,
    posts,
    { page, limit, total },
    200,
    `Posts in ${category} retrieved successfully`
  );
});

export default {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  getMyPosts,
  addComment,
  likePost,
  getPostsByCategory,
};
