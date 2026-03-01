
import Image from 'next/image';
import portrait from "public/mochalove.gif";
import Head from 'next/head'
import React, { useState } from 'react';
import LazyYoutube from 'components/LazyYoutube.js'
import imgurl1 from "public/couplepics/IMG_0129.jpg";
import imgurl2 from "public/couplepics/IMG_0180.jpg";
import imgurl3 from "public/couplepics/IMG_0325.jpg";
import imgurl4 from "public/couplepics/IMG_0591.jpg";
import imgurl5 from "public/couplepics/IMG_0923.jpg";
import imgurl6 from "public/couplepics/IMG_1658.jpg";
import imgurl7 from "public/couplepics/IMG_1662.jpg";
import imgurl8 from "public/couplepics/IMG_3691.jpg";
import imgurl9 from "public/couplepics/IMG_4203.jpg";
import imgurl10 from "public/couplepics/IMG_4569.jpg";
import imgurl11 from "public/couplepics/IMG_4646.jpg";
import imgurl12 from "public/couplepics/IMG_4900.jpg";
import imgurl13 from "public/couplepics/IMG_6069.jpg";
import imgurl14 from "public/couplepics/IMG_7845.jpg";
import imgurl15 from "public/couplepics/IMG_8113.jpg";
import imgurl16 from "public/couplepics/IMG_8157.jpg";
import imgurl17 from "public/couplepics/IMG_8169.jpg";
import imgurl18 from "public/couplepics/IMG_8361.jpg";
import imgurl19 from "public/couplepics/IMG_8392.jpg";
import imgurl20 from "public/couplepics/IMG_8436.jpg";
import imgurl21 from "public/couplepics/IMG_8804.jpg";
import imgurl22 from "public/couplepics/IMG_9220.jpg";
import imgurl23 from "public/couplepics/valentines.jpg";

export default function Honeybun() {
   
    const images = [
        portrait,
        imgurl1,
        imgurl2,
        imgurl3,
        imgurl4,
        imgurl5,
        imgurl6,
        imgurl7,
        imgurl8,
        imgurl9,
        imgurl10,
        imgurl11,
        imgurl12,
        imgurl13,
        imgurl14,
        imgurl15,
        imgurl16,
        imgurl17,
        imgurl18,
        imgurl19,
        imgurl20,
        imgurl21,
        imgurl22,
        imgurl23,
        // Add more image URLs here
      ];

    const [count, setCount] = useState(0);
    const handleClick = () => {
        setCount(count + 1);
    };

    // Calculate the index of the image based on the counter value
    const imageIndex = count % images.length;

    return (
        <div className="bg-pink-200 min-h-screen w-screen overtflow-auto absolute">
                <Head>
                    <title>Portfolio</title>
                    <meta name="Portfolio" content="trizothethird&apos;s personal website" />
                    <link rel="icon" href="/favicon.ico" />
                    <link rel="preconnect" href="https://fonts.googleapis.com"/>
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
                    <link href="https://fonts.googleapis.com/css2?family=Poetsen+One&display=swap" rel="stylesheet"/>
                </Head>
                <section className="text-center pb-10 pr-10 pl-10 mt-35 mb-5 font-poetsen">
                    <h1 className="mt-12 text-4xl py-2 text-white font-medium md:text-5xl">🍯 Happy 23rd Bithday Darlee!!! 🥐</h1>
                    <div className="object-scale-down flex justify-center items-center mx-auto mt-5 mb-5 w-80 h-[32rem] relative overflow-hidden">
                        <Image src={images[imageIndex]} alt="Picture of the author" />
                    </div>
                    <h2 className="mt-5 text-3xl py-2 text-white font-medium md:text-4xl">Enjoy this collage of us from the past year! I love you lots 💕🥰💗😻❤️‍🔥😘💘</h2>
                    <div className="flex justify-center items-center">
                        <button className="mt-10 px-4 py-2 bg-yellow-600 text-white rounded-md shadow-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2" onClick={handleClick} >Like this 23 times to see your gift! 💝{count}</button>
                    </div>
                    {count === 23 && (
                        <div className="bg-pink-200 p-10 h-fit ">
                            <p className="font-poetsen text-black pb-5">Scroll down and click the video below to see what I made you hehe</p>
                            <LazyYoutube videoId="EwaVWfxqVDw"/>
                        </div>
                    )}
                </section>
        </div>
    );
}
