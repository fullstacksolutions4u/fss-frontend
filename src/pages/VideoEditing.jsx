import React, { useState } from 'react';

const VideoEditing = () => {
  const [activeCategory, setActiveCategory] = useState('corporate');

  const videoCategories = {
    corporate: {
      title: 'Corporate Videos',
      description: 'Professional videos that enhance your brand image and communicate your message effectively',
      icon: '🏢',
      types: [
        'Company Overviews',
        'Product Demonstrations',
        'Training Videos',
        'Internal Communications',
        'Testimonials',
        'Event Coverage'
      ],
      features: [
        'Professional Color Grading',
        'Brand-Consistent Graphics',
        'High-Quality Audio',
        'Multiple Format Delivery'
      ]
    },
    social: {
      title: 'Social Media Content',
      description: 'Engaging short-form content optimized for various social media platforms',
      icon: '📱',
      types: [
        'Instagram Reels',
        'TikTok Videos',
        'YouTube Shorts',
        'Facebook Stories',
        'LinkedIn Posts',
        'Twitter Video Ads'
      ],
      features: [
        'Platform-Specific Formats',
        'Trending Effects & Transitions',
        'Optimized for Mobile',
        'Engagement-Focused Editing'
      ]
    },
    commercial: {
      title: 'Commercial & Advertising',
      description: 'Compelling promotional videos that drive conversions and brand awareness',
      icon: '📺',
      types: [
        'TV Commercials',
        'Online Advertisements',
        'Product Launches',
        'Brand Campaigns',
        'Promotional Videos',
        'Sales Presentations'
      ],
      features: [
        'Persuasive Storytelling',
        'Call-to-Action Integration',
        'Brand Message Alignment',
        'Multi-Platform Optimization'
      ]
    },
    creative: {
      title: 'Creative & Entertainment',
      description: 'Artistic video content that captivates audiences and tells compelling stories',
      icon: '🎬',
      types: [
        'Music Videos',
        'Short Films',
        'Creative Documentaries',
        'Artistic Projects',
        'Event Highlights',
        'Personal Stories'
      ],
      features: [
        'Creative Visual Effects',
        'Cinematic Color Grading',
        'Advanced Audio Mixing',
        'Artistic Storytelling'
      ]
    }
  };

  const services = [
    {
      title: 'Video Editing & Post-Production',
      description: 'Complete video editing from raw footage to final polished content',
      icon: '✂️',
      features: ['Multi-cam Editing', 'Color Correction', 'Audio Sync', 'Transitions']
    },
    {
      title: 'Motion Graphics & Animation',
      description: 'Custom animations and graphics to enhance your video content',
      icon: '🎨',
      features: ['2D/3D Animation', 'Logo Animation', 'Infographics', 'Kinetic Typography']
    },
    {
      title: 'Audio Enhancement',
      description: 'Professional audio editing and sound design for pristine quality',
      icon: '🎵',
      features: ['Noise Reduction', 'Sound Effects', 'Music Mixing', 'Voice Enhancement']
    },
    {
      title: 'Visual Effects (VFX)',
      description: 'Advanced visual effects to create stunning and impossible scenes',
      icon: '✨',
      features: ['Green Screen', 'Compositing', 'Particle Effects', 'CGI Integration']
    }
  ];

  const portfolio = [
    {
      title: 'Tech Startup Launch',
      category: 'Corporate',
      description: 'Complete video campaign for a tech startup including company overview, product demo, and investor pitch.',
      duration: '3 mins',
      views: '50K+',
      platforms: ['YouTube', 'Website', 'LinkedIn'],
      thumbnail: '💻',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      title: 'Fashion Brand Campaign',
      category: 'Social Media',
      description: 'Series of Instagram Reels and TikTok videos showcasing the latest fashion collection.',
      duration: '30 secs',
      views: '100K+',
      platforms: ['Instagram', 'TikTok', 'Facebook'],
      thumbnail: '👗',
      color: 'from-pink-500 to-purple-500'
    },
    {
      title: 'Restaurant Commercial',
      category: 'Commercial',
      description: 'Mouth-watering commercial highlighting signature dishes and dining experience.',
      duration: '60 secs',
      views: '75K+',
      platforms: ['TV', 'YouTube', 'Social Media'],
      thumbnail: '🍕',
      color: 'from-orange-500 to-red-500'
    },
    {
      title: 'Music Video Production',
      category: 'Creative',
      description: 'Artistic music video with creative visual effects and storytelling elements.',
      duration: '4 mins',
      views: '200K+',
      platforms: ['YouTube', 'Spotify', 'Social Media'],
      thumbnail: '🎵',
      color: 'from-green-500 to-teal-500'
    }
  ];

  const software = [
    { name: 'Adobe Premiere Pro', category: 'Editing' },
    { name: 'Adobe After Effects', category: 'Motion Graphics' },
    { name: 'DaVinci Resolve', category: 'Color Grading' },
    { name: 'Adobe Audition', category: 'Audio' },
    { name: 'Cinema 4D', category: '3D Animation' },
    { name: 'Final Cut Pro', category: 'Editing' }
  ];

  const process = [
    {
      step: '01',
      title: 'Project Brief & Planning',
      description: 'Understanding your vision, goals, and requirements for the video project',
      icon: '📋'
    },
    {
      step: '02',
      title: 'Editing & Assembly',
      description: 'Crafting the story through precise editing, pacing, and sequence arrangement',
      icon: '✂️'
    },
    {
      step: '03',
      title: 'Enhancement & Effects',
      description: 'Adding visual effects, motion graphics, color grading, and audio enhancement',
      icon: '🎨'
    },
    {
      step: '04',
      title: 'Review & Delivery',
      description: 'Client feedback, revisions, and final delivery in multiple formats',
      icon: '🚀'
    }
  ];

  const stats = [
    { number: '500+', label: 'Videos Edited' },
    { number: '98%', label: 'Client Satisfaction' },
    { number: '24h', label: 'Average Turnaround' },
    { number: '10M+', label: 'Total Views Generated' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-6">
              <span className="mr-2">🎬</span>
              Professional Video Editing Services
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 mb-6">
              Bring Your Stories
              <span className="block bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                To Life
              </span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Transform your raw footage into compelling visual narratives with our professional 
              video editing and post-production services. From concept to final cut, we make your vision reality.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-green-600 mb-2">{stat.number}</div>
                <div className="text-slate-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Categories */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">Video Categories</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Specialized editing services tailored to different types of video content and platforms
            </p>
          </div>

          {/* Category Navigation */}
          <div className="flex flex-wrap justify-center mb-12 bg-white rounded-2xl p-2 shadow-lg max-w-3xl mx-auto">
            {Object.entries(videoCategories).map(([key, category]) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeCategory === key
                    ? 'bg-green-500 text-white shadow-lg'
                    : 'text-slate-600 hover:text-green-600 hover:bg-green-50'
                }`}
              >
                <span>{category.icon}</span>
                <span className="hidden sm:inline">{category.title}</span>
              </button>
            ))}
          </div>

          {/* Category Content */}
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-3xl">{videoCategories[activeCategory].icon}</span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-800">
                    {videoCategories[activeCategory].title}
                  </h3>
                </div>
                <p className="text-lg text-slate-600 mb-8">
                  {videoCategories[activeCategory].description}
                </p>

                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-slate-800 mb-4">Video Types:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {videoCategories[activeCategory].types.map((type, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-slate-600">{type}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                  Start Your Project
                </button>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-slate-800 mb-6">Key Features:</h4>
                <div className="space-y-4">
                  {videoCategories[activeCategory].features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded-xl"
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <span className="text-slate-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">Our Services</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Comprehensive video production services from basic editing to advanced post-production
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{service.title}</h3>
                <p className="text-slate-600 mb-6">{service.description}</p>
                
                <div className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span className="text-slate-600 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">Recent Projects</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Showcasing our latest video editing work across different industries and platforms
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {portfolio.map((project, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <div className="p-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${project.color} rounded-2xl flex items-center justify-center text-2xl text-white mb-4`}>
                    {project.thumbnail}
                  </div>
                  
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium mb-3">
                    {project.category}
                  </span>
                  
                  <h3 className="text-lg font-bold text-slate-800 mb-2">{project.title}</h3>
                  <p className="text-slate-600 text-sm mb-4">{project.description}</p>
                  
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                    <span>Duration: {project.duration}</span>
                    <span>Views: {project.views}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.platforms.map((platform, platformIndex) => (
                      <span
                        key={platformIndex}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded font-medium"
                      >
                        {platform}
                      </span>
                    ))}
                  </div>

                  <button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-2 rounded-xl font-medium hover:shadow-lg transition-shadow duration-300">
                    View Project
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools & Process */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Software & Tools */}
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-6">Professional Software</h2>
              <p className="text-lg text-slate-600 mb-8">
                We use industry-standard software and cutting-edge tools for exceptional results
              </p>
              <div className="grid grid-cols-2 gap-4">
                {software.map((tool, index) => (
                  <div
                    key={index}
                    className="bg-white border border-green-100 rounded-xl p-4 hover:shadow-md hover:border-green-200 transition-all duration-300"
                  >
                    <div className="text-green-600 font-medium text-sm mb-1">{tool.name}</div>
                    <div className="text-slate-500 text-xs">{tool.category}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Process */}
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-6">Our Process</h2>
              <p className="text-lg text-slate-600 mb-8">
                A streamlined workflow that ensures quality output and timely delivery
              </p>
              <div className="space-y-6">
                {process.map((step, index) => (
                  <div key={index} className="flex space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                        {step.step}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-800 mb-2">{step.title}</h3>
                      <p className="text-slate-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Create Stunning Videos?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Let's transform your raw footage into professional, engaging content that captivates your audience
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
              Start Your Project
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-green-600 transition-all duration-300">
              View Portfolio
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VideoEditing;