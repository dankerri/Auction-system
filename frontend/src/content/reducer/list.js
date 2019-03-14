const list = (state=[], action) => {
    switch (action.type) {
//==========================================================
// generate list
        // init user, admin , commodity
        case 'INIT':
            return action.res;
        
        // Delete list item
        case 'DEL_ITEM':
            return state.filter(element => element.id !== action.id)
        
        default:
            return state




// ========================================================
// homepage
        // INIT homepage
        case 'HOME_INIT':
            return {
                loading: true
            }

        case 'HOME_INIT_SUCCESS':
            return {
                loading: false,
                payload: action.payload
            }



//=========================================================
// user profile
        // Get user Profile
        case 'GET_PROFILE':
            return {
                loading: true,
            }
        case 'GET_PROFILE_SUCCESS':
            return {
                loading: false,
                payload: action.payload
            }







// END OF THE SWITCH
    }
}






export default list;