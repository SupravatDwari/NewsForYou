const baseurl = "https://localhost:7235/api/";

export const makeRequest = async (
  method,
  apiname,
  payload = null,
  successFunction = null,
  errorFunction = null,
  addAuthorization = false
) => {
  try {
    const url = baseurl + apiname;

    const headers = { "Content-Type": "application/json" };
    if (addAuthorization) {
      const token = sessionStorage.getItem("credential");
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      } else {
        document.cookie =
          "credential=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie =
          "isAdmin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = "login.html";
        return;
      }
    }

    const options = {
      method,
      headers,
    };

    if (payload) {
      if (method === "GET") {
        const queryParams = new URLSearchParams(payload).toString();
        options.url = `${url}?${queryParams}`;
      } else {
        options.body = JSON.stringify(payload);
      }
    }

    const response = await fetch(url, options);

    if (!response.ok) throw new Error(`Error: ${response.statusText}`);

    const data = await response.json();
    if (typeof successFunction === "function") successFunction(data);
  } catch (error) {
    if (typeof errorFunction === "function") errorFunction(error);
  }
};
