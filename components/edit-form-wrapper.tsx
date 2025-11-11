import EditForm from '@/components/edit-form';

import { getPost } from '@/lib/server-util';

interface EditFormWrapperProps {
  postId: string;
}

const EditFormWrapper = async ({ postId }: EditFormWrapperProps) => {
  const { postData, error } = await getPost(postId);

  return <EditForm postId={postId} postData={postData} error={error} />;
};

export default EditFormWrapper;
