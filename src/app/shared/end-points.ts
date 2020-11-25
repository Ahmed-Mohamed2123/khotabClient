const prefixRoute = 'https://server-api2.herokuapp.com/api';
export const ApiEndpoints = {
  AuthEndPoints: {
    getUserInfo: `${prefixRoute}/user/UserInfo`,
    loginAdmin: `${prefixRoute}/user/login`,
    signupUser: `${prefixRoute}/user/signup`,
    forgotPassword: `${prefixRoute}/user/forgot-password`,
    resetPassword: `${prefixRoute}/user/reset-password`
  },
  VideoEndPoints: {
    addVideo: `${prefixRoute}/video/add`,
    deleteVideo: `${prefixRoute}/video/delete`,
    updateVideo: `${prefixRoute}/video/update`,
    getAllVideos: `${prefixRoute}/video/getAll`,
    getVideoById: `${prefixRoute}/video/getById`
  },
  AudioEndPoints: {
    addAudio: `${prefixRoute}/audio/add`,
    deleteAudio: `${prefixRoute}/audio/delete`,
    updateAudio: `${prefixRoute}/audio/update`,
    getAllAudio: `${prefixRoute}/audio/getAll`,
    getAudioById: `${prefixRoute}/audio/getById`
  }
};
