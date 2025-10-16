/* eslint-disable no-console */
import crypto from 'crypto'
import config from '../config'
import nodemailer from 'nodemailer'

export const generateOTP = () => {
  return crypto.randomBytes(3).toString('hex')
}

export const sendOTP = (email: string, OTP: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.email_service_user,
      pass: config.email_service_pass,
    },
  })

  const mailOptions = {
    from: config.email_service_user,
    to: email,
    subject: 'Your OTP',
    text: `Your OTP is: ${ OTP }`,
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
}

module.exports = { generateOTP, sendOTP }
