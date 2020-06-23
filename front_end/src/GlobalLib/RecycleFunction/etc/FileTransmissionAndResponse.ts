import Axios from "axios";
import { http_BackEnd } from "../../Apollo/ApolloConnection";

export default async (files: any) => {
  const formData = new FormData();
  if (files) {
    for (let i = 0; i < files.length; i++) {
      formData.append("file", files[i]);
    }
  }
  const {
    data: { paths },
  } = await Axios.post(http_BackEnd.toString() + "/api/upload", formData, {
    headers: {
      "content-type": "multipart/form-data",
    },
  });
  return paths;
};