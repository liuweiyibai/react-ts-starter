// 课程信息
export interface ICourseData {
  preLiveCourse?: {
    id?: number;
    courseName?: string;
    teacherId?: string;
    roomId?: string;
    conversationId?: string;
    subId?: number;
    liveAt?: string;
    liveDuration?: number;
    flag?: number;
  };
  liveRoomId?: string;
  liveRoomName?: string;
  liveMainStreamId?: string;
  liveMainStreamName?: string;
  liveAuxStreamId?: string;
  liveAuxStreamName?: string;
  liveMixStreamId?: string;
  liveMixStreamName?: string;
  liveUserId?: string;
}

export type ICourseDataType = ICourseData | null;

// 流类型
export interface IStreamType {
  cameraStream: string;
  screenStream: string;
}
