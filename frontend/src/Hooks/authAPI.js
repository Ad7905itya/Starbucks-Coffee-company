export const registerUserAPI = async (userData) => {
  try {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Error registering:", error);
    return { success: false, message: error.message };
  }
};

export const loginUserAPI = async (email, password) => {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Error logging in:", error);
    return { success: false, message: error.message };
  }
};
