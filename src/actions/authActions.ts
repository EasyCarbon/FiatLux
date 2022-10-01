import { validAvalancheChains } from '../utils/Constants'
import { setAlertWarning } from './alertActions'
import {
  ACCOUNTS_ERROR,
  ACCOUNTS_FETCHED,
  evmErrorStatuses,
  FETCHING_LOCAL,
  SET_ALERT_WARNING,
} from './types'

export const connectWallet = async ({ auth, window, dispatch }: any) => {
  const { status } = auth

  if (typeof window.ethereum === 'undefined') {
    dispatch({ type: SET_ALERT_WARNING, payload: 'Please Install Metamask and Refresh the Page' })
  }

  const hasNoEthereum = status === ACCOUNTS_ERROR
  if (hasNoEthereum) return await getAccountsAction({
    window,
    method: 'eth_requestAccounts',
    dispatch
  })
}

export const setupAccounts = async ({ window, dispatch }: any) => {
  await getAccountsAction({
    window,
    method: 'eth_accounts',
    dispatch
  })
  if (window.ethereum) {
    window.ethereum.on('accountsChanged', (accounts: any) => {
      setAccount({ accounts, dispatch })
    })

    window.ethereum.on('chainChanged', () => {
      window.location.reload()
    })
  }
}

export const getAccountsAction = async ({
  window,
  method,
  contract,
  dispatch
}: any) => {
  const { ethereum } = window

  if (ethereum) {
    try {
      const accounts = await ethereum.request({ method })

      if (accounts.length) {
        setAccount({ accounts, contract, dispatch })
      } else {
        dispatch({ type: ACCOUNTS_ERROR, payload: evmErrorStatuses.NO_ACCOUNTS_FOUND });
      }
    } catch (error) {
      dispatch({ type: ACCOUNTS_ERROR, payload: error.code, });
      if (typeof window.ethereum !== 'undefined') {
        dispatch({ type: SET_ALERT_WARNING, payload: error.message })
      }
    }
  } else {
    dispatch({ type: ACCOUNTS_ERROR, payload: evmErrorStatuses.NO_ETHEREUM_FOUND })
  }
}

const setAccount = async ({ accounts, dispatch }: any) => {
  try {
    if (accounts.length === 0) {
      dispatch({
        type: ACCOUNTS_ERROR,
        payload: evmErrorStatuses.NO_ACCOUNTS_FOUND,
      })
    } else {
      dispatch({ type: ACCOUNTS_FETCHED, payload: accounts })
    }
  } catch (error) { dispatch({ type: ACCOUNTS_ERROR, payload: error }) }
}

//Util Action
export const setAuthLocalState = ({ auth }: any) => {
  const stringifiedAuthState = JSON.stringify(auth)
  localStorage.setItem('authState', stringifiedAuthState)
}

export const getLocalAuthState = ({ window, dispatch }: any) => {
  if (typeof window !== 'undefined') {
    const authStateString = localStorage.getItem('authState')
    if (authStateString !== ('undefined' || null)) {
      let authState = JSON.parse(authStateString)
      dispatch({
        type: FETCHING_LOCAL,
        payload: authState
      })
    }
  }
}

/* export const checkNetwork = ({ window, dispatch }) => {
  if (window.ethereum && window.ethereum.chainId) {
    if (!validAvalancheChains.includes(window.ethereum.chainId.toUpperCase())) {
      dispatch(setAlertWarning('Wrong network'))
    }
  }
} */

