import { Skeleton } from "@/components/ui/skeleton";
const RegisterSkeleton = () => {
  return (
    <div className="space-y-8 max-w-xl mx-auto mt-8">
      <Skeleton className="h-10 max-w-72 mx-auto mb-4 " />
      <div className="space-y-2">
        <Skeleton className="h-6 w-56 " />
        <Skeleton className="h-10 w-[576px]" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-6 w-56 " />
        <Skeleton className="h-10 w-[576px]" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-6 w-56 " />
        <Skeleton className="h-10 w-[576px]" />
      </div>

      <Skeleton className="h-10 w-[576px]" />
      <Skeleton className="h-10 w-[576px] mt-8" />
    </div>
  );
};

export default RegisterSkeleton;
