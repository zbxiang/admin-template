import request from '@/utils/request'

export function createBook(blog) {
  return request({
    url: '/book/create',
    method: 'post',
    data: blog
  })
}
