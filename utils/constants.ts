export const EMAIL_PATTERN =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const ERROR_MESSAGES = {
  isNotMatchingPassword: "This field must be match with confirm password.",
  isNotMatchingRePassword: "This field must be match with password.",
};

export const BLACK_LIST_NAV_BAR = ["/login", "/_error"];
