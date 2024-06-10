import { pluralizeEn } from "@/shared/helpers/create-pluralize";
import {SidebarLinkText} from '@/widgets/sidebar'

export const en = {
  homePage: {
    test: "Some test"
  },
  errors: {
    noResponse: "Server does not response",
    requestFailed: "Request Failed",
    loginIncorrectData: "The email or password are incorrect. Try again please",
    loginFailed: "Login Failed",
    loginIncorrectPassword: `The password is incorrect. Try again please`,
    regexUsername: "Username must contain  1-9, a-z, A-Z, . _ -",
    nonemptyUsername: "Enter your Username",
    minUsername: "Username must be at least 6 characters",
    maxUsername: "Maximum number of characters 30",
    regexEmail: 'The email must match the format example@example.com',
    nonemptyEmail: "Enter your email",
    nonemptyPassword: "Enter your password",
    nonemptyConfirm: "Confirm your password",
    regexPasswordMustContain: 'Password must contain 1-9, a-z, A-Z, ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^' +
      ' _` { | } ~',
    minPassword: "Password must be at least 6 characters",
    maxPassword: "Maximum number of characters 20",
    passwordsMustMatch: "The passwords must match",
    emailNotFound: "User with this email doesn't exist",
    requiredTerms: "Terms and Privacy Policy must be true",
    emailExists: "User with this email is already registered",
    usernameExists: "User with this username is already registered",
  },
  auth: {
    emailLabel: "Email",
    emailSent: "Email Sent",
    passwordLabel: "Password",
    forgotPassword: "Forgot password",
    haveAccount: `Do you have an account?`,
    notHaveAccount: `Don't have an account?`,
    signinTitle: "Sign In",
    signin: "Sign In",
    signup: "Sign Up",
    username: "Username",
    passwordConfirmation: "Password confirmation",
    termsOfService: "Terms of Service",
    privacyPolicy: "Privacy Policy",
    termsOfServiceTitle: "Terms of Service",
    privacyPolicyTitle: "Privacy Policy",
    loginLoader: "Logging in...",
    passwordRecoveryTitle: "Forgot Password",
    passwordRecoveryDescription: "Enter your email address and we will send you further instructions",
    backToLogin: 'Back to Sign In',
    backToRegistration: 'Back to sign up',
    sendLink: "Send Link",
    sendLinkAgain: "Send Link Again",
    sendLoader: "Sending...",
    signupLoader: "Signing Up...",
    newPasswordTitle: "Create New Password",
    newPasswordButton: "Create new password",
    newPasswordDescription: "Your password must be between 6 and 20 characters",
    sentCodeToEmail(email: string) {
      return `We have sent a confirmation link to your email ${email}`
    },
    logOutModal(email: string) {
      return `Do you really want to log out of your account “${email}”?`
    },
    termsPolicyLinks: "I agree to the <1>terms</1> and <2>policy</2>",
    congratulations: "Congratulations!",
    emailConfirmed: "Your email has been confirmed",
    emailExpired: "Email verification link expired",
    expiredDescription: "Looks like the verification link has expired. Not to worry, we can send the link again",
    resendLink: "Resend verification link",
  },
  sidebar: {
    links: {
      create: "Create",
      favorites: "Favorites",
      home: "Home",
      messenger: "Messenger",
      myProfile: "My Profile",
      search: "Search",
      statistic: "Statistic"
    } as Record<SidebarLinkText, string>,
    logout: "Log Out",
  },
  english: "English",
  russian: "Russian",
  yes: "Yes",
  no: "No",
  dynamicTest: {
    getDynamicString(name: string) {
      return `Your name is ${name}`
    },
    dynamicStringWithTags: "<1>Blue text</1> and <2>Red text</2> are tests",
    getPluralizedForm(count: number) {
      const str = pluralizeEn(count)

      switch (str) {
        case "one":
          return `${count} test`
        case "other":
          return `${count} tests`
      }
    }
  }
};

export type LocaleType = typeof en
