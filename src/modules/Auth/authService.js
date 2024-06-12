import { appName } from "../../environments";
//

class AuthService {
  constructor() {
    this.token = window.localStorage.getItem(`${appName}_token`);
    this.user = JSON.parse(window.localStorage.getItem(`${appName}_user`));
  }

  check() {
    return !!this.token;
  }

  setUser(user) {
    window.localStorage.removeItem(`${appName}_user`);
    window.localStorage.setItem(`${appName}_user`, JSON.stringify(user));

    this.user = user;
    location.reload();
  }

  login(token, user) {
    window.localStorage.setItem(`${appName}_token`, token);
    window.localStorage.setItem(`${appName}_user`, JSON.stringify(user));

    this.token = token;
    this.user = user;

    location.reload();
  }

  async autoLogin(token, user) {
    window.localStorage.setItem(`${appName}_token`, token);
    window.localStorage.setItem(`${appName}_user`, JSON.stringify(user));

    this.token = token;
    this.user = user;

    return await this.token;
  }

  logout() {
    window.localStorage.removeItem(`${appName}_token`);
    window.localStorage.removeItem(`${appName}_user`);
    window.localStorage.removeItem("jobNumber");
    window.location.href = "/";
  }
}

export default new AuthService();
