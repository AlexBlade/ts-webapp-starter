const GLOBAL_TOGGLE_SOMESTATE = 'GLOBAL/TOGGLE_SOMESTATE';

export interface IGlobalAppState {
    someState: boolean;
}

const initialAppState: IGlobalAppState = {
    someState: true
}

export const globalAppStateReducer = (state: IGlobalAppState = initialAppState, action: any) => {
    switch (action.type) {
        case GLOBAL_TOGGLE_SOMESTATE:
            if (action.payload !== undefined) {
                return {...state, someState: action.payload}
            }
        default:
            return state;
    }
}
