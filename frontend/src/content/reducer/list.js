const list = (state=[], action) => {
    switch (action.type) {

        // init user, admin , commodity
        case 'INIT':
            return action.res;

        case 'FETECH_DATA_BEGIN':
            return {
                loading: true
            };

        case 'FETECH_DATA_SUCCESS':
            return { 
                ...action.payload[0],
                loading: false,
            };

        // homepage
        case 'tFETECH_DATA_BEGIN':
            return {
                loading: true
            };

        case 'tFETECH_DATA_SUCCESS':
            return { 
                payload: action.payload,
                loading: false,
            };


        // Add user                
        case 'ADD_ITEM': 
            return [
                ...state,
                {
                    id: action.id,
                    username: action.username,
                    phone: action.phone
                }
            ]
        
        // Delete list item
        case 'DEL_ITEM':
            return state.filter(element => element.id !== action.id)
        
        default:
            return state

        // Test
        case 'TEST_INIT':
            return {
                loading: true
            }

        case 'TEST_INIT_SUCCESS':
            return {
                loading: false,
                payload: action.payload
            }
    }
}

export default list;