"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const Home = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlayed, setIsPlayed] = useState(false);

  // This effect should run only once to set up listeners
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Initial style setup
      video.style.opacity = '0';
      video.style.transition = 'opacity 0.3s ease-in-out';

      const handlePlay = () => {
        video.style.opacity = '1';
        setIsPlayed(true);
      };

      const handleEnded = () => {
        video.style.opacity = '0';
        setIsPlayed(false);
      };

      const handleTimeUpdate = () => {
        if (video.duration - video.currentTime <= 0.3) {
          video.style.opacity = '0';
        }
      };
      
      // Add event listeners
      video.addEventListener('play', handlePlay);
      video.addEventListener('ended', handleEnded);
      video.addEventListener('timeupdate', handleTimeUpdate);

      // Cleanup function to remove listeners
      return () => {
        video.removeEventListener('play', handlePlay);
        video.removeEventListener('ended', handleEnded);
        video.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, []); // Empty dependency array ensures this runs only once

  const playVideo = () => {
    videoRef.current?.play();
  };

  return (
    <div className="text-white min-vh-100">
      {/* Hero Section */}
      <section className="d-flex align-items-center justify-content-center vh-100 text-center text-white hero-background" id="home">
        <div>
          <h1 className="display-1 fw-bold gradient-text">アメショのユキのアトリエ</h1>
          <p className="lead my-4 text-black fw-bold">
            思わず見てしまうような魅せる絵画のようなAIアートや各種ファンアートを発信<br />
            ゴスロリガール、フラメンコガール、痛車、etc....
          </p>
          <a href="#projects" className="btn btn-primary btn-lg mt-4">作品を見る</a>
        </div>
      </section>

      {/* About Me Section */}
      <section className="py-5 text-white about-background" id="about">
        <div className="container">
          <h2 className="text-center mb-4 display-4 gradient-text">About Me</h2>
          <div className="row justify-content-center">
            <div className="col-md-8 text-center">
              <p className="lead text-black fw-bold">
                こんにちは、アメショのユキです。美しく魅せるAIアートを目指し、日々技術を磨いています。
                TMAやCNPのファンアートを通じて、コミュニティーの皆さんに楽しんでもらえる作品を目指しています。
              </p>
              <p className="text-black fw-bold">
                TMA幹部クロエとして、X（Twitter）Spacesで公式ラジオ「Today&apos;s TMA Radio」の火曜ホストを務め、 Stand.fmでは250回以上のエピソードを毎日配信するポッドキャスト「クロエのおしゃべり場」を運営しています。
                NFTコレクター（TOL-Pass & CNPホルダー）でもあります。
              </p>
              <div className="row justify-content-center align-items-start mt-4">
                <div className="col-md-6 d-flex flex-column align-items-center">
                  <strong className="fs-5 text-black mb-2">OpenSea:</strong>
                  <a href="https://opensea.io/collection/bailarina-5" target="_blank" rel="noopener noreferrer" className="text-black fw-bold">
                    <Image src="/artworks/work-5.png" alt="OpenSea Collection" width={300} height={300} className="img-fluid mb-3" style={{ maxHeight: '300px', objectFit: 'contain' }} />
                  </a>
                </div>
                <div className="col-md-6 d-flex flex-column align-items-center">
                  <strong className="fs-5 text-black mb-2">Stand.fm:</strong>
                  <a href="https://stand.fm/episodes" target="_blank" rel="noopener noreferrer" className="text-black fw-bold">
                    <Image src="/artworks/work-4.png" alt="Stand.fm Episodes" width={300} height={300} className="img-fluid mb-3" style={{ maxHeight: '300px', objectFit: 'contain' }} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-5 text-white" id="projects">
        <div className="container">
          <h2 className="text-center mb-5 display-4 gradient-text">作品紹介</h2>
          <div className="row justify-content-center mb-4">
            <div className="col-md-4 text-center mb-3" style={{ height: '300px', position: 'relative' }}>
              <Image src="/artworks/work-11.png" alt="AI Art 1" fill style={{ objectFit: 'contain' }} />
            </div>
            <div className="col-md-4 text-center mb-3" style={{ height: '300px', position: 'relative' }}>
              <Image src="/artworks/work-2.png" alt="AI Art 2" fill style={{ objectFit: 'contain' }} />
            </div>
            <div className="col-md-4 text-center mb-3" style={{ height: '300px', position: 'relative' }}>
              <Image src="/artworks/work-3.png" alt="AI Art 3" fill style={{ objectFit: 'contain' }} />
            </div>
          </div>
          <div className="row justify-content-center">
            {/* Single Video */}
            <div className="col-md-8 text-center" style={{ backgroundColor: 'black', position: 'relative' }}>
              {!isPlayed && (
                <button className="play-button" onClick={playVideo}>▶</button>
              )}
              <video
                ref={el => { videoRef.current = el; }}
                controls={isPlayed} // Show controls only after play
                className="img-fluid mx-auto d-block"
                style={{ maxHeight: '500px', objectFit: 'contain' }}
                playsInline // Good practice for mobile
                preload="metadata" // Helps get duration faster
              >
                <source src="/artworks/work-video3.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <footer className="py-5 text-white" id="contact">
        <div className="container text-center">
          <h2 className="mb-4 display-4 gradient-text">お問い合わせ</h2>
          <p className="lead text-black fw-bold">新しい機会やコラボレーションを常に歓迎しています。お気軽にご連絡ください！</p>
          <div className="mt-3">
            <a href="https://x.com/kuroneko0618" className="text-black mx-2 fw-bold" target="_blank" rel="noopener noreferrer"><i className="bi bi-twitter"></i> X (Twitter)</a>
            <a href="https://www.instagram.com/ameshonoyuki/?hl=ja" className="text-black mx-2 fw-bold" target="_blank" rel="noopener noreferrer"><i className="bi bi-instagram"></i> Instagram</a>
            <a href="https://www.threads.com/@ameshonoyuki" className="text-black mx-2 fw-bold" target="_blank" rel="noopener noreferrer"><i className="bi bi-threads"></i> Threads</a>
          </div>
          <p className="mt-4 text-black fw-bold">&copy; {new Date().getFullYear()} アメショのユキ. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
