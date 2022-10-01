import { Accordion, Flex } from "@chakra-ui/react";
import AccordionReceipt from "../AccordionReceipt";
import { ACCORDION_ITEMS } from "./mocks";

export default function ReceiptMap(props: any) {
    return (
        <Accordion {...props} allowToggle>
            {ACCORDION_ITEMS.length <= 0 ? <Flex fontSize='xl' flex='1' justify='center'>
                You don't have any receipts yet.
            </Flex> : ACCORDION_ITEMS.map((item, index) =>
                <AccordionReceipt key={index} {...item} />)}
        </Accordion>
    )
}