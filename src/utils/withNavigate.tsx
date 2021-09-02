import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function withNavigate<T>(Component: React.ComponentType<T>) {
  return function (props: T) {
    return <Component {...props} navigate={useNavigate()} />;
  };
}
