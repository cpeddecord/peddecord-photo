import React from 'react';

export default function AboutPage () {
  function renderAboutContent() {
    return(
      <div>
        <p>Former professional dancer, comissioned choreographer, internationally published photographer, full-stack engineer with Nike. I also count spiders and artist's statments to be best friends and therefore not friends of mine.</p>

        <p>I'm currently not taking assignments from new clientele but feel free to reach out to me just in case at chris[at]peddecordphoto[dot]com.</p>
      </div>
    );
  }

  const bodyTextStyle = {
    padding: '15px'
  };

  const mediumHeadingStyle = {
    textAlign: 'center'
  }

  return (
    <div className='row'>

      <h2 style={mediumHeadingStyle} className='medium-12 show-for-medium'>About</h2>

      <div style={bodyTextStyle} className='medium-offset-1 medium-5 show-for-medium'>
        {renderAboutContent()}
      </div>

      <div className='medium-5 epic-hat'>
        <img src="https://prismic-io.s3.amazonaws.com/peddecordphoto%2F6aeed9cc-f9db-4857-8ff3-567619066d96_epichat.jpg" />
      </div>

      <div style={bodyTextStyle} className='small-12 medium-6 show-for-small-only'>
        <h1>About</h1>
        {renderAboutContent()}
      </div>

    </div>
  );
}
