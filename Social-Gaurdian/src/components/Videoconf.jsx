import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

const Videoconf = () => {
  const { id } = useParams();
  const meetingRef = useRef(null);

  useEffect(() => {
    const appID = 97713316;
    const serverSecret = "a76315afe40436bab383eb0d61d9b1a0";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      id,
      Date.now().toString(),
      "Anand Gupta"
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);

    zp.joinRoom({
      container: meetingRef.current,
      sharedLinks: [
        {
          name: 'Personal link',
          url: `${window.location.protocol}//${window.location.host}/room/${id}`,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall,
      },
    });
  }, [id]);

  return <div ref={meetingRef} style={{ width: '100vw', height: '100vh' }} />;
};

export default Videoconf;
