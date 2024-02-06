const jwt = require('jsonwebtoken');
const { accessTokenConfig, refreshTokenConfig } = require('../config/jwt.config');

async function generateAndSendToken(userId, role, res) {
  try {
    if (!userId || !role) {
      throw new Error('Invalid input');
    }

    const accesToken = jwt.sign({userId, role }, accessTokenConfig.secretKey, { expiresIn: accessTokenConfig.duration });
    const refreshToken = jwt.sign({userId, role }, refreshTokenConfig.secretKey, { expiresIn: refreshTokenConfig.duration });

    res.cookie('accessToken', accesToken, { httpOnly: true });
    res.cookie('refreshToken', refreshToken, { httpOnly: true });

    return { success: true, message: 'Token generation successful' };

  } catch (error) {
    return { success: false, message: 'Token generation failed.' + error.message };
  }
}

module.exports = generateAndSendToken;