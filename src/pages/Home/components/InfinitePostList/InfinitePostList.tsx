import React, {ReactElement} from 'react'
import { useSelector } from 'react-redux';
import { AppState } from '../../../../app/state.type';
import PostSkeleton from '../../../../components/SkeletonLoading/PostSkeleton';
import { usePostItem } from '../../hooks/usePostItem';
import LazyLoad from 'react-lazyload';
import PostItem from '../PostItem/PostItem';
import { useInfinitePostList } from './useInfinitePostList';

const InfinitePostList = ():ReactElement => {
  // global state
  const {listPost} =useSelector((state: AppState)=>{
    return state.home;
  })

  // hook
  const { showDetail, handleLikePost } = usePostItem();
  const {isLoading, isLastPost} = useInfinitePostList()

  return(
    <>
      {listPost.map((post: any, index: number) => {
        return (
          <LazyLoad key={index} offset={500} placeholder={<PostSkeleton></PostSkeleton>}>
            <PostItem
              key={index}
              post={post}
              handleLikePost={handleLikePost}
              showDetail={showDetail}
            />
          </LazyLoad>
        );
      })}
      {isLoading && <div><PostSkeleton/></div>}
      {isLastPost && <div>No more posts</div>}
    </>
  )
}

export default InfinitePostList;