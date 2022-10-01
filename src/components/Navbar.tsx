import { Box, Flex, Text, IconButton, Collapse, Link, useDisclosure, Button, useColorMode, Icon, useColorModeValue } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';
import { ReceiptIcon, ViewIcon } from './';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

export default function Navbar({ path }: any) {
  const { isOpen, onToggle } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Box w='100%' h='max-content' position={'fixed'} zIndex={'2'} bottom='-1'>
      {/*Extra and Misc*/}
      <Collapse in={isOpen} animateOpacity >
        <Flex justify='center' bg={'gray.700'} p='3'>
          <Flex direction='row-reverse' w='100%' maxW='620px'>
            <Button onClick={toggleColorMode}>
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>
            <Flex flex={1}>
              <Button as={Link} href='/' children='Information' />
            </Flex>
          </Flex>
        </Flex>
      </Collapse>
      {/*Navbar*/}
      <Flex p='0 1.2rem' borderRadius={!isOpen ? '1rem 1rem 0 0' : '0'} textAlign='center'  color={'white'}
        bgGradient='linear(to-r, teal.500, green.500)' h='100px' justifyContent='center'>
        {/*Buttons*/}
        <Flex align='center' justify='space-between' maxW='620px' w='100%'>
          <Link href='#/' color={path === '/' && 'blue.300'} bg={`rgba(255, 255, 255, ${path === '/' ? '0.8' : '0.08'})`} p={2} pr={2}borderRadius='1rem'>
            <Icon as={EditIcon} h='6' w='6' />
            <Text fontSize='xs'>mint</Text>
          </Link>
          <Link href='#/minted' color={path === '/minted' && 'blue.300'} bg={`rgba(255, 255, 255, ${path === '/minted' ? '0.8' : '0.08'})`} p={2} pr={2}borderRadius='1rem'>
            <ViewIcon h='6' w='6' />
            <Text fontSize='xs'>minted</Text>
          </Link>
          {/* <Link href='#/history' color={path === '/history' ? 'blue.300' : 'white'}>
            <ReceiptIcon h='6' w='6' />
            <Text fontSize='xs'>history</Text>
          </Link > */}
          <IconButton onClick={onToggle}
            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w='6' h='6' />}
            variant='ghost'
            aria-label={'Toggle Navigation'} />
        </Flex>
      </Flex>
    </Box>
  );
}