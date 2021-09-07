const setOutAudioDevices = (element: any, sinkId: any) => {
  return new Promise((resolve, reject) => {
    if (typeof element.sinkId !== 'undefined') {
      element
        .setSinkId(sinkId)
        .then(() => {
          console.log(
            `Success, audio output device attached: ${sinkId} to element with ${element.title} as source.`,
          );
          resolve(true);
        })
        .catch((error: any) => {
          let errorMessage = error;
          if (error.name === 'SecurityError') {
            errorMessage = `You need to use HTTPS for selecting audio output device: ${error}`;
          }
          console.error(errorMessage);
          reject(errorMessage);
        });
    } else {
      console.warn('Browser does not support output device selection.');
    }
  });
};

export { setOutAudioDevices };
