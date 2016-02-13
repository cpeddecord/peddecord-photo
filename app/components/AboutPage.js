import React from 'react';

export default function AboutPage () {
  function renderAboutContent() {
    return(
      <div>
        <h2>About</h2>
        <p>Wholly disinterested in artist statments, Chris prefers to create work.</p>
      </div>
    );
  }

  const bodyTextStyle = {
    padding: '15px'
  };

  return (
    <div className='row'>

      <div style={bodyTextStyle} className='small-12 medium-6 show-for-medium'>
        {renderAboutContent()}
      </div>

      <div className='small-12 medium-6 epic-hat'>
        <img src="http://localhost:9000/epichat.jpg" />
      </div>

      <div style={bodyTextStyle} className='small-12 medium-6 show-for-small-only'>
        {renderAboutContent()}
      </div>

    </div>
  );
}
