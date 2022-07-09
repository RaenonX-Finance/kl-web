/**
 * These have to match the possible values of the args for the following methods in the backend:
 *  - generate_unauthorized_exception()
 *  - generate_blocked_exception()
 *  - generate_bad_request_exception()
 */
export const authErrorTranslation: {[detail in string]: string} = {
  'User not exists': '帳號不存在。',
  'Incorrect password': '密碼不正確。',
  'Duplicated account ID': '帳號 ID 已有人使用。',
  'Invalid signup key': '無效的註冊金鑰。',
};


