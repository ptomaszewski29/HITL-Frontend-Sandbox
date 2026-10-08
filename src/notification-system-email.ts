interface Notification {
  send(): void;
}

interface EmailNotification extends Notification {
  to: string;
  subject: string;
  body: string;
}

interface SmsNotification extends Notification {
  to: string;
  message: string;
}

interface PushNotification extends Notification {
  title: string;
  message: string;
  userId: string;
}

class EmailService {
  sendEmail(notification: EmailNotification): void {
    try {
      console.log(`Sending email to ${notification.to} with subject: ${notification.subject}`);
      console.log(notification.body);
    } catch (error) {
      console.error('Failed to send email:', error);
    }
  }
}

class SmsService {
  sendSms(notification: SmsNotification): void {
    try {
      console.log(`Sending SMS to ${notification.to}`);
      console.log(notification.message);
    } catch (error) {
      console.error('Failed to send SMS:', error);
    }
  }
}

class PushService {
  sendPush(notification: PushNotification): void {
    try {
      console.log(`Sending push notification to user ${notification.userId}`);
      console.log(`Title: ${notification.title}, Message: ${notification.message}`);
    } catch (error) {
      console.error('Failed to send push notification:', error);
    }
  }
}

class NotificationDispatcher {
  constructor(
    private emailService: EmailService,
    private smsService: SmsService,
    private pushService: PushService
  ) {}

  dispatch(notification: Notification): void {
    if (notification instanceof EmailNotification) {
      this.emailService.sendEmail(notification as EmailNotification);
    } else if (notification instanceof SmsNotification) {
      this.smsService.sendSms(notification as SmsNotification);
    } else if (notification instanceof PushNotification) {
      this.pushService.sendPush(notification as PushNotification);
    }
  }
}

const emailNotification: EmailNotification = {
  to: "user@example.com",
  subject: "Welcome!",
  body: "Thank you for signing up.",
  send: () => {}
};

const smsNotification: SmsNotification = {
  to: "+1234567890",
  message: "Welcome to our service!",
  send: () => {}
};

const pushNotification: PushNotification = {
  title: "New Message",
  message: "You have a new notification.",
  userId: "12345",
  send: () => {}
};

const dispatcher = new NotificationDispatcher(
  new EmailService(),
  new SmsService(),
  new PushService()
);

dispatcher.dispatch(emailNotification);
dispatcher.dispatch(smsNotification);
dispatcher.dispatch(pushNotification);