import React, { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import "./index.css";

const SplitTextAnimation = () => {
    // Ref to hold the main SVG element for DOM selection
    const svgRef = useRef(null);
    // Refs to store the GSAP timelines so they can be accessed by handlePointerMove
    const tlRef = useRef(null);
    const tl2Ref = useRef(null);

    // Define the pointer move handler using useCallback
    const handlePointerMove = useCallback((e) => {
        const tl = tlRef.current;
        const tl2 = tl2Ref.current;

        if (!tl || !tl2) return;

        tl.pause();
        tl2.pause();

        gsap.to([tl, tl2], {
            duration: 2,
            ease: "power4",
            progress: e.clientX / window.innerWidth,
        });
    }, []);

    useEffect(() => {
        const svgElement = svgRef.current;
        if (!svgElement) return;

        const leftRight = svgElement.querySelectorAll(".left, .right");
        const texts = svgElement.querySelectorAll("text");

        // 1. Initialize the main timeline (tl)
        const tl = gsap.timeline({
            defaults: { duration: 2, yoyo: true, ease: "power2.inOut" },
        });

        tl.fromTo(
            leftRight,
            {
                // FIX 1: Change 'transformOrigin' to 'svgOrigin' for SVG transforms
                svgOrigin: "640 500",
                skewY: (i) => [-30, 15][i],
                scaleX: (i) => [0.6, 0.85][i],
                x: 200,
            },
            {
                skewY: (i) => [-15, 30][i],
                scaleX: (i) => [0.85, 0.6][i],
                x: -200,
            }
        );

        // FIX 2: Add the play(0.5) call from your original script
        tl.play(0.5);

        // 2. Initialize the second timeline (tl2)
        const tl2 = gsap.timeline();
        texts.forEach((t, i) => {
            tl2.add(
                gsap.fromTo(
                    t,
                    { xPercent: -100, x: 700 },
                    { duration: 1, xPercent: 0, x: 575, ease: "sine.inOut" }
                ),
                (i % 3) * 0.2
            );
        });

        // Store timelines in refs
        tlRef.current = tl;
        tl2Ref.current = tl2;

        // Set up the pointer move listener
        window.addEventListener("pointermove", handlePointerMove);

        // Cleanup function
        return () => {
            window.removeEventListener("pointermove", handlePointerMove);
            tl.kill();
            tl2.kill();
        };
    }, [handlePointerMove]); // Dependency array includes handlePointerMove

    return (
        <div className="animatedSplitTextBrand">
            <svg viewBox="0 0 1280 720" className="split-text" ref={svgRef}>
                <mask id="maskLeft">
                    <rect x="-50%" width="100%" height="100%" fill="#fff" />
                </mask>
                <mask id="maskRight">
                    <rect x="50%" width="100%" height="100%" fill="#fff" />
                </mask>
                <g fontSize="130">
                    <g mask="url(#maskLeft)" fill="#fff" className="left">
                        <text y="120">BRAND</text>
                        <text y="250">MARKETING</text>
                        <text y="380">RƏQƏMSAL MARKETİNG</text>
                    </g>
                    <g mask="url(#maskRight)" fill="#aaa" className="right">
                        <text y="120">BRAND</text>
                        <text y="250">MARKETING</text>
                        <text y="380">RƏQƏMSAL MARKETİNG</text>
                    </g>
                </g>
            </svg>
        </div>
    );
};

export default SplitTextAnimation;