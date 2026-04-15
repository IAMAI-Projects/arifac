import type { Page, RegulatoryUpdate } from '@/payload-types'
import Hero from '@/components/Hero'
import StatsStrip from '@/components/StatsStrip'
import CapabilityMatrix from '@/components/CapabilityMatrix'
import Partnerships from '@/components/Partnerships'
import CommunitySection from '@/components/CommunitySection'
import RegulatoryDashboard from '@/components/RegulatoryDashboard'
import FeaturedPrograms from '@/components/FeaturedPrograms'
import CTASection from '@/components/CTASection'

type Block = NonNullable<Page['layout']>[number]

interface BlockRendererProps {
  blocks: Block[]
  regulatoryUpdates?: RegulatoryUpdate[]
}

export default function BlockRenderer({ blocks, regulatoryUpdates = [] }: BlockRendererProps) {
  return (
    <>
      {blocks.map((block, index) => {
        switch (block.blockType) {
          case 'hero':
            return <Hero key={index} data={block} />
          case 'stats':
            return <StatsStrip key={index} data={block} />
          case 'capabilityMatrix':
            return <CapabilityMatrix key={index} data={block} />
          case 'partnerships':
            return <Partnerships key={index} data={block} />
          case 'community':
            return <CommunitySection key={index} data={block} />
          case 'regulatoryDashboard':
            return <RegulatoryDashboard key={index} data={block} updates={regulatoryUpdates} />
          case 'featuredPrograms':
            return <FeaturedPrograms key={index} data={block} />
          case 'cta':
            return <CTASection key={index} data={block} />
          default:
            return null
        }
      })}
    </>
  )
}
