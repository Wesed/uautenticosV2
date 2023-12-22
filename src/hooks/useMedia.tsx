import React, { useMemo } from 'react'

// ex:   const isMobile = UseMedia('(max-width: 640px)')

const UseMedia = (media: string) => {
  const [match, setMatch] = React.useState(false)

  const changeMatch = useMemo(() => {
    return function changeMatch() {
      const { matches } = window.matchMedia(media)
      setMatch(matches)
    }
  }, [media])

  React.useEffect(() => {
    changeMatch()
    window.addEventListener('resize', changeMatch)
    return () => {
      window.removeEventListener('resize', changeMatch)
    }
  }, [changeMatch])

  return match
}

export default UseMedia
