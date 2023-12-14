import { fetchUser, fetchUsers, getActivity } from '@/lib/actions/user.actions';
import { UserInfo } from '@/types';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import UserCard from '@/components/cards/UserCard';
import Link from 'next/link';

async function Page() {
  const user = await currentUser();

  if (!user) return null; // to avoid typescript warnings
  //console.log(user.id);
  // fetch organization list created by user
  const userInfo: UserInfo = await fetchUser(user.id);
  //console.log(userInfo);

  if (!userInfo?.onboarded) redirect('/onboarding');

  // getActivity (notifications)
  const activity = await getActivity(userInfo._id);

  return (
    <section>
      <h1 className='head-text mb-10'>Activity</h1>
      <section className='mt-10 flex flex-col gap-5'>
        {activity.length === 0 ? (
          <p className='!text-base-regular text-light-3'>No activity yet</p>
        ) : (
          <>
            {activity.map((activity) => (
              <Link
                key={activity._id}
                href={`/thread/${activity.parentId}`}
              >
                <article className='activity-card'>
                  <Image
                    src={activity.author.image}
                    alt='Profile Picture'
                    width={20}
                    height={20}
                    className='rounded-full object-cover'
                  />
                  <p className='!text-small-regular text-light-1'>
                    <span className='mr-1 text-primary-500'>
                      {activity.author.name}
                    </span>{' '}
                    replied to your thread
                  </p>
                </article>
              </Link>
            ))}
          </>
        )}
      </section>
    </section>
  );
}

export default Page;
