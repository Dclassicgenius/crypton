import { Skeleton } from "../ui/skeleton";

const ProfileSkeleton = () => {
  return (
    <div className="space-y-8 max-w-xl mx-auto mt-8">
      <Skeleton className="h-10 max-w-72 mx-auto mb-4 " />
      <Skeleton className="h-14 w-[576px]" />
      <Skeleton className="h-14 w-[576px]" />
      <Skeleton className="h-10 w-[576px] mt-8" />
    </div>
  );
};

export default ProfileSkeleton;
