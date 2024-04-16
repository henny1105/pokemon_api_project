import React from 'react'
import './MyPokemonPage.style.css'

const MyPokemonPage = () => {
  return (
    <div className='container-fluid bg-primary'>
      <div className='bg-white my-pokemon-area'>
        <div className='headline head-section'>
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.35 30.95L0.45 17.05C0.283333 16.8833 0.166667 16.7167 0.1 16.55C0.0333337 16.3833 0 16.2 0 16C0 15.8 0.0333337 15.6167 0.1 15.45C0.166667 15.2833 0.283333 15.1167 0.45 14.95L14.4 1C14.6667 0.733333 15 0.6 15.4 0.6C15.8 0.6 16.15 0.75 16.45 1.05C16.75 1.35 16.9 1.7 16.9 2.1C16.9 2.5 16.75 2.85 16.45 3.15L5.1 14.5H29.9C30.3333 14.5 30.6917 14.6417 30.975 14.925C31.2583 15.2083 31.4 15.5667 31.4 16C31.4 16.4333 31.2583 16.7917 30.975 17.075C30.6917 17.3583 30.3333 17.5 29.9 17.5H5.1L16.5 28.9C16.7667 29.1667 16.9 29.5 16.9 29.9C16.9 30.3 16.75 30.65 16.45 30.95C16.15 31.25 15.8 31.4 15.4 31.4C15 31.4 14.65 31.25 14.35 30.95Z" fill="#1D1D1D" />
          </svg>
          <h1 className='headline'>나의 포켓몬</h1></div>
        <div className='row'>

          <div className='col my-info-area'>

            <img src="https://i.namu.wiki/i/dBxPv_wrni8hyvOBa9Ew-NtM6McepEFnB0phMKYX-RR4cY0epTURECZyYyCMTtAuoHKTGBc-pM2CgaXJcky1nQ.webp" alt="player" />
            <div className='my-info body_1'>
              <div>Name : <span>ddd</span></div>
              <div>Ticket : <span>0</span></div>
              <div>RareCandy : <span>0</span></div>
            </div>

          </div>

          <div className='col-2'>

            <div className='search-filter-section'>
              <div className='search-area'>
                <svg className='search-icon' width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.9 12.6166L6.88333 8.59994C6.55 8.88883 6.16111 9.11383 5.71667 9.27494C5.27222 9.43605 4.8 9.51661 4.3 9.51661C3.1 9.51661 2.08333 9.09994 1.25 8.26661C0.416667 7.43328 0 6.42772 0 5.24994C0 4.07217 0.416667 3.06661 1.25 2.23328C2.08333 1.39994 3.09444 0.983276 4.28333 0.983276C5.46111 0.983276 6.46389 1.39994 7.29167 2.23328C8.11944 3.06661 8.53333 4.07217 8.53333 5.24994C8.53333 5.72772 8.45555 6.18883 8.3 6.63328C8.14444 7.07772 7.91111 7.49439 7.6 7.88328L11.65 11.8999C11.75 11.9888 11.8 12.1027 11.8 12.2416C11.8 12.3805 11.7444 12.5055 11.6333 12.6166C11.5333 12.7166 11.4111 12.7666 11.2667 12.7666C11.1222 12.7666 11 12.7166 10.9 12.6166ZM4.28333 8.51661C5.18333 8.51661 5.95 8.19716 6.58333 7.55828C7.21667 6.91939 7.53333 6.14994 7.53333 5.24994C7.53333 4.34994 7.21667 3.5805 6.58333 2.94161C5.95 2.30272 5.18333 1.98328 4.28333 1.98328C3.37222 1.98328 2.59722 2.30272 1.95833 2.94161C1.31944 3.5805 1 4.34994 1 5.24994C1 6.14994 1.31944 6.91939 1.95833 7.55828C2.59722 8.19716 3.37222 8.51661 4.28333 8.51661Z" fill="#DC0A2D" />
                </svg>
                <input className='input-style' type="text" placeholder='Search' />
              </div>
              <div className='slot-style'>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.5 12H2.5C2.35556 12 2.23611 11.9528 2.14167 11.8583C2.04722 11.7639 2 11.6444 2 11.5C2 11.3556 2.04722 11.2361 2.14167 11.1417C2.23611 11.0472 2.35556 11 2.5 11H5.5C5.64444 11 5.76389 11.0472 5.85833 11.1417C5.95278 11.2361 6 11.3556 6 11.5C6 11.6444 5.95278 11.7639 5.85833 11.8583C5.76389 11.9528 5.64444 12 5.5 12ZM13.5 5H2.5C2.35556 5 2.23611 4.95278 2.14167 4.85833C2.04722 4.76389 2 4.64444 2 4.5C2 4.35556 2.04722 4.23611 2.14167 4.14167C2.23611 4.04722 2.35556 4 2.5 4H13.5C13.6444 4 13.7639 4.04722 13.8583 4.14167C13.9528 4.23611 14 4.35556 14 4.5C14 4.64444 13.9528 4.76389 13.8583 4.85833C13.7639 4.95278 13.6444 5 13.5 5ZM9.5 8.5H2.5C2.35556 8.5 2.23611 8.45278 2.14167 8.35833C2.04722 8.26389 2 8.14444 2 8C2 7.85556 2.04722 7.73611 2.14167 7.64167C2.23611 7.54722 2.35556 7.5 2.5 7.5H9.5C9.64444 7.5 9.76389 7.54722 9.85833 7.64167C9.95278 7.73611 10 7.85556 10 8C10 8.14444 9.95278 8.26389 9.85833 8.35833C9.76389 8.45278 9.64444 8.5 9.5 8.5Z" fill="#DC0A2D" />
                </svg>

              </div>
            </div>

            <div className='row'>

              <div className='col'>
                <div className='pokemon-card-area body_3'>
                  <div className='card-number'>no.000</div>
                  <img className='pokemon-img' src="https://i.namu.wiki/i/l0x04r27DjSQmS-WgYk6I5x6IkKMyvZjRMyK5dI3EMoMikzCd2Kfl2SMRdvL3-y4zpxI_qLP-fs3QToSR7AU3g.webp" alt="pokemon" />
                  <div className='pokemon-name'>Pikachu</div>
                </div>
              </div>

              <div className='col'>
                <div className='pokemon-card-area body_3'>
                  <div className='card-number'>no.000</div>
                  <img className='pokemon-img' src="https://i.namu.wiki/i/l0x04r27DjSQmS-WgYk6I5x6IkKMyvZjRMyK5dI3EMoMikzCd2Kfl2SMRdvL3-y4zpxI_qLP-fs3QToSR7AU3g.webp" alt="pokemon" />
                  <div className='pokemon-name'>Pikachu</div>
                </div>
              </div>

              <div className='col'>
                <div className='pokemon-card-area body_3'>
                  <div className='card-number'>no.000</div>
                  <img className='pokemon-img' src="https://i.namu.wiki/i/l0x04r27DjSQmS-WgYk6I5x6IkKMyvZjRMyK5dI3EMoMikzCd2Kfl2SMRdvL3-y4zpxI_qLP-fs3QToSR7AU3g.webp" alt="pokemon" />
                  <div className='pokemon-name'>Pikachu</div>
                </div>
              </div>

              <div className='col'>
                <div className='pokemon-card-area body_3'>
                  <div className='card-number'>no.000</div>
                  <img className='pokemon-img' src="https://i.namu.wiki/i/l0x04r27DjSQmS-WgYk6I5x6IkKMyvZjRMyK5dI3EMoMikzCd2Kfl2SMRdvL3-y4zpxI_qLP-fs3QToSR7AU3g.webp" alt="pokemon" />
                  <div className='pokemon-name'>Pikachu</div>
                </div>
              </div>
              
              <div className='col'>
                <div className='pokemon-card-area body_3'>
                  <div className='card-number'>no.000</div>
                  <img className='pokemon-img' src="https://i.namu.wiki/i/l0x04r27DjSQmS-WgYk6I5x6IkKMyvZjRMyK5dI3EMoMikzCd2Kfl2SMRdvL3-y4zpxI_qLP-fs3QToSR7AU3g.webp" alt="pokemon" />
                  <div className='pokemon-name'>Pikachu</div>
                </div>
              </div>
              <div className='col'>
                <div className='pokemon-card-area body_3'>
                  <div className='card-number'>no.000</div>
                  <img className='pokemon-img' src="https://i.namu.wiki/i/l0x04r27DjSQmS-WgYk6I5x6IkKMyvZjRMyK5dI3EMoMikzCd2Kfl2SMRdvL3-y4zpxI_qLP-fs3QToSR7AU3g.webp" alt="pokemon" />
                  <div className='pokemon-name'>Pikachu</div>
                </div>
              </div>
              <div className='col'>
                <div className='pokemon-card-area body_3'>
                  <div className='card-number'>no.000</div>
                  <img className='pokemon-img' src="https://i.namu.wiki/i/l0x04r27DjSQmS-WgYk6I5x6IkKMyvZjRMyK5dI3EMoMikzCd2Kfl2SMRdvL3-y4zpxI_qLP-fs3QToSR7AU3g.webp" alt="pokemon" />
                  <div className='pokemon-name'>Pikachu</div>
                </div>
              </div>
              <div className='col'>
                <div className='pokemon-card-area body_3'>
                  <div className='card-number'>no.000</div>
                  <img className='pokemon-img' src="https://i.namu.wiki/i/l0x04r27DjSQmS-WgYk6I5x6IkKMyvZjRMyK5dI3EMoMikzCd2Kfl2SMRdvL3-y4zpxI_qLP-fs3QToSR7AU3g.webp" alt="pokemon" />
                  <div className='pokemon-name'>Pikachu</div>
                </div>
              </div>
              <div className='col'>
                <div className='pokemon-card-area body_3'>
                  <div className='card-number'>no.000</div>
                  <img className='pokemon-img' src="https://i.namu.wiki/i/l0x04r27DjSQmS-WgYk6I5x6IkKMyvZjRMyK5dI3EMoMikzCd2Kfl2SMRdvL3-y4zpxI_qLP-fs3QToSR7AU3g.webp" alt="pokemon" />
                  <div className='pokemon-name'>Pikachu</div>
                </div>
              </div>
              <div className='col'>
                <div className='pokemon-card-area body_3'>
                  <div className='card-number'>no.000</div>
                  <img className='pokemon-img' src="https://i.namu.wiki/i/l0x04r27DjSQmS-WgYk6I5x6IkKMyvZjRMyK5dI3EMoMikzCd2Kfl2SMRdvL3-y4zpxI_qLP-fs3QToSR7AU3g.webp" alt="pokemon" />
                  <div className='pokemon-name'>Pikachu</div>
                </div>
              </div>
              <div className='col'>
                <div className='pokemon-card-area body_3'>
                  <div className='card-number'>no.000</div>
                  <img className='pokemon-img' src="https://i.namu.wiki/i/l0x04r27DjSQmS-WgYk6I5x6IkKMyvZjRMyK5dI3EMoMikzCd2Kfl2SMRdvL3-y4zpxI_qLP-fs3QToSR7AU3g.webp" alt="pokemon" />
                  <div className='pokemon-name'>Pikachu</div>
                </div>
              </div>
              <div className='col'>
                <div className='pokemon-card-area body_3'>
                  <div className='card-number'>no.000</div>
                  <img className='pokemon-img' src="https://i.namu.wiki/i/l0x04r27DjSQmS-WgYk6I5x6IkKMyvZjRMyK5dI3EMoMikzCd2Kfl2SMRdvL3-y4zpxI_qLP-fs3QToSR7AU3g.webp" alt="pokemon" />
                  <div className='pokemon-name'>Pikachu</div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default MyPokemonPage