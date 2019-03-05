const auth = (state={}, action) => {
    switch (action.type) {
        case 'LOGOUT':
         return {
             username: '',
             logged: false,
             level: ''
         }
        
        case 'LOGIN': 
         return {
             username: action.username,
             logged: true,
             level: action.level
         }
        default:
         return state
    }
}

export default auth;