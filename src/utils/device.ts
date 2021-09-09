export const setOutAudioDevices = (element: any, sinkId: any) => {
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

export const getCameraPermission = async () => {
  try {
    const mediastream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true,
    });
    mediastream.getTracks().forEach(track => {
      track.stop();
    });
  } catch (error: any) {
    if (String(error).indexOf('Permission denied') !== -1)
      throw new Error('权限错误');
  }
};

export const getAudioPermission = async () => {
  try {
    const mediastream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });

    mediastream.getTracks().forEach(track => {
      track.stop();
    });
  } catch (error: any) {
    if (String(error).indexOf('Permission denied') !== -1)
      throw new Error('权限错误');
  }
};
