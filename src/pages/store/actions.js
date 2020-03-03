import {actionTypes,mutationsTyps} from './mutation-type'
import {list_data,otherVideoInfoData,commentListData} from '../../datas/list-datas'

export default {
  [actionTypes.getList]: ({commit})=>{
    //触发mutations
    commit(mutationsTyps.receive_list,list_data)
  },
  [actionTypes.getMoviesListData]: ({commit},dataObj)=>{
    //触发mutations
    commit(mutationsTyps.setMoviesListData,dataObj)
  },
  [actionTypes.getMoviesList]:({commit},index)=>{
    commit(mutationsTyps.setMoviesList,index)
  },
  [actionTypes.getPlayMoviesData]:({commit},playObj)=>{
    commit(mutationsTyps.setPlayMoviesData,playObj)
  },
  [actionTypes.getOtherVideoData]:({commit})=>{
    commit(mutationsTyps.setOtherVideoData,otherVideoInfoData)
  },
  [actionTypes.getCommentListData]:({commit})=>{
    console.log("commentListData",commentListData)
    commit(mutationsTyps.setCommentListData,commentListData)
  },

}