import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Header from "@/components/shared/Header";
import TransformationForm from "@/components/shared/TransformationForm";
import { transformationTypes } from "@/constants";
import { findUserById } from "@/lib/actions/user.action";
import { findImageById } from "@/lib/actions/image.actions";
import { TransformationTypeKey, SearchParamProps } from "@/lib/definitions";

const Page = async ({ params: { id } }: SearchParamProps) => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const user = await findUserById(userId);
  const image = await findImageById(id);

  const transformation =
    transformationTypes[image.transformationType as TransformationTypeKey];

  return (
    <>
      <Header title={transformation.title} subtitle={transformation.subTitle} />

      <section className="mt-10">
        <TransformationForm
          action="Update"
          userId={user._id}
          type={image.transformationType as TransformationTypeKey}

          config={image.config}
          data={image}
        />
      </section>
    </>
  );
};

export default Page;
