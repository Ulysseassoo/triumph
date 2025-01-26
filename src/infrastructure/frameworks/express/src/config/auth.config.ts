const { Algorithm } = require('@node-rs/argon2');

export const authConfig = {
  accessTokenSecret: new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET || 'default_access_secret'),
  refreshTokenSecret: new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET || 'default_refresh_secret'),
  confirmationTokenSecret: new TextEncoder().encode(process.env.CONFIRM_TOKEN_SECRET || 'default_confirm_secret'),
  forgotPasswordTokenSecret: new TextEncoder().encode(process.env.FORGOT_PASSWORD_TOKEN_SECRET || 'default_forgot_secret'),
  hashOptions: {
    algorithm: Algorithm.Argon2id,
    parallelism: 1,
    timeCost: 3,
    memoryCost: 12288,
  },
};