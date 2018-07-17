export default {
  app: {
    title: 'Building Design Platform',
    description: 'A platform that links Parties and designs'
  },
  forms: {
    signUp: {
      realName: 'Real name',
      phone: 'Phone',
      password: 'Password(at least 6 characters)',
      confirmPassword: 'Confirm password',
      type: 'Your identity',
      party: 'Party',
      designer: 'Designer',
      signUpBtn: 'Sign up',
      term:
        'You agree to abide by the User Agreement and Privacy Policy of this website.',
      thirdParty: 'Third party',
      loginBtn: 'Sign in',
      messages: {
        realName: 'Please enter your real name',
        phone: 'Please enter a valid phone number',
        password: 'Password length is 6 to 25 characters',
        type: 'Please select your identity'
      }
    },
    sendCode: {
      title: 'Security Verification',
      bodyTitle: 'Please verify the phone number',
      description:
        'We will send a SMS verification code to the mobile number entered below.',
      phoneLabel: 'Phone Number',
      sendBtn: 'Send verification code',
      cancelBtn: 'Cancel',
      sendedDescription:
        'Please enter the verification code to complete the login. It may take a few minutes to receive the verification code.',
      codeLabel: 'Verification code',
      confirmBtn: 'Approved and sign up',
      notReceived: 'Did not receive?',
      sendAgain: 'Send again',
      success: 'Send succeed',
      signUpSuccess: 'Sign up succeed',
      requireCode: 'Please enter the verification code'
    }
  },
  navbar: {
    searchPlaceholder: 'search project, designer',
    home: 'Home',
    favorite: 'Favorite',
    order: 'Order',
    message: 'Message',
    notice: 'Notice',
    my: 'My',
    signIn: 'Sign in',
    signUp: 'Sign up'
  },
  guide: {
    party: {
      title: "I'm a Party",
      features: [
        'Public Requirements',
        'Find Designers',
        'Communicate with Professionals',
        "Follow Others' Activities"
      ]
    },
    designer: {
      title: "I'm a designer",
      features: [
        'Find Requirements',
        'Tender for Requirements',
        'Publish Own Works',
        "Follow Others' Activities"
      ]
    }
  }
}
