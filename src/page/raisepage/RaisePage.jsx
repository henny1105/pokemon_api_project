import React from 'react'
import './RaisePage.style.css'
import { Button, Col, Container, ProgressBar, Row } from 'react-bootstrap'

const RaisePage = () => {
  return (
    <Container>
      <div className='py-3'>
        <h1 className='headline'>포켓몬 성장</h1>
      </div>

      <Row>
        <Col lg={6}>
          <img className='img-fluid' src="https://i.namu.wiki/i/l0x04r27DjSQmS-WgYk6I5x6IkKMyvZjRMyK5dI3EMoMikzCd2Kfl2SMRdvL3-y4zpxI_qLP-fs3QToSR7AU3g.webp" alt="pokemon" />
          <div>
            LV.1
          </div>
          <div >
            <div>
              exp 1/30
            </div>
            <ProgressBar now={10} variant='warning' />
          </div>
          <div>
            속성
          </div>
        </Col>
        <Col lg={6} className='d-flex flex-column'>
          <Button variant='warning' className='mb-1'>이상한 사탕 주기(LV 1+)</Button>
          <Button variant='outline-success' className='mb-1'>밥먹기(Exp 10+)</Button>
          <Button variant='outline-success'>놀아주기(Exp 1+)</Button>
        </Col>
      </Row>
    </Container>
  )
}

export default RaisePage