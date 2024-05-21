import React from 'react'

const UserInfoCxt = React.createContext({name: 'aji', authToken: 'oiwufee'})

const { Provider, Consumer } = UserInfoCxt

export {
  Provider, Consumer
}

window.jj = UserInfoCxt
console.log(UserInfoCxt, 'jjj')
