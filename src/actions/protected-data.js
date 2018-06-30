import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const FETCH_MY_BUCKET_SUCCESS = 'FETCH_MY_BUCKET_SUCCESS';
export const fetchMyBucketSuccess = myBucketData => ({
  type: FETCH_MY_BUCKET_SUCCESS,
  myBucketData
});

export const FETCH_MY_WALL_SUCCESS = 'FETCH_MY_WALL_SUCCESS';
export const fetchMyWallSuccess = myWallData => ({
  type: FETCH_MY_WALL_SUCCESS,
  myWallData
});

export const FETCH_PROTECTED_DATA_ERROR = 'FETCH_PROTECTED_DATA_ERROR';
export const fetchProtectedDataError = error => ({
  type: FETCH_PROTECTED_DATA_ERROR,
  error
});

export const fetchMyBucket = () => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/my-bucket`, {
    method: 'GET',
    headers: {
      // Provide our auth token as credentials
      Authorization: `Bearer ${authToken}`
    }
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then(data => {
    dispatch(fetchMyBucketSuccess(data))})
  .catch(err => {
    dispatch(fetchProtectedDataError(err));
  });
};

export const fetchMyWall = () => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/my-wall`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
  .then(res => normalizeResponseErrors(res))
  .then((res) => {
    return res.json()
  })
  .then(data => {
    dispatch(fetchMyWallSuccess(data));})
  .catch(err => {
    dispatch(fetchProtectedDataError(err));
  });
};

export const submitNewTicketForm = data => (dispatch,getState) =>{
  const userData={
    what:data.get('what'),
    type:data.get('type'),
    where:data.get('where'),
    details:data.get('details')
  };
  //console.log(JSON.stringify(userData));
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/my-bucket`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
    body:JSON.stringify(userData)
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then(data => {
    dispatch(fetchMyBucket());
  })
  .catch(err => {
    dispatch(fetchProtectedDataError(err));
  });
}

export const deleteTicket = ticketId => (dispatch,getState) =>{
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/my-bucket/ticket/${ticketId}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    }
  })
  .then(res => normalizeResponseErrors(res))  
  .then(()=>{
    console.log('delete ticket success!');
    dispatch(fetchMyBucket());
  })
  .catch(err => {
    dispatch(fetchProtectedDataError(err));
  });
}

export const editTicket= data => (dispatch,getState) =>{
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/my-bucket/ticket/${data.ticketId}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
    body:JSON.stringify(data)
  })
  .then(res => normalizeResponseErrors(res))   
  .then(res => res.json())
  .then(savedDoc => {
    dispatch(fetchMyBucket());
  })
  .catch(err => {
    dispatch(fetchProtectedDataError(err));
  });  
}

export const uploadImage = data => (dispatch,getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/my-wall/ticket/${data.get('ticketId')}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${authToken}`
    },
    body:data
  })
  .then(res => normalizeResponseErrors(res))   
  .then(response=>{
    console.log('photo saved successfully');
    dispatch(fetchMyWall());
  })
  .catch(err => {
    console.log(err);
    dispatch(fetchProtectedDataError(err));
  }); 
}

export const deleteRecordsCollection = (ticketId,recordId) => (dispatch,getState) =>{
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/my-wall/ticket/${ticketId}/record/${recordId}`,{
    method:'DELETE',
    headers: {
      'Authorization': `Bearer ${authToken}`
    }
  })
  .then(res=>normalizeResponseErrors(res))
  .then(res=>{
    console.log('delete record success');
    dispatch(fetchMyWall());
  })
  .catch(err => {
    console.log(err);
    dispatch(fetchProtectedDataError(err));
  });  
}

export const deleteOnePhoto=imageId=>(dispatch,getState)=>{
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/my-wall/image/${imageId}`,{
    method:'DELETE',
    headers: {
      'Authorization': `Bearer ${authToken}`
    }
  })
  .then(res=>normalizeResponseErrors(res))
  .then(res=>{
    console.log('delete single photo success');
    dispatch(fetchMyWall());
  })
  .catch(err => {
    console.log(err);
    dispatch(fetchProtectedDataError(err));
  });   
}