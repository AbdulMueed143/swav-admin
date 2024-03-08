import { useSelector, useDispatch } from 'react-redux'
import { setUser, initialState } from 'store/auth/userSlice'
import { apiSignIn, apiSignOut, apiSignUp, apiRegister, apiResetTempPassword, apiResetForgotPassword } from 'services/AuthService'
import { onSignInSuccess, onSignOutSuccess, onSignInFailure, setToken, setSignedIn } from 'store/auth/sessionSlice'
import appConfig from 'configs/app.config'
import { REDIRECT_URL_KEY } from 'constants/app.constant'
import { useNavigate } from 'react-router-dom'
import useQuery from './useQuery'
import { values } from 'lodash'
import ApiService from '../../services/ApiService'


function useAuth() {
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const query = useQuery()

    const { token, signedIn } = useSelector((state) => state.auth.session)

    const signIn = async (values) => {
        try {

            const resp = await apiSignIn(values);
            
            if (resp.data) {
                
                const tempAuthenticationSessionId = resp.data.tempAuthenticationSessionId;

                if(tempAuthenticationSessionId) {

                    //then we are in temp session and user has to go to reset password page
                    navigate(
                        '/reset-password?email=' + encodeURIComponent(values.email) + '&sessionId=' + encodeURIComponent(tempAuthenticationSessionId)
                    )
                }
                else {

                const token  = resp.data.accessToken;
                const refreshToken = resp.data.refreshToken;

                dispatch(onSignInSuccess(token))
                const userDetail = await getLoggedInUserDetail(token);

                if (userDetail) {
                    dispatch(
                        setUser(
                            userDetail || {
                                avatar: '',
                                userName: userDetail.firstName + userDetail.lastName,
                                authority: ['USER'],
                                email: userDetail.email,
                            }
                        )
                    )
                }
                const redirectUrl = query.get(REDIRECT_URL_KEY)
                navigate(
                    redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath
                )
                return {
                    status: 'success',
                    message: '',
                }
                }
                
            }
        } catch (errors) {
            return {
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }


    const resetForgotPassword = async( email, newPassword, otp) => {

        try {

            const requestBody = {
                otp : otp,
                email: email,
                newPassword: newPassword
            }

            const resp = await apiResetForgotPassword(requestBody)

            if (resp.status >= 200 && resp.status <= 299) {
             
                navigate(
                    '/sign-in'
                )
                return {
                    status: 'success',
                    message: '',
                }
                
            }

        } catch (errors) {
            return {
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }

    const resetTempPassword = async (email, password, sessionId) => {
        try {

            const resp = await apiResetTempPassword(email, password, sessionId)

            if (resp.data) {
                const token  = resp.data.accessToken;
                const refreshToken = resp.data.refreshToken;

                dispatch(onSignInSuccess(token))
                const userDetail = await getLoggedInUserDetail(token);
                
                if (userDetail) {
                    dispatch(
                        setUser(
                            userDetail || {
                                avatar: '',
                                userName: userDetail.firstName + userDetail.lastName,
                                authority: ['USER'],
                                email: userDetail.email,
                            }
                        )
                    )
                }
                const redirectUrl = query.get(REDIRECT_URL_KEY)
                navigate(
                    redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath
                )
                return {
                    status: 'success',
                    message: '',
                }
                
            }
        } catch (errors) {
            return {
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }

    const getLoggedInUserDetail = async (token) => {

        try {
            const response = await ApiService.fetchData({
                url: '/barber-service/api/v1/barber/detail',
                method: 'get',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
    
            //now I should have all the barbers, lets check the condition ..
            if(response.status === 200) {
                return response.data;
            }
            else {
                return {
                    status: -1,
                    message: response,
                }   
            }

        } catch (errors) {
            return {
                status: -1,
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }

    const createAccount = async (values) => {
        try {

            const resp = await apiRegister(values)

            if(resp.status === 200) {
                const  token  = resp.data.accessToken
                const refreshToken = resp.data.refreshToken

                dispatch(setToken(token))
                dispatch(setSignedIn())
                const userDetail = await getLoggedInUserDetail(token);

                dispatch(
                    setUser(
                        userDetail || {
                            avatar: '',
                            userName: 'Anonymous',
                            authority: ['USER'],
                            email: '',
                        }
                    )
                )

                return {
                    status: 'success',
                    message: '',
                }
            } else {
                //we have a error 
                const { message } = resp.message
                dispatch(onSignInFailure(token))
                return {
                    status: 'error',
                    message: message,
                }
            }

        } catch (errors) {
            return {
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }

    const handleSignOut = () => {
        dispatch(onSignOutSuccess())
        dispatch(setUser(initialState))
        navigate(appConfig.unAuthenticatedEntryPath)
    }

    const signOut = async () => {
        await apiSignOut(token)
        handleSignOut()
    }

    return {
        authenticated: token && signedIn,
        signIn,
        signOut,
        createAccount,
        resetTempPassword,
        resetForgotPassword
    }
}

export default useAuth
