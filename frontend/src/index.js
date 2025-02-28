import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from './contextapi/authContext';
import { TeacherProvider } from './contextapi/teacherContext';
import { FeedProvider } from './contextapi/feedContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <TeacherProvider>
   <FeedProvider>
   <AuthProvider>
    <ChakraProvider>
    <React.StrictMode>
    <App />
  </React.StrictMode>
  </ChakraProvider>
  </AuthProvider>
   </FeedProvider>
  </TeacherProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
