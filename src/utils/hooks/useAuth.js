import { useSelector, useDispatch } from 'react-redux'
import { setUser, initialState } from 'store/auth/userSlice'
import { apiSignIn, apiSignOut, apiSignUp, apiRegister } from 'services/AuthService'
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

            const resp = await apiSignIn(values)

            console.log("Sign in part");
            console.log(resp)
            if (resp.data) {
                const token  = resp.data.accessToken
                const refreshToken = resp.data.refreshToken


                dispatch(onSignInSuccess(token))

                //and now we need to get the barber detail ...

                const userDetail = await getLoggedInUserDetail(token);
                
                console.log("User Detail Object");
                console.log(userDetail);

                console.log("User resp.data.user");
                console.log(resp.data.user);

                if (userDetail) {
                    console.log("Dispatching uer data");
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

        console.log("I received following token - getLoggedInUserDetail")
        console.log(token);
        
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
            // console.log('Sending api Register request');
            // console.log(values);

            const resp = await apiRegister(values)
            // console.log('Response from api ');
            // console.log(resp);

            // console.log('Response Status');
            // console.log(resp.status);

            if(resp.status === 200) {
                const  token  = resp.data.accessToken
                const refreshToken = resp.data.refreshToken

                dispatch(setToken(token))
                dispatch(setSignedIn())
                const userDetail = await getLoggedInUserDetail(token);

                //Uncomment and add user detail

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
        createAccount
    }
}

export default useAuth
