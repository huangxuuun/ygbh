import request from "../utils/request.js";

//收藏资源
export function likeItem({ id, action }) {
  return request({
    url: "/resource/like",
    method: "POST",
    data: {
      id,
      action, //操作 1 收藏 2 取消收藏
    },
    loading: true, //是否开启loading动画
  });
}
//解锁资源
export function unlockItem({ id }) {
  return request({
    url: "/resource/unlock",
    method: "POST",
    data: {
      id,
    },
    loading: true, //是否开启loading动画
  });
}
//资源详情
export function resourceDetail({ id }) {
  return request({
    url: "/resource/detail",
    method: "POST",
    data: {
      id: Number(id),
    },
    loading: true, //是否开启loading动画
  });
}

// 获取已收藏的资源
export function getLikeList({ pageOffset }) {
  return request({
    url: "/resource/liked",
    method: "POST",
    data: {
      pageOffset,
    },
    loading: true, //是否开启loading动画
  });
}
// 获取资源列表
export function getList({ sort, pageOffset, pageSize, sessionId }) {
  return request({
    url: "/resource/page",
    method: "POST",
    data: {
      sort,
      pageOffset,
      pageSize,
      sessionId,
    },
    loading: true, //是否开启loading动画
  });
}

//已解锁的资源
export function getUnlockedList({ sort, pageOffset, pageSize, sessionId }) {
  return request({
    url: "/resource/unlocked",
    method: "POST",
    data: {
      pageOffset,
    },
    loading: true, //是否开启loading动画
  });
}
