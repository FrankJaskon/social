import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

type segmentNumberType = 1 | 2 | 3
type useComparingPathSegmentType = (
  segmentName: string,
  segmentNumber?: segmentNumberType
) => boolean

export const useComparingPathSegment: useComparingPathSegmentType = (
  segmentName,
  segmentNumber = 1
) => {
  const { asPath, isReady } = useRouter()
  const [isEqual, setIsEqual] = useState(false)

  useEffect(() => {
    if (isReady) {
      const currentSegment = `/${asPath.split('/')?.at(segmentNumber)}`

      setIsEqual(segmentName === currentSegment)
    }
  }, [asPath, isReady, segmentName, segmentNumber])

  return isEqual
}
