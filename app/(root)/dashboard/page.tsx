import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Edits } from "@/components/shared/Edits";
import Header from "@/components/shared/Header";
import { findUserImages } from "@/lib/actions/image.actions";
import { findUserById } from "@/lib/actions/user.action";
import { SearchParamProps } from "@/lib/definitions";

const Dashboard = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const user = await findUserById(userId);
  const images = await findUserImages({ page, userId: user._id });

  return (
    <div className="bg-black p-20">
      <Header title="Dashboard" />

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
