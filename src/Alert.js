import React, { useEffect } from 'react';

const Alert = ({type , msg , removeAlert , list}) => {
 
    useEffect(() => {
      setTimeout(() => {
        removeAlert();
      },3000);
      return () => clearInterval();
    }, [ list ]);

    return (
        <div>
            <p className={`alert alert-${type}`}>{msg}</p>
        </div>
    );
};

export default Alert;