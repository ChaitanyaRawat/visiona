import { Collection } from "@/components/shared/Collection"
import { navLinks } from "@/constants"
import { getAllPublicImages } from "@/lib/actions/image.actions"
import { SignedOut } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"

const Home = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const searchQuery = (searchParams?.query as string) || '';

  const images = await getAllPublicImages({ page, searchQuery })
  // console.log("query = ",searchQuery)
  // console.log(images?.data)

  return (
    <>
      {/* <section className="home">
        <h1 className="home-heading">
          Unleash Your Creative Vision with visiona
        </h1>
        <ul className="flex-center w-full gap-20">
          {navLinks.slice(1, 5).map((link) => (
            <Link
              key={link.route}
              href={link.route}
              className="flex-center flex-col gap-2"
            >
              <li className="flex-center w-fit rounded-full bg-white p-4">
                <Image src={link.icon} alt="image" width={24} height={24} />
              </li>
              <p className="p-14-medium text-center text-white">{link.label}</p>
            </Link>
          ))}
        </ul>
      </section>

      <section className="sm:mt-12">
        <Collection
          hasSearch={true}
          images={images?.data}
          totalPages={images?.totalPage}
          page={page}
        />
      </section> */}
      <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 h-screen text-white overflow-hidden">
        <div className="absolute inset-0">
          <img src="hero.gif" alt="Background Image" className="object-cover object-center w-full h-full" />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center">
          <h1 className="text-5xl font-bold leading-tight mb-4">Welcome to Visiona</h1>
          <p className="text-lg text-gray-300 mb-8">A Very Powerfull AI Powered Image processing platform</p>
          <Link href={"/sign-up"}>
            <button className="relative my-1 inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-white rounded-lg border-2 border-cyan-400 hover:bg-cyan-500 scale-transition-on-hover-110">
              <span className="relative px-5 py-2.5 bg-opacity-0 font-bold">
                Get Started
              </span>
            </button>
          </Link>
          <Link href={"/read-more"}>
            <button className="relative my-1 inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-white rounded-lg border-2 border-cyan-400 hover:bg-cyan-500 scale-transition-on-hover-110">
              <span className="relative px-5 py-2.5 bg-opacity-0 font-bold">
                Read More
              </span>
            </button>
          </Link>
        </div>

      </div >
      <div className="bg-black p-4">
        <Collection
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
