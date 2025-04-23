import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Project = {
  id: number;
  name: string;
  details: string;
  image: string;
};

const projects: Project[] = [
  {
    id: 1,
    name: "KB Prasac Merchant",
    details: "ui/ui design, interaction research",
    image: "/images/kb-prasac.png",
  },
  {
    id: 2,
    name: "Chip Mong Bank",
    details: "Introducing the super app for the merchant",
    image: "/images/chipmong.png",
  },
  {
    id: 3,
    name: "AEON Mall Plus",
    details: "Introducing the super app for the merchant",
    image: "/images/aeon-mall.png",
  },
  {
    id: 4,
    name: "SAN SOENG Portfolio",
    details: "Creative Direction, Live Action, Animation",
    image: "/images/portfolio.png",
  },
];

export default function FeaturedProjects() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mediaItems = gsap.utils.toArray<HTMLElement>(".media-item");
    const titleItems = gsap.utils.toArray<HTMLElement>(".title-item");
    const detailItems = gsap.utils.toArray<HTMLElement>(".detail-item");

    gsap.set(mediaItems, { yPercent: 100 });
    gsap.set(mediaItems[0], { yPercent: 0 });
    gsap.set(titleItems, { opacity: 0 });
    gsap.set(titleItems[0], { opacity: 1 });
    gsap.set(detailItems, { opacity: 0, yPercent: 100 });
    gsap.set(detailItems[0], { opacity: 1, yPercent: 0 });

    let allowScroll = true;
    let currentIndex = 0;
    let savedScrollValue: number;

    const intentObserver = ScrollTrigger.observe({
      target: wrapperRef.current,
      type: "wheel,touch",
      tolerance: 10,
      preventDefault: true,
      onUp: () => allowScroll && gotoPanel(currentIndex - 1, false),
      onDown: () => allowScroll && gotoPanel(currentIndex + 1, true),
    });
    intentObserver.disable();

    const preventScroll = ScrollTrigger.observe({
      preventDefault: true,
      type: "wheel,scroll",
      allowClicks: true,
      onEnable: (self) => (savedScrollValue = self.scrollY()),
      onChangeY: (self) => {
        if (!allowScroll) {
          self.scrollY(savedScrollValue);
        }
      },
    });
    preventScroll.disable();

    function gotoPanel(index: number, isScrollingDown: boolean) {
      // When reaching boundaries, disable the observers so normal scroll can resume
      if ((index === projects.length && isScrollingDown) || (index === -1 && !isScrollingDown)) {
        intentObserver.disable();
        preventScroll.disable();
        preventScroll.scrollY(preventScroll.scrollY() + (index === projects.length ? 1 : -1));
        allowScroll = true;
        return;
      }
      allowScroll = false;

      const tl = gsap.timeline({
        defaults: { duration: .9, ease: "expo.inOut" },
        onComplete: () => {
          // After animation is complete, allow scrolling again
          allowScroll = true;
          currentIndex = index; // Update index after animation to avoid overlapping
        }
      });

      const direction = isScrollingDown ? -1 : 1;

      // Scroll transitions
      tl.to(mediaItems[currentIndex], { yPercent: 100 * direction, scale: 1.4 })
        .to(mediaItems[index], { yPercent: 0, scale: 1 }, "<")
        .fromTo(titleItems[currentIndex], { opacity: 1 }, { opacity: 0 }, "<")
        .fromTo(titleItems[index], { opacity: 0 }, { opacity: 1 }, "<")
        .to(detailItems[currentIndex], { opacity: 0, yPercent: 100, delay: .2 }, "<")
        .fromTo(detailItems[index], { opacity: 0, yPercent: 100 }, { opacity: 1, yPercent: 0, delay: .4, ease: "slow(0.7,0.7,false)" }, "<");
    }

    ScrollTrigger.create({
      trigger: wrapperRef.current,
      pin: true,
      anticipatePin: 1,
      pinSpacing: false,
      pinType: wrapperRef.current?.style?.transform ? "transform" : "fixed",
      start: "top top",
      end: `bottom bottom`,
      onEnter: (self) => {
        if (!preventScroll.isEnabled) {
          self.scroll(self.start);
          intentObserver.enable();
          preventScroll.enable();
          gotoPanel(currentIndex + 1, true);
        }
      },
      onEnterBack: (self) => {
        if (!preventScroll.isEnabled) {
          self.scroll(self.start);
          intentObserver.enable();
          preventScroll.enable();
          gotoPanel(currentIndex - 1, false);
        }
      }
    });
  });

  return (
    <section className="relative w-full overflow-hidden">
      {/* 🔥 Heading (Stays Static) */}
      <div className="w-full text-center py-10">
        <h1 className="text-[20vw] font-medium -tracking-widest leading-[100%]">works</h1>
        {/* <svg overflow="visible" width="100%" height="100%" viewBox="0 0 1862 508" fill="none" xmlns="http://www.w3.org/2000/svg"> <path stroke-linejoin="miter" fill="var(--token-3271e3ec-9cc1-487e-ba86-c404df0f2322, rgb(24, 24, 24))" d="M183.226 498H98.0181L0.23877 9.10303H65.8906L143.416 398.824L245.386 9.10303H327.8L429.77 398.824L506.596 9.10303H572.946L475.167 498H389.959L286.593 103.39L183.226 498Z"></path> <path stroke-linejoin="miter" fill="var(--token-3271e3ec-9cc1-487e-ba86-c404df0f2322, rgb(24, 24, 24))" d="M675.455 141.804C667.54 159.032 661.952 178.122 658.693 199.075L641.232 308.029C637.973 328.05 637.74 347.141 640.534 365.3C644.259 394.168 656.132 415.353 676.154 428.856C696.641 442.359 720.853 449.111 748.79 449.111C771.139 449.111 790.928 445.851 808.156 439.333C825.849 432.348 840.982 422.803 853.553 410.697C866.591 398.126 877.067 383.226 884.982 365.998C892.898 348.77 898.485 329.447 901.745 308.029L919.205 199.075C925.724 156.704 920.602 122.714 903.84 97.1049C886.146 71.0304 855.183 57.9931 810.949 57.9931C789.531 57.9931 770.208 61.4852 752.98 68.4695C735.753 74.9881 720.62 84.5333 707.583 97.1049C694.545 109.676 683.836 124.576 675.455 141.804ZM576.977 386.252C572.787 361.109 573.02 334.103 577.676 305.235L593.74 201.868C598.396 172.069 606.777 144.831 618.883 120.153C630.989 95.4752 646.587 74.2897 665.677 56.5963C685.233 38.4373 707.816 24.4688 733.424 14.6908C759.033 4.9129 787.902 0.0239258 820.029 0.0239258C840.051 0.0239258 859.141 2.35202 877.3 7.0082C895.459 11.1987 911.755 17.9502 926.189 27.2625C940.624 36.5748 952.73 48.9136 962.508 64.2789C972.751 79.1786 979.968 97.5705 984.159 119.454C986.021 131.56 986.719 144.598 986.254 158.566C986.254 172.535 985.09 186.969 982.762 201.868L966.698 305.235C962.042 335.035 953.428 362.273 940.856 386.951C928.75 411.628 912.919 433.047 893.363 451.206C874.273 468.899 851.691 482.635 825.616 492.413C800.008 502.191 771.372 507.08 739.71 507.08C719.689 507.08 700.598 504.752 682.439 500.095C664.746 495.439 648.682 488.222 634.248 478.444C619.814 468.666 607.475 456.328 597.232 441.428C587.454 426.063 580.702 407.671 576.977 386.252Z"></path> <path stroke-linejoin="miter" fill="var(--token-3271e3ec-9cc1-487e-ba86-c404df0f2322, rgb(24, 24, 24))" d="M1102.26 237.488H1233.56C1263.82 237.488 1288.27 230.969 1306.89 217.932C1325.98 204.429 1335.53 182.545 1335.53 152.28C1335.53 122.015 1325.98 100.364 1306.89 87.3265C1288.27 73.8237 1263.82 67.0722 1233.56 67.0722H1102.26V237.488ZM1323.66 498L1211.21 296.155H1102.26V498H1038V9.10303H1237.75C1259.63 9.10303 1280.35 12.3623 1299.91 18.881C1319.93 24.934 1337.16 34.0135 1351.59 46.1195C1366.49 58.2255 1378.13 73.1252 1386.51 90.8187C1395.36 108.512 1399.78 128.999 1399.78 152.28C1399.78 190.46 1388.61 221.657 1366.26 245.869C1343.91 269.615 1314.81 284.98 1278.96 291.965L1395.59 498H1323.66Z"></path> <path stroke-linejoin="miter" fill="var(--token-3271e3ec-9cc1-487e-ba86-c404df0f2322, rgb(24, 24, 24))" d="M1769.48 9.10303H1861.67L1639.57 210.249L1849.8 498H1770.88L1593.48 252.853L1515.26 324.092V498H1451V9.10303H1515.26V242.377L1769.48 9.10303Z"></path> </svg> */}
      </div>

      {/* 🔥 Wrapper (This will be pinned when scrolled into view) */}
      <div ref={wrapperRef} className="relative h-screen w-full overflow-hidden">
        <div className="media-container flex flex-col justify-start absolute left-0 top-0 w-full h-full">
          {projects.map((project) => (
            <div key={project.id} className="media-item absolute w-full h-screen left-0 top-0 overflow-hidden">
              <Image className="w-full h-full object-cover" fill src={project.image} alt={project.name} />
            </div>
          ))}
        </div>

        <div className="title-container absolute bottom-0 left-0 w-full bg-background min-h-[30vh] z-1">
          {projects.map((project) => (
            <div key={project.id} className="title-item left-0 top-0 absolute py-8 px-8">
              <h2 className="text-8xl font-medium">{project.name}</h2>
            </div>
          ))}
        </div>

        <div className="absolute bottom-0 left-0 w-full z-2">
          {projects.map((project) => (
            <p key={project.id} className="detail-item text-[#a8a8a8] left-0 bottom-0 absolute px-8 pb-4 text-xl">
              {project.details}
            </p>
          ))}
        </div>

        <div className="absolute bottom-0 left-0 w-full text-center z-2 pb-4 text-xl">
          <span>View project</span>
        </div>
      </div>
    </section>

  );
}
