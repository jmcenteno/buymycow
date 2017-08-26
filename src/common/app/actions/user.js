export const USER_SET = 'USER_SET';

export function setUser(data) {
  return {
    type: USER_SET,
    data
  };
}