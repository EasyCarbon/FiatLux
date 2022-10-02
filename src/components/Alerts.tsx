import { Alert, AlertIcon, Box, CloseButton, Stack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAlertAll, setAlertError, setAlertInfo, setAlertSuccess, setAlertWarning } from "../actions/alertActions";

export default function Alerts() {
    let alerts = useSelector((state: any) => state.alerts)
    let dispatch = useDispatch()

    useEffect(() => {
        setTimeout(() => {
            if (alerts.error) dispatch(setAlertError(null))
            if (alerts.success) dispatch(setAlertSuccess(null))
            if (alerts.info) dispatch(setAlertInfo(null))
            if (alerts.warning) dispatch(setAlertWarning(null))
        }, 1000 * 3);
    }, [alerts])

    function AlertModal({ status, rKey, source, close }) {
        return <Alert w='100%'
            justifyContent='space-between' status={status} variant='solid'>
            <AlertIcon />
            {source[rKey]}
            <CloseButton
                onClick={() => {
                    const { [rKey]: _, ...newObj } = source;
                    dispatch(close(newObj))
                }
                }
            />
        </Alert>
    }

    function MapAlerts() {
        return <Box>{Object.keys(alerts).map((key, index) => {
            let status: any = key
            if (alerts[key]) return <AlertModal key={index} source={alerts}
                rKey={key} status={status} close={setAlertAll} />
        })}</Box>
    }

    let renderCon = alerts.warning || alerts.info || alerts.success || alerts.error
    return (
            <Stack display={!renderCon && 'none'} spacing='-1' position={'sticky'} zIndex={'4'} top='0' w='100%'>
                <MapAlerts />
            </Stack>
    )
}