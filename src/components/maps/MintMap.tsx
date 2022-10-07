import { Flex, HStack, Stack } from "@chakra-ui/react";
import { MintModal } from "..";
import { MINT_ITEMS } from "./mocks";

export default function MintMap(props: any) {
    return (
        <HStack gap={3}>
            {MINT_ITEMS.length <= 0 ? <Flex fontSize='xl' flex='1' justify='center'>
                There is no listings yet.
            </Flex> : MINT_ITEMS.map((item, index) =>
                <MintModal key={index} {...item} />)}
        </HStack>
    )
}