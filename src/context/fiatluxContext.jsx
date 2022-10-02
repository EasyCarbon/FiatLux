import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react'
import { ethers } from 'ethers'
import fiatluxContract from '../abi/fiatLux.json'
import { useDispatch, useSelector } from 'react-redux'
import { setAlertSuccess, setAlertWarning } from '../actions/alertActions'
import compressAddress from '../utils/compressAddress'

const FiatluxContext = createContext()

export const FiatluxProvider = ({ children }) => {
    const dispatch = useDispatch()
    const auth = useSelector(x => x.auth)
    // Create a state variable to hold an instance of the Avaxbox contract
    const [contractInterface, setContractInterface] = useState(null)

    useEffect(() => {
        // If user is connected to site via MetaMask
        if (auth.data.length) {
            // Get the current provider (defaults to the currently selected network)
            const provider = new ethers.providers.Web3Provider(window.ethereum)

            // Get the signer (defaults to the currently selected account)
            const signer = provider.getSigner()

            // This address will be different for every network
            const contractAddress = '0x97f04C80285cDBba333f40ed9dDd92BDF2B7316a'
            // Initialise the contract instance
            const contract = new ethers.Contract(
                contractAddress,
                fiatluxContract.abi,
                signer
            )

            // Store this instance in the state
            setContractInterface(contract)
            /* console.log(contract) */
        }
    }, [auth.data])

    const mintNft = useCallback(
        async ({ amount, onSuccess, onError }) => {
            let numberOfTokens = amount
            try {
                const tx = await contractInterface.mintNFT(
                    numberOfTokens
                )
                // We have to wait for the transaction to be mined and added to a block
                await tx.wait()
                dispatch(setAlertSuccess('You have successfully Minted!'))
                if (onSuccess && typeof onSuccess === 'function') onSuccess(tx)
            } catch (error) {
                dispatch(setAlertWarning('Mint Failed!'))
                if (onError && typeof onError === 'function') onError(error)
            }
        },
        [contractInterface]
    )

    const getTokensOfOwner = useCallback(
        async ({ onSuccess, onError }) => {
            let address = auth.data[0]
            let startIndex = 0
            let endIndex = 10
            try {
                const tx = await contractInterface.tokensOfOwner(
                    address,
                    startIndex,
                    endIndex
                )

                if (onSuccess && typeof onSuccess === 'function') onSuccess(tx)
            } catch (error) {
                if (onError && typeof onError === 'function') onError(error)
            }
        },
        [contractInterface]
    )
    /*     export function getTotalSupply() {
        
        }
        export function getTokensOfOwner() {
        
        } 

    const sendMessage = useCallback(
        async ({ messageData, onSuccess, onError }) => {
            try {
                const { receiver, text, value } = messageData
                const timestamp = Date.now()
                const overrides = {}

                // If user is sending some AVAX
                if (value) {
                    overrides.value = utils.parseEther(value)
                }

                const tx = await contractInterface.sendMessage(
                    receiver,
                    text,
                    timestamp,
                    overrides
                )
                // We have to wait for the transaction to be mined and added to a block
                await tx.wait()

                if (onSuccess && typeof onSuccess === 'function') onSuccess(tx)
            } catch (error) {
                if (onError && typeof onError === 'function') onError(error)
            }
        },
        [contractInterface]
    )

    const getNumOfMessages = useCallback(
        async ({ onSuccess, onError }) => {
            try {
                const tx = await contractInterface.getNumOfMessages()
                const numOfMessages = tx.toNumber()

                if (onSuccess && typeof onSuccess === 'function')
                    onSuccess(numOfMessages)
            } catch (error) {
                if (onError && typeof onError === 'function') onError(error)
            }
        },
        [contractInterface]
    )

    const getOwnMessages = useCallback(
        async ({ startIndex, count, onSuccess, onError }) => {
            try {
                const tx = await contractInterface.getOwnMessages(startIndex, count)

                const ownMessages = tx
                    .map(({ id, timestamp, receiver, sender, text, valueInWei }) => {
                        const date = new Date(timestamp.toNumber())

                        const formattedValueInnAvax = valueInWei.toString()
                        const parsedValueInAVAX = utils
                            .formatEther(formattedValueInnAvax)
                            .toString()

                        return {
                            id: id.toNumber(),
                            date,
                            receiver,
                            sender,
                            text,
                            value: parsedValueInAVAX,
                        }
                    })
                    .sort((txA, txB) => {
                        if (txA.date < txB.date) return 1
                        if (txA.date > txB.date) return -1
                        return 0
                    })

                if (onSuccess && typeof onSuccess === 'function') onSuccess(ownMessages)
            } catch (error) {
                if (onError && typeof onError === 'function') onError(error)
            }
        },
        [contractInterface]
    )
    */
    const contextData = {
        contractInterface,
        mintNft,
        getTokensOfOwner
    }

    return (
        <FiatluxContext.Provider value={contextData}>
            {children}
        </FiatluxContext.Provider>
    )
}

export const useFiatluxContext = () => useContext(FiatluxContext)
