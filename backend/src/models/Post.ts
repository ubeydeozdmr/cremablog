import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import marked from 'marked';
import { model, Schema, type Document } from 'mongoose';
import slugify from 'slugify';

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

interface PostDocument extends Document {
  user: Schema.Types.ObjectId;
  title: string;
  description?: string;
  markdown: string;
  thumbnail?: string;
  createdAt: Date;
  updatedAt: Date;
  slug: string;
  html: string;
}

const postSchema = new Schema<PostDocument>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    markdown: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    html: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

postSchema.pre('validate', async function (next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }

  if (this.markdown) {
    this.html = DOMPurify.sanitize(await marked.parse(this.markdown));
  }

  if (!this.description && this.markdown) {
    this.description =
      this.markdown.length <= 150
        ? this.markdown
        : this.markdown.substring(0, 150) + '...';
  }

  if (!this.thumbnail) {
    const img = this.html.match(/<img[^>]*src="([^"]+)"[^>]*>/);
    this.thumbnail = img ? img[1] : 'https://placehold.co/1200x800';
  }

  next();
});

const Post = model<PostDocument>('Post', postSchema);

export default Post;
