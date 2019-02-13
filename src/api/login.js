import request from '@/utils/request'

export function login(username, password,captcha) {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      username,
      password,
      captcha
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'post',
    data: {
      token
    }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
