import { Flex, Stack } from "@chakra-ui/react";
import { MintedModal } from "..";
import { MINTED_ITEMS } from "./mocks";

export default function MintedMap(props: any) {
    return (
        <Stack>
            {MINTED_ITEMS.length <= 0 ? <Flex fontSize='xl' flex='1' justify='center'>
                Unfortunetly you don't own any Fiat Lux NFT's.
            </Flex> : MINTED_ITEMS.map((item, index) =>
                <MintedModal key={index} {...item} />)}
        </Stack>
    )
}