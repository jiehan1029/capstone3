import {SET_FEEDBACK, ADD_GUESS, SET_AURAL_STATUS, RESET_GAME} from '../actions';

const initialState={
    guesses:[],
    correctAnswer: Math.round(Math.random() * 100) + 1,
    feedback: 'Make your guess!',
    auralStatus: ''
}

export const appReducer = (state=initialState, action)=>{
    if(action.type===SET_FEEDBACK){
        let res=Object.assign({},state,{feedback:action.feedback});
        return res;
    }
    else if(action.type===ADD_GUESS){
        // make a deep copy
        let guessesList=JSON.parse(JSON.stringify(state.guesses));
        guessesList.push(action.guess);
        let res2=Object.assign({},state,{guesses:guessesList});
        return res2;
    }
    else if(action.type===SET_AURAL_STATUS){
        let res3=Object.assign({},state,{auralStatus:action.auralStatus});
        return res3;
    }
    else if(action.type===RESET_GAME){
        if(action.resetFlag===true){
            return initialState;
        }
    }
    return state;
};


