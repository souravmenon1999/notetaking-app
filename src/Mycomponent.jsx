import React from 'react';

function MyComponent() {
  const myData = JSON.parse(localStorage.getItem("notes"));
  console.log(myData);
  console.log('poda');

  return (
    <div>
      {/* your component code here */}
    </div>
  );
}

export default MyComponent;
