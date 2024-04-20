import { myInfoActions } from "../reducers/Slice";

function playPoke(name,evolveName) {
  return (dispatch, getState) => {
    dispatch(myInfoActions.playPoke({ name }));
  };
}

function levelUp(name,evolveName) {
  return (dispatch, getState) => {
    dispatch(myInfoActions.levelUp({ name }))
  }
}

function levelUpCandy(name,evolveName) {
  return (dispatch, getState) => {
    dispatch(myInfoActions.levelUpCandy({ name }))
  }
}

function eat(name,evolveName) {
  return (dispatch, getstate) => {
    dispatch(myInfoActions.eat({ name }))
  }
}

function evolve(name,evolveName,evolveUrl) {
  return (dispatch, getstate) => {
    dispatch(myInfoActions.evolve({ name,evolveName,evolveUrl }))
  }
}

function cheats(){
  return (dispatch, getstate) => {
    dispatch(myInfoActions.cheats())
  }
}

export { playPoke, levelUp, eat, evolve,levelUpCandy,cheats }