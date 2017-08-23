import React from 'react';

import img from './spinner.svg';

const styles = {
  img: {
    width: 70
  }
}

const Spinner = () => {
  return (
    <div className='text-center'>
      <img src={ img } alt='Loading' style={styles.img} />
    </div>
  );
}

export default Spinner;
