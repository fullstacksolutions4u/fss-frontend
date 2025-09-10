import React, { useState } from 'react';

const DigitalMarketing = () => {
  const [activeService, setActiveService] = useState('seo');

  const services = {
    seo: {
      title: 'Search Engine Optimization',
      description: 'Improve your website\'s visibility and ranking on search engines',
      icon: '🔍',
      features: [
        'Keyword Research & Analysis',
        'On-Page Optimization',
        'Technical SEO Audit',
        'Link Building Strategy',
        'Local SEO Optimization',
        'Performance Tracking'
      ],
      benefits: [
        'Increased Organic Traffic',
        'Higher Search Rankings',
        'Better User Experience',
        'Long-term ROI'
      ]
    },
    social: {
      title: 'Social Media Marketing',
      description: 'Build your brand presence and engage with your audience on social platforms',
      icon: '📱',
      features: [
        'Social Media Strategy',
        'Content Creation & Curation',
        'Community Management',
        'Paid Social Advertising',
        'Influencer Marketing',
        'Analytics & Reporting'
      ],
      benefits: [
        'Brand Awareness Growth',
        'Audience Engagement',
        'Lead Generation',
        'Customer Loyalty'
      ]
    },
    ppc: {
      title: 'Pay-Per-Click Advertising',
      description: 'Drive immediate traffic and conversions with targeted advertising campaigns',
      icon: '🎯',
      features: [
        'Google Ads Management',
        'Facebook & Instagram Ads',
        'Keyword Bidding Strategy',
        'Ad Copy & Creative Design',
        'Landing Page Optimization',
        'Conversion Tracking'
      ],
      benefits: [
        'Immediate Results',
        'Targeted Reach',
        'Measurable ROI',
        'Budget Control'
      ]
    },
    content: {
      title: 'Content Marketing',
      description: 'Create valuable content that attracts and engages your target audience',
      icon: '✍️',
      features: [
        'Content Strategy Development',
        'Blog Writing & Publishing',
        'Video Content Creation',
        'Email Marketing Campaigns',
        'Infographic Design',
        'Content Distribution'
      ],
      benefits: [
        'Thought Leadership',
        'Customer Education',
        'Organic Growth',
        'Brand Authority'
      ]
    }
  };

  const results = [
    {
      metric: '150%',
      description: 'Average increase in organic traffic',
      icon: '📈'
    },
    {
      metric: '85%',
      description: 'Client retention rate',
      icon: '🤝'
    },
    {
      metric: '300%',
      description: 'Average ROI improvement',
      icon: '💰'
    },
    {
      metric: '50+',
      description: 'Successful campaigns launched',
      icon: '🚀'
    }
  ];

  const caseStudies = [
    {
      title: 'E-commerce Growth Strategy',
      client: 'Fashion Retailer',
      challenge: 'Low online visibility and declining sales',
      solution: 'Comprehensive SEO and PPC campaign with social media integration',
      results: [
        '200% increase in organic traffic',
        '150% boost in online sales',
        '75% reduction in cost per acquisition'
      ],
      icon: '🛍️',
      color: 'from-pink-500 to-rose-500'
    },
    {
      title: 'Local Business Expansion',
      client: 'Restaurant Chain',
      challenge: 'Limited local awareness and foot traffic',
      solution: 'Local SEO optimization with geo-targeted social media campaigns',
      results: [
        '300% increase in local searches',
        '85% growth in foot traffic',
        '90% improvement in online reviews'
      ],
      icon: '🍕',
      color: 'from-orange-500 to-amber-500'
    },
    {
      title: 'B2B Lead Generation',
      client: 'Tech Startup',
      challenge: 'Difficulty generating qualified leads',
      solution: 'Content marketing strategy with LinkedIn advertising',
      results: [
        '400% increase in qualified leads',
        '60% reduction in cost per lead',
        '250% growth in email subscribers'
      ],
      icon: '💼',
      color: 'from-blue-500 to-indigo-500'
    }
  ];

  const tools = [
    'Google Analytics', 'Google Ads', 'Facebook Business Manager', 'SEMrush',
    'Ahrefs', 'Hootsuite', 'Mailchimp', 'HubSpot', 'Canva', 'Adobe Creative Suite'
  ];

  const process = [
    {
      step: '01',
      title: 'Strategy & Planning',
      description: 'Analyze your business goals, target audience, and competitive landscape',
      icon: '📊'
    },
    {
      step: '02',
      title: 'Campaign Development',
      description: 'Create tailored marketing campaigns across multiple channels',
      icon: '🎨'
    },
    {
      step: '03',
      title: 'Implementation',
      description: 'Launch campaigns with continuous monitoring and optimization',
      icon: '🚀'
    },
    {
      step: '04',
      title: 'Analysis & Reporting',
      description: 'Track performance metrics and provide detailed insights',
      icon: '📈'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium mb-6">
              <span className="mr-2">📈</span>
              Digital Marketing Services
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 mb-6">
              Grow Your Business
              <span className="block bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Digital Presence
              </span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Boost your online visibility, engage your audience, and drive conversions with our 
              comprehensive digital marketing strategies tailored to your business goals.
            </p>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {results.map((result, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-2">{result.icon}</div>
                <div className="text-3xl sm:text-4xl font-bold text-orange-600 mb-2">{result.metric}</div>
                <div className="text-slate-600 font-medium text-sm sm:text-base">{result.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">Our Services</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Comprehensive digital marketing solutions to amplify your brand and drive growth
            </p>
          </div>

          {/* Service Navigation */}
          <div className="flex flex-wrap justify-center mb-12 bg-white rounded-2xl p-2 shadow-lg max-w-4xl mx-auto">
            {Object.entries(services).map(([key, service]) => (
              <button
                key={key}
                onClick={() => setActiveService(key)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeService === key
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'text-slate-600 hover:text-orange-600 hover:bg-orange-50'
                }`}
              >
                <span>{service.icon}</span>
                <span className="hidden sm:inline">{service.title}</span>
              </button>
            ))}
          </div>

          {/* Service Content */}
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-3xl">{services[activeService].icon}</span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-800">
                    {services[activeService].title}
                  </h3>
                </div>
                <p className="text-lg text-slate-600 mb-8">
                  {services[activeService].description}
                </p>

                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-slate-800 mb-4">What We Offer:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {services[activeService].features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span className="text-slate-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                  Get Started
                </button>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-slate-800 mb-6">Key Benefits:</h4>
                <div className="space-y-4">
                  {services[activeService].benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4 p-4 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-100 rounded-xl"
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <span className="text-slate-700 font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">Success Stories</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              See how we've helped businesses achieve remarkable growth through strategic digital marketing
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <div className="p-8">
                  <div className={`w-16 h-16 bg-gradient-to-r ${study.color} rounded-2xl flex items-center justify-center text-2xl text-white mb-6`}>
                    {study.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{study.title}</h3>
                  <p className="text-orange-600 font-medium mb-4">{study.client}</p>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-slate-700 mb-2">Challenge:</h4>
                    <p className="text-slate-600 text-sm">{study.challenge}</p>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-slate-700 mb-2">Solution:</h4>
                    <p className="text-slate-600 text-sm">{study.solution}</p>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-slate-700 mb-3">Results:</h4>
                    <div className="space-y-2">
                      {study.results.map((result, resultIndex) => (
                        <div key={resultIndex} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                          <span className="text-slate-600 text-sm">{result}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-shadow duration-300">
                    Read Full Case Study
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools & Process */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Tools */}
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-6">Tools We Use</h2>
              <p className="text-lg text-slate-600 mb-8">
                We leverage industry-leading tools and platforms to deliver exceptional results
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {tools.map((tool, index) => (
                  <div
                    key={index}
                    className="bg-white border border-orange-100 rounded-xl p-4 text-center hover:shadow-md hover:border-orange-200 transition-all duration-300"
                  >
                    <div className="text-orange-600 font-medium text-sm">{tool}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Process */}
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-6">Our Process</h2>
              <p className="text-lg text-slate-600 mb-8">
                A systematic approach that ensures consistent results and measurable growth
              </p>
              <div className="space-y-6">
                {process.map((step, index) => (
                  <div key={index} className="flex space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold">
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
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-orange-600 to-red-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Accelerate Your Digital Growth?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Let's create a digital marketing strategy that drives real results for your business
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-orange-600 px-8 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
              Start Your Campaign
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-orange-600 transition-all duration-300">
              Free Strategy Session
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DigitalMarketing;