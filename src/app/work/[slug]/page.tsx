'use client'

import { notFound, useParams, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { projects } from '@/app/data/projects'
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Page() {
  const { slug } = useParams()
  const router = useRouter()
  const [project] = useState(() => projects.find((p) => p.slug === slug))

  useEffect(() => {
    if (!project) {
      notFound();
    }
  }, [project, router])

  if (!project) return null;

  // Root ref for GSAP context
  const rootRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const root = rootRef.current;
    if (!root) return;

    // Banner parallax
    const banner = root.querySelector('.banner-image') as HTMLElement;
    if (banner) {
      const getRatio = () => window.innerHeight / (window.innerHeight + banner.offsetHeight);
      gsap.fromTo(
        banner,
        { backgroundPosition: '50% 0px' },
        {
          backgroundPosition: `50% ${window.innerHeight * (1 - getRatio())}px`,
          ease: 'none',
          scrollTrigger: {
            trigger: banner,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );
    }

    // Grouped intro reveal
    const introContainer = root.querySelector('.intro-container') as HTMLElement;
    if (introContainer) {
      const heading = introContainer.querySelector('.intro-heading') as HTMLElement;
      const metaItems = Array.from(introContainer.querySelectorAll('.intro-meta p'));
      const descItems = Array.from(introContainer.querySelectorAll('.intro-description p'));

      gsap.timeline({
        scrollTrigger: {
          trigger: introContainer,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })
        .from(heading, { opacity: 0, y: 50, duration: 1 })
        .from(metaItems, { opacity: 0, x: -30, duration: 0.6, stagger: 0.1 }, '<')
        .from(descItems, { opacity: 0, y: 20, duration: 0.5, stagger: 0.15 }, '<');
    }

    // Timeline image scale-in
    const timelineImg = root.querySelector('.timeline-image') as HTMLElement;
    if (timelineImg) {
      gsap.from(timelineImg, {
        opacity: 0,
        scale: 0.8,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: timelineImg,
          start: 'top 80%',
        },
      });
    }

    // Highlight text word reveal
    const challengeEl = root.querySelector('#highlight-word') as HTMLElement;
    if (challengeEl) {
      const words = gsap.utils.toArray<HTMLElement>('#highlight-word .word');
      gsap.set(words, { color: '#d1d5db' });

      ScrollTrigger.create({
        trigger: challengeEl,
        start: 'top 80%',
        end: 'bottom 40%',
        scrub: true,
        onUpdate: (self) => {
          const total = words.length;
          const visible = Math.floor(self.progress * total);
          words.forEach((word, i) => {
            gsap.to(word, {
              color: i <= visible ? '#000' : '#d1d5db',
              duration: 0.3,
              ease: 'power2.out',
            });
          });
        },
      });
    }

    // Section image/text fade-in
    const sectionImg = root.querySelector('.section-image') as HTMLElement;
    if (sectionImg) {
      gsap.from(sectionImg, {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionImg,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }

    const sectionText = root.querySelector('.section-text') as HTMLElement;
    if (sectionText) {
      gsap.from(sectionText, {
        x: 100,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionText,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }

    // Mockup scroll animation
    const mockup1 = root.querySelector('.mockup-img-1') as HTMLElement;
    if (mockup1) {
      gsap.timeline({
        scrollTrigger: {
          trigger: mockup1,
          start: 'top 10%',
          end: 'bottom 30%',
          scrub: true,
        },
      }).fromTo(mockup1, { yPercent: 0 }, { yPercent: 60, ease: 'none' });
    }
  }, { scope: rootRef });

  return (
    <div ref={rootRef}>
      {/* Banner Image */}
      <div
        className="banner-image w-screen h-screen bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${project.featureImage})` }}
      ></div>

      <div className="container mx-auto px-8">
        {/* Intro Section */}
        <div className="intro-container grid grid-cols-2 gap-y-9 mt-14">
          <div className="col-start-2 intro-heading">
            <p className="text-xl opacity-40 mb-1 font-medium">{project.name}</p>
            <h1 className="text-6xl -tracking-wider">
              Introducing the app for <br /> business owner.
            </h1>
          </div>
          <div className="text-xl intro-meta">
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
          <div className="text-xl pr-[45%] intro-description">
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

        {/* Timeline Image */}
        <div className="my-32">
          <img className="timeline-image w-full h-auto object-contain" src="/images/prasac/project-timeline_x2.jpg" alt="project-timeline" />
        </div>

        {/* Highlight Text Progressing */}
        <div id='highlight-word' className="flex flex-col text-6xl -tracking-wider my-32">
          <p className="self-end">
            <span className="word">the</span> <span className="word">challenge</span> <span className="word">is</span>{" "}
            <span className="word">to</span> <span className="word">understand</span> <span className="word">the</span>{" "}
            <span className="word">perspectives</span>
          </p>
          <p>
            <span className="word">of</span> <span className="word">both</span> <span className="word">owners</span> <span className="word">and</span>{" "}
            <span className="word">staff</span> <span className="word">in</span> <span className="word">order</span> <span className="word">to</span>{" "}
            <span className="word">design</span> <span className="word">products</span> <span className="word">that</span> <span className="word">are</span>{" "}
            <span className="word">easy</span> <span className="word">for</span> <span className="word">them</span> <span className="word">to</span>{" "}
            <span className="word">understand</span> <span className="word">and</span> <span className="word">use.</span>
          </p>
        </div>

        {/* Section Image & Text */}
        <div className="grid grid-cols-2 gap-8">
          <div className="section-image w-full">
            <img className="w-full h-auto object-contain" src="/images/prasac/lady-smile_x2.jpg" alt="lady-smile" />
          </div>

          <div className="section-text text-3xl pr-[45%]">
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
        className="w-full h-screen bg-[url('/images/prasac/app-catalog_x2.jpg')] bg-fixed bg-center bg-cover"
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
          src="/images/prasac/app-catalog-long_x2.jpg"
          alt="prasac-app-catalog-long"
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
      <div className="w-full my-32">
        <div className="container mx-auto w-full px-8 flex flex-row justify-center items-start">
          <div className="relative basis-1/2 flex flex-col justify-start items-start mockup-img-1">
            <img className="w-[50%] h-auto object-contain" src="/images/prasac/mockup-1.jpg" />
            <p className="w-[50%] text-lg font-bold pt-4">
              <span>🎨</span> <span className="bg-[#f0e9e4] px-2">Design solves problems, not just aesthetics.</span>
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

      <div className="w-full my-32">
        <div className="container mx-auto w-full px-8 flex flex-row justify-center items-end">
          <div className="relative basis-1/2">
            <img className="w-full h-auto object-contain" src="/images/prasac/mockup-3.jpg" />
          </div>
          <div className="relative basis-1/2 flex flex-col justify-end items-center">
            <p className="w-[50%] text-lg font-bold pb-4 text-right">
              <span>💡</span> <span className="bg-[#f0e9e4] px-2">Make users feel smart, not confused</span>
            </p>
            <img className="w-[50%] h-auto object-contain" src="/images/prasac/mockup-4.jpg" />
          </div>
        </div>
      </div>

      <div className="w-full my-32">
        <img className="w-full h-auto object-contain" src="/images/prasac/mockup-5.jpg" />
      </div>

      <div className="w-full my-32">
        <h1 className="text-[20vw] font-medium -tracking-widest leading-[100%] p-8">
          up next
        </h1>
      </div>
    </div>
  )
}
