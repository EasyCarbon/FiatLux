import { Flex } from "@chakra-ui/react";
import { ReceiptMap } from "../components";

export default function Receipts() {
    return (
        <Flex w='100%' direction='column'>
            <ReceiptMap maxW='1024px' w='100%' m='auto' pt={4} />
        </Flex>
    )
}