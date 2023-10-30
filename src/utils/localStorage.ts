import SecureLS from "secure-ls";

let ls: any;

if (typeof window !== "undefined") {
  // Perform localStorage action
  ls = new SecureLS();
}

export default ls;
