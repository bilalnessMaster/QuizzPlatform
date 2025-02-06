import { useToast } from "@/hooks/use-toast";
import axiosInstance from "@/lib/axios";
import { userProps } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import { twMerge } from "tailwind-merge";

const Logout = ({ user, isOpen }: { user: userProps; isOpen: boolean }) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { mutate: signOut, isPending } = useMutation({
    mutationFn: async () => {
      const { data } = await axiosInstance.get("/auth/loggout");
      console.log(data);
      return data;
    },
    onSuccess: (data: { message?: string }) => {
      queryClient.invalidateQueries({
        queryKey: ["AuthUser"],
      });
      toast({
        title: "Success",
        description: data?.message,
      });
    },
    onError: (error: Error & { response: any }) => {


      toast({
        variant: "destructive",
        title: "Error",
        description: error?.response?.data?.message,
      });
    },
  });
  return (
    <div className="flex justify-between items-center  h-12 w-full">
      <div className="flex items-center text-xs  font-dm gap-3">
        <div className="w-7 rounded-full bg-gris h-full  overflow-hidden ">
          <img
            src={"/gender/" + user?.gender + ".png"}
            className="h-7 object-cover w-7"
          />
        </div>
        <div className={twMerge("leading-[1rem] font-medium whitespace-nowrap opacity-0 transition-opacity duration-200" ,isOpen && 'opacity-100')}>
          <h2>
            @{user?.firstName}
            {user?.lastName}
          </h2>
          <h2 className="text-black/35 dark:text-neutral-300/55">
            {user?.email}
          </h2>
        </div>
      </div>
      {isOpen && (
        <button
          disabled={isPending}
          className="text-black/75 dark:text-neutral-300"
          onClick={() => signOut()}
        >
          {isPending ? (
            <div className="size-5 border-2 border-white/25 rounded-full border-t-2 border-t-white animate-spin " />
          ) : (
            <LogOut size={19} />
          )}
        </button>
      )}
    </div>
  );
};

export default Logout;
