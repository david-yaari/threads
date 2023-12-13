import PostThread from '@/components/forms/PostThread';
import { fetchUser } from '@/lib/actions/user.actions';
import { UserInfo } from '@/types';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

async function page() {
  const user = await currentUser();
  if (!user) return null; // to avoid typescript warnings

  // fetch organization list created by user
  const userInfo: UserInfo = await fetchUser(user.id);
  //console.log(userInfo);

  if (!userInfo?.onboarded) redirect('/onboarding');

  const userData = {
    id: user?.id,
    objectId: userInfo?._id,
    username: userInfo?.username || user?.username,
    name: userInfo?.name || user?.firstName || '',
    bio: userInfo?.bio || '',
    image: user?.imageUrl, //userInfo?.image || user?.image,
  };
  return (
    <>
      <h1 className='head-text'>Create Thread</h1>
      <PostThread userId={userInfo?._id} />
    </>
  );
}

export default page;
