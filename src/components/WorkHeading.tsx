// // components/WorkSection.tsx
// import { useRef, useEffect } from 'react';
// import gsap from 'gsap';
// import ScrollTrigger from 'gsap/ScrollTrigger';

// gsap.registerPlugin(ScrollTrigger);

// // Define custom dimensions for each letter based on the reference.
// // Letter widths: W:507, O:463, R:463, K:429 (sums to 1862)
// const letterWidths = [507, 463, 463, 429];
// // Custom final positions for each letter (the inner SVG x shift).
// const letterFinalPositions = [0, -507, -970, -1433];

// const FULL_WIDTH = 1862; // Total width of the full SVG.
// const EXTRA_PADDING = 50;  // Extra padding on each side to avoid clipping.

// export default function WorkHeading() {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const letterRefs = useRef<HTMLDivElement[]>([]);

//   useEffect(() => {
//     if (!containerRef.current) return;

//     const offsetAmount = 200; // How far from final position each letter starts.

//     // Create a timeline that pins the section and scrubs based on scroll.
//     const timeline = gsap.timeline({
//       scrollTrigger: {
//         trigger: containerRef.current,
//         start: 'top top',
//         end: '+=1500', // Adjust to control overall scroll duration.
//         scrub: true,
//         pin: true,
//       },
//     });

//     letterRefs.current.forEach((letter, i) => {
//       // Use the custom final position for this letter.
//       const finalX = letterFinalPositions[i];
//       // For even indices (first & third letters: W & R) start further left; for odd (O & K) start further right.
//       const initialX = i % 2 === 0 ? finalX - offsetAmount : finalX + offsetAmount;
//       gsap.set(letter, { x: initialX });
//       timeline.to(letter, { x: finalX, ease: 'power2.out', duration: 1 }, 0);
//     });

//     return () => {
//       if (timeline.scrollTrigger) timeline.scrollTrigger.kill();
//     };
//   }, []);

//   // Compute cumulative left positions for each letter container.
//   const containerPositions = letterWidths.reduce<number[]>((acc, width, i) => {
//     if (i === 0) {
//       acc.push(0);
//     } else {
//       acc.push(acc[i - 1] + letterWidths[i - 1]);
//     }
//     return acc;
//   }, []);

//   return (
//     <section
//       ref={containerRef}
//       className="relative h-screen overflow-hidden bg-gray-100"
//     >
//       {/* Flex container holding the letter slices.
//           We'll position each slice absolutely so they line up exactly. */}
//       <div className="relative w-full h-full">
//         {letterWidths.map((width, i) => {
//           // The container's left position: cumulative position minus extra padding.
//           const leftPos = containerPositions[i] - EXTRA_PADDING;
//           // The container's width: letter width plus extra padding on both sides.
//           const containerWidth = width + EXTRA_PADDING * 2;
//           return (
//             <div
//               key={i}
//               className="absolute top-0 h-full overflow-hidden"
//               style={{
//                 left: `${leftPos}px`,
//                 width: `${containerWidth}px`,
//               }}
//             >
//               {/* The inner container holds the full SVG and is animated. */}
//               <div
//                 ref={(el) => {
//                   if (el) letterRefs.current[i] = el;
//                 }}
//                 className="absolute top-0 left-0"
//               >
//                 <svg
//                   width={FULL_WIDTH}
//                   height="508"
//                   viewBox="0 0 1862 508"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   {/* Full SVG with all paths for "WORK" */}
//                   <path
//                     strokeLinejoin="miter"
//                     fill="rgb(24,24,24)"
//                     d="M183.226 498H98.0181L0.23877 9.10303H65.8906L143.416 398.824L245.386 9.10303H327.8L429.77 398.824L506.596 9.10303H572.946L475.167 498H389.959L286.593 103.39L183.226 498Z"
//                   />
//                   <path
//                     strokeLinejoin="miter"
//                     fill="rgb(24,24,24)"
//                     d="M675.455 141.804C667.54 159.032 661.952 178.122 658.693 199.075L641.232 308.029C637.973 328.05 637.74 347.141 640.534 365.3C644.259 394.168 656.132 415.353 676.154 428.856C696.641 442.359 720.853 449.111 748.79 449.111C771.139 449.111 790.928 445.851 808.156 439.333C825.849 432.348 840.982 422.803 853.553 410.697C866.591 398.126 877.067 383.226 884.982 365.998C892.898 348.77 898.485 329.447 901.745 308.029L919.205 199.075C925.724 156.704 920.602 122.714 903.84 97.1049C886.146 71.0304 855.183 57.9931 810.949 57.9931C789.531 57.9931 770.208 61.4852 752.98 68.4695C735.753 74.9881 720.62 84.5333 707.583 97.1049C694.545 109.676 683.836 124.576 675.455 141.804ZM576.977 386.252C572.787 361.109 573.02 334.103 577.676 305.235L593.74 201.868C598.396 172.069 606.777 144.831 618.883 120.153C630.989 95.4752 646.587 74.2897 665.677 56.5963C685.233 38.4373 707.816 24.4688 733.424 14.6908C759.033 4.9129 787.902 0.0239258 820.029 0.0239258C840.051 0.0239258 859.141 2.35202 877.3 7.0082C895.459 11.1987 911.755 17.9502 926.189 27.2625C940.624 36.5748 952.73 48.9136 962.508 64.2789C972.751 79.1786 979.968 97.5705 984.159 119.454C986.021 131.56 986.719 144.598 986.254 158.566C986.254 172.535 985.09 186.969 982.762 201.868L966.698 305.235C962.042 335.035 953.428 362.273 940.856 386.951C928.75 411.628 912.919 433.047 893.363 451.206C874.273 468.899 851.691 482.635 825.616 492.413C800.008 502.191 771.372 507.08 739.71 507.08C719.689 507.08 700.598 504.752 682.439 500.095C664.746 495.439 648.682 488.222 634.248 478.444C619.814 468.666 607.475 456.328 597.232 441.428C587.454 426.063 580.702 407.671 576.977 386.252Z"
//                   />
//                   <path
//                     strokeLinejoin="miter"
//                     fill="rgb(24,24,24)"
//                     d="M1102.26 237.488H1233.56C1263.82 237.488 1288.27 230.969 1306.89 217.932C1325.98 204.429 1335.53 182.545 1335.53 152.28C1335.53 122.015 1325.98 100.364 1306.89 87.3265C1288.27 73.8237 1263.82 67.0722 1233.56 67.0722H1102.26V237.488ZM1323.66 498L1211.21 296.155H1102.26V498H1038V9.10303H1237.75C1259.63 9.10303 1280.35 12.3623 1299.91 18.881C1319.93 24.934 1337.16 34.0135 1351.59 46.1195C1366.49 58.2255 1378.13 73.1252 1386.51 90.8187C1395.36 108.512 1399.78 128.999 1399.78 152.28C1399.78 190.46 1388.61 221.657 1366.26 245.869C1343.91 269.615 1314.81 284.98 1278.96 291.965L1395.59 498H1323.66Z"
//                   />
//                   <path
//                     strokeLinejoin="miter"
//                     fill="rgb(24,24,24)"
//                     d="M1769.48 9.10303H1861.67L1639.57 210.249L1849.8 498H1770.88L1593.48 252.853L1515.26 324.092V498H1451V9.10303H1515.26V242.377L1769.48 9.10303Z"
//                   />
//                 </svg>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </section>
//   );
// }
