import { LoaderCircle } from 'lucide-react';

const BlogsListLoading = () => (
  <div className="grid grid-cols-1 place-items-center gap-8 py-16 sm:grid-cols-2 lg:grid-cols-3">
    <LoaderCircle size={16} className="text-white" />
  </div>
);

export default BlogsListLoading;
