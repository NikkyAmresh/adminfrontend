import axios from "axios";
import { useHistory } from "react-router-dom";
import { SERVER_URLS, AREA } from "./constants";
const APIs = {
  auth: {
    login(User) {
      return {
        url: `${SERVER_URLS.BACKEND}/login`,
        method: "POST",
        data: User,
      };
    },
    checkAuth() {
      return {
        url: `${SERVER_URLS.BACKEND}/${AREA.SECURE}`,
        method: "GET",
      };
    },
  },
  user: {
    getUsers(page) {
      return {
        url: `${SERVER_URLS.BACKEND}/${AREA.SECURE}/users/${page}`,
        method: "GET",
      };
    },
    create(user) {
      return {
        url: `${SERVER_URLS.BACKEND}/${AREA.SECURE}/users`,
        method: "POST",
        data: user,
      };
    },
    delete(userId) {
      return {
        url: `${SERVER_URLS.BACKEND}/${AREA.SECURE}/user/${userId}`,
        method: "DELETE",
      };
    },
  },
};
class APICall {
  /**
   * @param {{ module: any; apiName: any; params: any; area: any; }} [APICall]
   */
  constructor(APICall) {
    this.module = APICall.module;
    this.apiName = APICall.apiName;
    this.params = APICall.params;
    this.area = APICall.area;
    this.headers = {
      "Content-Type": "application/json",
    };
  }

  addAuthKey() {
    let user = localStorage["user"] || null;
    if (!user) {
      window.location.href = "/";
    }
    user = JSON.parse(user);
    this.headers = {
      ...this.headers,
      Authorization: "Bearer " + user.token,
    };
  }

  async getResponse() {
    if (this.area == AREA.SECURE) {
      this.addAuthKey();
    }
    let payload = APIs[this.module][this.apiName](this.params);
    payload.headers = this.headers;
    const response = await axios(payload).catch((err) => {
      if (err.status === 401) {
        debugger;
        window.location.href = "/";
      } else {
        throw err;
      }
    });
    return response;
  }
}

export { APIs, APICall };
