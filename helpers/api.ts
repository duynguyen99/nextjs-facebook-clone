export const getUserById = async (id: string): Promise<Response> => {
  const response = await fetch("/api/user/info", {
    body: JSON.stringify({ id }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
  return response;
};

export const getPastUsersLogin = async (): Promise<Response> => {
  const response = await fetch(`${process.env.API_URL}/api/user/past-login`);
  return response;
};

// export const getRecentUsers = async (url: string) => {
//   const response = await fetch(url);
//   return await response.json();
// }