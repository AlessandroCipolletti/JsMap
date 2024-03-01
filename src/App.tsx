import React from 'react'
import styled from 'styled-components'
import Map from './components/Map'
import MapImageSrc from './assets/map.png'

function App() {
  return (
    <PageWrapper>
      <Header>
        <h2>React ts map from scratch</h2>
      </Header>
      <MainWrapper>
        <MapWrapper>
          <Map mapBg={MapImageSrc} />
        </MapWrapper>
        <Sidebar>

        </Sidebar>
      </MainWrapper>
    </PageWrapper>
  )
}

const PageWrapper = styled.div`
  padding: 10px;
`
const Header = styled.header`
  text-align: center;
`
const MainWrapper = styled.main`
  width: 100%;
  display: flex;
  gap: 10px;
`
const MapWrapper = styled.div`
  width: calc(100% - 320px);
  min-height: 80vh;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
`
const Sidebar = styled.aside`
  width: 300px;
  background-color: #f4f4f4;
`

export default App
