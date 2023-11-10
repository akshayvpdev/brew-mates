import { Base_URL } from "./Base_url";
import axios from "axios";

export const ApiCall = async (
  method,
  endPoint,
  data,
  params,
  content_type,
  token
) => {
  try {
    const res = await axios({
      method: method,
      url: `${Base_URL}${endPoint}`,
      data: data,
      params: params,
      headers: {
        "Content-Type": content_type ?? "application/json",
        Authorization: `Bearer ${localStorage.getItem('AccessToken')}`,
      },
    });
    return {
      status: res.status,
      data: res.data?.data,
      message: res.data?.message || "",
    };
  } catch (error) {
    Show_toast(error.response.data.message,false)
    console.log(error.response.data.message)
  }
}
