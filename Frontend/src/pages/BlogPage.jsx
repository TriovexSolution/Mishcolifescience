import React from 'react'
import FeaturedPost from '../component/FeaturedPost'
import Allpostblog from '../component/allpostblog'

function BlogPage() {
    console.log("blog page");
    
  return (
    <>
      <FeaturedPost />
      <Allpostblog />
    </>
  )
}

export default BlogPage