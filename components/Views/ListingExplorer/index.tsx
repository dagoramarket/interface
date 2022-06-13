import { useRouter } from "next/router"

type Props = {}

export default function ListingExplorer({}: Props) {
  const router = useRouter()
  
  if (router.query.search) {
    console.log(`searching for ${router.query.search}`)
  }

  return (
    <div>index</div>
  )
}