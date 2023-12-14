import PostThread from '@/components/forms/PostThread';
import ProfileHeader from '@/components/shared/ProfileHeader';
import { profileTabs } from '@/constants';
import { fetchUser, fetchUsers } from '@/lib/actions/user.actions';
import { UserInfo } from '@/types';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import UserCard from '@/components/cards/UserCard';

async function Page() {
  const user = await currentUser();
  //console.log(user);
  if (!user) return null; // to avoid typescript warnings

  // fetch organization list created by user
  const userInfo: UserInfo = await fetchUser(user.id);
  //console.log(userInfo);

  if (!userInfo?.onboarded) redirect('/onboarding');

  // Fetch users
  const result = await fetchUsers({
    userId: user.id,
    searchString: '',
    pageNumber: 1,
    pageSize: 25,
    sortBy: 'desc',
  });
  //(result);

  return (
    <section>
      <h1 className='head-text mb-10'>Search</h1>

      {/* Search Bar */}

      <div className='mt-14 flex flex-col gap-9'>
        {result.users.length === 0 ? (
          <p className='no-result'>No users</p>
        ) : (
          <>
            {result.users.map((person) => (
              <UserCard
                key={person.id}
                id={person.id}
                name={person.name}
                username={person.username}
                imgUrl={person.imageUrl}
                personType='User'
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
}

export default Page;
