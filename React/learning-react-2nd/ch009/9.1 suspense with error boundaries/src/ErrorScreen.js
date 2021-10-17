import React from 'react';

export function ErrorScreen({error}) {
  // 여기서 메시지를 렌더링하기 전에 오류를 추적하거나 처리할 수 있다
  return (
    <div className="error">
      <h3>We are sorry... something went wrong</h3>
      <p>We cannot process your request at this moment.</p>
      <p>ERROR: {error.message}</p>
    </div>
  );
}
