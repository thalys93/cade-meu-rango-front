import React from 'react'
import AppBar from '@mui/material/AppBar'
import Tabs from '@mui/material/Tabs'
import { Tab } from '@mui/material'


function Home() {
  return (
    <section>
      <article>      
        <AppBar position="static" color="default">
          <Tabs value='0' aria-label="test">
            <Tab label="Home" />
            <Tab label="Receitas" />
            <Tab label="Dicas" />
          </Tabs>
      </AppBar>
      </article>
    </section>
  )
}

export default Home