const BlogsNotFound = () => {
  return (
    <div className="py-16 flex flex-col items-center justify-center mx-auto">
      <h2 className="mb-2 text-2xl font-medium">No blog posts found</h2>
      <p className="italic text-muted-foreground">
        Sorry, there is nothing available at this page!
      </p>
    </div>
  );
};

export default BlogsNotFound;
