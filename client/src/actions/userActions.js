import axios from 'axios';

export const setUserTypeToSuper = user => dispatch => {
    axios.
    post("/",user)
    .then(res => 
        console.log(res)
    )
    .catch(err =>
        console.log(err)
    );
}