import React from 'react';
import InlineCss from 'react-inline-css';
import Helmet from 'react-helmet';

export default function ErrorPage (props) {
    const styles = `
      & .error {
        text-align: center;
        margin: 20px 0;
        padding: 0 15px;
      }
    `;

    return (
      <InlineCss stylesheet={styles}>
        <Helmet title='Error Encountered' />
        <div className='error'>
          <h1>Error</h1>
          <h5>Looks like there was an error fetcing {props.type}, please try again in a few moments...</h5>
        </div>
      </InlineCss>
    );
}
