export const EMAIL_PATTERN =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const ERROR_MESSAGES = {
  isNotMatchingPassword: "This field must be match with confirm password.",
  isNotMatchingRePassword: "This field must be match with password.",
  incorrectPassword: "Password is incorrect",
};

export const BLACK_LIST_NAV_BAR = ["/login", "/_error"];
export const BLACK_LIST_REQUIRED_AUTHENTICATION = ["/login", "/_error"];

export const DEFAULT_AVATAR = 'https://s3.amazonaws.com/prod.skimble/photos/29359/hstzsdw4avx_iphone.gif';

export const BUTTON_STYLE_MAPPING = {
  primary: 'bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300',
  secondary: 'text-black bg-green-500 disabled:bg-green-200',
}