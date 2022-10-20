const initialState = {
    dogs: [],
    allDogs: [],
    temps:[],
    detail:[],
}

export default function rootReducer(state = initialState, action){
switch (action.type) {
    case 'GET_DOGS':
        return {
            ...state,
            dogs: action.payload,
            allDogs: action.payload
        }
    case 'GET_TEMPS':
        return {
            ...state,
            temps: action.payload
        }
    case 'FIND_DOGS':
        return {
            ...state,
            allDogs: action.payload,
        }
    case 'GET_ID_DETAIL':
        return {
            ...state,
            detail: action.payload
        }
    case 'POST_DOG':
        return {
            ...state
        }
    case 'DELETE_DOG':
      return{
        ...state
      }
    case 'FILTER_DB':
        const all_Dogs = state.allDogs;
        const filteredDb = all_Dogs.filter(dog=> dog.createdInDb)
        if(filteredDb.length){
          return {
            ...state,
            allDogs: filteredDb
        }
        }
        else{
          alert("No dogs created")
          break;
        }  
    case 'FILTER_API':
        const allDogs2 = state.allDogs;
        const filteredApi = allDogs2.filter(d=>!d.createdInDb)
        return {
            ...state,
            allDogs: filteredApi
        }
    case 'FILTER_TEMP':
      const filterDogs = state.allDogs.filter((dog) =>
        dog.temperament?.includes(action.payload)
      );

      return {
        ...state,
        allDogs: filterDogs,
      };
    case 'ORDER_NAME':
        const orderName = action.payload === 'asc' ?
        state.dogs.sort((a,b)=>{
            if(a.name.toLowerCase() < b.name.toLowerCase())return -1
            if(a.name.toLowerCase() > b.name.toLowerCase())return 1
            return 0
        }) :
        state.dogs.sort((a,b)=>{
            if(a.name.toLowerCase() < b.name.toLowerCase())return 1
            if(a.name.toLowerCase() > b.name.toLowerCase())return -1
            return 0
        })
    return {
        ...state,
        allDogs: orderName,
    }
    case 'ORDER_WEIGHT':
        const orderWeight = state.dogs.sort((a, b) => {
        const weightA = a.weight.split(" ");
        const weightB = b.weight.split(" ");

        return parseInt(weightA[0]) - parseInt(weightB[0]);
      });
      if (action.payload === "lighter") {
        return {
          ...state,
          allDogs: orderWeight,
        };
      } else {
        return {
          ...state,
          allDogs: orderWeight.reverse(),
        };
      }
    case 'ORDER_HEIGHT':
    const orderHeight = state.dogs.sort((a, b) => {
    const heightA = a.height.split(" ");
    const heightB = b.height.split(" ");

    return parseInt(heightA[0]) - parseInt(heightB[0]);
    });
      if (action.payload === "lower") {
        return {
          ...state,
          allDogs: orderHeight,
        };
      } else {
        return {
          ...state,
          allDogs: orderHeight.reverse(),
        };
      }
    case 'CLEAR':
      return {
        ...state,
        allDogs: state.dogs,
        detail:[],
      }
    default:
        return state
}
}