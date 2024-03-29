import { createSlice } from '@reduxjs/toolkit'

export const sessionSlice = createSlice({
    name: 'auth/session',
    initialState: {
        token: '',
        signedIn: false,
    },
    reducers: {
        onSignInSuccess: (state, action) => {
            state.signedIn = true
            state.token = action.payload
        },
        onSignOutSuccess: (state) => {
            state.signedIn = false
            state.token = ''
        },
        onSignInFailure: (state) => {
            state.signedIn = false
            state.token = ''
        },
        setToken: (state, payload) => {
            state.token = payload
        },
        setSignedIn: (state) => {
            state.signedIn = true
        }
    },
})

export const { onSignInSuccess, onSignOutSuccess, onSignInFailure, setToken, setSignedIn } =
    sessionSlice.actions

export default sessionSlice.reducer
