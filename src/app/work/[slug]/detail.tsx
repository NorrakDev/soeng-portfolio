'use client'

import { notFound, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { projects } from '@/app/data/projects'
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';
import Footer from '../../../components/layout/Footer';
import HoverSwapTextLink from '../../../components/animations/HoverSwapTextLink';
import { SplitText } from 'gsap/SplitText';
import TextReveal from '../../../components/animations/TextReveal';
import RevealOnScroll from '../../../components/animations/RevealOnScroll';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP, SplitText);
}

export default function WorkDetailPage({ slug }: { slug: string }) {
  const router = useRouter()
  const currentIndex = projects.findIndex((p) => p.slug === slug)
  const [project] = useState(() => projects[currentIndex])
  const nextIndex = currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
  const nextProject = projects[nextIndex];

  useEffect(() => {
    if (!project) {
      notFound();
    }
  }, [project, router])

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
    const textHightLight = root.querySelector('#highlight-word') as HTMLElement;
    if (textHightLight) {
      const textEl = textHightLight.querySelector('.word') as HTMLElement;
      const split = new SplitText(textEl, { type: 'words' });
      const chars = split.words;

      // Set initial style
      gsap.set(chars, {
        y: 20,
        color: '#d1d5db',
      });

      // Scroll-triggered timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: textHightLight,
          start: 'top 80%',
          end: 'bottom 30%',
          scrub: 0.5,
        },
      });

      tl.to(chars, {
        y: 0,
        color: '#000',
        stagger: 0.03,
        ease: 'power2.out',
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

    const parallaxCatalog = root.querySelector('#parallax-catalog') as HTMLElement;
    if (parallaxCatalog) {
      gsap.to(parallaxCatalog, {
        backgroundPositionY: '10%',
        ease: 'none',
        scrollTrigger: {
          trigger: parallaxCatalog,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }

    const designFeatures = root.querySelector('#design-features') as HTMLElement;
    if (designFeatures) {
      gsap.to(designFeatures, {
        ease: 'none',
        scrollTrigger: {
          trigger: designFeatures,
          start: 'top top+=100',
          end: 'bottom top+=200',
          pin: designFeatures,
          pinSpacing: false,
          pinType: 'transform'
        },
      });
    }
  }, { scope: rootRef });

  return (
    <>
      <div ref={rootRef}>
        {/* Banner Image */}
        <div
          className="banner-image w-screen h-screen bg-center bg-cover bg-no-repeat"
          style={{ backgroundImage: `url(${project.featureImage})` }}
        ></div>

        <div className="container mx-auto px-8">
          {/* Intro Section */}
          <div className="intro-container grid grid-cols-2 gap-x-8 gap-y-9 mt-14">
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
          <div id='highlight-word' className="my-32">
            <p className="word text-6xl -tracking-wider flex flex-col">
              <span className="self-end">
                the challenge is to understand the perspectives
              </span>
              <span className="self-start">
                of both owners and staff in order to design products that are easy for them to understand and use.
              </span>
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
        </div>

        <div className="w-full my-32 px-8">
          <img className="w-full h-auto object-contain" src="/images/prasac/project-sitemap.jpg" alt="prasac-sitemap" />
        </div>

        <div
          id='parallax-catalog'
          className="w-full h-screen bg-[url('/images/prasac/app-catalog_x2.jpg')] bg-fixed bg-center bg-cover"
          style={{ backgroundPositionY: '90%' }} // start lower so it has room to move up
        ></div>

        <div
          className="flex flex-col justify-center items-center h-[40vh] bg-foreground"
        >
          <TextReveal triggerOffset='80%'>
            <h2 className="text-white text-6xl text-center max-w-4xl leading-[115%]">
              design an application what businesses owner truly and driven their business needs.
            </h2>
          </TextReveal>
        </div>

        <div className="w-full">
          <img
            className="w-full h-auto object-contain"
            src="/images/prasac/app-catalog-long_x2.jpg"
            alt="prasac-app-catalog-long"
          />
        </div>

        {/* Key feature */}
        <div className="w-full bg-black text-white px-8 py-40">
          <div className="relative container mx-auto w-full flex flex-row gap-8">
            <div id='design-features' className="basis-1/2 flex flex-col justify-start items-start">
              <RevealOnScroll className="sticky top-[20vh] text-6xl">
                <h2>designed to<br />key features</h2>
              </RevealOnScroll>
            </div>
            <div className="basis-1/2 grid grid-rows-3 gap-4">
              <div>
                <RevealOnScroll>
                  <h3 className="text-4xl pb-4">point-of-sale systems</h3>
                </RevealOnScroll>
                <TextReveal>
                  <p className='text-xl'>integrates point-of-sale systems <br /> inventory management, and financial <br /> transactions for centralised business <br /> management.</p>
                </TextReveal>
              </div>
              <div>
                <RevealOnScroll>
                  <h3 className="text-4xl pb-4">sale dashboard</h3>
                </RevealOnScroll>
                <TextReveal>
                  <p className='text-xl'>monitoring sales across different <br /> business locations, during a period of <br /> times and getting notified of for sales <br /> performance and transactions.</p>

                </TextReveal>
              </div>
              <div>
                <RevealOnScroll>
                  <h3 className="text-4xl pb-4">seamless navigation</h3>
                </RevealOnScroll>
                <TextReveal>
                  <p className='text-xl'>a streamlines navigation for a <br /> businesses owner to effortlessly switch <br /> between multiple businesses and <br /> efficiently manage staff members&apos; <br /> controls and permissions.</p>
                </TextReveal>
              </div>
            </div>
          </div>
        </div>

        {/* Mockup animated */}
        <div className="w-full my-32">
          <div className="container mx-auto w-full px-8 flex flex-row justify-center items-end">
            <div className="basis-1/2">
              <img className="w-3/5 h-auto object-contain" src="/images/prasac/mockup-1.jpg" alt="mockup-1" />
            </div>
            <div className="basis-1/2">
              <img className="w-full h-auto object-contain" src="/images/prasac/mockup-2.jpg" alt="mockup-2" />
            </div>
          </div>
        </div>

        <div
          className="w-full h-screen mt-32 bg-[url('/images/kb-prasac.png')] bg-fixed bg-center bg-cover"
        ></div>

        <div className="w-full my-32">
          <div className="container mx-auto w-full px-8 flex flex-row justify-center items-end">
            <div className="relative basis-1/2">
              <img className="w-full h-auto object-contain" src="/images/prasac/mockup-3.jpg" alt="mockup-3" />
            </div>
            <div className="relative basis-1/2 flex flex-col justify-end items-end">
              <img className="w-3/5 h-auto object-contain" src="/images/prasac/mockup-4.jpg" alt="mockup-4" />
            </div>
          </div>
        </div>

        <div className="w-full my-32">
          <img className="w-full h-auto object-contain" src="/images/prasac/mockup-5.jpg" alt="mockup-5" />
        </div>

        <div className="w-full px-8">
          <h1 className="text-[20vw] font-medium -tracking-widest leading-[100%] mb-20">
            up next
          </h1>

          <div
            className="relative h-screen flex items-center justify-center overflow-hidden"
          >
            <div
              className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${nextProject.featureImage})` }}
            ></div>

            <div className="overlay absolute top-0 left-0 w-full h-full bg-foreground z-1 opacity-50" />

            <div className="z-10">
              <HoverSwapTextLink
                text={nextProject.name}
                hoverText="view the project"
                href={`/work/${nextProject.slug}`}
                transitionType="spring"
                textColor="white"
              />
            </div>
          </div>
        </div>

        <section className="flex flex-col justify-center items-center h-[50vh]">
          <HoverSwapTextLink href="/about" text="Get to know me" hoverText="about me"></HoverSwapTextLink>
        </section>
      </div>
      <Footer />
    </>
  )
}