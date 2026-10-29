import React from 'react'

const SERVICES = [
  { title: 'Website Design', body: 'Clean layouts, responsive structure, and practical user flows for modern websites.' },
  { title: 'Frontend Development', body: 'HTML, CSS and JavaScript for responsive, accessible pages with polished interactions.' },
  { title: 'IT & Computer Support', body: 'Everyday Windows, software, setup and troubleshooting help without unnecessary jargon.' },
  { title: 'Excel & Data Support', body: 'MS Excel and Sheets work including clean data entry, formatting and practical office support.' },
];

const SubHeader = () => (
  <div className='w-full flex flex-col items-start text-left px-4 md:px-0'>
    <div className='w-full text-base md:text-lg lg:text-xl flex flex-col gap-3 md:gap-4 leading-relaxed text-left'>
      <p>Hi, I&apos;m Ahsan — a Lahore-based frontend web developer and technical support learner.</p>
      <p>I&apos;m early-career, practical and still learning. I focus on clean interfaces, responsive websites and useful everyday IT/data support rather than pretending I&apos;ve done work I haven&apos;t.</p>
    </div>

    <div className='about-inline-services w-full mt-8 md:mt-12 h-auto'>
      <div className='about-inline-services__head'><span className='about-inline-services__label'>WHAT I CAN HELP WITH</span></div>
      <div className='about-inline-services__grid'>
        {SERVICES.map((service) => (
          <article key={service.title} className='about-inline-services__item'>
            <h4>{service.title}</h4>
            <p>{service.body}</p>
          </article>
        ))}
      </div>
    </div>
  </div>
)

export default SubHeader
