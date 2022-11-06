
import React, { useEffect, useState } from 'react'
import '../styles/globals.css'
import { JetBrains_Mono } from '@next/font/google'

const jetbrains_mono = JetBrains_Mono();

function MyApp({ Component, pageProps }) {


  return (
    <>
      <style jsx global>
        {`
        html {
          font-family: ${jetbrains_mono.style.fontFamily};
        }
      `}
      </style>
      <Component {...pageProps} />

    </>
  )
}

export default MyApp
