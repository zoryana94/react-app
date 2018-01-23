import React from 'react';

export const Notification = props => {
  const { message, clearNotification } = props;
  const notificationStyle = {
    backgroundColor: 'lightblue',
    color: 'white',
    width: '100%',
    padding: '16px 0',
    textAlign: 'center',
    fontSize: '16px',
    position: 'relative',
  };
  const closeBtnStyle = {
    color: 'white',
    fontSize: '20px',
    cursor: 'pointer',
    position: 'absolute',
    right: '20px'
  };

  return (
    <div style={notificationStyle}>
      { message }
      <span style={closeBtnStyle} onClick={clearNotification}>x</span>
    </div>
  );
}
