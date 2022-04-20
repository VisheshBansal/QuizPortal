import { client } from './axiosClient'

export const signUp = async (name, email, pwd) => {
  const data = {
    name: name,
    email: email,
    password: pwd
  }

  const config = {
    headers: { }
  }

  const res = await client.post('/user/signup', data, config)
  localStorage.setItem("token", res.data.token);
  return res.data
}


export const login = async (email, pwd) => {
  const data = {
    email: email,
    password: pwd
  }

  const config = {
    headers: { }
  }

  const res = await client.post('/user/login', data, config)
  localStorage.setItem("token", res.data.token);
  return res.data
}

export const logout = () => {
  localStorage.removeItem("token");
}

export const isLoggedIn = () => {
  if (typeof window !== 'undefined')
    return localStorage.getItem("token") !== null;
}
