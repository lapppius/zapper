import { auth } from "@/auth";
import ProfileHeader from "@/components/Profile/ProfileHeader";
import ProfileMain from "@/components/Profile/ProfileMain";

export default async function Profile() {
  const session = await auth();
  return (
    <>
      <ProfileHeader session={session} />
      <ProfileMain session={session} />
    </>
  );
}
