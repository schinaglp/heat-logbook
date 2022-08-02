import React from 'react';

const Error = ({ text }) => {
    return (
        <div className='error'>
            {text}
        </div>
    );
  }

  Error.defaultProps = {
    text: 'Ein Fehler ist aufgetreten!',
  }

  export default Error