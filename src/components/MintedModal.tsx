import { Text, Button, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Stack, useDisclosure, Badge, Box, Image, TagLabel, Tag, Avatar, InputGroup, InputLeftAddon, Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import { useState } from "react";

export default function MintedModal(props: any) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const parse = (val) => val.replace(/^\$/, '')
    const [address, setAddress] = useState('')
    const [amount, setAmount] = useState(1)

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{props.name} <Badge ml={2} fontSize='1em' children={`( X${props.amount} )`} /></ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack align={'center'}>
                            <Stack><Text children={props.description} />
                                <HStack>{props.attributes.map((item, index) =>
                                    <Badge key={index} colorScheme={item.value > 0 ? 'green' : 'red'}>
                                        {item.trait_type.slice(0, -6)}</Badge>)}</HStack></Stack>
                            <Box boxSize='250px'>
                                <Image src={props.image} alt={props.name} />
                            </Box>
                            <InputGroup size={'sm'} w='250px'>
                                <InputLeftAddon children='To' />
                                <Input id='address' value={address} onChange={(x) => setAddress(x.target.value)} placeholder='0x000000000000...' />
                            </InputGroup>
                            <HStack w='250px' justify={'space-between'}>
                                <Button colorScheme={'orange'} children='Burn' disabled={amount <= 0} />
                                <NumberInput defaultValue={1} min={0} max={props.amount}
                                    onChange={(x) => setAmount(parse(x))}>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                                <Button colorScheme={'blue'} children='Send' disabled={address.length <= 41} />
                            </HStack>
                        </Stack>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose} children='Close' />
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Tag gap={1} p={4}>
                <Stack>
                    <Avatar
                        src={props.image}
                        size='md'
                        name={props.name}
                        ml={-1}
                        mr={2}
                    />
                    <Stat size={'xs'}>
                        <StatLabel>Unit Price</StatLabel>
                        <StatNumber>0.00 AVAX</StatNumber>
                    </Stat>
                </Stack>
                <Stack align={'center'}>
                    <TagLabel children={props.name} />
                    <Badge fontSize='1em' w={'max-content'} children={`( X${props.amount} )`} />
                    <Button w={'max-content'} colorScheme={'blue'} size={'xs'} onClick={onOpen}>View</Button>
                </Stack>
            </Tag>
        </>
    )
}