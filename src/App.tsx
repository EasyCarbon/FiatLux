//Libraries
import { Route, Routes, useLocation } from 'react-router-dom';
import {
  Box,
  Flex,
  ChakraProvider
} from "@chakra-ui/react";
//Components
import { Alerts, Navbar, ViewHeader } from './components';
//Views
import { NotFound, Receipts, Mint, Minted } from './pages';
//Styles
import './App.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLocalAuthState, setAuthLocalState, setupAccounts } from './actions/authActions';

function App() {
  const [count, setCount] = useState(0)
  const location = useLocation()
  let path = location.pathname

  const dispatch: any = useDispatch();
  const auth = useSelector((x: any) => x.auth)

  useEffect(() => {
    if (count <= 0) { /* checkNetwork({ window, dispatch }); */ getLocalAuthState({ auth, window, dispatch }); setCount(x => x + 1); }
    setupAccounts({ window, dispatch })
    return () => {
      setAuthLocalState(auth)
    }
  }, [auth.isHydrated])

  return (
    <ChakraProvider>
      <Box className='App'>
        <Flex ml='auto' mr='auto' minH='calc(100% - 100px)' maxW='620px' direction='column' align={'center'} >
          <Alerts />
          <ViewHeader path={path} />
          <Routes>
            <Route path='*' element={<NotFound />} />
            <Route path='/' element={<Mint />} />
            <Route path='/minted' element={<Minted />} />
            <Route path='/history' element={<Receipts />} />
          </Routes>
        </Flex>
        <Navbar path={path} />
      </Box>
    </ChakraProvider >
  );
}

export default App;
