import type { Page, RegulatoryUpdate } from '@/payload-types'
import Hero from '@/components/Hero'
import StatsStrip from '@/components/StatsStrip'
import CapabilityMatrix from '@/components/CapabilityMatrix'
import Partnerships from '@/components/Partnerships'
import RegulatoryDashboard from '@/components/RegulatoryDashboard'
import FeaturedPrograms from '@/components/FeaturedPrograms'
import CTASection from '@/components/CTASection'

type Block = NonNullable<Page['layout']>[number]

interface BlockRendererProps {
  blocks: Block[]
  regulatoryUpdates?: RegulatoryUpdate[]
  categoryLabelMap?: Record<string, string>
  issuingBodyLabelMap?: Record<string, string>
}

export default function BlockRenderer({ blocks, regulatoryUpdates = [], categoryLabelMap, issuingBodyLabelMap }: BlockRendererProps) {
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
          case 'regulatoryDashboard':
            return <RegulatoryDashboard key={index} data={block} updates={regulatoryUpdates} categoryLabelMap={categoryLabelMap} issuingBodyLabelMap={issuingBodyLabelMap} />
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
