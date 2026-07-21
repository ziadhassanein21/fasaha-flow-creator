import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export const Route = createFileRoute("/auth/otp")({
  head: () => ({ meta: [{ title: "التحقق من البريد · فصاحة" }] }),
  component: OTP,
});

function OTP() {
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  return (
    <div>
      <h1 className="text-3xl font-extrabold tracking-tight">تأكيد بريدك</h1>
      <p className="mt-2 text-sm leading-7 text-muted-foreground">
        أرسلنا رمزًا مكوّنًا من ٦ أرقام إلى بريدك. أدخله للمتابعة.
      </p>
      <div className="mt-8 flex justify-center" dir="ltr">
        <InputOTP maxLength={6} value={code} onChange={setCode}>
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
      <Button
        className="mt-8 w-full rounded-full"
        disabled={code.length !== 6}
        onClick={() => navigate({ to: "/onboarding" })}
      >
        تأكيد ومتابعة
      </Button>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        لم يصلك الرمز؟{" "}
        <button className="font-semibold text-primary hover:underline">إعادة الإرسال</button>
      </p>
    </div>
  );
}
