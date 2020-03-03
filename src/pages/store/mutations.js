import {mutationsTyps} from './mutation-type'
export default {
  [mutationsTyps.receive_list]: (state,list_data) => {
    state.listTmp=list_data
  },
  [mutationsTyps.setMoviesListData]: (state,dataObjs) => {
    state.moviesDataList=dataObjs
  },
  [mutationsTyps.setMoviesList]: (state,index) => {
    state.currentMoviesData=state.moviesDataList[index]
  },
  [mutationsTyps.setPlayMoviesData]: (state,playObj) => {
    state.videoInfo=playObj.videoInfoData
  },
  [mutationsTyps.setOtherVideoData]: (state,otherVideoObj) => {
    state.recommendVideoInfo= otherVideoObj
  },
  [mutationsTyps.setCommentListData]: (state,commentListData) => {
    state.commentListData= commentListData
    console.log(state.commentListData)
  }
}