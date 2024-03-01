import React from 'react'
import styled from 'styled-components'

function App() {
  return (
    <PageWrapper>
      <Header>
        <h2>React ts map from scratch</h2>
      </Header>
      <MainWrapper>
        <MapWrapper>

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
  background-color: yellow;
`
const Sidebar = styled.aside`
  width: 300px;
  background-color: #f4f4f4;
`

export default App
