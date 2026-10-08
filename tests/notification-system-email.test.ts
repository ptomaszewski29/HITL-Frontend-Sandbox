describe('NotificationDispatcher', () => {
  it('should dispatch email notification', () => {
    expect(console.log).toHaveBeenCalledWith(`Sending email to user@example.com with subject: Welcome!`);
  });

  it('should dispatch SMS notification', () => {
    expect(console.log).toHaveBeenCalledWith(`Sending SMS to +1234567890`);
  });

  it('should dispatch push notification', () => {
    expect(console.log).toHaveBeenCalledWith(`Sending push notification to user 12345`);
  });
});