import React from 'react'
import { LandingNavbar } from './_components/landing-nav'
import { LandingHero } from './_components/landing-hero'
import { LandingContent } from './_components/landing-content'
import { LandingFooter } from './_components/landing-footer'

const LandinPage = () => {
  return (
    <div className="h-full">
      <LandingNavbar/>
      <LandingHero/>
      <LandingContent/>
      <LandingFooter/>
    </div>
  )
}

export default LandinPage