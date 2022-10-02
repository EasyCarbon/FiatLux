import { Flex, Stack } from "@chakra-ui/react";
import { useEffect } from "react";
import { MintedModal } from "..";
import { useFiatluxContext } from "../../context/fiatluxContext";
import { MINTED_ITEMS } from "./mocks";

export default function MintedMap(props: any) {
    const { getTokensOfOwner } = useFiatluxContext()
    useEffect(() => {
        getTokensOfOwner({})
    }, [])
    return (
        <Stack>
            {MINTED_ITEMS.length <= 0 ? <Flex fontSize='xl' flex='1' justify='center'>
                Unfortunetly you don't own any Fiat Lux NFT's.
            </Flex> : MINTED_ITEMS.map((item, index) =>
                <MintedModal key={index} {...item} />)}
        </Stack>
    )
}