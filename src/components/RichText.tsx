import { RichText as PayloadRichText } from '@payloadcms/richtext-lexical/react'

interface RichTextProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
}

export default function RichText({ data }: RichTextProps) {
  if (!data) return null
  return <PayloadRichText data={data} />
}
