import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

import { Edits } from "@/components/shared/Edits";
import Header from "@/components/shared/Header";
import { getUserImages } from "@/lib/actions/image.actions";
import { getUserById } from "@/lib/actions/user.action";
import { SearchParamProps } from "@/lib/definitions";

const Dashboard = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const user = await getUserById(userId);
  const images = await getUserImages({ page, userId: user._id });

  return (
    <div className="bg-black p-20">
      <Header title="Dashboard" />

      {/* <section className="profile">
        

        <div className="profile-image-manipulation">
          <p className="p-14-medium md:p-16-medium">IMAGE MANIPULATION DONE</p>
          <div className="mt-4 flex items-center gap-4">
            <Image
              src="/assets/icons/photo.svg"
              alt="coins"
              width={50}
              height={50}
              className="size-9 md:size-12"
            />
            <h2 className="h2-bold text-dark-600">{images?.data.length}</h2>
          </div>
        </div>
      </section> */}
      
        <Image
          src={user.photo}
          className="w-32 group-hover:w-36 group-hover:h-36 h-32 object-center object-cover rounded-full transition-all duration-500 delay-500 transform mx-auto mt-5"
          alt="profile pic"
          width={128}
          height={128}
        />
        <p className="text-center text-white font-bold mt-3">{user.username}</p>
     

      <section className="mt-8 md:mt-8">
        <Edits
          images={images?.data}
          totalPages={images?.totalPages}
          page={page}
          collectionHeading="Magical transformations done by you"
        />
      </section>
    </div>
  );
};

export default Dashboard;
