import { notFound } from 'next/navigation'
import { projects } from '@/app/data/projects'

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
const { slug } = await params
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    notFound()
  }

  return (
    <>
      <img className="w-screen h-screen object-cover" src={project.featureImage} alt={project.name} />

      <div className="container mx-auto px-8">
              {/* Introduction */}
        <div className="grid grid-cols-2 gap-y-9 mt-14">
          <div className="col-start-2">
            <p className="text-xl opacity-40 mb-1 font-medium">{project.name}</p>
            <h1 className="text-6xl -tracking-wider">Introducing the app for <br /> business owner.</h1>
          </div>
          <div className="text-xl">
            <p>UX/UI Design</p>
            <p>interaction</p>
            <p>UX Research</p>
            <br />
            <p>2022</p>
            <p>KB PRASAC Bank Plc.</p>
            <br />
            <p>Design Team:</p>
            <p>Kolza Tin (Head of Design)</p>
            <p>Soeng San (Team Lead)</p>
            <p>Sophaldevid Kong (UX/UI Designer)</p>
          </div>
          <div className="text-xl pr-[45%]">
            <p>The super app for merchants, tailored for point-of-sale transactions. It integrates KHQR payment acceptance for single or multiple businesses, streamlining transactions and monitoring sales performance for Cambodian business owners.</p>
            <br />
            <p>The goals of the project were the following:</p>
            <br />
            <p>- How can we create an experience that allows owner and staffs to feel confidents, and certain in their actions and decisions for their business with the application?</p>
            <br />
            <p>- Create an intuitive and modern app that simplifies business management in one places.</p>
          </div>
        </div>

        <div className="my-32">
          <img className="w-full h-auto object-contain" src="/images/project-timeline.svg" alt="project-timeline" />
        </div>

        <div className="flex flex-col text-6xl -tracking-wider my-32">
          <p className='self-end'>the challenge is to understand the perspectives</p>
          <p>of both owners and staff in order to design products that are
easy for them to understand and use.</p>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="w-full">
            <img className="w-full h-auto object-contain" src="/images/lady-smile.svg" alt="lady-smile" />
          </div>
          
          <div className="text-3xl pr-[45%]">
            <p>
              the primary of this project is to design a seamless solution for business owners that combines digital payments, staff connectivity, and real-time sales performance tracking. 
            </p>
            <br />
            <p>this solution should cater to the needs of both owners and staff, improving efficiency, communication, and decision-making with streamlined operations and data-driven insights.</p>
          </div>
        </div>
      </div>


    </>
  )
}
