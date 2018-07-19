export default {
  app: {
    title: 'Building Design Platform',
    description: 'A platform that links Parties and designs'
  },
  words: {
    follow: 'Follow',
    cancelFollow: 'Cancel follow',
    follower: 'Follower',
    like: 'Like',
    comment: 'Comment',
    published_at: 'Published at'
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
        type: 'Please select your identity',
        phoneIsRegistered: 'The phone number has been registered'
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
    },
    signIn: {
      phone: 'Phone Number',
      password: 'Password',
      signInBtn: 'Sign in',
      phoneMessage: 'Please enter a valid phone number',
      passwordMessage: 'Please enter password of which length is 6 to 25',
      forgetPassword: 'Forget password?',
      thirdParty: 'Third party',
      signUpBtn: 'Sign up',
      signInSuccess: 'Sign in succeed'
    }
  },
  navbar: {
    searchPlaceholder: 'search requirement, designer',
    home: 'Home',
    follow: 'Follow',
    order: 'Order',
    message: 'Message',
    notice: 'Notice',
    me: 'Me',
    signIn: 'Sign in',
    signUp: 'Sign up',
    signOut: 'Sign out'
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
  },
  profile: {
    following: 'Following',
    follower: 'Follower',
    viewHomePage: 'View Home Page'
  },
  publish: {
    placeholder: 'Publish photo or activity',
    photoBtn: 'Choose photo',
    publishBtn: 'Publish'
  },
  actions: {
    publishRequirement: 'Publish requirement',
    publishedRequirements: 'Published requirements',
    followingDesigners: 'Following designers'
  },
  errmsgs: {
    getUserInfoFailed:
      'Failed to get user information, please refresh and try again'
  }
}
