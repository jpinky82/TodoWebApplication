import React from 'react'

export default function Banner(props) {
  return (
    <article className="secondary bannerHeight text-white p-4">
        <h1 className="mainFont text-center">{props.name}</h1>
    </article>
  )
}
