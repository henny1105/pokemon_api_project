import React from 'react';

const Components = () => {
  return (
    <div>
      <ul>
        <li className="normal">노말</li>
      </ul>
    </div>
  )
}

export default Components;

// import React from 'react';
// import styled from 'styled-components';

// const Components = () => {
//   return (
//     <div>
//       {/* type */}
//       <TypeButton>
//         <Type className="normal">노말</Type>
//         <Type className="fighting">격투</Type>
//         <Type className="flying">비행</Type>
//         <Type className="poison">독</Type>
//         <Type className="ground">땅</Type>
//         <Type className="rock">바위</Type>
//         <Type className="bug">벌레</Type>
//         <Type className="ghost">고스트</Type>
//         <Type className="steel">강철</Type>
//         <Type className="fire">불꽃</Type>
//         <Type className="water">물</Type>
//         <Type className="grass">풀</Type>
//         <Type className="electric">전기</Type>
//         <Type className="psychic">에스퍼</Type>
//         <Type className="ice">얼음</Type>
//         <Type className="dragon">드래곤</Type>
//         <Type className="dark">악</Type>
//         <Type className="fairy">페어리</Type>
//       </TypeButton>

//       {/* card */}
//       <PokemonCard className="drop_shadow_2">
//         <div className="card_number">
//           <span>#999</span>
//         </div>
//         <div className="card_img is_exist">
//           <img src="https://upload.wikimedia.org/wikipedia/ko/3/3b/%ED%8F%AC%EC%BC%93%EB%AA%AC_%EC%9D%B4%EC%83%81%ED%95%B4%EC%94%A8.png" alt="" />
//         </div>
//         <div className="card_name">
//           <span>Pokemon name</span>
//         </div>
//       </PokemonCard>

//       {/* card_detail */}
//       <CardDetail>
//         <div className="header">
//           <button type="button">뒤로</button>
//           <h1>Pokemon Name</h1>
//           <span>#999</span>
//         </div>
//         <div className="body">
//           <img src="https://upload.wikimedia.org/wikipedia/ko/3/3b/%ED%8F%AC%EC%BC%93%EB%AA%AC_%EC%9D%B4%EC%83%81%ED%95%B4%EC%94%A8.png" alt="" />
//         </div>
//         <div className="detail">
//           <TypeButton>
//             <Type className="bug">벌레</Type>
//             <Type className="grass">풀</Type>
//           </TypeButton>
//           <strong className="sub_title">About</strong>
//           <ul className="attribute_list">
//             <li className="attribute_item">
//               <dl>
//                 <dt>weight</dt>
//                 <dd>9.9 kg</dd>
//               </dl>
//             </li>
//             <li className="attribute_item">
//               <dl>
//                 <dt>Height</dt>
//                 <dd>9.9 m</dd>
//               </dl>
//             </li>
//             <li className="attribute_item">
//               <dl>
//                 <dt>Moves</dt>
//                 <dd>Ability1</dd>
//                 <dd>Ability2</dd>
//               </dl>
//             </li>
//           </ul>
//           <p className="desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc iaculis eros vitae tellus condimentum maximus sit amet in eros.</p>
//           <strong className="sub_title">Base Stats</strong>
//           <div className="stats_form">
//             <div>
//               <dl>
//                 <dt>HP</dt>
//                 <dd>999</dd>
//                 <div className="graph">
//                   <span></span>
//                 </div>
//               </dl>
//               <dl>
//                 <dt>ATK</dt>
//                 <dd>999</dd>
//                 <div className="graph">
//                   <span></span>
//                 </div>
//               </dl>
//               <dl>
//                 <dt>DEF</dt>
//                 <dd>999</dd>
//                 <div className="graph">
//                   <span></span>
//                 </div>
//               </dl>
//               <dl>
//                 <dt>SATK</dt>
//                 <dd>999</dd>
//                 <div className="graph">
//                   <span></span>
//                 </div>
//               </dl>
//               <dl>
//                 <dt>SDEF</dt>
//                 <dd>999</dd>
//                 <div className="graph">
//                   <span></span>
//                 </div>
//               </dl>
//               <dl>
//                 <dt>SPD</dt>
//                 <dd>999</dd>
//                 <div className="graph">
//                   <span></span>
//                 </div>
//               </dl>
//             </div>
//           </div>
//         </div>
//       </CardDetail>
//     </div>
//   )
// }

// export default Components;

// const TypeButton = styled.ul`
//   margin-bottom: 16px;
// `;

// const Type = styled.li`
//   display: inline-block;
//   width: max-content;
//   padding: 2px 8px;
//   font-size: 10px;
//   font-weight: bold;
//   line-height: 16px;
//   border-radius: 10px;
//   color: ${(props) => props.theme.white};

//   &.normal {
//     background-color: ${(props) => props.theme.normal};
//   }
//   &.fighting {
//     background-color: ${(props) => props.theme.fighting};
//   }
//   &.flying {
//     background-color: ${(props) => props.theme.flying};
//   }
//   &.poison {
//     background-color: ${(props) => props.theme.poison};
//   }
//   &.ground {
//     background-color: ${(props) => props.theme.ground};
//   }
//   &.rock {
//     background-color: ${(props) => props.theme.rock};
//   }
//   &.bug {
//     background-color: ${(props) => props.theme.bug};
//   }
//   &.ghost {
//     background-color: ${(props) => props.theme.ghost};
//   }
//   &.steel {
//     background-color: ${(props) => props.theme.steel};
//   }
//   &.fire {
//     background-color: ${(props) => props.theme.fire};
//   }
//   &.water {
//     background-color: ${(props) => props.theme.water};
//   }
//   &.grass {
//     background-color: ${(props) => props.theme.grass};
//   }
//   &.electric {
//     background-color: ${(props) => props.theme.electric};
//   }
//   &.psychic {
//     background-color: ${(props) => props.theme.psychic};
//   }
//   &.ice {
//     background-color: ${(props) => props.theme.ice};
//   }
//   &.dragon {
//     background-color: ${(props) => props.theme.dragon};
//   }
//   &.dark {
//     background-color: ${(props) => props.theme.dark};
//   }
//   &.fairy {
//     background-color: ${(props) => props.theme.fairy};
//   }
// `;

// const PokemonCard = styled.div`
//   position: relative;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   width: 104px;
//   height: 108px;
//   border: 1px solid ${(props) => props.theme.background};
//   border-radius: 8px;


//   .card_img {
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     width: 72px;
//     height: 72px;

//     img {
//       display: block;
//       width: 100%;
//       height: 100%;
//     }
//   }

//   .card_name {
//     background-color: ${(props) => props.theme.background};
//     border-radius: 7px;
//     padding: 24px 8px 4px 8px;
//     text-align: center;

//     span {
//       font-size: 10px;
//       line-height: 16px;
//       color: ${(props) => props.theme.black};
//     }
//   }
// `;

// const CardDetail = styled.div`


//   .detail {
//     display: flex;
//     flex-direction: column;
//     justify-content: flex-start;
//     align-items: center;
//     width: 352px;
//     height: 100%;
//     border-radius: 8px;
//     background-color: ${(props) => props.theme.white};
//     padding: 56px 20px 20px 20px;

//     .sub_title {
//       font-size: 14px;
//       font-weight: bold;
//       line-height: 16px;
//       color: #B8B8B8;
//       margin: 16px 0;
//     }

//     .attribute_list {
//       display: flex;
//       width: 100%;
//       margin-bottom: 16px;
//     }
//     .attribute_item {
//       display: flex;
//       flex-direction: column-reverse;
//       justify-content: space-between;
//       align-items: center;
//       width: 33.3333%;
//       border-right: 1px solid ${(props) => props.theme.light};

//       &:last-child {
//         border: 0;
//       }
//     }

//     .stats_form {
//       width: 100%;

//       dl {
//         display: flex;
//         justify-content: flex-start;
//         align-items: center;

//         dt {
//           font-size: 10px;
//           font-weight: bold;
//           line-height: 16px;
//           color: #b8b8b8;
//         }
        
//         dd {
//           font-size: 10px;
//           line-height: 16px;
//           color: #1d1d1d;
//           margin-right: 8px;
//           // padding-left: 8px;
//           // border-left: 1px solid ${(props) => props.theme.light};
//         }
//       }

//       span {

//       }
//     }
//   }
// `;