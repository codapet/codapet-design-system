import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
  Label
} from '@codapet/design-system'

export const VerifyEmail = () => (
  <div className="flex flex-col gap-1.5">
    <Label>Enter the code we emailed you</Label>
    <InputOTP maxLength={6} defaultValue="482913">
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
    <p className="text-sm text-muted-foreground">
      Sent to vet onboarding email
    </p>
  </div>
)

export const PartialEntry = () => (
  <div className="flex flex-col gap-1.5">
    <Label>Confirm your booking</Label>
    <InputOTP maxLength={6} defaultValue="731">
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  </div>
)

export const ErrorState = () => (
  <div className="flex flex-col gap-1.5">
    <Label>Verification code</Label>
    <InputOTP maxLength={6} defaultValue="000111" error>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
    <p className="text-sm text-error-surface-default">
      That code has expired. Request a new one.
    </p>
  </div>
)
