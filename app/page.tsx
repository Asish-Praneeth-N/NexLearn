'use client';

import React, { useState, useEffect } from 'react';
import { Brain, BookOpen, Zap, Star, Menu, X, Play, ArrowRight, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function NexLearnLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: <Brain className="w-8 h-8 text-white" />,
      title: "AI-Powered Content",
      description: "Generate personalized learning materials instantly with our advanced AI technology."
    },
    {
      icon: <BookOpen className="w-8 h-8 text-white" />,
      title: "Interactive Flashcards",
      description: "Master any subject with smart flashcards that adapt to your learning pace."
    },
    {
      icon: <Zap className="w-8 h-8 text-white" />,
      title: "Dynamic Quizzes",
      description: "Challenge yourself with AI-generated quizzes tailored to your skill level."
    }
  ];

  const stats = [
    { number: "50K+", label: "Active Learners" },
    { number: "1M+", label: "Generated Content" },
    { number: "95%", label: "Success Rate" },
    { number: "24/7", label: "AI Support" }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Medical Student",
      content: "NexLearn's AI-generated flashcards helped me ace my anatomy exam. The content is always relevant and perfectly tailored.",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Software Developer",
      content: "The quiz system is incredible. It adapts to my learning style and keeps me engaged throughout my coding journey.",
      rating: 5
    },
    {
      name: "Emma Davis",
      role: "Language Teacher",
      content: "I use NexLearn to create content for my students. The AI understands different learning levels perfectly.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white font-inter">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black backdrop-blur-md z-50 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-neutral-900 rounded-lg flex items-center justify-center">
                <Image
                  src={'/logonexbgrm.png'}
                  alt='logo'
                  width={40}
                  height={40}
                />
              </div>
              {/* Gradient Text */}
              <span className="text-2xl font-serif font-bold bg-gradient-to-r from-white to-neutral-700 bg-clip-text text-transparent">
                NexLearn
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-neutral-300 hover:text-white transition-colors">Features</a>
              <a href="#testimonials" className="text-neutral-300 hover:text-white transition-colors">Reviews</a>
              <Link href={'/dashboard'}>
                <button className="bg-white text-black px-6 py-2 rounded-full hover:bg-neutral-200 transition-all duration-300 shadow-sm">
                  Get Started
                </button>
              </Link>
            </div>

            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black border-t border-neutral-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#features" className="block px-3 py-2 text-neutral-300 hover:text-white">Features</a>
              <a href="#testimonials" className="block px-3 py-2 text-neutral-300 hover:text-white">Reviews</a>
              <Link href={'/dashboard'}>
                <button className="w-full text-left bg-white text-black px-3 py-2 rounded-lg mt-2">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-16 pb-20 px-8 mt-16 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`space-y-8 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 bg-neutral-900 text-neutral-200 px-4 py-2 rounded-full text-sm font-medium">
                  <Sparkles className="w-4 h-4" />
                  <span>AI-Powered Learning Platform</span>
                </div>
                
                <h1 className="text-5xl lg:text-6xl font-serif font-bold leading-tight">
                  <span className="text-white">
                    Master Any Subject
                  </span>
                  <br />
                  <span className="text-neutral-400">with AI-Driven Learning</span>
                </h1>
                
                <p className="text-xl text-neutral-400 leading-relaxed max-w-2xl">
                  Transform your learning experience with personalized quizzes, intelligent flashcards, and AI-generated content that adapts to your unique learning style and pace.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={'/dashboard'}>
                  <button className="group bg-white text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-neutral-200 transition-all duration-300 shadow flex items-center justify-center space-x-2">
                    <span>Start Learning Free</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                
                <Link href={'/dashboard'}>
                  <button className="group border-2 border-neutral-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:border-white transition-all duration-300 flex items-center justify-center space-x-2">
                    <Play className="w-5 h-5" />
                    <span>Watch Demo</span>
                  </button>
                </Link>
              </div>
            </div>

            <div className={`relative ${isVisible ? 'animate-slide-in' : 'opacity-0'}`}>
              <div className="relative bg-neutral-900 rounded-3xl shadow-xl overflow-hidden border border-neutral-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="/brain.jpg" 
                  alt="NexLearn Learning Platform" 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-white mb-4">
              Revolutionize Your Learning Experience
            </h2>
            <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
              Discover how our AI-powered platform adapts to your learning style and accelerates your educational journey.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div key={index} className="bg-neutral-900 p-8 rounded-2xl shadow border border-neutral-800 hover:border-white transition-all duration-300">
                <div className="mb-6 p-3 bg-black rounded-xl w-fit border border-neutral-700">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-neutral-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6">
                <div className="text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-neutral-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-white mb-4">
              Loved by Learners Worldwide
            </h2>
            <p className="text-xl text-neutral-400">
              See what our community has to say about their learning transformation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-neutral-900 p-8 rounded-2xl shadow border border-neutral-800 hover:border-white transition-all duration-300">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-500 text-white" />
                  ))}
                </div>
                <p className="text-neutral-200 mb-6 leading-relaxed">“{testimonial.content}”</p>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center font-bold text-lg">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-neutral-400">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-black" />
                </div>
                <span className="text-2xl font-serif font-bold text-white">
                  NexLearn
                </span>
              </div>
              <p className="text-neutral-400">
                Empowering learners with AI-driven educational tools for a smarter future.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-white">Product</h4>
              <ul className="space-y-2 text-neutral-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">AI Content</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Flashcards</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-white">Company</h4>
              <ul className="space-y-2 text-neutral-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-white">Support</h4>
              <ul className="space-y-2 text-neutral-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-neutral-800 mt-12 pt-8 text-center text-neutral-400">
            <p>&copy; 2025 NexLearn. All rights reserved. Built with AI-powered innovation.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Merriweather:wght@700&display=swap');

        .font-inter { font-family: 'Inter', sans-serif; }
        .font-serif { font-family: 'Merriweather', serif; }

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-in {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        
        .animate-slide-in {
          animation: slide-in 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
