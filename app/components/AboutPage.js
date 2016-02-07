import React from 'react';

export default function AboutPage () {
  function renderAboutContent() {
    return(
      <div>
        <h2>About</h2>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut sollicitudin nulla, eu rutrum eros. Phasellus auctor ante in enim malesuada ornare. Donec et consectetur ipsum. Nam vel lacus vitae enim suscipit auctor non ornare eros. Nulla rutrum luctus mi, ac convallis diam suscipit at. Praesent interdum orci quis orci sollicitudin, at lacinia augue semper. Suspendisse imperdiet orci ante, vel malesuada lacus finibus eu.

Nam scelerisque dui elit, et tristique enim posuere vel. Praesent consequat varius porta. Integer facilisis in quam non accumsan. Suspendisse ac felis massa. Quisque blandit et magna a ultrices. Donec sed ullamcorper tortor. Morbi consectetur tellus neque, sed posuere velit ultrices vel. Cras et pretium libero, sed semper tellus. Proin consectetur, velit id vehicula fringilla, est urna faucibus nibh, auctor interdum lacus risus sit amet erat. Nam facilisis hendrerit dui non rhoncus. Duis ac luctus tellus. Nulla facilisi. Fusce vel leo risus.

Aliquam vel pharetra felis. Vestibulum facilisis felis velit, vitae pellentesque sem maximus in. Phasellus vitae lacus eu augue ultricies tempus. Cras sed erat rutrum, mollis mi vitae, pulvinar augue. Nunc dignissim tortor in pretium scelerisque. Nunc eu iaculis diam. Pellentesque efficitur dui sapien, sit amet dignissim purus rhoncus vel. Nulla sagittis tristique lacus, tempor ultricies arcu dictum a. Pellentesque id magna nisi. Nunc rutrum porttitor aliquam. Integer iaculis ultricies lorem et malesuada. Etiam sed tellus sit amet ex tincidunt suscipit. Etiam fermentum sollicitudin egestas. Fusce faucibus, tellus quis ullamcorper blandit, dui felis dapibus massa, sed feugiat nisl arcu at arcu.

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
        <img src="http://localhost:3000/epichat.jpg" />
      </div>

      <div style={bodyTextStyle} className='small-12 medium-6 show-for-small-only'>
        {renderAboutContent()}
      </div>

    </div>
  );
}
