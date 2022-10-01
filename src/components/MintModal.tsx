import { Badge, Box, Button, Divider, Heading, HStack, Image, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Stack, Stat, StatHelpText, StatLabel, StatNumber, Tag, Text, Wrap } from "@chakra-ui/react";
import { useState } from "react";

export default function MintModal(props: any) {
    const parse = (val) => val.replace(/^\$/, '')
    const [amount, setAmount] = useState(1)
    return (
        <Tag p={2}>
            <Stack>
                <Stack>
                    <Heading size={'md'}>{props.name}</Heading>
                    <Text children={props.description} />
                    <Divider />
                    <Stat size={'xs'}>
                        <HStack><StatLabel>Unit Price</StatLabel>
                            <StatNumber>0.00 AVAX</StatNumber></HStack>
                    </Stat>
                    <HStack maxW={'250px'}>
                        <Wrap>{props.attributes.map((item, index) =>
                            <Badge key={index} colorScheme={item.value > 0 ? 'green' : 'red'}>
                                {item.trait_type.slice(0, -6)}</Badge>)}</Wrap>
                    </HStack>
                    <Box boxSize='250px'>
                        <Image src={props.image} alt={props.name} />
                    </Box>
                </Stack>
                <HStack w='250px' justify={'space-between'}>
                    <NumberInput defaultValue={1} min={0} max={props.amount}
                        onChange={(x) => setAmount(parse(x))}>
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                    <Button children='Mint' disabled={amount <= 0} />
                </HStack>
            </Stack>
        </Tag>
    )
}