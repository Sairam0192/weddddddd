"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import Link from 'next/link'
import { YoutubeIcon, InstagramIcon, TwitterIcon, LinkedinIcon } from 'lucide-react'

const GoldText = ({ children, ...props }) => (
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600" {...props}>
    {children}
  </span>
)

export default function ContactPage() {
  const [contactType, setContactType] = useState("personal")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted")
  }

  return (
    <div className="min-h-screen bg-[#FFFDF6] text-black">
      <header className="bg-black text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Contact <GoldText>SV Worldz</GoldText></h1>
          <p className="text-xl">Get in touch with us for inquiries, collaborations, or feedback</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input type="text" id="name" placeholder="Your Name" required />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input type="email" id="email" placeholder="your@email.com" required />
                </div>
              </div>
              <div>
                <Label>Contact Type</Label>
                <RadioGroup value={contactType} onValueChange={setContactType} className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="personal" id="personal" />
                    <Label htmlFor="personal">Personal</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="business" id="business" />
                    <Label htmlFor="business">Business</Label>
                  </div>
                </RadioGroup>
              </div>
              {contactType === "business" && (
                <div>
                  <Label htmlFor="organization">Organization Name</Label>
                  <Input type="text" id="organization" placeholder="Your Organization" />
                </div>
              )}
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input type="text" id="subject" placeholder="Subject of your message" required />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Your Message" rows={6} required />
              </div>
              <Button type="submit" className="w-full bg-black text-white hover:bg-yellow-600 transition-colors">
                Send Message
              </Button>
            </form>
          </motion.div>

          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-4">Connect with Us</h2>
            <div className="flex flex-wrap gap-4">
              <Button variant="outline" className="border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white">
                <YoutubeIcon className="mr-2" /> YouTube
              </Button>
              <Button variant="outline" className="border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white">
                <InstagramIcon className="mr-2" /> Instagram
              </Button>
              <Button variant="outline" className="border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white">
                <TwitterIcon className="mr-2" /> Twitter
              </Button>
              <Button variant="outline" className="border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white">
                <LinkedinIcon className="mr-2" /> LinkedIn
              </Button>
            </div>
          </motion.div>
        </div>
      </main>

      <footer className="bg-black text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link href="/" className="text-2xl font-bold">
                <GoldText>SV Worldz</GoldText>
              </Link>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end gap-4">
              <Link href="/" className="text-gray-300 hover:text-white">Home</Link>
              <Link href="/privacy" className="text-gray-300 hover:text-white">Privacy Policy</Link>
              <Link href="/terms" className="text-gray-300 hover:text-white">Terms of Service</Link>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-400">
            © 2024 SV Worldz. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}