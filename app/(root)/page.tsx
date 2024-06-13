import { Edits } from "@/components/shared/Edits"
import { findAllPublicImages } from "@/lib/actions/image.actions"
import Link from "next/link"
import { SearchParamProps } from "@/lib/definitions"
import Image from "next/image"

const Home = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const searchQuery = (searchParams?.query as string) || '';

  const images = await findAllPublicImages({ page, searchQuery })

  return (
    <>

      <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 h-screen text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/hero.gif" height={100} width={100} alt="Background Image" className="object-cover object-center w-full h-full " />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center">
          <h1 className="text-5xl font-bold leading-tight mb-4">Welcome to <span className="text-cyan-400">Visiona</span></h1>
          <p className="text-lg text-gray-300 mb-8 font-bold">An Amazing AI Powered Image processing platform</p>
          <Link href={"/sign-up"}>
            <button className=" my-1 inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-white rounded-xl border-2 border-cyan-400 hover:bg-cyan-500 scale-transition-on-hover-110">
              <span className=" px-5 py-2.5 bg-opacity-0 font-bold">
                Get Started
              </span>
            </button>
          </Link>
          <Link href={"/read-more"}>
            <button className=" my-1 inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-white rounded-xl border-2 border-cyan-400 hover:bg-cyan-500 scale-transition-on-hover-110">
              <span className=" px-5 py-2.5 bg-opacity-0 font-bold">
                Read More
              </span>
            </button>
          </Link>
          <Link href={"/contact"}>
            <button className=" my-1 inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-white rounded-xl border-2 border-cyan-400 hover:bg-cyan-500 scale-transition-on-hover-110">
              <span className=" px-5 py-2.5 bg-opacity-0 font-bold">
                Contact Us
              </span>
            </button>
          </Link>
        </div>

      </div >
      <div className="bg-black p-4">
        <Edits
          hasSearch={true}
          images={images?.data}
          totalPages={images?.totalPage}
          page={page}

        />
      </div>
    </>
  )
}

export default Home
