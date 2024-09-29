"use client"

import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from 'next/link'
import Image from 'next/image'
import { YoutubeIcon, CoffeeIcon, BrainIcon, RocketIcon, HeartIcon } from 'lucide-react'

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

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FFFDF6] text-black">
      <header className="bg-black text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">About <GoldText>SV Worldz</GoldText></h1>
          <p className="text-xl">Unraveling Business Mysteries with a Twist of Humor</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our <GoldText>Slightly Serious</GoldText> Mission</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg mb-4">
                At SV Worldz, we're on a mission to demystify the business world, one YouTube video at a time. We're like the Sherlock Holmes of the corporate world, but with better hair and a much cooler magnifying glass (it's actually a 4K camera).
              </p>
              <p className="text-lg mb-4">
                Our goal? To make business case studies so entertaining that you'll forget you're actually learning something. It's like sneaking vegetables into a kid's meal, but instead of carrots, we're serving up knowledge bombs.
              </p>
            </div>
            <FloatingElement>
              <Card className="bg-black text-white">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-4">SV Worldz by Numbers</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <YoutubeIcon className="mr-2 text-red-500" /> 774k+ Subscribers
                    </li>
                    <li className="flex items-center">
                      <CoffeeIcon className="mr-2 text-brown-500" /> 1,000+ Cups of Coffee Consumed
                    </li>
                    <li className="flex items-center">
                      <BrainIcon className="mr-2 text-pink-500" /> 50+ Business Mysteries Solved
                    </li>
                    <li className="flex items-center">
                      <RocketIcon className="mr-2 text-blue-500" /> 100+ Companies Analyzed
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </FloatingElement>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Meet the <GoldText>Mastermind</GoldText></h2>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <Image
              src="/creator-image.jpg"
              alt="Sai Vardhan - The Business Whisperer"
              width={300}
              height={300}
              className="rounded-full shadow-lg"
            />
            <div>
              <h3 className="text-2xl font-bold mb-2">Sai Vardhan - The Business Whisperer</h3>
              <p className="text-lg mb-4">
                Legend has it that Sai Vardhan can smell a failing business model from miles away. Some say he was born with a silver PowerPoint clicker in his hand. Others claim he learned to read balance sheets before bedtime stories.
              </p>
              <p className="text-lg mb-4">
                What we know for sure is that Sai has an uncanny ability to turn complex business concepts into bite-sized, easily digestible content. It's like he's got a PhD in Corporate Simplification (if that were a real thing).
              </p>
              <Button variant="outline" className="border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white">
                <HeartIcon className="mr-2" /> Follow Sai's Business Adventures
              </Button>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our <GoldText>Not-So-Secret</GoldText> Sauce</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">1. Thorough Research</h3>
                <p>We dig deeper than a mole on espresso. Our fact-checking is so intense, even our fact-checkers have fact-checkers.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">2. Engaging Storytelling</h3>
                <p>We turn dry business cases into edge-of-your-seat thrillers. Move over, Hollywood!</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">3. Sprinkle of Humor</h3>
                <p>We believe laughter is the best medicine... unless you're actually sick. Then please see a doctor.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Why <GoldText>Choose Us</GoldText>?</h2>
          <div className="text-center">
            <p className="text-lg mb-4">
              Because where else can you learn about corporate strategies while simultaneously improving your dad-joke game?
            </p>
            <p className="text-lg mb-8">
              We're like the cool economics teacher you wish you had in high school, but with better production value and fewer pop quizzes.
            </p>
            <FloatingElement>
              <Button className="text-lg px-8 py-4 bg-black text-white hover:bg-yellow-600 transition-colors">
                <YoutubeIcon className="mr-2" /> Subscribe