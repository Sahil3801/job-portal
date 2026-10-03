import { Button, Modal, PasswordInput, PinInput, TextInput } from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { resetPassword, sendOtp, verifyOtp } from "../../Services/UserService";
import { errorNotification, successNotification } from "../../Services/NotificationService";
import { useInterval } from "@mantine/hooks";
import { signupValidation } from "../../Services/FormValidation";

const RESEND_SECONDS = 60;

const errorText = (err) =>
  err.response?.data?.errorMessage || "Could not reach the server. Please try again in a minute.";

const ResetPassword = (props) => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [verified, setVerified] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const interval = useInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
  useEffect(() => {
    if (seconds === 0) interval.stop();
  }, [seconds, interval]);

  const reset = () => {
    setEmail("");
    setOtp("");
    setOtpSent(false);
    setVerified(false);
    setPassword("");
    setError("");
    setSeconds(0);
    interval.stop();
  };

  const close = () => {
    reset();
    props.close();
  };

  const handleSendOtp = () => {
    if (signupValidation("email", email)) {
      setError(signupValidation("email", email));
      return;
    }
    setError("");
    setSending(true);
    sendOtp(email)
      .then(() => {
        successNotification("Code sent", "Check your email for the 6-digit code.");
        setOtpSent(true);
        setSeconds(RESEND_SECONDS);
        interval.start();
      })
      .catch((err) => errorNotification("Could not send code", errorText(err)))
      .finally(() => setSending(false));
  };

  const handleVerifyOtp = (value) => {
    setOtp(value);
    verifyOtp(email, value)
      .then(() => setVerified(true))
      .catch((err) => errorNotification("Code not accepted", errorText(err)));
  };

  const handleResetPassword = () => {
    const passwordError = signupValidation("password", password);
    setError(passwordError);
    if (passwordError) return;
    setSaving(true);
    resetPassword(email, otp, password)
      .then(() => {
        successNotification("Password changed", "You can now log in with your new password.");
        close();
      })
      .catch((err) => errorNotification("Password reset failed", errorText(err)))
      .finally(() => setSaving(false));
  };

  return (
    <Modal opened={props.opened} onClose={close} title="Reset password" centered>
      <div className="flex flex-col gap-5">
        <TextInput
          value={email}
          readOnly={otpSent}
          error={!otpSent && error}
          onChange={(e) => setEmail(e.target.value.trim())}
          leftSection={<IconAt size={16} />}
          label="Email"
          placeholder="Your account email"
          autoComplete="email"
        />
        {!otpSent && (
          <Button loading={sending} onClick={handleSendOtp} disabled={email === ""}>
            Send code
          </Button>
        )}

        {otpSent && !verified && (
          <>
            <div className="text-sm text-mine-shaft-300">
              Enter the 6-digit code sent to {email}.
            </div>
            <PinInput
              onComplete={handleVerifyOtp}
              className="mx-auto"
              gap="sm"
              length={6}
              type="number"
              oneTimeCode
              aria-label="Reset code"
            />
            <div className="flex gap-2">
              <Button
                variant="outline"
                fullWidth
                loading={sending}
                disabled={seconds > 0}
                onClick={handleSendOtp}
              >
                {seconds > 0 ? `Resend in ${seconds}s` : "Resend code"}
              </Button>
              <Button variant="subtle" fullWidth onClick={reset}>
                Change email
              </Button>
            </div>
          </>
        )}

        {verified && (
          <>
            <PasswordInput
              value={password}
              error={error}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              leftSection={<IconLock size={16} />}
              label="New password"
              placeholder="New password"
              autoComplete="new-password"
            />
            <Button loading={saving} onClick={handleResetPassword}>
              Change password
            </Button>
          </>
        )}
      </div>
    </Modal>
  );
};

export default ResetPassword;
