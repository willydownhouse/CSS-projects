const arr = [1, 2, 3];

class User {
  #username;
  #password;

  constructor(username, password) {
    this.#username = username;
    this.#password = password;
  }

  #login() {
    console.log(this.#username, this.#password);
  }

  get password() {
    return this.#password;
  }

  set password(password) {
    this.#password = password;
  }
}

const willy = new User("willy", "123");
