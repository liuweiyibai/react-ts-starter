import iconMicOn0 from 'assets/images/icon-mic-on-0.png';
import iconMicOn20 from 'assets/images/icon-mic-on-20.png';
import iconMicOn40 from 'assets/images/icon-mic-on-40.png';
import iconMicOn60 from 'assets/images/icon-mic-on-60.png';
import iconMicOn80 from 'assets/images/icon-mic-on-80.png';
import iconMicOn100 from 'assets/images/icon-mic-on-100.png';
import iconMicOff from 'assets/images/icon-mic-off.png';
import iconMicDis from 'assets/images/icon-mic-dis.png';

const getCurrentIconSrc = (
  isDisable: boolean,
  microphoneLevel: number,
  microphoneIsOpen: boolean,
) => {
  if (isDisable) return iconMicDis;
  if (microphoneIsOpen) {
    if (microphoneLevel < 5) return iconMicOn0;
    if (microphoneLevel < 20) return iconMicOn20;
    if (microphoneLevel < 40) return iconMicOn40;
    if (microphoneLevel < 60) return iconMicOn60;
    if (microphoneLevel < 80) return iconMicOn80;
    if (microphoneLevel <= 200) return iconMicOn100;
  }
  return iconMicOff;
};

export { getCurrentIconSrc };
