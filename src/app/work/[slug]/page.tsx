'use client'

import { notFound, useParams, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { projects } from '@/app/data/projects'
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Page() {
  const { slug } = useParams()
  const router = useRouter()
  const [project, setProject] = useState(() => projects.find((p) => p.slug === slug))

  useEffect(() => {
    if (!project) {
      notFound();
    }
  }, [project, router])

  if (!project) return null

  useEffect(() => {
    const banner = document.querySelector(".banner-image") as HTMLElement;
    if (!banner) return;

    const getRatio = () =>
      window.innerHeight / (window.innerHeight + banner.offsetHeight);

    gsap.fromTo(
      banner,
      {
        backgroundPosition: `50% 0px`,
      },
      {
        backgroundPosition: `50% ${window.innerHeight * (1 - getRatio())}px`,
        ease: "none",
        scrollTrigger: {
          trigger: banner,
          start: "top top",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      }
    );
  }, []);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const mockup1 = wrapperRef.current!.querySelector(".mockup-img-1");
    const mockup2 = wrapperRef.current!.querySelector(".mockup-img-2");

    gsap.timeline({
      scrollTrigger: {
        trigger: mockup1,
        start: "top 70%",
        end: "bottom 30%",
        scrub: true,
      },
    })
      .fromTo(
        mockup1,
        { yPercent: 0 },
        { yPercent: -50, ease: "none" },
        "<"
      )
      // .fromTo(
      //   mockup2,
      //   { yPercent: -20 },
      //   { yPercent: 0, ease: "power2.out" },
      //   "<"
      // );
  }, []);
  

  return (
    <>
      {/* Banner Image */}
      <div
        className="banner-image w-screen h-screen bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${project.featureImage})` }}
      ></div>

      <div className="container mx-auto px-8">
        {/* Introduction */}
        <div className="grid grid-cols-2 gap-y-9 mt-14">
          <div className="col-start-2">
            <p className="text-xl opacity-40 mb-1 font-medium">{project.name}</p>
            <h1 className="text-6xl -tracking-wider">
              Introducing the app for <br /> business owner.
            </h1>
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
            <p>
              The super app for merchants, tailored for point-of-sale transactions. It integrates KHQR payment acceptance
              for single or multiple businesses, streamlining transactions and monitoring sales performance for Cambodian
              business owners.
            </p>
            <br />
            <p>The goals of the project were the following:</p>
            <br />
            <p>
              - How can we create an experience that allows owner and staffs to feel confident and certain in their
              actions and decisions for their business with the application?
            </p>
            <br />
            <p>- Create an intuitive and modern app that simplifies business management in one place.</p>
          </div>
        </div>

        <div className="my-32">
          <img className="w-full h-auto object-contain" src="/images/project-timeline.svg" alt="project-timeline" />
        </div>

        <div className="flex flex-col text-6xl -tracking-wider my-32">
          <p className="self-end">the challenge is to understand the perspectives</p>
          <p>
            of both owners and staff in order to design products that are
            easy for them to understand and use.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="w-full">
            <img className="w-full h-auto object-contain" src="/images/lady-smile.svg" alt="lady-smile" />
          </div>

          <div className="text-3xl pr-[45%]">
            <p>
              the primary of this project is to design a seamless solution for business owners that combines digital
              payments, staff connectivity, and real-time sales performance tracking.
            </p>
            <br />
            <p>
              this solution should cater to the needs of both owners and staff, improving efficiency, communication, and
              decision-making with streamlined operations and data-driven insights.
            </p>
          </div>
        </div>

        <div className="w-full my-32">
          <img className="w-full h-auto object-contain" src="/images/prasac/project-sitemap.jpg" alt="prasac-sitemap" />
        </div>
      </div>

      <div
        className="w-full h-screen bg-[url('/images/prasac/prasac-app-catalog.svg')] bg-fixed bg-center bg-cover"
      ></div>
      <div
        className="flex flex-col justify-center items-center h-[40vh] bg-foreground text-white text-6xl"
      >
        <p>design an application what</p>
        <p>businesses owner truly and driven</p>
        <p>their business needs.</p>
      </div>
      <div className="w-full">
        <img
          className="w-full h-auto object-contain"
          src="/images/prasac/prasac-app-catalog-scroll.svg"
          alt="prasac-app-catalog-scroll"
        />
      </div>

      {/* Key feature */}
      <div className="w-full bg-black text-white">
        <div className="container mx-auto relative min-h-screen w-full flex flex-row px-8 py-[20vh]">
        <div className="relative basis-1/2 flex flex-col justify-start items-start">
          <div className="sticky top-[20vh] text-6xl">
            <h1>designed to<br />keyfeatures</h1>
          </div>
        </div>
        <div className="basis-1/2 grid grid-rows-3 gap-4">
          <div>
            <h3 className="text-4xl pb-4">point-of-sale systems</h3>
            <p className='text-xl'>integrates point-of-sale systems <br /> inventory management, and financial <br /> transactions for centralised business <br /> management.</p>
          </div>
          <div>
            <h3 className="text-4xl pb-4">sale dashboard</h3>
            <p className='text-xl'>monitoring sales across different <br /> business locations, during a period of <br /> times and getting notified of for sales <br /> performance and transactions.</p>
          </div>
          <div>
            <h3 className="text-4xl pb-4">seamless navigation</h3>
            <p className='text-xl'>a streamlines navigation for a <br /> businesses owner to effortlessly switch <br /> between multiple businesses and <br /> efficiently manage staff members' <br /> controls and permissions.</p>
          </div>
        </div>
        </div>
      </div>

      {/* Mockup animated */}
      <div ref={wrapperRef} className="w-full my-32">
        <div className="container mx-auto w-full px-8 flex flex-row justify-center items-end">
          <div className="relative basis-1/2 flex flex-col justify-end items-start mockup-img-1">
            <img className="w-[50%] h-auto object-contain" src="/images/prasac/mockup-1.jpg" />
            <p className="w-[50%] text-lg font-bold pt-4">
              <span>🔔</span> <span className="bg-[#f0e9e4] px-2"> Great details, Attract users </span>
            </p>
          </div>
          <div className="relative basis-1/2">
            <img className="w-full h-auto object-contain" src="/images/prasac/mockup-2.jpg" />
          </div>
        </div>
      </div>

      <div
        className="w-full h-screen mt-32 bg-[url('/images/kb-prasac.png')] bg-fixed bg-center bg-cover"
      ></div>
    </>
  )
}
