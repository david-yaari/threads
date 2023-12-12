interface Props {
  threadId: string;
  currentUserImg: string;
  currentUser: string;
}
function Comment({ threadId, currentUserImg, currentUser }: Props) {
  return (
    <div>
      <h1 className='text-white'>Comment Form</h1>
    </div>
  );
}

export default Comment;
