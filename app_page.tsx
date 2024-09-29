"use client"

import { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring, useAnimation } from 'framer-motion'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { Text, Float, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { YoutubeIcon, InstagramIcon, TwitterIcon, LinkedinIcon, TrendingUpIcon, TrendingDownIcon, AlertTriangleIcon, DollarSignIcon } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const GoldText = ({ children, ...props }) => (
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600" {...props}>
    {children}
  </span>
)

const FloatingElement = ({ children }) => (
  <motion.div
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{
      type: "spring",
      stiffness: 100,
      damping: 10,
      repeat: Infinity,
      repeatType: "reverse",
      duration: 2
    }}
  >
    {children}
  </motion.div>
)

const Scene = () => {
  const videoRef = useRef()
  const [video] = useState(() => {
    const vid = document.createElement("video")
    vid.src = "/sv-worldz-reel.mp4"
    vid.crossOrigin = "Anonymous"
    vid.loop = true
    vid.muted = true
    vid.play()
    return vid
  })

  useEffect(() => {
    videoRef.current = video
  }, [video])

  useFrame(() => {
    if (videoRef.current) {
      videoRef.current.currentTime += 0.01
    }
  })

  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <Text
          font="/fonts/Playfair_Display/PlayfairDisplay-Bold.ttf"
          fontSize={1.5}
          color="#333333"
          anchorX="center"
          anchorY="middle"
          position={[0, 0, -2]}
        >
          SV Worldz
        </Text>
      </Float>
      <mesh position={[0, 0, -5]}>
        <planeGeometry args={[16, 9]} />
        <meshBasicMaterial>
          <videoTexture attach="map" args={[video]} />
        </meshBasicMaterial>
      </mesh>
    </Canvas>
  )
}

const ParallaxSection = ({ children, offset = 50 }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, offset])

  return (
    <motion.div ref={ref} style={{ y }}>
      {children}
    </motion.div>
  )
}

const AnimatedCounter = ({ end, duration = 2 }) => {
  const [count, setCount] = useState(0)
  const controls = useAnimation()

  useEffect(() => {
    controls.start({
      count: end,
      transition: { duration }
    })
  }, [end, controls])

  useEffect(() => {
    controls.onChange((latest) => {
      setCount(Math.floor(latest.count))
    })
  }, [controls])

  return <span>{count.toLocaleString()}</span>
}

const PremiumCTA = ({ children }) => (
  <motion.div
    whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(255,215,0,0.5)" }}
    whileTap={{ scale: 0.95 }}
  >
    {children}
  </motion.div>
)

const VideoCard = ({ id, title, views, duration }) => (
  <motion.div
    className="relative overflow-hidden rounded-lg shadow-lg"
    whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255,215,0,0.3)" }}
  >
    <Image
      src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`}
      alt={title}
      width={640}
      height={360}
      className="w-full h-auto"
    />
    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
      <h3 className="text-white font-bold">{title}</h3>
      <p className="text-sm text-gray-300">{views} views • {duration}</p>
    </div>
  </motion.div>
)

const ScrollingSponsors = () => {
  return (
    <div className="overflow-hidden whitespace-nowrap">
      <motion.div
        className="inline-block"
        animate={{ x: [0, -1920] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        <Image src="/zebralearn-logo.png" alt="ZebraLearn" width={250} height={100} className="inline-block mx-8" />
        <Image src="/man-matters-logo.png" alt="Man Matters" width={250} height={100} className="inline-block mx-8" />
        <Image src="/policybazaar-logo.png" alt="PolicyBazaar" width={250} height={100} className="inline-block mx-8" />
        <Image src="/kukufm-logo.png" alt="KUKU FM" width={250} height={100} className="inline-block mx-8" />
        <Image src="/upstox-logo.png" alt="Upstox" width={250} height={100} className="inline-block mx-8" />
      </motion.div>
      <motion.div
        className="inline-block"
        animate={{ x: [0, -1920] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        <Image src="/zebralearn-logo.png" alt="ZebraLearn" width={250} height={100} className="inline-block mx-8" />
        <Image src="/man-matters-logo.png" alt="Man Matters" width={250} height={100} className="inline-block mx-8" />
        <Image src="/policybazaar-logo.png" alt="PolicyBazaar" width={250} height={100} className="inline-block mx-8" />
        <Image src="/kukufm-logo.png" alt="KUKU FM" width={250} height={100} className="inline-block mx-8" />
        <Image src="/upstox-logo.png" alt="Upstox" width={250} height={100} className="inline-block mx-8" />
      </motion.div>
    </div>
  )
}

const useLiveYouTubeStats = () => {
  const [stats, setStats] = useState({ subscribers: 0, views: 0 })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/youtube-stats')
        const data = await response.json()
        setStats(data)
      } catch (error) {
        console.error('Error fetching YouTube stats:', error)
      }
    }

    fetchStats()
    const interval = setInterval(fetchStats, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  return stats
}

export default function SVWorldzLandingPage() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const { subscribers, views } = useLiveYouTubeStats()

  return (
    <div className="min-h-screen bg-[#FFFDF6] text-black">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 z-50"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="fixed w-full z-40 bg-[#FFFDF6] bg-opacity-90 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            <GoldText>SV Worldz</GoldText>
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link href="#about" className="hover:text-yellow-600 transition-colors">About</Link>
            <Link href="#videos" className="hover:text-yellow-600 transition-colors">Videos</Link>
            <Link href="#creator" className="hover:text-yellow-600 transition-colors">Creator</Link>
            <Link href="#impact" className="hover:text-yellow-600 transition-colors">Impact</Link>
            <Link href="#sponsors" className="hover:text-yellow-600 transition-colors">Sponsors</Link>
            <Link href="/contact" className="hover:text-yellow-600 transition-colors">Contact</Link>
          </div>
          <PremiumCTA>
            <Button className="bg-black text-white hover:bg-yellow-600 transition-colors">
              <YoutubeIcon className="mr-2" /> Subscribe
            </Button>
          </PremiumCTA>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Scene />
        </div>
        <div className="relative z-10 text-center px-4">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Welcome to <GoldText>SV Worldz</GoldText>
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Unraveling Business Mysteries for <GoldText>{subscribers.toLocaleString()}</GoldText> Subscribers
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <PremiumCTA>
              <Button className="text-lg px-8 py-4 bg-black text-white hover:bg-yellow-600 transition-colors">
                Explore Our Content
              </Button>
            </PremiumCTA>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <ParallaxSection>
        <section id="about" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-8 text-center">About <GoldText>SV Worldz</GoldText></h2>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-lg mb-6">
                SV Worldz is your premier destination for unraveling the mysteries of the business world. We deliver top-quality content focused on business case studies, rise & fall stories, and in-depth analyses of corporate scandals and innovations.
              </p>
              <p className="text-lg mb-6">
                Our mission is to educate, inform, and entertain our audience with compelling narratives that shed light on the inner workings of companies, startups, and industries.
              </p>
              <FloatingElement>
                <div className="flex justify-center space-x-4 mt-8">
                  <Button variant="outline" className="border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white">
                    <TrendingUpIcon className="mr-2" /> Rise Stories
                  </Button>
                  <Button variant="outline" className="border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white">
                    <TrendingDownIcon className="mr-2" /> Fall Stories
                  </Button>
                  <Button variant="outline" className="border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white">
                    <AlertTriangleIcon className="mr-2" /> Scandals
                  </Button>
                </div>
              </FloatingElement>
            </div>
          </div>
        </section>
      </ParallaxSection>

      {/* Videos Section */}
      <ParallaxSection offset={-50}>
        <section id="videos" className="py-20 bg-black text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-12 text-center">Featured <GoldText>Videos</GoldText></h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <VideoCard id="rNJWZ7SFhEM" title="The Rise and Fall of WeWork" views="1.2M" duration="15:23" />
              <VideoCard id="0ic47fAqRHs" title="How Theranos Fooled the World" views="2.5M" duration="20:17" />
              <VideoCard id="2kg4LArtymg" title="The Enron Scandal Explained" views="1.8M" duration="18:45" />
              <VideoCard id="wZD1NXvotEk" title="Tesla: The Electric Revolution" views="3.1M" duration="22:09" />
              <VideoCard id="dQw4w9WgXcQ" title="The Dot-Com Bubble Burst" views="1.5M" duration="17:32" />
              <VideoCard id="dQw4w9WgXcQ" title="Amazon's Path to Dominance" views="2.2M" duration="19:56" />
            </div>
          </div>
        </section>
      </ParallaxSection>

      {/* Creator Section */}
      <ParallaxSection>
        <section id="creator" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-12 text-center">About the <GoldText>Creator</GoldText></h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-12">
              <Image
                src="/creator-image.jpg"
                alt="Sai Vardhan - SV Worldz Creator"
                width={400}
                height={400}
                className="rounded-lg shadow-lg"
              />
              <div className="max-w-2xl">
                <h3 className="text-2xl font-bold mb-4">Sai Vardhan - The Best Telugu Creator</h3>
                <p className="text-lg mb-4">
                  With a passion for unraveling complex business narratives, Sai Vardhan, the creator behind SV Worldz, brings years of experience in financial journalism and corporate analysis to the YouTube platform.
                </p>
                <p className="text-lg mb-6">
                  Driven by a mission to make intricate business stories accessible to all, Sai combines meticulous research with engaging storytelling to shed light on the most fascinating chapters of corporate history.
                </p>
                <div className="flex space-x-4">
                  <Button variant="outline" className="border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white">
                    <LinkedinIcon className="mr-2" /> LinkedIn
                  </Button>
                  <Button variant="outline" className="border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white">
                    <TwitterIcon className="mr-2" /> Twitter
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ParallaxSection>

      {/* Impact Section */}
      <ParallaxSection offset={-25}>
        <section id="impact" className="py-20 bg-black text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-12 text-center">Our <GoldText>Impact</GoldText></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="bg-[#FFFDF6] text-black">
                <CardContent className="p-6 text-center">
                  <YoutubeIcon className="w-12 h-12 mx-auto mb-4 text-yellow-600" />
                  <h3 className="text-5xl font-bold text-yellow-600 mb-2">
                    {subscribers.toLocaleString()}
                  </h3>
                  <p className="text-xl">Subscribers</p>
                </CardContent>
              </Card>
              <Card className="bg-[#FFFDF6] text-black">
                <CardContent className="p-6 text-center">
                  <DollarSignIcon className="w-12 h-12 mx-auto mb-4 text-yellow-600" />
                  <h3 className="text-5xl font-bold text-yellow-600 mb-2">
                    {views.toLocaleString()}
                  </h3>
                  <p className="text-xl">Views</p>
                </CardContent>
              </Card>
              <Card className="bg-[#FFFDF6] text-black">
                <CardContent className="p-6 text-center">
                  <TrendingUpIcon className="w-12 h-12 mx-auto mb-4 text-yellow-600" />
                  <h3 className="text-5xl font-bold text-yellow-600 mb-2">
                    <AnimatedCounter end={200} />+
                  </h3>
                  <p className="text-xl">Videos</p>
                </CardContent>
              </Card>
              <Card className="bg-[#FFFDF6] text-black">
                <CardContent className="p-6 text-center">
                  <AlertTriangleIcon className="w-12 h-12 mx-auto mb-4 text-yellow-600" />
                  <h3 className="text-5xl font-bold text-yellow-600 mb-2">
                    <AnimatedCounter end={50} />+
                  </h3>
                  <p className="text-xl">Scandals Exposed</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </ParallaxSection>

      {/* Sponsors Section */}
      <ParallaxSection>
        <section id="sponsors" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-12 text-center">Our <GoldText>Sponsors</GoldText></h2>
            <ScrollingSponsors />
          </div>
        </section>
      </ParallaxSection>

      {/* Contact Button Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8 text-white">Get in <GoldText>Touch</GoldText></h2>
          <p className="text-lg text-gray-300 mb-8">Have questions or want to collaborate? We'd love to hear from you!</p>
          <PremiumCTA>
            <Link href="/contact">
              <Button className="text-lg px-8 py-4 bg-yellow-600 text-black hover:bg-yellow-500 transition-colors">
                Contact Us
              </Button>
            </Link>
          </PremiumCTA>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#FFFDF6] py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link href="/" className="text-2xl font-bold">
                <GoldText>SV Worldz</GoldText>
              </Link>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end gap-4">
              <Link href="/privacy" className="text-gray-600 hover:text-yellow-600 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-gray-600 hover:text-yellow-600 transition-colors">Terms of Service</Link>
              <Link href="/contact" className="text-gray-600 hover:text-yellow-600 transition-colors">Contact Us</Link>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-600">
            © 2024 SV Worldz. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}