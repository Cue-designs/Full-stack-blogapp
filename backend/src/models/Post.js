import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Post title is required'],
      trim: true,
      minlength: [5, 'Title must be at least 5 characters'],
      maxlength: [200, 'Title must not exceed 200 characters'],
      index: true,
    },
    body: {
      type: String,
      required: [true, 'Post body is required'],
      minlength: [20, 'Body must be at least 20 characters'],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Author is required'],
      index: true,
    },
    category: {
      type: String,
      enum: [
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
      ],
      default: 'other',
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    published: {
      type: Boolean,
      default: true,
    },
    likes: {
      type: Number,
      default: 0,
      min: 0,
    },
    comments: [
      {
        author: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        content: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    views: {
      type: Number,
      default: 0,
    },
    readTime: {
      type: Number, // in minutes
      default: 5,
    },
  },
  {
    timestamps: true,
  }
);

// Virtual for formatted date (for compatibility with frontend)
postSchema.virtual('datetime').get(function () {
  const date = this.createdAt;
  const options = { year: 'numeric', month: 'long', day: '2-digit', hour: '2-digit', minute: '2-digit' };
  return date.toLocaleDateString('en-US', options).replace(',', '') + ' ' + date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
});

// Include virtuals in JSON
postSchema.set('toJSON', { virtuals: true });

// Index for faster queries
postSchema.index({ author: 1 });
postSchema.index({ createdAt: -1 });
postSchema.index({ published: 1 });
postSchema.index({ category: 1 });
postSchema.index({ tags: 1 });

const Post = mongoose.model('Post', postSchema);

export default Post;
