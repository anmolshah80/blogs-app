'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { LoaderCircle } from 'lucide-react';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

import { deletePost } from '@/app/actions/actions';

type DeleteModalProps = {
  children: React.ReactNode;
  postId: string;
};

const DeleteModal = ({ postId, children }: DeleteModalProps) => {
  const [isPending, setIsPending] = useState(false);

  const handleClick = () => {
    setIsPending(true);

    const deletedPost = deletePost(postId);

    deletedPost.then((value) => {
      // only one of the destructured properties will be accessible
      // based on whether it is able to delete a post or not
      const { deletedPostData, error } = value;

      // if the post is deleted render a success toast
      if (deletedPostData !== undefined) {
        toast.success(`Your blog with ID ${postId} has been deleted!`, {
          closeButton: true,
          duration: 5000,
        });
      }

      // if there is issue while deleting the post then render an error toast
      if (error !== undefined) {
        toast.error('An error occurred while deleting the blog post', {
          description: error,
          closeButton: true,
          duration: 10000,
        });
      }

      setIsPending(false);
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogOverlay className="fixed inset-0 bg-black/90 data-[state=open]:animate-overlayShow" />

      <DialogContent
        className={
          'sm:max-w-[500px] fixed left-1/2 top-1/2 max-h-[96vh] w-[90vw] max-w-[482px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-gray-900 p-[25px] shadow-(--shadow-6) focus:outline-none data-[state=open]:animate-contentShow gap-0 overflow-y-scroll sm:overflow-y-auto'
        }
        dialogCloseIconClassName="[&_svg:not([class*='size-'])]:size-6 top-[1.65rem] cursor-pointer"
      >
        <DialogHeader className="gap-0 mb-9">
          <DialogTitle className="m-0 text-3xl text-left font-medium">
            Delete Post
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <p className="text-base sm:text-xl mb-8">
          Are you sure you want to delete this post? This will delete your post
          permanently. You cannot undo this action.
        </p>

        <DialogFooter className="flex-row gap-3 justify-between">
          <DialogClose asChild>
            <Button className="outline-none hover:text-white text-base rounded-md text-white border-2 border-gray-700 bg-transparent hover:bg-(--ds-gray-100) px-7 py-2 cursor-pointer">
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            className="inline-flex items-center text-base justify-center rounded-md bg-black/80 px-7 font-medium leading-none text-white/80 outline-none outline-offset-1 hover:bg-black hover:text-white focus-visible:outline-2 cursor-pointer border-2 border-gray-700"
            disabled={isPending}
            onClick={handleClick}
          >
            {isPending ? (
              <span className="flex items-center justify-center gap-5">
                Delete{' '}
                <LoaderCircle size={16} className="text-white btn-spinner" />
              </span>
            ) : (
              <span>Delete</span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
