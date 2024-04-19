import { myInfoActions } from "../reducers/Slice";

function playPoke(name) {
  return (dispatch, getState) => {
    dispatch(myInfoActions.playPoke({ name }));
  };
}

function levelUp(name){
    return(dispatch,getState)=>{
        dispatch(myInfoActions.levelUp({ name }))
    }
}

function eat(name){
    return(dispatch,getstate)=>{
        dispatch(myInfoActions.eat({name}))
    }
}

export {playPoke,levelUp,eat}