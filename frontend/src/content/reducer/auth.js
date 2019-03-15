const auth = (state={}, action) => {
    switch (action.type) {
        case 'LOGOUT':
         return {
             username: '',
             logged: false,
             level: '',
             id: -1
         }
        
        case 'LOGIN': 
         return {
             logged: true,
             username: action.username,
             level: action.level,
             id: action.id
         }
        default:
         return state
    }
}

export default auth;