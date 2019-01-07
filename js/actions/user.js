export const SET_USER = 'SET_USER';

export const setUser = (cpmkey, cpmsecret) => ({
  type: SET_USER,
  cpmkey,
  cpmsecret
});