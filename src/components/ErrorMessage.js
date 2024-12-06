import React from 'react';
import { Alert } from '@mui/material';
import { useSpring, animated } from 'react-spring';

const ErrorMessage = ({ message }) => {
  const animation = useSpring({
    from: { opacity: 0, transform: 'translateY(-20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 280, friction: 20 },
  });

  return (
    <animated.div style={animation}>
      <Alert 
        severity="error"
        sx={{ width: '100%' }}
        role="alert"
      >
        {message}
      </Alert>
    </animated.div>
  );
};

export default ErrorMessage;
